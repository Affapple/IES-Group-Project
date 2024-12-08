import ReactDOM from 'react-dom';

function Modal({ children, onClose }) {
  const handleClickOutside = (e) => {
    // Close modal if user clicks outside of the modal content
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50"
      onClick={handleClickOutside}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal content */}
      <div
        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg px-10 py-8"
        style={{
          maxHeight: '90vh', // Ensure modal height does not exceed 90% of the viewport height
          overflowY: 'auto', // Enable vertical scrolling for large content
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
