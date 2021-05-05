import React, { useEffect, useReducer } from 'react';
import axios from 'axios'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from './list'
//import { getLists } from "./request";
import '../List.css';


function ListWrapper() {
  type ListType = {id: number, title: string}
  type ListsType = ListType[]

  type CardType = {id: number, list_id: number, title: string, description: string, order: number}
  type CardsType = {[key: number]: CardType[]}

  const getLists = () => {
    return new Promise<ListsType>((resolve, reject) => {
      const getListsUrl = 'http://localhost:3001/lists'
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

  const getListCards = (tmpLists:ListsType) => {
    return new Promise<CardsType>((resolve, reject) => {
      let getCardsUrl = `http://localhost:3001/cards?_sort=order&`
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
        console.log('finish cardUpdate')
        // stateを変える処理を追加する
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  type StateType = {
    lists: ListsType;
    listCards: CardsType;
    isLoading: boolean;
  }
  //interface StateType {
  //  lists: ListsType,
  //  listCards: CardsType
  //}
  const initialState: StateType = {
    lists: [],
    listCards: {},
    isLoading: true
  }
  const init = (initialState: StateType) => {
    // ここでfetchDataをしたいが、時間がかかってrenderに間に合わない。useEffectで代用
    return initialState
  }
  const fetchData = () => {
    getLists().then(lists => {
      getListCards(lists).then(cards => {
        //dispatch({type: 'getLists', payload: lists})
        //dispatch({type: 'getListCards', payload: cards})
        //dispatch({type: 'finishLoading'})
        dispatch({type: 'fetchData', payload: {lists: lists, listCards: cards, isLoading: false}})
      })
    })
  }
  type ActionType = 
    | {type: 'getLists', payload: ListsType}
    | {type: 'getListCards', payload: CardsType}
    | {type: 'reorderListCards', payload: CardsType}
    | {type: 'fetchData', payload: StateType}
    | {type: 'startLoading'}
    | {type: 'finishLoading'}

  const reducer = (state: StateType, action: ActionType) => {
    switch (action.type){
      case 'getLists':
        return {...state, lists: action.payload}
      case 'getListCards':
        return {...state, listCards: action.payload}
      case 'reorderListCards':
        return {...state, listCards: action.payload}
      case 'fetchData':
        init(initialState)
        return {...action.payload}
      case 'startLoading':
        return {...state, isLoading: true}
      case 'finishLoading':
        return {...state, isLoading: false}
      default:
        return state
    }
  }
  const [dataState, dispatch] = useReducer(reducer, initialState, init);
  useEffect(() => {
    fetchData()
  }, [])

  const reorder = (listCards: CardsType, listId: number, startIndex: number, endIndex: number) => {
    const result = listCards;
    const [removed] = result[listId].splice(startIndex, 1);
    result[listId].splice(endIndex, 0, removed);
    return result;
  };
  const move = (listCards: CardsType, source: any, destination: any) => {
    const sourceClone = Array.from(listCards[parseInt(source.droppableId)]);
    const destClone = Array.from(listCards[parseInt(destination.droppableId)]);
    const [removed] = sourceClone.splice(source.index, 1);
    destClone.splice(destination.index, 0, removed);
    const result: CardsType = listCards;
    result[parseInt(source.droppableId)] = sourceClone;
    result[parseInt(destination.droppableId)] = destClone;
    return result;
};

  const handleOnDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const listCards = reorder(
        dataState.listCards,
        parseInt(source.droppableId),
        parseInt(source.index),
        parseInt(destination.index)
      );
      dispatch({type: 'reorderListCards', payload: listCards})
    } else {
      const listCards = move(dataState.listCards, source, destination);
      dispatch({type: 'reorderListCards', payload: listCards})
    }
  }

  const listsJSX = () => {
    if(dataState.isLoading) {
      return ''
    }else{
      return(
        dataState.lists.map((list: ListType) => (
          <List data={list} key={list.id} cardUpdate={ (params:{id: number, list_id: number}) => cardUpdate(params) } cards={dataState.listCards[list.id]} />
        ))
      )
    }
  }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd} >
      <ul className="Lists">
        {listsJSX()}
      </ul>
    </DragDropContext>
  )
}

export default ListWrapper;
