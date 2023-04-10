const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAdminAuth,
} = require("../app/middlewares/auth");

const AuthController = require("../app/controllers/AuthController");

router.post("/register", AuthController.register);
router.get("/viewRegister", AuthController.viewRegister);
router.get("/viewLogin", AuthController.viewLogin);
router.post("/login", AuthController.login);
router.post("/logOut", AuthController.logOut);
router.post("/refreshToken", AuthController.createNewRefreshToken);
router.delete("/:id/deleteUser", verifyToken, AuthController.deleteUser);
router.get("/:id/viewEdit", AuthController.viewEdit);
router.put("/:id/updateUser", AuthController.updateUser);
module.exports = router;
