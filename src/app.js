const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const publicdirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");

app.use(express.static(publicdirPath));
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Pratyusha Mandavilli",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Pratyusha Mandavilli",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is sample text",
    title: "Help",
    name: "Pratyusha Mandavilli",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  } else {
    geocode(address, (err, { latitude, longitude, location } = {}) => {
      if (err) {
        return res.send({
          error: err,
        });
      }
      forecast(latitude, longitude, (err, forecastData) => {
        if (err) {
          return res.send({
            error: err,
          });
        } else {
          res.send({
            forecast: forecastData,
            location: location,
            address: address,
          });
        }
      });
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "Pratyusha Mandavilli",
    errmessage: "Help article not found",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  } else {
    console.log(req.query);
    res.send({
      products: [],
    });
  }
});

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "Pratyusha Mandavilli",
    errmessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
