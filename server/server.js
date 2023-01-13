const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require('./routes/transaction.routes');

const app = express();

app.listen(3333);
const db = require("./models");
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

// var corsOptions = {
//   origin: "http://localhost:8080",
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// };

app.use(express.json());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Hubla Challenge application." });
});

app.use(routes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});