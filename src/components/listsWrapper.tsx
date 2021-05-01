import React, { useState, useEffect } from 'react';
import axios from 'axios'
import List from './list'
//import { getLists } from "./request";
import '../List.css';

function ListWrapper() {
  type ListType = {id: number, title: string}
  type ListsType = ListType[]
  const [lists, setLists] = useState<ListsType>([])

  const getListsUrl = 'http://localhost:3001/lists'

  const getLists = () => {
    axios.get(getListsUrl)
      .then(function (response) {
        // handle success
        const tmpLists:ListsType = []
        response.data.forEach((data: ListType) => {
          tmpLists.push(data)
        })
        setLists(tmpLists)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  // fix me: request用のコンポーネントとカスタムフックを作成し、そこを参照する
  const cardUpdate = (params:{id: number, list_id: number}) => {
    const postUrl = `http://localhost:3001/cards/${params.id}`
    axios.patch(postUrl, params)
      .then(function (response) {
        console.log('cardUpdate!')
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        setLists([])
        getLists()
        //setLists(getLists())
      });
  }

  useEffect(() => {
    axios.get(getListsUrl)
      .then(function (response) {
        // handle success
        const tmpLists:ListsType = []
        response.data.forEach((data: ListType) => {
          tmpLists.push(data)
        })
        setLists(tmpLists)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [getListsUrl]);

  return (
    <ul className="Lists">
      {lists.map(list => (
        <List data={list} key={list.id} cardUpdate={ (params:{id: number, list_id: number}) => cardUpdate(params) }/>
      ))}
    </ul>
  )
}

export default ListWrapper;
