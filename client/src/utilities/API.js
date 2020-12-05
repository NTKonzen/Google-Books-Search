import axios from "axios"

const APICalls = {
    getUser(username) {
        return axios.get('/api/users/' + username)
    },

    createUser(username) {
        return axios.post('/api/users/' + username)
    },

    getBooks(bookTitle) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&key=AIzaSyDmTLWLcOBuZuitPxUEWhkdI3ivf6yzwfQ`)
    }

}


export default APICalls