import React from 'react';
/*
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
*/
import { RecoilRoot } from 'recoil';
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
import './App.scss';

function App() {
  return (
    <Router>
      <div className="Container">
        <RecoilRoot>
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
        </RecoilRoot>
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
