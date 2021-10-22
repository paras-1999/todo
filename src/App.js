import {BrowserRouter as Router , Switch, Route} from 'react-router-dom'
import './App.css';
import Page1 from './Components/Page1';
import Page2 from './Components/Page2';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Page1} />
        <Route path="/page2" exact  component={Page2} />
      </Switch>
    </Router>
  );
}

export default App;
