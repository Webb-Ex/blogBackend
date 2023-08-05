const express = require('express');
router = express.Router()

const {register, login} = require('../controllers/userController.js')


router.route("/users/register").post(register);
router.route("/users/login").post(login);

module.exports = router;

