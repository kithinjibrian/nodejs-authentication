const express = require('express'),
    router = express.Router(),
    profile = require("../controllers/profile"),
    register = require("../controllers/register"),
    login = require("../controllers/login"),
    refresh = require("../controllers/refresh"),
    user = require("../middleware/user"),
    password = require("../middleware/password"),
    token = require("../middleware/token"),
    auth = require("../middleware/auth");

router.get('/profile', auth, profile)
router.post('/register', register)
router.post('/login', user, password, login)
router.post('/refresh', token, refresh)

module.exports = router;
