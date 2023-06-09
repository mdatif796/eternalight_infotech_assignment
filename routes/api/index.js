const express = require("express");

const router = express.Router();
const userController = require("../../controllers/userController");

router.post("/create-user", userController.createUser);
router.post("/authenticate", userController.authenticateUser);
router.post("/get-authenticated-user", userController.getAuthenticatedUser);
router.post("/edit-user", userController.editUser);

module.exports = router;
