const express = require("express");
const mongoDB = require("./db");
const app = express();
const port = 5000;
mongoDB();
// app.get("/", (req, res) => {
//   res.send("Hello world");
// });
//
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  next();
});
app.use(express.json());
const userRoute = require("./routes/user");
const displayRoute = require("./routes/displayData");
const orderRoute = require("./routes/order");

app.use("/api", userRoute);
app.use("/api", displayRoute);
app.use("/api", orderRoute);

app.listen(port, () => {
  console.log(`server is listing on port ${port}`);
});
