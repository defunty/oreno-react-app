import React, {useState} from 'react';
import { DragDropContext, Droppable, Draggable, } from "react-beautiful-dnd";
import './sandbox.scss'

// https://dev.classmethod.jp/articles/react-beautiful-dnd-react-ts/
// placeholderのカスタマイズ: https://codesandbox.io/s/2lmf1?file=/src/App.js
// virtual-listを使うため、複数リストにてplaceholderを利用すると問題が出る（placeholderを使いたい場合どうするべきか） https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/patterns/virtual-lists.md
//import { DragDropContext, Droppable, Draggable, } from "react-beautiful-dnd";
const DND = () => {
  const [items, setItems] = useState([{id: 1}, {id: 2}, {id: 3}]);
  function handleOnDragEnd(result: any) {
    console.log('dnd handleOnDragEnd');
    
    const itemsClone = Array.from(items);
    const [reorderedItem] = itemsClone.splice(result.source.index, 1);
    itemsClone.splice(result.destination.index, 0, reorderedItem);

    setItems(itemsClone);
  }

  return (
    <div className="DND">
      <h2>react-beautiful-dnd サンプル</h2>
      <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
          {(provided) => (
            <ul className="DND-list"
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {items.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      {item.id}
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

export default DND;
