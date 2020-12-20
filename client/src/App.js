import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "js-cookie"
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// import { BrowserHistory as history } from "react-router";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import SignUp from "./pages/SignUp";

import API from "./utilities/API";

function App() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    API.getUser(Cookies.get('username')).then(({ data: { savedBooks } }) => {
      setBooks(savedBooks)
    })
  }, [])

  return (
    <Router>
      <Route exact path='/'>
        <Redirect to="/search" />
      </Route>
      <Route exact path='/search'>
        <Search
          books={books}
          setBooks={setBooks}
        // history={history}
        />
      </Route>
      <Route exact path='/saved'>
        <Saved
          books={books}
          setBooks={setBooks}
        />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
    </Router>
  );
}

export default App;
