const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then((data) => {
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });