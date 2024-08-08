"use client";
import React, { useEffect, useState } from "react";
import "./Modal.module.css";

const Modal = ({ content, position, visible, setModalVisible }) => {
  const [isAnimating, setIsAnimating] = useState(visible);

  const hideModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (visible) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [visible]);

  if (!isAnimating && !visible) return null;

  return (
    <div
      onMouseLeave={hideModal}
      className={`modal ${
        isAnimating ? "modal-open" : "modal-close"
      } z-[100] justify-center items-center flex flex-col bg-white px-4 gap-2 py-3 rounded-md shadow-md border border-gray-300 w-[300px] h-[120px] overflow-auto no-scrollbar`}
      style={{ top: position.top, left: position.left }}
    >
      <p className="border border-gray-200 px-4 py-1 rounded-md shadow-sm">{content}</p>
      <p className="border border-gray-200 px-4 py-1 rounded-md shadow-sm bg-green-100">Abhiraj Kumar</p>
    </div>
  );
};

export default Modal;
