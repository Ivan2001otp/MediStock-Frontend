import React from 'react'

type ModalProps = {
    isOpen : boolean;
    onClose : () => void;
    children :React.ReactNode;
};

const Modal:React.FC<ModalProps> = ({isOpen, onClose, children}) => {
  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl relative">
            {children}
            <button 
                className="absolute top-2 right-3 text-gray-400 hover:text-gray-800"
            onClick={onClose}>❌</button>
        </div>
    </div>
  );
};

export default Modal