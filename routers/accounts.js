const express = require('express');
const accountsController = require('../controllers/account.controller');
const authorization = require('../middleware/verify_auth')
const router = express.Router();
router.post('/sign-up', accountsController.signUp);
router.post('/login', accountsController.login);
router.get('/topscore', accountsController.topScore);
module.exports = router;