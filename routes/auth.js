const {loginController, registerController} = require("../controllers/auth");
const router = require('express').Router();

router.route('/login')
    .post(loginController)

router.route('/register')
    .post(registerController)

module.exports = router;