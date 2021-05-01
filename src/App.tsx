import React from 'react';
import Home from './Home'
import Terms from './Terms';
import Sandbox from './sandbox/Sandbox';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//import logo from './bg.jpg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="Container">
        <Switch>
          <Route path="/terms">
            <Terms />
          </Route>
          <Route path="/sb">
            <Sandbox />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;

// memo
// yarn start
// yarn json-server --watch db.json --port 3001
// https://webgradients.com/
// https://github.com/styled-icons/styled-icons#installation
// https://heroicons.com/
