import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const refs ={
start: document.querySelector("[data-start]")
};
console.log(refs.start);

let intervalId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        if (selectedDates[0] < new Date()){
            Notiflix.Notify.failure("Please choose a date in the future");
        refs.start.setAttribute("disabled", "disabled");
        
        } else {
            refs.start.removeAttribute("disabled") 

            refs.start.addEventListener("click", (event) => {
                let deltaTime = selectedDates[0] - new Date();
                
                intervalId = setInterval(() => {
                deltaTime = deltaTime - 1000;
                    if (deltaTime >= 0) {
                        addLeadingZero(convertMs(deltaTime))
                    }
                }, 1000);
              });
            };
    },
  
  };

   const timer = {
       days: document.querySelector("[data-days]"),
       hours: document.querySelector("[data-hours]"),
       minutes: document.querySelector("[data-minutes]"),
       seconds: document.querySelector("[data-seconds]")
   };


  flatpickr("input#datetime-picker", options)

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
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


 function addLeadingZero({ days, hours, minutes, seconds }) {
    timer.days.textContent = String(days).padStart(2,0);
    timer.hours.textContent = String(hours).padStart(2,0);
    timer.minutes.textContent = String(minutes).padStart(2,0);
    timer.seconds.textContent = String(seconds).padStart(2,0);
  };