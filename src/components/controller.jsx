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
  const [word, setWord] = useState("");
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
    quizLength = inputValue;
    makeWordsList(quizLength);
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
    console.log(wordsList.current);
    setWord(wordsList.current[currentIndex.current].word);
    handleShowQuiz();
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    const inputAnswer = document.getElementById("submitAnswerFormInput");
    const answer = inputAnswer.value;
    inputValidation(answer);
  };

  const inputValidation = (answer) => {
    if (answer === word) {
      wordsList.current[currentIndex.current].guessed = true;
      currentIndex.current += 1;
      setWord(wordsList.current[currentIndex.current].word);
      // forces the Quiz component to re-render with a new word by changing it's uniqe key
      setKey(Math.random());
    } else {
      alert("Try again");
    }
  };

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
        <Quiz key={key} word={word} submitAnswer={handleSubmitAnswer} />
      )}
    </div>
  );
};

export default Controller;
