import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableComponent from '../Droppable/index.jsx';

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.tasks];
    const destItems = [...destColumn.tasks];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        tasks: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.tasks];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        tasks: copiedItems,
      },
    });
  }
};


export default function DragDrop() {
  const data = {
    [uuidv4()]: {
      name: 'INBOX',
      tasks: [],
    },
    [uuidv4()]: {
      name: 'DOING',
      tasks: [],
    },
    [uuidv4()]: {
      name: 'DONE',
      tasks: [],
    },
    [uuidv4()]: {
      name: 'REJECTED',
      tasks: [],
    },
  };

  const [columns, setColumns] = useState({});
  useEffect(() => {
    const columnData = JSON.parse(localStorage.getItem('columns'));
    if (columnData) {
      setColumns(columnData);
    } else {
      setColumns(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
      { Object.entries(columns).map(([columnId, column]) => <DroppableComponent
        columnId={columnId}
        key={columnId}
        column={column}
      />)}
    </DragDropContext>
  );
}
