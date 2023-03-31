const newsRoute = require("./news");
const meRoute = require("./me");
const siteRoute = require("./site");
const productsRoute = require("./products");
const categoriesRoute = require("./categories");
const authRouter = require("./auth");
const adminRoute = require("./admin");
const categoryProductRoute = require("./categoryProduct");
const commentRoute = require("./comments");

function route(app) {
  // app.post("/register", authRouter);
  app.use("/admin/me", authRouter);
  app.use("/admin/auth", authRouter);
  app.use("/admin/me", meRoute);
  app.use("/admin/products", productsRoute);
  app.use("/admin/categories", categoriesRoute);
  app.use("/news", newsRoute);
  app.use("/admin", adminRoute);
  app.use("/categoryProduct", categoryProductRoute);
  app.use("/comment", commentRoute);
  app.use("/", siteRoute);
}

module.exports = route;
