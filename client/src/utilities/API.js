import axios from "axios"

const APICalls = {
    getUser(username) {
        return axios.get('/api/users/' + username)
    },

    createUser(username) {
        return axios.post('/api/users/' + username)
    }

}


export default APICalls