module.exports = {
  HOST: "us-cdbr-east-06.cleardb.net",
  USER: process.env.NODE_ENV === "test" ? "bcfb01b0edeb1c" : "b7332f4e5a001a",
  PASSWORD: process.env.NODE_ENV === "test" ? "1bea8391" : "9eec8d6e",
  DB: process.env.NODE_ENV === "test" ? "heroku_114662b188a639d" : "heroku_5e0532025c7915f",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
