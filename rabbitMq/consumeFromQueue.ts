
import amqp from 'amqplib';
import { config } from '../config/config';

export default async (queue, isNoAck = false, durable = false, prefetch = null) => {
    let val;
    const cluster = await amqp.connect(config.rabbit.connectionString);
    const channel = await cluster.createChannel();
    await channel.assertQueue(queue);
    if (prefetch) {
        channel.prefetch(prefetch);
    }

    try {
        await channel.consume(queue, message => {
            if (message !== null) {
                const item = JSON.parse(message.content.toString());
                console.log(' [x] Received', item);
                val = item
                channel.ack(message);

                return null;
            } else {
                console.log('Queue is empty!')
                channel.reject(message);
            }
        }, { noAck: isNoAck })
    } catch (error) {
        console.log(error, 'Failed to consume messages from Queue!')
        cluster.close();
    }
    return val;
}

