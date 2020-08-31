const express = require("express");
const bodyParser = require("body-parser");
const readings = require("./data/sensor_readings.json");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/readings", (req, res) => {
  res.send(readings);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
