// src/App.js
import React, { useState } from 'react';
// import './App.css';
// import ModalForm from './components/ModalForm';
import ModalForm from './review/ModalD'
function ModalW() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = (values) => {
    console.log(values); // You can handle the form data here (e.g., send it to an API).
    setIsModalOpen(false); // Close the modal after form submission
  };

  return (
    <div className="App">
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default ModalW;
