import React, {useState} from 'react';
import { DragDropContext, Droppable, Draggable, } from "react-beautiful-dnd";
import './DND-multi.scss'

const DNDMulti = () => {
  const [lists, setLists] = useState([{id: 1}, {id: 2}]);
  const [cards, setCards] = useState([{id: 1, listId: 1}, {id: 2, listId: 1}, {id: 3, listId: 2}]);

  function handleOnDragEnd(result: any) {
    console.log('dnd handleOnDragEnd');
    
    const cardsClone = Array.from(cards);
    const [reorderedCard] = cardsClone.splice(result.source.index, 1);
    cardsClone.splice(result.destination.index, 0, reorderedCard);

    setCards(cardsClone);
  }

  return (
    <div className="DND">
      <h2>react-beautiful-dnd multi サンプル</h2>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul className="Cards"
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {cards.map((card, index) => {
                return (
                  <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                  {(provided) => (
                    <li
                      className="Cards"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      {card.id}
                    </li>
                  )}</Draggable>
                )
              })}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default DNDMulti;
