import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { DragDropContext, Droppable, Draggable, } from "react-beautiful-dnd";
import './sandbox.css'

function Sandbox() {
  return (
      <div>
        <Link to="./dnd">drag-and-drop</Link>
        <Switch>
          <Route path="/sb/" exact children={<Top />} />
          <Route path="/sb/dnd" exact children={<DND />} />
        </Switch>
      </div>
  )
}

const Top = () => {
  return (
    <h1>top</h1>    
  )
}


// https://dev.classmethod.jp/articles/react-beautiful-dnd-react-ts/
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
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{item.id}</li>
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

export default Sandbox;
