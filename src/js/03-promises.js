// import { Notify } from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[type="submit"]');
const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  startBtn.setAttribute('disabled', true);
  const {
    elements: { delay, step, amount },
  } = evt.currentTarget;
  let delayEl = Number(delay.value);
  let stepEl = Number(step.value);
  let amountEl = Number(amount.value);
  let totalDelay = delayEl + stepEl * amountEl;

  if (delayEl < 0 || stepEl < 0 || amountEl < 0) {
    Notify.failure('Alert');
    return;
  }
  for (let position = 1; position <= amountEl; position += 1) {
    startBtn.setAttribute('disabled', true);
    createPromise(position, delayEl)
      .then(({ position, delay }) =>
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );

    delayEl += stepEl;
  }
  turnOffBtnStart(totalDelay);
  formRef.reset();
}

function turnOffBtnStart(total) {
  setTimeout(() => {
    startBtn.disabled = false;
  }, total);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((Resolve, Reject) => {
    setTimeout(() => {
      console.log(shouldResolve);
      if (shouldResolve) {
        Resolve({ position, delay });
      } else {
        Reject({ position, delay });
      }
    }, delay);
  });
}
console.log(createPromise(5, 1000));
