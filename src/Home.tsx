import React from 'react';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { loginState } from './atoms/LoginStateAtom'

import {
  Link
} from "react-router-dom";
import Header from './components/header'
import ListsWrapper from './components/listsWrapper'

function Home() {
  const state: any = useRecoilValue(loginState);
  return (
      <div>
        <Header />
        {state &&
        <ListsWrapper />
        }
      </div>
  )
}


export default Home;
