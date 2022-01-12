function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  const refs = {
    start: document.querySelector("[data-start]"),
    stop: document.querySelector("[data-stop]")
  };
  
  let intervalId = null;

  refs.start.addEventListener("click", (event) => {
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
      refs.start.setAttribute("disabled", "disabled");
    
  });
  
  refs.stop.addEventListener("click", (event) => {
    clearInterval(intervalId);
    refs.start.removeAttribute("disabled");
  });
