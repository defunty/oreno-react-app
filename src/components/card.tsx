import React, { useState } from 'react';
import { Draggable } from "react-beautiful-dnd";
import '../Card.css';

//function Card() {
type Props = {
  data: {id: number, list_id: number, title: string, description: string};
  index: number;
}

const Card: React.FC<Props> = ({children, data, index}) => {
  //const [isDrag, setIsDrag] = useState<Boolean>(false)

  //const dragOnHandler = () => {
  //  // 画像元を消す場合はこれを消す必要がありそう
  //}

  //const dragStartHandler = (e: React.DragEvent<Element>) => {
  //  //setIsDrag(true)
  //  e.dataTransfer.setData('text/plain', JSON.stringify({cardId: data.id}));
  //}

  //const dragEndHandler = (e: React.DragEvent<Element>) => {
  //  
  //}

  return (
    <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
      {(provided) => (
        <li
          className="Card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="Card-title">{data.title}</div>
          <div className="Card-description">{data.description}</div>
        </li>
      )}
    </Draggable>
  )
}

export default Card;
