const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

const switcherBgColor = {
  intervalId: null,
  isActive: false,

  startSwitch() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    this.intervalId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  },

  stopSwitch() {
    clearInterval(this.intervalId);
    this.isActive = false;
  },
};
startBtn.addEventListener('click', () => {
  switcherBgColor.startSwitch();
});
stopBtn.addEventListener('click', () => {
  switcherBgColor.stopSwitch();
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
