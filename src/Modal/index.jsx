import React from 'react';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '150px',
    width: '300px',
  },
};

Modal.setAppElement(document.getElementById('root'));

export default function ModalFn() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function getTaskName(event) {
    event.preventDefault();

    const taskName = event.target.task.value;
    const newTask = { id: uuidv4(), title: taskName };

    const columnData = JSON.parse(localStorage.getItem('columns'));
    const column = Object.keys(columnData)[0];
    columnData[column].tasks.push(newTask);

    localStorage.clear();
    localStorage.setItem('columns', JSON.stringify(columnData));

    closeModal();
    window.location.reload();
  }

  return (
    <div>
      <button onClick={openModal} className="modal-display-text">Create a Task</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
      >
        <div className="modal-header">
          <h3>Create a task</h3>
          <div onClick={closeModal} style={{ cursor: 'pointer' }}>Close</div>
        </div>

        <form onSubmit={getTaskName}>
          <label htmlFor="task"> Name </label>
          <input name="task" required/> <br />
          <button className="modal-submit-btn" type="submit"> Submit</button>
        </form>

      </Modal>
    </div>
  );
}
