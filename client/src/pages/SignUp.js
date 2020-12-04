import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import Container from "../components/Wrappers/Container";
import Row from "../components/Wrappers/Row";
import Col from "../components/Wrappers/Col";

function SignUp() {
    return (<div>
        <Header />
        <Title title={'Sign Up'} />
        <Container>
            <Row>
                <Col>
                    <form className="bg-secondary p-3 text-center">
                        <p className="text-light text-center" style={{ "font-size": "1.5em" }} > Enter a username to sign up!</p>
                        <label aria-readonly={true} for={'usernameInput'}></label>
                        <input id={'usernameInput'} style={{ "width": "100%" }} placeholder={'Enter a username'} className='text-center'></input>
                        <button className='btn btn-light mt-2'>Submit</button>
                    </form>
                </Col>
            </Row>
        </Container>
    </div >
    )
}

export default SignUp;