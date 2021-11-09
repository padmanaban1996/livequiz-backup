
import amqp from 'amqplib';
import { config } from '../config/config';

export default async (queue, message, durable = false) => {
    try {
        const cluster = await amqp.connect(config.rabbit.connectionString);
        const channel = await cluster.createChannel();
        await channel.assertQueue(queue);
        await channel.sendToQueue(queue, Buffer.from(message));

        console.info(' [x] Sending message to queue', queue, message);

    } catch (error) {
        // handle error response
        console.error(error, 'Unable to connect to cluster!');
        process.exit(1);
    }
}
