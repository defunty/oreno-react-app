import React from 'react';
import {
  Link
} from "react-router-dom";
import Header from './components/header'
import ListsWrapper from './components/listsWrapper'

function Home() {
  return (
      <div>
        <Header />
        <ListsWrapper />
      </div>
  )
}


export default Home;
