import React, { useState, useRef, useContext, useEffect } from "react";
import Menu from "./menu";
import Quiz from "./quiz";
import Summary from "./quizSummary";
import getRandomWords from "../utils/wordsList";
import UserContext from "../contexts/userContext";
import InventoryContext from "../contexts/inventoryContext";
import getTheme from "../utils/themes";
import "./controller.css";

const Controller = (props) => {
  const user = useContext(UserContext);
  useEffect(() => {
    user.onSetPlanet(user.user.currentPlanet);
    const theme = getTheme(user.user.currentPlanet);
    theme.setTheme();

    return () => theme.clearTheme();
  }, [user]);

  const [showMenu, setShowMenu] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  let quizLength = useRef(0);
  let wordsList = useRef([]);
  let currentIndex = useRef(0);
  let currentWord = useRef("");
  let counter = useRef(1);
  let quizPoints = useRef(0);
  const [key, setKey] = useState(Math.random());

  const inventory = useContext(InventoryContext);

  const handleShowMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  const handleShowQuiz = () => {
    setShowQuiz((showQuiz) => !showQuiz);
  };
  const handleShowSummary = () => {
    setShowSummary((showSummary) => !showSummary);
  };

  const handleSetUpQuiz = () => {
    const inputElement = document.getElementById("submitQuizLengthFormInput");
    const inputValue = inputElement.value ? inputElement.value : 1;
    quizLength.current = inputValue;
    makeWordsList(quizLength.current);
  };

  const makeWordsList = (quizLength) => {
    const list = getRandomWords(quizLength);
    const arr = [];
    for (let word of list) {
      arr.push({
        id: list.indexOf(word),
        word: word,
        guessed: false,
        skipped: false,
        points: 0,
      });
    }
    wordsList.current = arr;
    currentWord.current = wordsList.current[currentIndex.current].word;
    handleShowQuiz();
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    const inputAnswer = document.getElementById("submitAnswerFormInput");
    const answer = inputAnswer.value;
    inputValidation(answer);
  };

  const inputValidation = (answer) => {
    console.log(wordsList.current);
    if (answer === currentWord.current) {
      wordsList.current[currentIndex.current].guessed = true;
      wordsList.current[currentIndex.current].points = 100;
      currentIndex.current += 1;
      counter.current += 1;
      if (quizLength.current >= counter.current) {
        currentWord.current = wordsList.current[currentIndex.current].word;
      }
      if (quizLength.current < counter.current) {
        quizSummary();
      }
      // forces the Quiz component to re-render with a new word by changing it's uniqe key
      setKey(Math.random());
    } else {
      alert("Try again");
    }
  };

  const handleSkipDefinition = () => {
    wordsList.current[currentIndex.current].skipped = true;
    currentIndex.current += 1;
    counter.current += 1;
    if (quizLength.current >= counter.current) {
      currentWord.current = wordsList.current[currentIndex.current].word;
    }
    if (quizLength.current < counter.current) {
      quizSummary();
    }
    setKey(Math.random());
  };

  const quizSummary = () => {
    const rawPoints = wordsList.current.reduce((total, current) => {
      return total + current.points;
    }, 0);
    quizPoints.current = rawPoints;
    inventory.addCredits(quizPoints.current / 2);
    user.onAddExp(quizPoints.current);
    counter.current = 1;
    currentIndex.current = 0;
    currentWord.current = "";
    handleShowSummary();
    handleShowQuiz();
  };

  const back = () => {
    props.history.goBack();
  };

  return (
    <div id="main">
      {showMenu && (
        <Menu
          showMenu={handleShowMenu}
          showQuiz={handleShowQuiz}
          setUpQuiz={handleSetUpQuiz}
        />
      )}
      {showQuiz && (
        <Quiz
          count={counter.current}
          len={quizLength.current}
          key={key}
          word={currentWord.current}
          submitAnswer={handleSubmitAnswer}
          skipDefinition={handleSkipDefinition}
          fillTheWord={inputValidation}
        />
      )}
      {showSummary && (
        <Summary
          summary={quizPoints.current}
          showQuiz={handleShowQuiz}
          showMenu={handleShowMenu}
          showSummary={handleShowSummary}
        />
      )}
      {showSummary && <button onClick={back}>x</button>}
    </div>
  );
};

export default Controller;
