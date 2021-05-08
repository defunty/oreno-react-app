import React from 'react';
import CardsWrapper from './cardsWrapper'
import '../List.scss';

//function Card() {
type Props = {
  data: {id: number, title: string};
  cardUpdate: any; //関数自体をpropsで渡す場合はどうするか
  cards: {id: number, list_id: number, title: string, description: string, order: number}[];
}

const List: React.FC<Props> = ({children, data, cardUpdate, cards}) => {
  return (
      <li className="List">
        <div className="List-title">{data.title}</div>
        <CardsWrapper listId={data.id} cards={cards} />
      </li>
  )
}

export default List;
