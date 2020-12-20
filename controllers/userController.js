const db = require('../models');

module.exports = {
    findAll(req, res) {
        db.User
            .findAll(req.query)
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(422).json(err)
            })
    },
    findByUsername(req, res) {
        db.User
            .findOne(req.params)
            .then(data => {
                if (data) {
                    res.json(data)
                } else {
                    res.status(404).send({ message: "User Not Found" })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(422).json(err)
            })
    },
    createUser(req, res) {
        db.User
            .create(req.params)
            .then(data => {
                console.log('new data:', data)
                res.json(data)
            })
            .catch(err => {
                console.log(err)
                res.status(422).json(err)
            })
    },
    addBook(req, res) {
        let bookObj = req.body;
        let username = req.params.username
        db.User.findOneAndUpdate({ username }, { $push: { savedBooks: bookObj } }, { new: true }).then(data => {
            res.status(200).json(data)
        })
    },
    deleteBook(req, res) {
        let username = req.params.username;
        let bookID = req.params.bookID;
        db.User.findOneAndUpdate({ username }, { $pull: { savedBooks: { _id: bookID } } }, { new: true }).then(data => {
            res.status(200).json(data)
        })
    }
}