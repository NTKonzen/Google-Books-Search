import Cookies from "js-cookie"
import $ from 'jquery'

import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import Container from "../components/Wrappers/Container";
import Row from "../components/Wrappers/Row";
import Col from "../components/Wrappers/Col";

import API from "../utilities/API";
import './style.css';

function Saved({
    books,
    setBooks
}) {
    document.title = 'My Books';
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

    function onDescriptionHover(e) {
        const description = $(e.currentTarget).find('.description');
        let height = description[0].scrollHeight
        let distanceScrolled = description.scrollTop()
        if (distanceScrolled >= 0 && distanceScrolled <= (height / 8) + 10)
            description.stop(true, false).animate({ scrollTop: height / 8 }, {
                duration: 500,
                easing: 'swing'
            })
    }

    function offDescriptionHover(e) {
        const description = $(e.currentTarget).find('.description');
        let height = description[0].scrollHeight
        let distanceScrolled = description.scrollTop()
        if (distanceScrolled <= (height / 8) + 10) {
            description.stop(true, false).animate({ scrollTop: 0 }, {
                duration: 500,
                easing: 'swing'
            })
        }
    }

    return (
        <div>
            <Header />
            <Title title="My Books" />
            <Container>
                <Row className="justify-content-around">
                    {books.map((book) => {
                        const { title, img, buyLink, description, authors, _id } = book
                        return (
                            <Col key={_id} styles={{ display: "flex" }} className="col-12 col-md-4 col-sm-6 col-xs-12 mb-4">
                                <div className="card" style={{ minWidth: "100%" }}>
                                    <img className="card-img-top" src={img} alt={`The cover of ${title}`}></img>
                                    <div onMouseLeave={offDescriptionHover} onMouseEnter={onDescriptionHover} className="card-body">
                                        <h5 className="text-center">{title}</h5>
                                        <h6 className="text-center">Author{authors.length > 1 ? 's' : ''}: {authors.join(', ')}</h6>
                                        <p className="text-center mb-5 bg-light description">{description}</p>
                                        <div className="justify-content-around buttons d-flex">
                                            <button className="btn btn-danger" onClick={deleteBook} data-object={JSON.stringify(book)}><i className="fas fa-trash" ></i> Delete</button>
                                            <a className="btn btn-success" href={buyLink} target="_blank" rel="noreferrer"><b>$</b> Buy</a>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )
                    })}
                    {books.length < 1 ?
                        <section>
                            <h4 className="mt-5 display-4">You haven't saved any books!</h4>
                        </section>
                        :
                        <span style={{ display: 'none' }}></span>}
                </Row>
            </Container>
        </div>
    )
}

export default Saved;