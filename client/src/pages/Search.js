import { useState } from "react";
import Cookies from "js-cookie";
import $ from 'jquery';

import API from "../utilities/API";

import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import Container from "../components/Wrappers/Container";
import Row from "../components/Wrappers/Row";
import Col from "../components/Wrappers/Col";

function Search({
    books,
    setBooks
}) {
    if (!Cookies.get('username')) {
        window.location = "/signup"
    }
    document.title = 'Google Book Search'
    const [input, setInput] = useState('');
    const [bookList, setBookList] = useState([]);
    function handleInput(e) {
        setInput(e.target.value)
    }

    function addBook(e) {
        const target = e.currentTarget;
        const button = $(target);
        const icon = button.find('.fas')
        icon.removeClass('fa-check').addClass('fa-pulse fa-spinner')
        const el = button.parent();
        let bookObj = el.data('object');
        API.addBook(Cookies.get('username'), bookObj).then(({ data: { savedBooks } }) => {
            setBooks(savedBooks)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        API.getBooks(input).then(({ data }) => {
            let incomingBooks = [];
            data.items.forEach(bookItem => {
                let obj = bookItem.volumeInfo;
                obj.searchID = bookItem.id
                incomingBooks.push(obj)
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
                        <form className="p-3 text-center mb-4" id='signUpForm' onSubmit={handleSubmit}>
                            <p className="text-center" style={{ "fontSize": "1.5em" }} > Enter the title of a book to search!</p>
                            <label aria-readonly={true} htmlFor={'bookSearch'}></label>
                            <input
                                id={'bookSearch'} style={{ "width": "100%" }}
                                placeholder={'Enter Book Title'} className='text-center'
                                value={input} onChange={handleInput}
                            ></input>
                            <button className='btn submit mt-2'>Submit</button>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ul className="list-group">
                            {bookList.map(({
                                imageLinks: { thumbnail } = { thumbnail: "https://via.placeholder.com/125x200" },
                                authors,
                                description,
                                canonicalVolumeLink,
                                previewLink,
                                title,
                                searchID
                            }) => {
                                let object = {
                                    title: title,
                                    authors: authors,
                                    img: thumbnail,
                                    description: description,
                                    buyLink: canonicalVolumeLink,
                                    searchID: searchID
                                }
                                object = JSON.stringify(object)

                                let exists;
                                books.forEach(bookObj => { if (bookObj.searchID === searchID) exists = true })

                                return <li className="list-group-item mt-2 rounded text-center" key={previewLink} data-object={object}>
                                    <img className="coverImg" src={thumbnail} alt={`The cover of ${title}`}></img>
                                    <h4 className="title text-light mt-2 font-weight-bold">
                                        {title}
                                    </h4>
                                    {authors ?
                                        <h5 className="text-light authors">
                                            Authors:&nbsp;&nbsp;
                                    {authors.join(', ')}
                                        </h5> : <span></span>}

                                    <p className="text-light description">{description}</p>
                                    {exists ?
                                        <button className="btn btn-primary"><i className="fas fa-check"></i><span> Added to My Books</span></button>
                                        :
                                        <button onClick={addBook} className="btn btn-success"><i className="fas fa-plus"></i><span> Add to My Books</span></button>
                                    }
                                    <br></br>
                                    <a
                                        className='text-light buyLink'
                                        href={canonicalVolumeLink}
                                        target='_blank' rel='noreferrer'><u>Buy {title}</u></a>
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