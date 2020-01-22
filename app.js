const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const cors = require("cors");
// Routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

dotenv.config();

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected..."));

mongoose.connection.on("error", err => {
  console.log(`DB Connection error: ${err.message}`);
});

// const myOwnMiddleware = (req, res, next) => {
//   console.log("Middleware Applied!!!");
//   next();
// };

app.get("/", (req, res) => {
  fs.readFile("docs/apiDocs.json", (err, data) => {
    if (err) {
      res.status(400).json({
        error: err
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

// Middleware
app.use(morgan("dev")); // logger for terminal
app.use(bodyParser.json()); // to read the data
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(expressValidator());

app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized access" });
  }
});
// app.use(myOwnMiddleware);

// Server Start
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Started on port ${port}...`);
});
