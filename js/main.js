// Array of words
const easyWords = [
  "Cheese",
  "Egg",
  "Butter",
  "Milk",
  "Yogurt",
  "Cream",
  "Sausage",
  "Bread",
  "Pizza",
  "Steak",
  "Ham",
  "Kebab",
  "Bacon",
  "Salad",
  "Shrimp",
  "Rice",
  "Hair",
  "Eye",
  "Iris",
  "Nose",
  "Mouth",
  "Lips",
  "Hat",
  "Tongue",
  "Elbow",
  "Thigh",
  "Knee",
  "Toes",
  "Ankle",
  "Sweater",
];

const normalWords = [
  "Eyebrow",
  "Forehead",
  "Porridge",
  "Hot dog",
  "Pancake",
  "Hamburger",
  "Advice",
  "Buttocks",
  "Nipple",
  "Armpit",
  "Mother",
  "Overalls",
  "Stomach",
  "Children",
  "Shoelace",
  "Gloves",
  "Father",
  "Accept",
  "Pyjamas",
  "Course",
  "Knickers",
];

const difficultWords = [
  "Cottage cheese",
  "Grandmother",
  "Anthropologist",
  "Tuna steak",
  "Evening grown",
  "Suspenders",
  "Index finger",
  "Fried fish",
  "Chief of police",
  "EyelidPupil",
  "Air stewardess",
  "Navel – bellybutton",
  "Little finger",
  "Roast chicken",
  "Belly – Tummyr",
  "Middle finger",
  "Down to earth",
  "Shoulder blade",
  "Ring finger",
  "Leather jacker",
  "Swimming trunks",
  "Absent-minded",
  "Bathing suit",
  "Sophisticated",
  "Disappointed",
];

// catch selectors
const gameContainer = document.querySelector(".game");
const playerLevel = document.querySelector(".massage .level");
const playerTime = document.querySelector(".massage .seconds");
const startGameBtn = document.querySelector(".start");
const theWord = document.querySelector(".word");
const typingInput = document.querySelector(".typing-inp");
const upcomingWord = document.querySelector(".upcoming-word");
const timeLeft = document.querySelector(".time span");
const gotPointScored = document.querySelector(".score .got");
const TotalPointScore = document.querySelector(".score .total");
const dropDownContent = document.querySelector(".drop-down");
const levelsBox = document.querySelector(".levels-box");
const optionMenu = document.querySelector(".levels-list");
const levelOption = document.querySelectorAll(".levels-list .option");

const instructionsInfoLevel = () => {
  const instructionsContainer = document.createElement("div");
  levelOption.forEach((level) => {
    level.addEventListener("click", (e) => {
      // clear to update the data
      instructionsContainer.innerHTML = " ";

      instructionsContainer.className =
        "instructions-info mt-4 mb-3 p-3 bg-white";
      // instructions header title
      const instructionstitle = document.createElement("h4");
      instructionstitle.className =
        "instructions-title py-3 mb-3 px-1 text-white ";
      instructionstitle.textContent = `Instructions For The ${e.target.dataset.level
        .charAt(0)
        .toUpperCase()}${e.target.dataset.level.slice(1)} Level`;

      // instructions levels game
      const instructionsInfo1 = document.createElement("div");
      instructionsInfo1.className = "instructions-Info text-start ps-3";
      instructionsInfo1.textContent = `1- You Chose To Play The ${e.target.dataset.level
        .charAt(0)
        .toUpperCase()}${e.target.dataset.level.slice(1)} Level`;
      ///
      const instructionsInfo2 = document.createElement("div");
      instructionsInfo2.className = "instructions-Info text-start ps-3";
      instructionsInfo2.textContent = `2- You Have ${
        gameLevels[e.target.dataset.level]
      } Seconds To Write Each Word`;
      ///
      const instructionsInfo3 = document.createElement("div");
      instructionsInfo3.className = "instructions-Info text-start ps-3";
      instructionsInfo3.textContent = `3- Total Score In ${e.target.dataset.level
        .charAt(0)
        .toUpperCase()}${e.target.dataset.level.slice(1)} Level Is ${
        e.target.dataset.level === "easy"
          ? easyWords.length
          : e.target.dataset.level === "normal"
          ? normalWords.length
          : difficultWords.length
      } Points`;
      ///
      const instructionsInfo4 = document.createElement("div");
      instructionsInfo4.className = "instructions-Info text-start ps-3";
      instructionsInfo4.textContent = `4- At The ${
        e.target.dataset.level === "easy"
          ? `${e.target.dataset.level
              .charAt(0)
              .toUpperCase()}${e.target.dataset.level.slice(
              1
            )} Level, The Letters Are Not Sensitive`
          : `${e.target.dataset.level
              .charAt(0)
              .toUpperCase()}${e.target.dataset.level.slice(
              1
            )} Level, The Letters Are Sensitive`
      } `;
      ///
      const instructionsInfo5 = document.createElement("div");
      instructionsInfo5.className = "instructions-Info text-start ps-3";
      instructionsInfo5.textContent =
        "5- You Will Get An Extra Three Seconds Only On The First Word";
      // append elemens to instructions Container
      instructionsContainer.appendChild(instructionstitle);
      instructionsContainer.appendChild(instructionsInfo1);
      instructionsContainer.appendChild(instructionsInfo2);
      instructionsContainer.appendChild(instructionsInfo3);
      instructionsContainer.appendChild(instructionsInfo4);
      instructionsContainer.appendChild(instructionsInfo5);
    });
  });
  // append instructions Container to the web page
  document.querySelector(".statistics-info").after(instructionsContainer);
};

instructionsInfoLevel();

// open the drop Down menu & select the level
levelsBox.addEventListener("click", () => {
  document.querySelector(".drop-icon").classList.toggle("open");
  if (
    optionMenu.style.maxHeight &&
    dropDownContent.style.minHeight == "190px"
  ) {
    dropDownContent.style.minHeight = "55px";
    optionMenu.style.maxHeight = null;
  } else {
    optionMenu.style.maxHeight = `${optionMenu.scrollHeight}px`;
    dropDownContent.style.minHeight = "190px";
  }
  levelOption.forEach((level) => {
    level.addEventListener("click", (e) => {
      // set level name
      levelsBox.value = e.target.dataset.level;
      // closed menu when choosen
      dropDownContent.style.minHeight = "55px";
      optionMenu.style.maxHeight = null;
      whenSelectLevel(e.target.dataset.level);
      // scroll to the end of game container to better viwe
      gameContainer.scrollIntoView({ block: "end", behavior: "smooth" });
    });
  });
});

// Minutes per level
const gameLevels = {
  easy: 3,
  normal: 3,
  difficult: 2,
};

const whenSelectLevel = (levelName) => {
  // fill game info
  playerLevel.innerHTML = levelName;
  playerTime.innerHTML = gameLevels[levelName];
  timeLeft.innerHTML = gameLevels[levelName];
  gotPointScored.innerHTML = 0;
  // check Total Point Score
  if (levelName === "easy") {
    TotalPointScore.innerHTML = easyWords.length;
  } else if (levelName === "normal") {
    TotalPointScore.innerHTML = normalWords.length;
  } else {
    TotalPointScore.innerHTML = difficultWords.length;
  }
};

// actions wehn click start game button
startGameBtn.addEventListener("click", () => {
  // prevent copy & past
  typingInput.onpaste = () => false;
  // check if player select the level first
  if (levelsBox.value) {
    startGameBtn.style.display = "none";
    typingInput.focus();
    actionsOfStartGame();
    // scroll to the end of game container to better viwe
    gameContainer.scrollIntoView({ block: "end", behavior: "smooth" });
    // remove instructions
    document.querySelector(".instructions-info").remove();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You Have To Select The Level Before Beginning",
    });
  }
});

const actionsOfStartGame = () => {
  accorToWordsLevel(easyWords, normalWords, difficultWords);
};

const accorToWordsLevel = (easyWords, normalWords, difficultWords) => {
  if (levelsBox.value === "easy") {
    // get the random word and set it in the words container
    getRandomWord(easyWords);
    // generat the Upcomaing words according level of words
    genUpcomingWords(easyWords);
    // settings Of Game and operation of play
    settingsOfGame(easyWords);
  } else if (levelsBox.value === "normal") {
    // get the random word and set it in the words container
    getRandomWord(normalWords);
    // generat the Upcomaing words according level of words
    genUpcomingWords(normalWords);
    // settings Of Game and operation of play
    settingsOfGame(normalWords);
  } else {
    // get the random word and set it in the words container
    getRandomWord(difficultWords);
    // generat the Upcomaing words according level of words
    genUpcomingWords(difficultWords);
    // settings Of Game and operation of play
    settingsOfGame(difficultWords);
  }
};

const getRandomWord = (wordsLevelArray) => {
  // get random word & set it
  const randomWord =
    wordsLevelArray[Math.floor(Math.random() * wordsLevelArray.length)];
  theWord.innerHTML = randomWord;
  // get index of words & remove it
  const wordIndex = wordsLevelArray.indexOf(randomWord);
  wordsLevelArray.splice(wordIndex, 1);
};

const genUpcomingWords = (ArrayOfWords) => {
  upcomingWord.innerHTML = "";
  ArrayOfWords.forEach((word) => {
    const wordContainer = document.createElement("div");
    wordContainer.className = "a-word p-2 m-1 rounded-3";
    const wordText = document.createTextNode(word);
    // append wordContainer to upcoming word & the text to wordContainer
    upcomingWord.appendChild(wordContainer);
    wordContainer.prepend(wordText);
  });
};

const settingsOfGame = (arrayOfWords) => {
  // set the left time
  timeLeft.innerHTML = gameLevels[levelsBox.value];
  // give player more sec to check the game in first word
  if (gotPointScored.innerHTML === "0") {
    timeLeft.innerHTML = gameLevels[levelsBox.value] + 3;
  } else {
    timeLeft.innerHTML = gameLevels[levelsBox.value];
  }
  const handlerWords = setInterval(() => {
    timeLeft.innerHTML--;
    if (timeLeft.innerHTML === "0") {
      clearInterval(handlerWords);
      // check if level easy of game and his options & compar words
      if (levelsBox.value === "easy") {
        if (
          typingInput.value.toLowerCase() === theWord.innerHTML.toLowerCase()
        ) {
          changeTypeInpAndScore();
          // check if the array Of Words has Words
          if (arrayOfWords.length > 0) {
            accorToWordsLevel(easyWords, normalWords, difficultWords);
          } else {
            completeLevel();
            getPlayerScore();
          }
        } else {
          lostGame();
          getPlayerScore();
        }
      } else if (levelsBox.value === "normal") {
        // check if level normal of game and his options & compar words
        if (typingInput.value === theWord.innerHTML) {
          changeTypeInpAndScore();
          // check if the array Of Words has Words
          if (arrayOfWords.length > 0) {
            accorToWordsLevel(easyWords, normalWords, difficultWords);
          } else {
            console.log(typingInput.value);
            console.log(theWord.innerHTML);
            completeLevel();
            getPlayerScore();
          }
        } else {
          console.log(typingInput.value);
          console.log(theWord.innerHTML);
          lostGame();
          getPlayerScore();
        }
      } else {
        // check if level difficult of game and his options & compar words
        if (
          levelsBox.value === "difficult" &&
          typingInput.value === theWord.innerHTML
        ) {
          changeTypeInpAndScore();
          // check if the array Of Words has Words
          if (arrayOfWords.length > 0) {
            accorToWordsLevel(easyWords, normalWords, difficultWords);
          } else {
            completeFinalLevel();
            getPlayerScore();
          }
        } else {
          lostGame();
          getPlayerScore();
        }
      }
    }
  }, 1000);
};

const changeTypeInpAndScore = () => {
  typingInput.value = "";
  gotPointScored.innerHTML++;
};

// player won in level
const completeLevel = () => {
  Swal.fire({
    icon: "success",
    title: `Congratulations, You Won The ${
      levelsBox.value.slice(0, 1).toUpperCase() + levelsBox.value.slice(1)
    } Level`,
    text: `Do You Want To Play The Next Level`,
    showDenyButton: true,
  });
  document.addEventListener("click", (e) => {
    // if the player want to transform to next level
    if (e.target.classList.contains("swal2-confirm")) {
      // check of current level to make action
      if (levelsBox.value === "easy") {
        // actions to transform to next level
        theWord.innerHTML = "";
        levelsBox.value = "normal";
        whenSelectLevel("normal");
        startGameBtn.style.display = "block";
        // check of current level to make action
      } else if (levelsBox.value === "normal") {
        // actions to transform to next level
        theWord.innerHTML = "";
        levelsBox.value = "difficult";
        whenSelectLevel("difficult");
        startGameBtn.style.display = "block";
      }
      // the player do not want to transform to next level
    } else if (e.target.classList.contains("swal2-deny")) {
      location.reload();
    }
  });
};

// player lost the game
const lostGame = () => {
  Swal.fire({
    icon: "error",
    title: "Oops..., You Lost",
    text: "Try Again",
  });
  document
    .querySelector(".swal2-confirm")
    .addEventListener("click", () => location.reload());
};

// player won in last level
const completeFinalLevel = () => {
  Swal.fire({
    icon: "success",
    title: `You won The Last Level In Game, Congratulations...`,
    text: `The Game Is End`,
  });
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("swal2-confirm")) {
      location.reload();
    }
  });
};

// get player level & score & date & save to local Storage
const getPlayerScore = () => {
  const playerInfo = {
    playerScore: gotPointScored.innerHTML,
    gameDate: new Date().toLocaleString("ea-EG"),
    LevelPlay: levelsBox.value,
  };
  localStorage.setItem("playerInfo", JSON.stringify(playerInfo));
};
