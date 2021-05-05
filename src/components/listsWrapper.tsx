import React, { useEffect, useReducer } from 'react';
import axios from 'axios'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from './list'
//import { getLists } from "./request";
import '../List.css';


function ListWrapper() {
  type ListType = {id: number, title: string}
  type ListsType = ListType[]
  //const [lists, setLists] = useState<ListsType>([])

  type CardType = {id: number, list_id: number, title: string, description: string}
  type CardsType = {[key: number]: CardType[]}
  //const [listCards, setListCards] = useState<CardsType>({}) //cardsはCardコンポーネントで管理した方が良い？（とりあえず親コンポーネントで一括管理）


  const getListsUrl = 'http://localhost:3001/lists'

  const getLists: any = () => {
      return new Promise((resolve, reject) => {
        axios.get(getListsUrl)
        .then(async function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
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
            resolve(tmpCards)
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
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
    const aaa = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('settimeout');
          resolve(10)
        }, 3000)
      })
    }
    const bbb = (e: any) => {
      console.log(dataState.count);
    }

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
      console.log('reducer');
      switch (action.type){
        case 'getLists':
          return {
            lists: action.payload,
            listCards: state.listCards,
            isLoading: true,
          }
        case 'getListCards':
          return {
            lists: state.lists,
            listCards: action.payload,
            isLoading: true
          }
        case 'startLoading':
          return {
            lists: state.lists,
            listCards: state.listCards,
            isLoading: true
          }
        case 'finishLoading':
          return {
            lists: state.lists,
            listCards: state.listCards,
            isLoading: false
          }
        default:
          return state
      }
    }

    const [dataState, dispatch] = useReducer(reducer, initialState);

    // useEffectを使わずにinitialState()で最初からローディングした値を渡したい（dispatchを利用する？）
    useEffect(() => {
      init();
    }, [])

    //function reducer(state: [], action) {
    //  switch (action.type) {
    //    case 'increment':
    //      return {count: state.count + 1};
    //    case 'decrement':
    //      return {count: state.count - 1};
    //    default:
    //      throw new Error();
    //  }
    //}

  /*
  useEffect(() => {
    axios.get(getListsUrl)
      .then(function (response) {
        // handle success
        const tmpLists:ListsType = []
        response.data.forEach((data: ListType) => {
          tmpLists.push(data)
        })
        setLists(tmpLists)
        getListCards(tmpLists)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });


    const getListCards = (tmpLists:ListsType ) => {
      let getCardsUrl = `http://localhost:3001/cards?`
      tmpLists.forEach((list) => {
        getCardsUrl += `list_id=${list.id}&`
      })
      getCardsUrl = getCardsUrl.slice(0,-1)
      console.log(getCardsUrl);
      
      axios.get(getCardsUrl)
        .then(function (response) {
          // handle success
          const tmpCards:CardsType = {}
          response.data.forEach((data: CardType) => {
            if(!(data.list_id in tmpCards)) {
              tmpCards[data.list_id] = []
            }
            tmpCards[data.list_id].push(data)
          })
          //console.log(listCards);
          
          setListCards(tmpCards)
          console.log('sss');
          
          console.log(listCards);
          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  }, [getListsUrl]);
  */

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
