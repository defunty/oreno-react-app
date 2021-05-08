import React, { useEffect, useReducer } from 'react';
import axios from 'axios'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from './list'
//import { getLists } from "./request";
import '../List.scss';


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
  const cardUpdate = (params:{id: number, list_id: number, order: number}) => {
    return new Promise<boolean>((resolve, reject) => {
      const postUrl = `http://localhost:3001/cards/${params.id}`
      axios.patch(postUrl, params)
        .then(function (response) {
          resolve(true)
          console.log('finish cardUpdate')
          // stateを変える処理を追加する
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    })
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

  const reorder = (listCards: CardsType, source: any, destination: any) => {
    const destClone = Array.from(listCards[parseInt(destination.droppableId)]);
    const [removed] = destClone.splice(parseInt(source.index), 1);
    const destinationIndex = parseInt(destination.index)
    destClone.splice(destinationIndex, 0, removed);
    const destCloneLength = destClone.length

    if(destCloneLength !== 1) {
      // 移動先のlistに移動したcard以外のcardが存在している場合
      if(destinationIndex === 0) {
        // cardの移動先がlist最上部の場合
        const nextCard = destClone[destinationIndex + 1]
        destClone[destinationIndex].order = nextCard.order * 0.5
      } else if(destCloneLength === destinationIndex + 1){
        const prevCard = destClone[destinationIndex - 1]
        //const destinationOrder = destClone[destinationIndex].order
        destClone[destinationIndex].order = prevCard.order * 1.5
      } else {
        const prevCard = destClone[destinationIndex - 1]
        const nextCard = destClone[destinationIndex + 1]
        destClone[destinationIndex].order = (prevCard.order + nextCard.order) / 2.0
      }
    }

    const result: CardsType = listCards;
    result[parseInt(destination.droppableId)] = destClone;
    return result;
  };

  const move = (listCards: CardsType, source: any, destination: any) => {
    const sourceClone = Array.from(listCards[parseInt(source.droppableId)]);
    const destClone = Array.from(listCards[parseInt(destination.droppableId)]);
    const [removed] = sourceClone.splice(parseInt(source.index), 1);
    const destinationIndex = parseInt(destination.index)
    destClone.splice(destinationIndex, 0, removed);
    const destCloneLength = destClone.length

    if(destCloneLength !== 0) {
      // 移動先のlistに移動したcard以外のcardが存在している場合
      if(destinationIndex === 0) {
        // cardの移動先がlist最上部の場合
        const nextCard = destClone[destinationIndex + 1]
        destClone[destinationIndex].order = nextCard.order * 0.5
      } else if(destCloneLength === destinationIndex + 1){
        const prevCard = destClone[destinationIndex - 1]
        //const destinationOrder = destClone[destinationIndex].order
        destClone[destinationIndex].order = prevCard.order * 1.5
      } else {
        const prevCard = destClone[destinationIndex - 1]
        const nextCard = destClone[destinationIndex + 1]
        destClone[destinationIndex].order = (prevCard.order + nextCard.order) / 2.0
      }
    }

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
        source,
        destination
      );
      dispatch({type: 'reorderListCards', payload: listCards})
      const transferredCard: CardType = listCards[parseInt(destination.droppableId)][parseInt(destination.index)]
      cardUpdate({id: transferredCard.id, list_id: parseInt(destination.droppableId), order: transferredCard.order})
    } else {
      const listCards = move(
        dataState.listCards,
        source,
        destination
      );
      dispatch({type: 'reorderListCards', payload: listCards})
      const transferredCard: CardType = listCards[parseInt(destination.droppableId)][parseInt(destination.index)]
      cardUpdate({id: transferredCard.id, list_id: parseInt(destination.droppableId), order: transferredCard.order})
    }
  }

  const listsJSX = () => {
    if(dataState.isLoading) {
      return ''
    }else{
      return(
        dataState.lists.map((list: ListType) => (
          <List data={list} key={list.id} cards={dataState.listCards[list.id]} />
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
