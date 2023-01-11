const keys = require("./keys");

// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

pgClient.on("connect", client => {
  client
    .query("CREATE TABLE IF NOT EXISTS types ( type_id INT PRIMARY KEY, description VARCHAR(20) NOT NULL, entry_out VARCHAR(20) NOT NULL, signal VARCHAR(1) NOT NULL)")
    .catch(err => console.log("PG ERROR Sales_Types", err));
  client
    .query("CREATE TABLE IF NOT EXISTS sales (	transaction_id serial PRIMARY KEY, type VARCHAR(1) NOT NULL, product VARCHAR(30) NOT NULL, value VARCHAR(10) NOT NULL, seller_name VARCHAR(20) NOT NULL )")
    .catch(err => console.log("PG ERROR Sales", err));
});

//Express route definitions
app.get("/", (req, res) => {
  res.send("Hello World");
});

// get the sales
app.get("/sales/all", async (req, res) => {
  const sales = await pgClient.query("SELECT * FROM sales");

  res.send(sales);
});

// get the types
app.get("/types/all", async (req, res) => {
    const types = await pgClient.query("SELECT * FROM types");
  
    res.send(types);
  });

// now the post -> insert transaction
app.post("/sales", async (req, res) => {
  if (!req.body.value) res.send({ working: false });

  pgClient.query("INSERT INTO sales(transaction_id, type, product, value, seller_name) VALUES($1)", [req.body.transaction_id, req.body.type, req.body.product, req.body.value, req.body.seller_name]);

  res.send({ working: true });
});

app.listen(5000, err => {
  console.log("Listening");
});
