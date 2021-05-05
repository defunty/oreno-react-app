import React, { useEffect, useReducer } from 'react';
import axios from 'axios'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from './list'
//import { getLists } from "./request";
import '../List.css';


function ListWrapper() {
  type ListType = {id: number, title: string}
  type ListsType = ListType[]

  type CardType = {id: number, list_id: number, title: string, description: string}
  type CardsType = {[key: number]: CardType[]}

  const getListsUrl = 'http://localhost:3001/lists'

  const getLists: any = () => {
      return new Promise((resolve, reject) => {
        axios.get(getListsUrl)
        .then(function (response) {
          //resolve(response.data)
          // loadingに時間がかかることを想定して記述（loading処理確認のため）
          setTimeout(() => {
            console.log('finish getLists');
            resolve(response.data)
          },1000)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      })
  }

  const getListCards: any = (tmpLists:ListsType) => {
      return new Promise((resolve, reject) => {
        let getCardsUrl = `http://localhost:3001/cards?`
        tmpLists.forEach((list) => {
          getCardsUrl += `list_id=${list.id}&`
        })
        getCardsUrl = getCardsUrl.slice(0,-1)
        axios.get(getCardsUrl)
          .then(function (response) {
            // handle success
            const tmpCards:CardsType = {}

            // fix me: promise allで対応したい (https://qiita.com/jkr_2255/items/62b3ee3361315d55078a)
            response.data.forEach((data: CardType) => {
              if(!(data.list_id in tmpCards)) {
                tmpCards[data.list_id] = []
              }
              tmpCards[data.list_id].push(data)
            })
            console.log('finish getListCards')
            resolve(tmpCards)
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
        })
    }

  // fix me: request用のコンポーネントとカスタムフックを作成し、そこを参照する
  const cardUpdate = (params:{id: number, list_id: number}) => {
    const postUrl = `http://localhost:3001/cards/${params.id}`
    axios.patch(postUrl, params)
      .then(function (response) {
        console.log('cardUpdate!')
        // stateを変える処理を追加する
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

    //type initialStateType = {
    //  lists: ListsType;
    //  listCards: CardsType;
    //}
    //interface initialStateType {
    //  lists: ListsType,
    //  listCards: CardsType
    //}

    const init = () => {
      dispatch({type: 'startLoading'})
      getLists().then((lists: any) => {
        getListCards(lists).then((cards: any) => {
          dispatch({type: 'getLists', payload: lists})
          dispatch({type: 'getListCards', payload: cards})
          dispatch({type: 'finishLoading'})
        })
      })
    }

    const initialState = {
      lists: [],
      listCards: {},
      isLoading: true
    }

    const reducer = (state: any, action: any) => {
      switch (action.type){
        case 'getLists':
          return {...state, lists: action.payload}
        case 'getListCards':
          return {...state, listCards: action.payload}
        case 'startLoading':
          return {...state, isLoading: true}
        case 'finishLoading':
          return {...state, isLoading: false}
        default:
          return state
      }
    }

    const [dataState, dispatch] = useReducer(reducer, initialState);

    // useEffectを使わずにinitialState()で最初からローディングした値を渡したい（dispatchを利用する？）
    useEffect(() => {
      init();
    }, [])

  const handleOnDragEnd = (result: any) => {
    console.log('drop');
    const listsClone = Array.from(dataState.lists);
    const [reorderedLists] = listsClone.splice(result.source.index, 1);
    listsClone.splice(result.destination.index, 0, reorderedLists);
  }

  const listsDom = () => {
    console.log(dataState.isLoading)
    if(dataState.isLoading) {
      console.log('loading');
      
      return('')
    }else{
      return(
        dataState.lists.map((list: any) => (
          <List data={list} key={list.id} cardUpdate={ (params:{id: number, list_id: number}) => cardUpdate(params) } cards={dataState.listCards[list.id]} />
        ))
      )
    }
  }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd} >
      <ul className="Lists">
        {listsDom()}
      </ul>
    </DragDropContext>
  )
}

export default ListWrapper;
