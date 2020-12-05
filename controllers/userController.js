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
                console.log(req.params)
                console.log(data)
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
    }
}