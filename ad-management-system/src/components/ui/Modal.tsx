import { type ReactNode } from "react";
import { Portal } from "./Portal"; // Импортируем созданный Portal

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-[rgb(59,56,56)] rounded-lg shadow-2xl p-6 relative w-full max-w-lg mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
};
