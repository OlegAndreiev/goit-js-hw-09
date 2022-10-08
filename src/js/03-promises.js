import { Notify } from 'notiflix/build/notiflix-notify-aio';

const createBtn = document.querySelector('button[type="submit"]');
const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  createBtn.setAttribute('disabled', true);

  const {
    elements: { delay, step, amount },
  } = evt.currentTarget;
  let delayNum = Number(delay.value);
  let stepNum = Number(step.value);
  let amountNum = Number(amount.value);
  let totalDelay = delayNum + stepNum * amountNum;

  if (delayNum < 0 || stepNum < 0 || amountNum < 0) {
    Notify.failure('Alert!!!');
    return;
  }

  for (let position = 1; position <= amountNum; position += 1) {
    delayNum += stepNum;
    createPromise(position, delayNum);
  }
  showBtn(totalDelay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  }, delay);
}

function showBtn(total) {
  setTimeout(() => {
    createBtn.disabled = false;
    form.reset();
  }, total);
}
