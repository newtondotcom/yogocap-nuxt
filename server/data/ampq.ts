import ampq from 'amqplib';

// MESSAGE EXAMPLE : {"file_name":"azdqdqz","emoji":false,"lsilence":false,"music":true,video_aligned":true,"key_db":"clvzoatjc0002wvxz2nvodjho"}

export default async function sendAMQP(message: string) {
  try {
    const config = useRuntimeConfig();
    const RABBIT_HOST = config.RABBIT_HOST;
    const RABBIT_PORT = config.RABBIT_PORT;

    const queueName = "task_queue";
    const RABBITMQ_SPLLITER = `${RABBIT_HOST}:${RABBIT_PORT}`;

    // Connect to the RabbitMQ server
    const connection = await ampq.connect(`amqp://${RABBITMQ_SPLLITER}`);

    // Create a channel
    const channel = await connection.createChannel();

    // Declare a queue
    await channel.assertQueue(queueName, { durable: true });

    // Send a message to the queue
    channel.sendToQueue(queueName, Buffer.from(message));

    // Close the connection and channel
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error occurred:', error);
  }
} 