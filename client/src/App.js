import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <Route exact path='/'>
        <Search />
      </Route>
    </Router>
  );
}

export default App;
