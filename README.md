# carousel-project

## Requirements:

Fetch items from the API And display them as a carousel. Follow the
design as closely as possible.

The carousel should show 4 items at a time, and display a total of 16
items. The user should be able to navigate the items using an arrow on
either side of the carousel.

If the item has a video link, please include a button that links to the
video on the item.

Each item should have a heart icon. If the user clicks on the heart, the user
rates the item.

Once an item is rated, that item should disappear, and be replaced by a new
item in its place. There should always be 16 items on the page.

Please refrain from using a carousel library. Other than that, you can
use any libraries or frameworks you like.

Icons can be found at http://google.github.io/material-design-icons/


## To run the API server:

`npm install && npm run start`

to get items:

`GET localhost:3000/items/?p=${page}&amt=${amt}`

to rate an item:

`POST localhost:3000/items/${id}/`

```
{
  rating: 'like'
}
```

** The server is just for this assignment, so there are a limited number of
items available, and it won't save your ratings!


## Submitting the completed assignment

You can fork this github repository and complete it through your github
account. When you're finished with the assignment, send a link to your
forked repo to amelia@crossingminds.com.

Be prepared to talk about the decisions you made later in the interview
process.
