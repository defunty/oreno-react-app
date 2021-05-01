import React from 'react';
import CardsWrapper from './cardsWrapper'
import '../List.css';

//function Card() {
type Props = {
  data: {id: number, title: string};
  cardUpdate: any; //関数自体をpropsで渡す場合はどうするか
}

const List: React.FC<Props> = ({children, data, cardUpdate}) => {
  const dropHandler = (e: React.DragEvent<Element>) => {
    e.preventDefault();
    //e.dataTransfer.dropEffect = "move";
    const cardId = parseInt(JSON.parse(e.dataTransfer.getData('text/plain')).cardId)
    const params = {id: cardId, list_id: data.id}
    cardUpdate(params)
  }

  const dragoverHandler = (e: React.DragEvent<Element>) => {
    e.preventDefault();
  }

  return (
    <li className="List" onDrop={dropHandler} onDragOver={dragoverHandler}>
      <div className="List-title">{data.title}</div>
      <CardsWrapper listId={data.id} />
    </li>
  )
}

export default List;
