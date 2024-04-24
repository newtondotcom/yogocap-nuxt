import ampq from 'amqplib';

const RABBITMQ_SPLLITER='localhost:3000';
const queueName = 'test-queue';

export default async function sendAMQP(message: string) {
    try {
      // Connect to the RabbitMQ server
      const connection = await ampq.connect(`amqp://${RABBITMQ_SPLLITER}`);
  
      // Create a channel
      const channel = await connection.createChannel();
  
      // Declare a queue
      await channel.assertQueue(queueName, { durable: false });
  
      // Send a message to the queue
      channel.sendToQueue(queueName, Buffer.from(message));
  
      console.log(`Message sent to queue '${queueName}': ${message}`);
  
      // Close the connection and channel
      await channel.close();
      await connection.close();
    } catch (error) {
      console.error('Error occurred:', error);
    }
} 