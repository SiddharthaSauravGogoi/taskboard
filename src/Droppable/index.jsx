import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import DraggableComponent from '../Draggable/index.jsx';

export default function DroppableComponent(props) {
  return (
    <Droppable
        droppableId={props.columnId} key={props.columnId} >
        {(provided) => <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="columns"
          key={props.columnId}
        >
          <h2>
            <u>
              {props.column.name}
            </u>
          </h2>
          <div>
            {props.column.tasks.map((item, key) => <DraggableComponent
            item={item}
            key={key}
            index={key}
            column={props.column}/>)}
          </div>
          {provided.placeholder}
        </div>
        }
      </Droppable>
  );
}

DroppableComponent.propTypes = {
  column: PropTypes.object,
  columnId: PropTypes.string,
};
