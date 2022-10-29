'use strict';

const modalBtn = document.querySelector('.btn');
const modalCloseBtn = document.querySelector('.modal-close');
const modalEl = document.querySelector('.modal');
const triangleEl = document.querySelector('.triangle');
const gamePhase1 = document.querySelector('.game--phase1');
const gamePhase2 = document.querySelector('.game--phase2');
const overlay = document.querySelector('.overlay');
const phase2Box = document.querySelector('.phase2-element-box');

const modalHandler = function () {
  modalEl.classList.toggle('modal-active');
  overlay.classList.toggle('hidden');
};

[modalBtn, modalCloseBtn].forEach((el) =>
  el.addEventListener('click', modalHandler)
);

const timeout = function (sec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, sec * 1000);
  });
};

const generateMarkup = function () {
  return `
  <div class="element element--${this}">
    <img src="images/icon-${this}.svg" class="${this}" />
  </div>
  `;
};

const gameLogic = async function (e) {
  if (!e.target.closest('.element')) return;
  const { pick } = e.target.closest('.element').dataset;
  gamePhase1.style.display = 'none';
  gamePhase2.style.display = 'block';

  phase2Box.insertAdjacentHTML('afterbegin', generateMarkup.call(pick));

  const computerPick = ['paper', 'scissors', 'rock'][
    Math.floor(Math.random() * 3)
  ];

  await timeout(2);
  document.querySelector('.timer-img').remove();
  phase2Box.insertAdjacentHTML('beforeend', generateMarkup.call(computerPick));
};

triangleEl.addEventListener('click', gameLogic);
