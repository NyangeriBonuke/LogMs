const amqp = require('amqplib');
const { json } = require('express');
require('dotenv').config()

class Producer {
    channel;

    async createChannel(){
        const connection = await amqp.connect(process.env.url)
        this.channel = await connection.createChannel()
    }

    async publishMessage(routingKey, message){
        if(!this.channel){
            await this.createChannel()
        }

        exchangeName = process.env.exchangeName
        await this.channel.assertExchange(exchangeName, "direct")

        const logDetails = {
            logType: routingKey,
            message: message,
            dateTime: new Date()
        }

       await this.channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(logDetails)))

       console.log(`The ${message} was sent to exchange ${exchangeName}`)
    }
}

module.exports = Producer