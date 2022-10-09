import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const flatpickrInit = document.querySelector('input[type="text"]');
const startBtn = document.querySelector('button[data-start]');
const timerDataDays = document.querySelector('span[data-days]');
const timerDataHours = document.querySelector('span[data-hours]');
const timerDataMinutes = document.querySelector('span[data-minutes]');
const timerDataSeconds = document.querySelector('span[data-seconds]');
const divTimer = document.querySelector('.timer');
const spanValue = document.querySelectorAll('.value');
let choosedDates;

startBtn.addEventListener('click', timerStart);
startBtn.setAttribute('disabled', true);

const options = {
  noCalendar: false,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      choosedDates = selectedDates[0];
      startBtn.disabled = false;
    }
  },
};

function timerStart() {
  startBtn.setAttribute('disabled', true);
  const intervalId = setInterval(() => {
    const currentDate = new Date();
    const counterDate = choosedDates - currentDate;

    if (counterDate <= currentDate.getDate()) {
      clearInterval(intervalId);
      flatpickrInit.disabled = false;
      return;
    }

    const convertedData = convertMs(counterDate);
    setTimerData(convertedData);
    flatpickrInit.setAttribute('disabled', true);
  }, 1000);
}

flatpickr(flatpickrInit, options);

function setTimerData(convertedData) {
  timerDataDays.textContent = String(convertedData.days).padStart(2, '0');
  timerDataHours.textContent = String(convertedData.hours).padStart(2, '0');
  timerDataMinutes.textContent = String(convertedData.minutes).padStart(2, '0');
  timerDataSeconds.textContent = String(convertedData.seconds).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//------------DECORATION---------------------------
divTimer.style.display = 'flex';
divTimer.style.justifyContent = 'space-evenly';

const listItems = divTimer.children;
for (let i = 0; i < listItems.length; i += 1) {
  const element = listItems[i];
  element.style.display = 'flex';
  element.style.flexDirection = 'column';
  element.style.alignItems = 'center';
  element.style.fontSize = '20px';
}

for (let i = 0; i < spanValue.length; i++) {
  const element = spanValue[i];
  element.style.fontSize = '50px';
}
// ------------------------------------------------
