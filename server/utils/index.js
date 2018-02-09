const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

const DATA_PATH = path.resolve(__dirname, '..', 'data', 'index.json')
const MEMORY_PATH = path.resolve(__dirname, 'data.json')

function initializeData () {
  fs.readFile(path.resolve(DATA_PATH), function (err, data) {
    if (err) throw err
    fs.writeFile(path.resolve(MEMORY_PATH), data, (err) => {
      if (err) throw err
    })
  })
}

function writeToFile (id, rating) {
  return new Promise((resolve, reject) => {
    let response
    fs.readFile(MEMORY_PATH, function (err, data) {
      if (err) throw err
      let result = JSON.parse(data)
      let update = result.items.map(item => {
        if (item.uuid === id) {
          item.rating = rating
          response = item
        }
        return item
      })
      fs.writeFile(path.resolve(MEMORY_PATH), JSON.STRINGIFY(update), (err) => {
        if (err) throw err
        resolve(response)
      })
    })
  })
}

function readFile (amt, page) {
  return new Promise((resolve, reject) => {
    fs.readFile(MEMORY_PATH, function (err, data) {
      if (err) throw err
      let result = JSON.parse(data)
      let start = (page * amt) - amt
      let end = (page * amt)
      let entities = result.items.slice(start, end)
      return resolve(JSON.stringify(entities))
    })
  })
}

function postToServer () {
  return fetch('http://localhost:3000/items/852374', {
    method: 'POST',
    body: JSON.stringify({rating: true})
  })
}

postToServer()

module.exports = {
  initializeData,
  writeToFile,
  readFile
}
