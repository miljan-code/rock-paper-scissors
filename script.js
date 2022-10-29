'use strict';

const modalBtn = document.querySelector('.btn');
const modalCloseBtn = document.querySelector('.modal-close');
const modalEl = document.querySelector('.modal');
const gameEl = document.querySelector('.game-container');
const triangleEl = document.querySelector('.triangle');
const gamePhase1 = document.querySelector('.game--phase1');
const gamePhase2 = document.querySelector('.game--phase2');

// Refactor, Add close modal on ESC keydown and click outside of modal
const modalHandler = function () {
  modalEl.classList.toggle('modal-active');
  gameEl.classList.toggle('modal-overlay');
};

[modalBtn, modalCloseBtn].forEach((el) =>
  el.addEventListener('click', modalHandler)
);

triangleEl.addEventListener('click', function (e) {
  const { pick } = e.target.closest('.element').dataset;
  gamePhase1.style.display = 'none';
  gamePhase2.style.display = 'block';
});
