import Cookies from "js-cookie"
import $ from 'jquery'

import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import Container from "../components/Wrappers/Container";
import Row from "../components/Wrappers/Row";
import Col from "../components/Wrappers/Col";

import { v4 as uuid } from 'uuid';
import API from "../utilities/API";

function Saved({
    books,
    setBooks
}) {
    if (!Cookies.get('username')) {
        window.location = "/signup"
    }

    function deleteBook(e) {
        const button = $(e.currentTarget);
        const bookObj = button.data('object');
        const bookID = bookObj._id;
        API.deleteBook(Cookies.get('username'), bookID).then(({ data: { savedBooks } }) => {
            setBooks(savedBooks)
        })
    }

    return (
        <div>
            <Header />
            <Title title="Saved" />
            <Container>
                <Row className="justify-content-around">
                    {books.map((book) => {
                        const { title, img, buyLink, description, authors, _id } = book
                        return (
                            <Col key={_id} styles={{ display: "flex" }} className="col-12 col-md-4 col-sm-6 col-xs-12 mb-4">
                                <div className="card" style={{ minWidth: "100%" }}>
                                    <img className="card-img-top" src={img} alt={`The cover of ${title}`}></img>
                                    <div className="card-body">
                                        <h5 className="text-center">{title}</h5>
                                        <h6 className="text-center">Author{authors.length > 1 ? 's' : ''}: {authors.join(', ')}</h6>
                                        <p className="text-center">{description}</p>
                                        <div className="justify-content-around" style={{ display: "flex" }}>
                                            <button className="btn btn-danger" onClick={deleteBook} data-object={JSON.stringify(book)}><i className="fas fa-trash" ></i> Delete</button>
                                            <a className="btn btn-success" href={buyLink} target="_blank" rel="noreferrer"><b>$</b> Buy</a>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    )
}

export default Saved;