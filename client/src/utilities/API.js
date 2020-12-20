import axios from "axios"

const APICalls = {
    getUser(username) {
        return axios.get('/api/users/' + username)
    },

    createUser(username) {
        return axios.post('/api/users/' + username)
    },

    addBook(username, bookObj) {
        return axios.post('/api/users/' + username + '/books', bookObj)
    },

    deleteBook(username, bookID) {
        return axios.delete('/api/users/' + username + '/books/' + bookID)
    },

    getBooks(bookTitle) {
        const APIKey = process.env.REACT_APP_API_KEY || process.env.API_KEY
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&key=${APIKey}`)
    }

}


export default APICalls