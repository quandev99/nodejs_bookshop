const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
var methodOverride = require("method-override");
const { extname } = require("path");
const app = express();
const port = 1999;
// const SortMiddleware = require("./app/middlewares/SortMiddleware");

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));

//Custom middleware
// app.use(SortMiddleware);

const route = require("./routes");

const db = require("./config/db");
// Connect to the db
db.connect();

//HTTP logger
// app.use(morgan("combined"));
// Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));
app.set("admin", path.join(__dirname, "resources", "views/admin/views"));

// Route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
