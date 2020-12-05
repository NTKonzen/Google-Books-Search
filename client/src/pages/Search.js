import { useState } from "react";
import Cookies from "js-cookie";

import API from "../utilities/API";

import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import Container from "../components/Wrappers/Container";
import Row from "../components/Wrappers/Row";
import Col from "../components/Wrappers/Col";

function Search() {
    if (!Cookies.get('username')) {
        window.location = "/signup"
    }

    const [input, setInput] = useState('');
    const [bookList, setBookList] = useState([]);
    function handleInput(e) {
        setInput(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        API.getBooks(input).then(({ data }) => {
            let incomingBooks = [];
            data.items.forEach(bookItem => {
                console.log(bookItem.volumeInfo)
                incomingBooks.push(bookItem.volumeInfo)
            })
            setBookList(incomingBooks);
        }).catch(err => {
            console.log(err)
        })
        setInput('')
    }
    return (
        <div>
            <Header />
            <Title title="Search" />
            <Container>
                <Row>
                    <Col>
                        <form className="bg-secondary p-3 text-center mb-4" id='signUpForm' onSubmit={handleSubmit}>
                            <p className="text-light text-center" style={{ "fontSize": "1.5em" }} > Enter the title of a book to search!</p>
                            <label aria-readonly={true} htmlFor={'bookSearch'}></label>
                            <input
                                id={'bookSearch'} style={{ "width": "100%" }}
                                placeholder={'Enter Book Title'} className='text-center'
                                value={input} onChange={handleInput}
                            ></input>
                            <button className='btn btn-light mt-2'>Submit</button>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ul className="list-group">
                            {bookList.map(bookObj => {
                                let imageURL;
                                if (bookObj.imageLinks) {
                                    imageURL = bookObj.imageLinks.thumbnail
                                }
                                if (!imageURL) {
                                    imageURL = "https://via.placeholder.com/125x200"
                                }
                                return <li className="bg-secondary list-group-item mt-2 rounded text-center" key={bookObj.previewLink}>
                                    <img src={imageURL} alt={`The cover of ${bookObj.title}`}></img>
                                    <h4 className="text-light mt-2 font-weight-bold">
                                        {bookObj.title}
                                    </h4>
                                    {bookObj.authors ?
                                        <h5 className="text-light">
                                            Authors:&nbsp;&nbsp;
                                    {bookObj.authors.join(', ')}
                                        </h5> : <span></span>}

                                    <p className="text-light">{bookObj.description}</p>
                                    <a
                                        className='text-light tex'
                                        href={bookObj.canonicalVolumeLink}
                                        target='_blank' rel='noreferrer'><u>Buy {bookObj.title}</u></a>
                                </li>
                            })}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Search;