const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: "String",
        required: true
    },
    authors: {
        type: 'Array',
        required: true
    },
    description: {
        type: "String"
    },
    buyLink: {
        type: "String"
    },
    img: {
        type: "String"
    },
    searchID: {
        type: "String"
    }
})

const userSchema = new Schema({
    username: {
        type: "String",
        required: true,
        unique: true
    },
    savedBooks: [bookSchema]
})

const User = mongoose.model("User", userSchema);

module.exports = User;