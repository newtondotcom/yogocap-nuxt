export interface Video {
    minia: string;
    name: string;
    date: string;
    cost: number;
    duration: number;
    type: string;
}

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