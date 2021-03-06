import React, {useState} from 'react';
import DND from './DND'
import DNDMulti from './DNDMulti'
import Color from './Color'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useRecoilState } from 'recoil';
import {loginState} from '../atoms/LoginStateAtom'
import './sandbox.scss'

function Sandbox() {
  const [login, setLogin] = useRecoilState<boolean>(loginState);
  return (
      <div>
        <div onClick={() => setLogin(true)}>change loginState</div>
        <div><Link to="/">Top</Link></div>
        <div><Link to="/sb//dnd">drag-and-drop</Link></div>
        <div><Link to="/sb/dnd-multi">drag-and-drop multi</Link></div>
        <div><Link to="/sb/color">Color</Link></div>
        <Switch>
          <Route exact path="/sb/" children={<Top />} />
          <Route exact path="/sb/dnd" children={<DND />} />
          <Route exact path="/sb/dnd-multi" children={<DNDMulti />} />
          <Route exact path="/sb/color" children={<Color />} />
        </Switch>
      </div>
  )
}

const Top = () => {
  return (
    <h1>top</h1>    
  )
}

export default Sandbox;
