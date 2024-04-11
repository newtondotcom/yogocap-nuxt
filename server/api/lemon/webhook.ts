export default defineEventHandler(async (levent) => {
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