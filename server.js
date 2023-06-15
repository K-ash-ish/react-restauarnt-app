const express = require("express");
const cors = require("cors");
const fetch = require("cross-fetch");
const port = process.env.PORT || 4000;
const app = express();

app.use(cors());

app.get("/api/restaurants", (req, res) => {
  const { latitude, longitude, offset } = req.query;
  // 23.1768293 79.97640129999999
  //asdf
  // https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.1768293&lng=79.97640129999999&page_type=DESKTOP_WEB_LISTING
  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&offset=${offset}&sortBy=RELEVANCE&page_type=DESKTOP_WEB_LISTING`;

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occured");
    });
});
app.get("/api/restaurant/menu", (req, res) => {
  const { id, latitude, longitude } = req.query;
  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&&lat=${latitude}&lng=${longitude}&restaurantId=${id}&submitAction=ENTER`;

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred");
    });
});

app.listen(port, (req, res) => {
  console.log("Server started on ", port);
});
