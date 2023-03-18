const express = require('express');
const { getConversation } = require('../controllers/conversationControllers');
const { authorize, USER } = require('../middlewares/auth');
const router = express.Router();

router.get('/:recieverId', authorize(USER), getConversation);



module.exports = router;