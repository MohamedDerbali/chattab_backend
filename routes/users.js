const express = require('express');
const router = express.Router();
const { register, login, logout, profile } = require('../controllers/userControllers');
const { authorize, USER } = require('../middlewares/auth');


router.post("/login", login);
router.post("/register", register);
router.post("/logout", authorize(USER), logout);
router.get("/profile", authorize(USER), profile);


module.exports = router;