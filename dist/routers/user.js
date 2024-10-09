"use strict";

var user = require('../controllers/user');
var router = require('express').Router();
router.get("/", user.getUser);
module.exports = router;