const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/items', (req, res) => {
  res.send('hello')
})

app.listen('3000', (err) => {
  if (err) {
    console.log('there was a problem starting the server')
  } else {
    console.log('server listening port 3000')
  }
})
