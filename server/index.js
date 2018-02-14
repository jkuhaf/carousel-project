const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')

const utils = require('./utils')

const app = express()

app.use(bodyParser.json())

app.use(cors())

app.post('/items/:id', (req, res) => {
  console.log(req.body)
  let rating = req.body
  let id = req.params.id
  return new Promise((resolve, reject) => {
    resolve(utils.write(id, rating))
  })
  .then(resp => res.send(resp))
  .catch(err => res.status(400).send(err))
})

app.get('/items', (req, res) => {
  let amt = parseInt(req.query.amt) || 20
  let page = parseInt(req.query.page) || 1
  return new Promise((resolve, reject) => {
    resolve(utils.read(amt, page))
  })
  .then(resp => {
     res.send(resp)
   })
  .catch((err) => res.status(400).send(err))
})

app.listen('3000', (err) => {
  if (err) {
    console.log('there was a problem starting the server')
  } else {
    console.log('server listening port 3000')
  }
})
