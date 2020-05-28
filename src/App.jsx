import React from 'react';
import DragDropContext from './DragDropContext/index.jsx';
import ModalFn from './Modal/index.jsx';
import './main.css';

function App() {
  return (
    <div className="container">
      <div className="column-wrapper">
        <DragDropContext/>
      </div>
      <ModalFn />
    </div>
  );
}

export default App;
