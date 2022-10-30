'use strict';

const modalBtn = document.querySelector('.btn--modal');
const modalCloseBtn = document.querySelector('.modal-close');
const modalEl = document.querySelector('.modal');
const triangleEl = document.querySelector('.triangle');
const gamePhase1 = document.querySelector('.game--phase1');
const gamePhase2 = document.querySelector('.game--phase2');
const overlay = document.querySelector('.overlay');
const phase2Box = document.querySelector('.phase2-element-box');
const timerEl = document.querySelector('.element--placeholder');
const playAgainBox = document.querySelector('.play-again-box');
const score = document.querySelector('.score-counter');

let scoreCounter = 0;

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

const generateWinMarkup = function () {
  return `
  <p class="play-again-title">${this}</p>
  <button class="btn btn--again">Play Again</button>
  `;
};

const playAgain = function () {
  gamePhase2.style.display = 'none';
  gamePhase1.style.display = 'block';
  const oldElements = phase2Box.querySelectorAll('.element');
  oldElements.forEach((el) => el.remove());
  playAgainBox.innerHTML = '';
  gamePhase2.style.width = '40rem';
  const markup = `
  <div class="element--placeholder">
    <img src="images/sand-clock.png" class="timer-img">
  </div>
  `;
  phase2Box.insertAdjacentHTML('beforeend', markup);
};

const endgame = function (type) {
  playAgainBox.insertAdjacentHTML('afterbegin', generateWinMarkup.call(type));

  if (type.includes('win')) {
    scoreCounter++;
    phase2Box.firstElementChild.style.boxShadow = `0 0 0 4rem rgba(231, 231, 231, 0.068), 0 0 0 8rem rgba(231, 231, 231, 0.058), 0 0 0 12rem rgba(231, 231, 231, 0.048)`;
  }
  if (type.includes('lost')) {
    scoreCounter--;
    phase2Box.lastElementChild.style.boxShadow = `0 0 0 4rem rgba(231, 231, 231, 0.068), 0 0 0 8rem rgba(231, 231, 231, 0.058), 0 0 0 12rem rgba(231, 231, 231, 0.048)`;
  }

  console.log(phase2Box.firstElementChild);

  score.innerHTML = scoreCounter;
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
  await timeout(1);

  document.querySelector('.element--placeholder').remove();
  gamePhase2.style.width = '70rem';

  await timeout(0.3);

  if (pick === 'paper' && computerPick === 'scissors') endgame('you lost');
  if (pick === 'scissors' && computerPick === 'rock') endgame('you lost');
  if (pick === 'rock' && computerPick === 'paper') endgame('you lost');
  if (pick === 'paper' && computerPick === 'rock') endgame('you win');
  if (pick === 'scissors' && computerPick === 'paper') endgame('you win');
  if (pick === 'rock' && computerPick === 'scissors') endgame('you win');
  if (pick === 'rock' && computerPick === 'rock') endgame('draw');
  if (pick === 'scissors' && computerPick === 'scissors') endgame('draw');
  if (pick === 'paper' && computerPick === 'paper') endgame('draw');

  const playAgainBtn = document.querySelector('.btn--again');
  playAgainBtn.addEventListener('click', playAgain);

  console.log(computerPick.indexOf());
};

triangleEl.addEventListener('click', gameLogic);
