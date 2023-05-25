const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then((data) => {
    app.listen(PORT);
    console.log("Server running. Use our API on port: 3000");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
