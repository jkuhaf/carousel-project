const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const diskdb = require('diskdb')

const DATA_PATH = path.resolve(__dirname, '..', 'data')

var db = diskdb.connect(DATA_PATH, ['items']);

function read (amt, page) {
  const result = db['items'].find()
  let start = (page * amt) - amt
  let end = (page * amt)
  let entities = result.slice(start, end)
  return resolve(JSON.stringify(entities))
}

function write (id, rating) {
  let query = {uuid: id}
  let update = {rating: rating}
  db.items.update(query, update)
  let item = db.items.findOne({uuid: id})
  return item
}

module.exports = {
  write,
  read
}
