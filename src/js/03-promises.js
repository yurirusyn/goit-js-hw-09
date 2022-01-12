import Notiflix from 'notiflix';


const refs ={
  form: document.querySelector(".form"),
  };


  refs.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const {
      elements: { delay, step, amount}
    } = event.currentTarget;
    // console.log(+delay.value, +step.value, +amount.value);
    let delayValue = +delay.value;
    console.log(delayValue);

    for (let position = 1; position <= +amount.value; position++) {
        
      console.log(delayValue);
    
      delayValue += +step.value; 
    
      createPromise(position, delayValue)
      .then(({position, delayValue}) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delayValue}ms`);
      })
      .catch(({ position, delayValue }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delayValue}ms`);
      });
      
    }
  });
 
  function createPromise(position, delayValue) {
   return new Promise((resolve, reject) => {

      setTimeout(() => {
        
          const shouldResolve = Math.random() > 0.3;
          if (shouldResolve) {
            resolve({ position, delayValue }) 

          } else {
            reject({ position, delayValue })

          }
      }, delayValue);
    });
  }
