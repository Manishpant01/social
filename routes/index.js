const express = require('express');
const router = express.Router();
const controller = require('../controller/controllerRouts');
const auth = require("../authentication/auth");


router.post('/signup',controller.signup);
router.post('/signin',controller.signin);
router.post('/createpost',auth.checkToken,controller.createPost);
router.get('/mypost',auth.checkToken,controller.mypost)

module.exports = router;
