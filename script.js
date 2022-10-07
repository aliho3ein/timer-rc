let startBox = document.querySelector(".searchbox");
let inputCounter = startBox.querySelector("#input-counter");
let startCounter = startBox.querySelector("#start-counter");
let timerCircle = document.querySelector(".c100");
let timerNum = document.querySelector(".c100 > span");
let loadingMassage = document.querySelector(".loading");
let seconds, percent, cornetSecond, Tm;

startCounter.addEventListener("click", function () {
  seconds = parseInt(inputCounter.value);
  /*if Input not a number is*/
  if (isNaN(seconds)) return toggleMassage(false);
  toggleMassage(true);
  cornetSecond = seconds;
  Tm = setInterval(Timer, 1000);
});

let Progress = 0;

let toggleMassage = (show) => {
  let errorElement = document.querySelector(".error-massage");

  if (!show) {
    errorElement.textContent = "Wrong Number , Try again";
    errorElement.classList.add("active");
    timerCircle.style.display = "none";
  } else {
    timerNum.textContent = seconds;
    startBox.style.display = "none";
    timerCircle.style.display = "block";
    errorElement.classList.remove("active");
    loadingMassage.style.display = "block";
  }
};

let timerEnd = (LastClass) => {
  let successMessage = document.querySelector(".success");
  timerCircle.classList.remove("p" + LastClass);
  timerCircle.style.display = "none";
  inputCounter.value = "";
  startBox.style.display = "block";
  loadingMassage.style.display = "none";
  successMessage.style.display = "block";
  loadingMassage.textContent = "in progress ";
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 2000);
};

let Stop = true;

timerCircle.addEventListener("click", () => {
  if (Stop) {
    clearInterval(Tm);
    loadingMassage.textContent = "Pause !";
    timerNum.textContent = "";
    timerNum.classList.add("fa-stopwatch");
    Stop = false;
  } else {
    timerNum.classList.remove("fa-stopwatch");
    loadingMassage.textContent = "in progress ";
    timerNum.textContent = seconds;
    Tm = setInterval(Timer, 1000);
    Stop = true;
  }
});

/* Setinterval */
let Timer = () => {
  if (seconds <= 0) {
    timerEnd(percent);
    clearInterval(Tm);
  } else if (seconds > 0) {
    timerCircle.classList.remove("p" + percent);
    seconds -= 1;
    timerNum.textContent = seconds;
    percent = Math.trunc(((cornetSecond - seconds) / cornetSecond) * 100);
    timerCircle.classList.add("p" + percent);
  }
  if (Progress < 3) {
    loadingMassage.textContent = loadingMassage.textContent + " .";
    Progress++;
  } else {
    loadingMassage.textContent = "in progress ";
    Progress = 0;
  }
};
