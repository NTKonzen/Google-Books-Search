import { useState } from "react";
import Cookies from "js-cookie";

import API from "../utilities/API";

import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import Container from "../components/Wrappers/Container";
import Row from "../components/Wrappers/Row";
import Col from "../components/Wrappers/Col";

function SignUp() {
    if (Cookies.get('username')) {
        window.location = "/search"
    }
    document.title = 'Sign Up'
    const [input, setInput] = useState('');
    function handleInput(e) {
        setInput(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        API.getUser(input).then(({ data }) => {
            console.log('User Already Exists')
            Cookies.set('username', data.username, { expires: 365 })
            window.location = '/search'
        }).catch(err => {
            console.log(err)
            API.createUser(input).then(({ data }) => {
                Cookies.set('username', data.username, { expires: 365 })
                window.location = '/search'
            }).catch(err => {
                console.log(err)
            })
        })
        setInput('')
    }
    return (<div>
        <Header />
        <Title title={'Sign Up'} />
        <Container>
            <Row>
                <Col>
                    <form className="bg-secondary p-3 text-center" id='signUpForm' onSubmit={handleSubmit}>
                        <p className="text-light text-center" style={{ "fontSize": "1.5em" }} > Enter a username to sign up!</p>
                        <label aria-readonly={true} htmlFor={'usernameInput'}></label>
                        <input
                            id={'usernameInput'} style={{ "width": "100%" }}
                            placeholder={'Enter a username'} className='text-center'
                            value={input} onChange={handleInput}
                        ></input>
                        <button className='btn btn-light mt-2'>Submit</button>
                    </form>
                </Col>
            </Row>
        </Container>
    </div >
    )
}

export default SignUp;