import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; // Стилі для flatpickr
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"; // Стилі для iziToast


// Елементи інтерфейсу
const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

// Початковий стан
let timerInterval = null;
let userSelectedDate = null;
startButton.disabled = true;

// Функція для додавання нуля
const addLeadingZero = value => String(value).padStart(2, '0');

// Функція для оновлення таймера
const updateTimerInterface = ({ days, hours, minutes, seconds }) => {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
};

// Функція для конвертації мілісекунд
const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

// Функція для старту таймера
const startTimer = () => {
  const currentDate = new Date();
  const timeDifference = userSelectedDate - currentDate;

  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    updateTimerInterface(convertMs(0));
    datetimePicker.disabled = false;
    return;
  }

  updateTimerInterface(convertMs(timeDifference));
};

// Налаштування flatpickr
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate <= now) {
      iziToast.error({ title: 'Error', message: 'Please choose a date in the future' });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
});

// Обробка кліку на кнопку Start
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  datetimePicker.disabled = true;

  timerInterval = setInterval(() => {
    startTimer();
  }, 1000);
});
