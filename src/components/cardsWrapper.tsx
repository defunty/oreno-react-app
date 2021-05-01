import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Card from './card'
import '../Card.css';

//function Card() {
type Props = {
  listId: number;
}

const CardWrapper: React.FC<Props> = ({children, listId}) => {
  type CardType = {id: number, list_id: number, title: string, description: string}
  type CardsType = CardType[]
  const [cards, setCards] = useState<CardsType>([])

  const getCardsUrl = `http://localhost:3001/cards?list_id=${listId}`

  useEffect(() => {
    axios.get(getCardsUrl)
      .then(function (response) {
        // handle success
        const tmpCards:CardsType = []
        response.data.forEach((data: CardType) => {
          tmpCards.push(data)
        })
        setCards(tmpCards)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [listId, getCardsUrl]);

  return (
    <ul className="Cards">
      {cards.map(card => (
        <Card key={card.id} data={card} />
      ))}
    </ul>
  )
}

export default CardWrapper;
