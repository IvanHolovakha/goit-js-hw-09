import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('form');
const inputsRef = document.querySelectorAll('input');

let intervalId = null;
let counterInterval = 1;

formRef.addEventListener('submit', onSubmit);

function onSubmit(e){
  e.preventDefault();
  const amount = Number(inputsRef[2].value);
  const step = Number(inputsRef[1].value);
  const delay = Number(inputsRef[0].value);
  let counterStep = delay;

  setTimeout(()=>{
    if(amount < 1){
      return
    }

    intervalId = setInterval(()=>{
      counterInterval += 1;
      counterStep += step;
      if(counterInterval > amount){
        clearInterval(intervalId);
        counterInterval = 1;
        return
      }
      createPromise(counterInterval, counterStep)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    },step);

    createPromise(counterInterval, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  },delay);
};

function createPromise(position, delay) {
  
  return new Promise((resolve, reject) => {
    
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({
        position: position,
        delay: delay,
      });
    } else {
      reject({
        position: position,
        delay: delay,
      });
    };
  });
};