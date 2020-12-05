// import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import Container from "../components/Wrappers/Container";
import Row from "../components/Wrappers/Row";
import Col from "../components/Wrappers/Col";

function Search() {
    if (!Cookies.get('username')) {
        window.location = "/signup"
    }
    return (
        <div>
            <Header />
            <Title title="Search" />
            <Container>
                <Row>
                    <Col>
                        <form id="bookSearchForm">
                            <input style={{ "width": "100%" }}></input>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Search;