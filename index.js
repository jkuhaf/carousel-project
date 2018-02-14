let getItems = () => fetch('http://localhost:3000/items')
  .then(resp => {
    let items = resp.json()
    return console.log(items)
  })

let rateItem = (rating) => fetch('http://localhost:3000/items/852374', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({rating})
})

getItems()
 .then(() => rateItem('like')
   .then(() => getItems()))
