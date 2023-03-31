const express = require("express");
const router = express.Router();

const AuthController = require("../app/controllers/AuthController.js");
// newsController.index
router.get("/listUser", AuthController.listUser);
router.post("/register", AuthController.register);
router.get("/viewRegister", AuthController.viewRegister);
router.post("/login", AuthController.login);
router.get("/viewLogin", AuthController.viewLogin);
router.delete("/:id/deleteUser", AuthController.deleteUser);
router.get("/:id/viewEdit", AuthController.viewEdit);
router.put("/:id/updateUser", AuthController.updateUser);
module.exports = router;
