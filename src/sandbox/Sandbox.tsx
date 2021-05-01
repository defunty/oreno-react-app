import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './sandbox.css'

function Sandbox() {
  return (
      <div>
        <Link to="./dnd">drag-and-drop</Link>
        <Switch>
          <Route path="/sb/" exact children={<Top />} />
          <Route path="/sb/dnd" exact children={<DND />} />
        </Switch>
      </div>
  )
}

const Top = () => {
  return (
    <h1>top</h1>    
  )
}

const DND = () => {
  return (
    <div className="DND">
      <ul className="DND-list">
        <li>1</li><li>2</li><li>3</li>
      </ul>
      <ul className="DND-list">
        <li>4</li><li>5</li><li>6</li>
      </ul>
    </div>
  )
}

export default Sandbox;
