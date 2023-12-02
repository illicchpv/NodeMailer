const nodemailer = require('nodemailer')
// EMAIL_CLIENT_ID=
// EMAIL_CLIENT_SECRET=
// EMAIL_REFRESH_TOKEN=

console.log('DEF_CONFIG:', process.env.DEF_CONFIG)
console.log('POOL_CONFIG:', process.env.POOL_CONFIG)
console.log('PORT:', process.env.PORT)
console.log('EMAIL:', process.env.EMAIL)

// const defConfig = "smtps://mail.tester.83@mail.ru:b60r2QA6577AQCy1wjYs@smtp.mail.ru" // можно smtp://
// const poolConfig = "smtps://mail.tester.83@mail.ru:b60r2QA6577AQCy1wjYs@smtp.mail.ru/?pool=true"
const defConfig = process.env.DEF_CONFIG
const poolConfig = process.env.POOL_CONFIG

const transporter = nodemailer.createTransport(
  // {
  //   host: 'smtp.gmail.com',
  //   port: 587,
  //   secure: false, // secure: true, только для port: 465,
  //   auth: {
  //     user: 'amail.tester.87@gmail.com',
  //     pass: 'mt_YuoxyyRR1Y3^',
  //   }
  // },
  // {
  //   from: 'Tester mail <amail.tester.87@gmail.com>',
  // }

  poolConfig,
  // defConfig,
  // {
  //   pool: true, 
  //   maxConnections: 3, // (defaults to 5)
  //   maxMessages: 10, //  (defaults to 100). 'infinity' - без ограничения

  //   host: 'smtp.mail.ru',
  //   port: 465,
  //   secure: true, // secure: true, только для port: 465,
  //   auth: {
  //     user: 'mail.tester.83@mail.ru',
  //     pass: 'b60r2QA6577AQCy1wjYs',
  //     // pass: 'mt_YuoxyyRR1Y3^',
  //   }
  // },
  {
    from: 'mail.tester <mail.tester.83@mail.ru>',
  }

  // { // ethereal mail не отправляет на реальные адреса. 
  //   host: 'smtp.ethereal.email', // их можно увидеть только https://ethereal.email/messages
  //   port: 587,
  //   secure: false, // secure: true, только для port: 465,
  //   auth: {
  //     user: 'santiago82@ethereal.email',
  //     pass: 'fwtUY1wN4kyssxqDdQ'
  //   }
  // },
  // {
  //   from: 'EtherealTest <santiago82@ethereal.email>',
  // }
)

transporter.verify((err, suc) => {
  if(err){
    console.log('transporter.verify err: ', err);
  }else{
    console.log('Server is ready! suc: ', suc);
  }
})

const mailer = (message) => transporter.sendMail(message, (err, info) => {
  if (err) return console.log('sendMail err: ', err);
  console.log('sendMail ok. info: ', info);
  // transporter.close()
})
module.exports = mailer