import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const removeTask = (taskName) => {
  const columnData = JSON.parse(localStorage.getItem('columns'));
  const column = Object.keys(columnData)[0];
  const filteredArr = columnData[column].tasks.filter((arrayItem) => arrayItem.title !== taskName);
  columnData[column].tasks = filteredArr;

  localStorage.clear();
  localStorage.setItem('columns', JSON.stringify(columnData));

  window.location.reload();
};

export default function DraggableComponent(props) {
  return (
    <div key={props.item.id} className="task-wrapper">
      <Draggable
        draggableId={props.item.id}
        index={props.index}
      >
      {(taskProps) => <div
        ref={taskProps.innerRef}
        {...taskProps.draggableProps}
        {...taskProps.dragHandleProps}
        className="task"
      >
        {props.item.title}
      </div>}
      </Draggable>

      {props.column.name === 'INBOX'
        ? <img src="https://image.flaticon.com/icons/svg/1214/1214428.svg"
          alt="delete"
          height="15"
          width="15"
          style={{ cursor: 'pointer' }}
          onClick={() => removeTask(props.item.title)}
        />
        : null}
  </div>
  );
}

DraggableComponent.propTypes = {
  item: PropTypes.object,
  column: PropTypes.object,
  index: PropTypes.number,
};
