//const RABBITMQ_SPLLITER='144.91.123.186:9999';
const RABBITMQ_SPLLITER='localhost:3000';

export default async function sendAMQP(task:Record<string,any> ) {
  try {
    let body = JSON.stringify(task);
    const response = await fetch(`http://${RABBITMQ_SPLLITER}/`, {
      method: 'POST',
      body,
    });
    console.log('response', response);
  } catch (error) {
    console.error('Error publishing message:', error);
  }
}
