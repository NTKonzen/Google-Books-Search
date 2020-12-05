import Cookies from "js-cookie"

function Saved() {
    if (!Cookies.get('username')) {
        window.location = "/signup"
    }
    return (
        <h1>Saved</h1>
    )
}

export default Saved;