const newsRoute = require("./news");
const meRoute = require("./me");
const siteRoute = require("./site");
const coursesRoute = require("./courses");
const authRouter = require("./auth");

function route(app) {
  // app.post("/register", authRouter);
  app.use("/auth", authRouter);
  app.use("/news", newsRoute);
  app.use("/me", meRoute);
  app.use("/courses", coursesRoute);
  app.use("/", siteRoute);
}

module.exports = route;
