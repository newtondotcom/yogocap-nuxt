import crypto from 'crypto';
import { IncomingMessage } from 'http';
import { assert } from '@vueuse/core';
import constants from '~/lib/constants';
import { setPlanPurchased } from '~/server/data/account';
import { sendEmailOnBuyingMade } from '~/server/data/mail';
import RawBody from 'raw-body';
import type { WebhookEvent } from '~/types/types';

const config = useRuntimeConfig();
let secret: string;

// Function to verify the signature
const verifySignature = (rawBody: Buffer, signature: string, secret: string): boolean => {
    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(rawBody).digest('hex');

    const expectedBuffer = Buffer.from(digest, 'utf8');
    const receivedBuffer = Buffer.from(signature, 'utf8');

    return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
};

// Define the event handler
export default defineEventHandler(async (levent: { node: { req: IncomingMessage } }) => {
    try {
        const req: IncomingMessage = levent.node.req;
        const rawBody: Buffer = await RawBody(req);
        const signature: string = req.headers['x-signature'] as string;

        const parsedBody: WebhookEvent = JSON.parse(rawBody.toString());
        const { meta, data } = parsedBody;

        const event_name: string = meta.event_name;
        const user_id: string = meta.custom_data.user_id;
        const product_name: string = data.attributes.first_order_item.product_name;
        const testmode: boolean = data.attributes.test_mode;
        if (testmode) {
            secret = config.LEMON_SQUEEZY_SECRET;
        } else {
            secret = config.LEMON_SQUEEZY_SECRET_LIVE;
        }

        if (!verifySignature(rawBody, signature, secret)) {
            throw new Error('Invalid signature.');
        } else {
            console.log('Signature verified');
        }

        switch (event_name) {
            case 'order_created':
                console.log('Order created for user:', user_id, 'Product:', product_name);
                //const plan = product_name === 'Plan Starter' ? 'plan-starter' : product_name === 'Plan Premium' ? 'plan-premium' : 'plan-business';
                const plan = product_name.split(' ')[1];
                assert(
                    plan == constants.NAME_PLAN_SLOW ||
                        plan == constants.NAME_PLAN_MEDIUM ||
                        plan == constants.NAME_PLAN_FAST,
                );
                await setPlanPurchased(user_id, plan);
                await sendEmailOnBuyingMade(user_id);
                break;
            case 'order_refunded':
                console.log('Order refunded for user:', user_id);
                break;
            default:
                throw new Error(`Unhandled event: ${event_name}`);
        }

        return {
            status: 'success',
            message: 'Webhook received and verified',
        };
    } catch (error) {
        console.error('Error processing webhook event', error);
        return {
            status: 'error',
            message: error.message || 'Unknown error occurred',
        };
    }
});
