const express = require('express');
const questionsController = require('../controllers/question.controller')
const authorization = require('../middleware/verify_auth')
const router = express.Router();
router.post("/",authorization.checkAuth,authorization.checkAdmin, questionsController.save);
router.get("/:id",authorization.checkAuth,authorization.checkUser, questionsController.show);
router.get("/",authorization.checkAuth,authorization.checkUser, questionsController.index);
router.post("/submit",authorization.checkAuth,authorization.checkUser, questionsController.checkKey);
router.patch("/:id",authorization.checkAuth,authorization.checkAdmin, questionsController.update);
router.delete("/:id",authorization.checkAuth,authorization.checkAdmin, questionsController.destroy);
module.exports = router;
