import React from 'react';
import CardsWrapper from './cardsWrapper'
import '../List.css';
import { Droppable } from 'react-beautiful-dnd';

//function Card() {
type Props = {
  data: {id: number, title: string};
  cardUpdate: any; //関数自体をpropsで渡す場合はどうするか
}

const List: React.FC<Props> = ({children, data, cardUpdate}) => {
  return (
    <Droppable droppableId={data.id.toString()}>
      {(provided) => (
      <li
        className="List"
        ref={provided.innerRef}
      >
        <div className="List-title">{data.title}</div>
        <CardsWrapper listId={data.id} />
      </li>
      )}
    </Droppable>
  )
}

export default List;
