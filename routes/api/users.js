const router = require("express").Router();
const userController = require('../../controllers/userController');
const { db } = require("../../models/User");

router
    .route('/')
    .get(userController.findAll)

router
    .route('/:username')
    .get(userController.findByUsername)
    .post(userController.createUser)

router
    .route('/:username/books')
    .post(userController.addBook)

router
    .route('/:username/books/:bookID')
    .delete(userController.deleteBook)

module.exports = router
