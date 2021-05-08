import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Card from './card'
import { Droppable } from 'react-beautiful-dnd';
import '../Card.scss';

//function Card() {
type Props = {
  listId: number;
  cards: {id: number, list_id: number, title: string, description: string, order: number}[];
}

const CardWrapper: React.FC<Props> = ({children, listId, cards}) => {
  useEffect(() => {
    console.log(cards)
  }, [cards])
  //type CardType = {id: number, list_id: number, title: string, description: string}
  //type CardsType = CardType[]
  //const [cards, setCards] = useState<CardsType>([])

  //const getCardsUrl = `http://localhost:3001/cards?list_id=${listId}`

  //useEffect(() => {
  //  axios.get(getCardsUrl)
  //    .then(function (response) {
  //      // handle success
  //      const tmpCards:CardsType = []
  //      response.data.forEach((data: CardType) => {
  //        tmpCards.push(data)
  //      })
  //      setCards(tmpCards)
  //    })
  //    .catch(function (error) {
  //      // handle error
  //      console.log(error);
  //    })
  //    .then(function () {
  //      // always executed
  //    });
  //}, [listId, getCardsUrl]);

  return (
    <Droppable droppableId={listId.toString()}>
      {(provided) => (
      <ul className="Cards" ref={provided.innerRef}>
        {cards.map((card, index) => (
          <Card key={card.id} data={card} index={index} />
        ))}
      </ul>
      )}
    </Droppable>
  )
}

export default CardWrapper;
