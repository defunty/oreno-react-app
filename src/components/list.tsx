import React from 'react';
import CardsWrapper from './cardsWrapper'
import '../List.scss';
import { Droppable } from 'react-beautiful-dnd';

//function Card() {
type Props = {
  data: {id: number, title: string};
  cardUpdate: any; //関数自体をpropsで渡す場合はどうするか
  cards: {id: number, list_id: number, title: string, description: string}[];
}

const List: React.FC<Props> = ({children, data, cardUpdate, cards}) => {
  return (
    <Droppable droppableId={data.id.toString()}>
      {(provided) => (
      <li
        className="List"
        ref={provided.innerRef}
      >
        <div className="List-title">{data.title}</div>
        <CardsWrapper listId={data.id} cards={cards} />
      </li>
      )}
    </Droppable>
  )
}

export default List;
