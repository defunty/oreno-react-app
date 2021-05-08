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
