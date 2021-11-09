
// check whether it needs to have same
export const config = {
    port: process.env.RABBIT_PORT,
    rabbit: {
        connectionString: 'amqp://localhost',
        // queue: process.env.QUEUE_NAME
        // seperate the queues here and point to env according
        queue: 'node_queue'
    },
    razPay: {
        key: 'rzp_test_6FwUah2bEov0AI',
        secret: 'hJeCRJR5VhgTMwNH5xIqR1pZ'
    }
}
