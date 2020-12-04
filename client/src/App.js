import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Route exact path='/'>
        <Redirect to="/search" />
      </Route>
      <Route exact path='/search'>
        <Search />
      </Route>
      <Route exact path='/saved'>
        <Saved />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
    </Router>
  );
}

export default App;
