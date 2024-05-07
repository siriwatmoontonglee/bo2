const fastify = require('fastify')({
    logger: true
})
const axios = require('axios')

fastify.register(require('@fastify/formbody'))
const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer VlruNCznWvajhSswUlX1Kr5FBOu1NFQS/zCkE6VIpjmqWHN62zObfUfxpbqdkF9QkWQ6EYBn6iaRIKjM7b5Pl1R3bE3D6puTXGNhrModKUpwbqn8kHUTPv2Q79c2M1QOjI9yI7As5Wcv0SiKt2xRPwdB04t89/1O/w1cDnyilFU=`
};

// Declare a route
fastify.get('/', function handler(req, reply) {
    reply.send({
        hello: 'พี่ท้อปหล่อมาก'
    })
})

fastify.post('/line', function handler(req, reply) {
    console.log(req.body.events[0])
    if (req.body.destination) {
        reply.send({
            hello: 'พี่ท้อปหล่อมาก'
        })
    }
    if (req.body.events[0].message.type === 'text') {

        let message = ''
        if(req.body.events[0].message.text == 'สวัสดี'){
            message = 'สวัสดีครับ'
        }
        else
        if(req.body.events[0].message.text == 'สบายดีไหม'){
            message = 'สบายดีครับ'
        }
        else
        if(req.body.events[0].message.text == 'ทำอะไรได้บ้าง'){
            message = 'ทำอะไรก็ได้ครับ'
        }
        else{
            message = req.body.events[0].message.text
        }
        axios({
            method: 'post',
            url: `${LINE_MESSAGING_API}/reply`,
            headers: LINE_HEADER,
            data: {
                replyToken: req.body.events[0].replyToken,
                messages: [{
                    type: 'text',
                    text: message
                }]
            }
        }).then(() => {
            reply.code(200).send()
        }).catch(err => {
            reply.code(500).send(err)
        })


    }
    reply.send({
        hello: 'world'
    })

})

// Run the server!
fastify.listen({
    port: 3000
}, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})