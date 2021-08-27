import React, { useState, useRef } from "react";
import Menu from "./menu";
import Quiz from "./quiz";
import getRandomWords from "../utils/wordsList";

const Controller = (props) => {
  const [showMenu, setShowMenu] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  let quizLength = useRef(0);
  let wordsList = useRef([]);
  let currentIndex = useRef(0);
  let currentWord = useRef("");
  let counter = useRef(1);
  const [key, setKey] = useState(Math.random());

  const handleShowMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  const handleShowQuiz = () => {
    setShowQuiz((showQuiz) => !showQuiz);
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
      currentIndex.current += 1;
      counter.current += 1;
      currentWord.current = wordsList.current[currentIndex.current].word;
      // forces the Quiz component to re-render with a new word by changing it's uniqe key
      setKey(Math.random());
    } else {
      alert("Try again");
    }
  };

  // #TODO
  // end of a quiz - summary, points++, lvl++
  // next def button
  // next game option
  // 1/50 counter above the definition

  return (
    <div>
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
        />
      )}
    </div>
  );
};

export default Controller;
