const express = require("express");
const router = express.Router();

const AuthController = require("../app/controllers/AuthController.js");
// newsController.index
router.post("/register", AuthController.register);
// router.get("/viewRegister", AuthController.viewRegister);
router.post("/login", AuthController.login);
router.get("/viewLogin", AuthController.viewLogin);
module.exports = router;
