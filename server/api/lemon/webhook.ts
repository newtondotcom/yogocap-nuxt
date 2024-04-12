import crypto from 'crypto';

const config = useRuntimeConfig()
const secret = config.LS_SECRET

export const verifySignature = (rawBody: Buffer, signature: string, secret: string): boolean => {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
  const receivedSignature = Buffer.from(signature, 'utf8');

  return crypto.timingSafeEqual(digest, receivedSignature);
};

export default defineEventHandler(async (levent) => {
  console.log('Received webhook event', levent.context.body)
    const body = levent.context.body
    const event_name = body.meta.event_name
    const user_id = body.meta.custom_data.user_id
    switch (event_name) {
      case 'order_created':
        // Handle order creation
        break;
      case 'order_refunded':
        // Handle order refund
        break;
    }
    return {
      status: 'success'
    }
})