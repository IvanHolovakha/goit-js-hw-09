import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputRef = document.querySelector('input');
const startBtnRef = document.querySelector('button[data-start]');
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');

let timerId = null;
let ms = 0;
const dateNow = Date.now();
startBtnRef.setAttribute("disabled", true);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if(selectedDates[0] <= dateNow) {
            Notify.failure('Please choose a date in the future');
        } else {
            startBtnRef.removeAttribute("disabled", true);
            timer(selectedDates[0]);
        };
    },
};

const fp = flatpickr('#datetime-picker', options);

const timer = (selectedDate) => {
    startBtnRef.addEventListener('click', ()=>{
        startBtnRef.setAttribute("disabled", true);
        inputRef.setAttribute("disabled", true);

        timerId = setInterval(()=>{
            ms = selectedDate - new Date();

            if (ms <= 0) {
                clearInterval(timerId);
                return;
            };

            const timerValue = convertMs(ms);
            
            daysRef.textContent = addLeadingZero(timerValue.days);
            hoursRef.textContent = addLeadingZero(timerValue.hours);
            minutesRef.textContent = addLeadingZero(timerValue.minutes);
            secondsRef.textContent = addLeadingZero(timerValue.seconds);

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
            };
        }, 1000);
    });
};

function addLeadingZero(value){
    return String(value).padStart(2, '0');
}