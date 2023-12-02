require('dotenv').config()

// console.log(process.env) // remove this after you've confirmed it is working
const express = require('express')
const res = require('express/lib/response')
var bodyParser = require('body-parser')
const mailer = require('./nodemailer')


const app = express()
var jsonParser = bodyParser.json()

const PORT = 3001
let reqNom = 0
let user = undefined

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)
app.get('/', (req, res) => {
  console.log(++reqNom, 'get index');
  return res.sendFile(__dirname + '/index.html')
})
app.get('/registration', (req, res) => {
  console.log(++reqNom, 'get registration user:', !!user);
  //res.send('res.send')
  if (!user) return res.sendFile(__dirname + '/registration.html')
  res.send(`Регистрация Ок. данные высланы на ${user.email}`)
  user = undefined
})
app.post('/registration', (req, res) => {
  console.log(++reqNom, 'post registration',);
  console.log('req.body: ', req.body);

  if (!req.body.email || !req.body.password || !req.body.promo) {
    return res.sendStatus(400)
  }

  const massage = {
    // from: 'EtherealTest <santiago82@ethereal.email>', // => nodemailer.createTransport
    to: req.body.email,
    subject: 'вы успешно зарегистрировались',
    text: `
      вы успешно зарегистрировались
      login: ${req.body.email}
      password: ${req.body.password}

      данное письмо не требует ответа
    `,
    html: `
      <h1>вы успешно зарегистрировались</h1>
      <i>учетная запись</i>
      <ul>
        <li>login: ${req.body.email}</li>
        <li>password: ${req.body.password}</li>
      </ul>
      ${req.body.promo ? `вы подписаны на рассылки. <a href="http://127.0.0.1:3001/unsubscribe/${req.body.email}"/>отписаться</a>` : ''}
      <p>данное письмо не требует ответа  </p>
      `,
  }
  mailer(massage)
  user = req.body
  res.redirect('/registration')
})
app.get('/unsubscribe/:email', (req, res) => {
  console.log(++reqNom, 'get unsubscribe/:email');
  console.log(++reqNom, `${req.params.email} unsubscribed`);
  res.send(`Ваш email: ${req.params.email} удалён из рассылок`)
  user = undefined
})
app.listen(PORT, () => {
  console.log(`
  
server started at http://127.0.0.1:${PORT}
`)
})