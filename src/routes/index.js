const meRoute = require("./me");
const siteRoute = require("./site");
const productsRoute = require("./products");
const categoriesRoute = require("./categories");
const authRouter = require("./auth");
const orderRoute = require("./order");
const adminRoute = require("./admin");
const categoryProductRoute = require("./categoryProduct");
const commentRoute = require("./comments");
const {
  verifyToken,
  verifyTokenAndAdminAuth,
} = require("../app/middlewares/auth.js");
function route(app) {
  app.use("/admin/auth", authRouter);
  app.use("/admin/me", meRoute);
  app.use("/admin/products", productsRoute);
  app.use("/admin/categories", categoriesRoute);
  app.use("/admin",verifyTokenAndAdminAuth, adminRoute);
  app.use("/categoryProduct", categoryProductRoute);
  app.use("/comment", commentRoute);
  app.use("/order", orderRoute);
  app.use("/", siteRoute);
}

module.exports = route;
