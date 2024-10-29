const typingtext = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".wrapper .input-field"),
  timeTag = document.querySelector(".time span b"),
  mistakeTag = document.querySelector(".mistake span"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span"),
  tryAgainBtn = document.querySelector("button");

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = 0,
  mistakes = 0,
  isTyping = false;

// let paragraphs = [
//   "This is a sample paragraph.",
//   "Another example text for typing."
// ];

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  typingtext.innerHTML = "";
  paragraphs[randIndex].split("").forEach(span => {
    let spanTag = `<span>${span}</span>`;
    typingtext.innerHTML += spanTag;
  });
  typingtext.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingtext.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  const characters = typingtext.querySelectorAll("span");

  // Prevent errors if charIndex exceeds character length
  if (charIndex >= characters.length || timeLeft <= 0) {
    inpField.value = "";
    clearInterval(timer);
    return;
  }

  let typedchar = inpField.value.split("")[charIndex]; // Ensure inpField.value is valid
  
  if (!isTyping) {
    timer = setInterval(initTimer, 1000);
    isTyping = true;
  }

  if (typedchar == null) { // User pressed backspace
    if (charIndex > 0) {
      charIndex--;
      if (characters[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      characters[charIndex].classList.remove("correct", "incorrect");
    }
  } else {
    if (characters[charIndex].innerText === typedchar) {
      characters[charIndex].classList.add("correct");
    } else {
      mistakes++;
      characters[charIndex].classList.add("incorrect");
    }
    charIndex++;
  }

  // Set the active character
  characters.forEach(span => span.classList.remove("active"));
  if (charIndex < characters.length) {
    characters[charIndex].classList.add("active");
  }

  // Calculate WPM and update stats
  let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
  wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = wpm;
  cpmTag.innerText = charIndex - mistakes;
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  randomParagraph();
  inpField.value = "";
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  timeTag.innerText = timeLeft;
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);


