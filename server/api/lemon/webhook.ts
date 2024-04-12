import crypto from 'crypto';
import RawBody from 'raw-body';
import { IncomingMessage } from 'http';

interface WebhookMeta {
  test_mode: boolean;
  event_name: string;
  custom_data: {
    user_id: string;
  };
}

interface WebhookAttributes {
  type: string;
  id: string;
  attributes: {
    store_id: number;
    customer_id: number;
    identifier: string;
    order_number: number;
    user_name: string;
    user_email: string;
    currency: string;
    currency_rate: string;
    tax_name: string;
    tax_rate: number;
    tax_inclusive: boolean;
    status: string;
    status_formatted: string;
    refunded: boolean;
    refunded_at: string | null;
    subtotal: number;
    discount_total: number;
    tax: number;
    setup_fee: number;
    total: number;
    subtotal_usd: number;
    discount_total_usd: number;
    tax_usd: number;
    setup_fee_usd: number;
    total_usd: number;
    subtotal_formatted: string;
    discount_total_formatted: string;
    tax_formatted: string;
    setup_fee_formatted: string;
    total_formatted: string;
    first_order_item: {
      product_name: string;
    };
    urls: {
      self: string;
    };
    created_at: string;
    updated_at: string;
    test_mode: boolean;
  };
  relationships: any; // Define types based on actual structure
  links: {
    self: string;
  };
}

interface WebhookEvent {
  meta: WebhookMeta;
  data: WebhookAttributes;
}

// Assuming useRuntimeConfig() is defined elsewhere to fetch runtime configuration
// and that config.LS_SECRET contains the secret key for HMAC verification.
const config = useRuntimeConfig();
const secret: string = config.LS_SECRET;

// Function to verify the signature
const verifySignature = (rawBody: Buffer, signature: string, secret: string): boolean => {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(rawBody).digest('hex');

  // Ensure both digests are in Buffer format for comparison
  const expectedBuffer = Buffer.from(digest, 'utf8');
  const receivedBuffer = Buffer.from(signature, 'utf8');

  // Use timingSafeEqual to compare digests securely
  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
};

// Define the event handler
export default defineEventHandler(async (levent: { node: { req: IncomingMessage; }; })  => { 
  try {
  const req: IncomingMessage = levent.node.req;
  const rawBody: Buffer = await RawBody(req);
  const signature: string = req.headers['x-signature'] || '';

  if (!verifySignature(rawBody, signature, secret)) {
    throw new Error('Invalid signature.');
  } else {
    console.log('Signature verified');
  }

  const parsedBody: WebhookEvent = JSON.parse(rawBody.toString());
  const { meta, data } = parsedBody;

  const event_name: string = meta.event_name;
  const user_id: string = meta.custom_data.user_id;
  const product_name: string = data.attributes.first_order_item.product_name;

  switch (event_name) {
    case 'order_created':
      console.log('Order created for user:', user_id, 'Product:', product_name);
      break;
    case 'order_refunded':
      console.log('Order refunded for user:', user_id);
      break;
    default:
      throw new Error(`Unhandled event: ${event_name}`);
  }

  return {
    status: 'success',
    message: 'Webhook received and verified'
  };

} catch (error) {
  console.error('Error processing webhook event', error);
  return {
    status: 'error',
    message: error.message || 'Unknown error occurred'
  };
}
});