import React from "react";
import { Modal } from "../../../context/Modal";
import '../../CSS/DeleteConfirmationModal.css'

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  const dismiss = () => {
    onClose();
  };

  const confirm = () => {
    onConfirm();
  };

  return (
    <>
      {isOpen && (
        <Modal onClose={onClose}>
          <div className="confirmationContainer">
            <h1 className="confirmationMessage">Delete Image?</h1>
            <div className="pageButtons">
              <button onClick={dismiss}>Cancel</button>
              <button onClick={confirm}>Yes</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default DeleteConfirmationModal;
