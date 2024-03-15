import React from 'react';
import Modal from 'react-modal';

// 회원가입 모달
Modal.setAppElement('#root');

export default function WelcomeModal({ isOpen, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg"
      contentLabel="환영 메세지"
    >
      <h2 className="text-2xl font-bold mb-4">환영합니다!</h2>
      <p className="mb-4">회원가입이 성공적으로 완료되었습니다.</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={closeModal}
      >
        닫기
      </button>
    </Modal>
  );
}
