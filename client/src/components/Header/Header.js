import { Link } from "react-router-dom";
import "./style.css";

function Header() {
    return (
        <div style={{ display: "flex" }} className="jumbotron rounded-0 py-4 justify-content-between">
            <h1>Google Books Manager</h1>
            <nav>
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <Link className="nav-link" to='/search'>Search</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/saved'>Saved</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;