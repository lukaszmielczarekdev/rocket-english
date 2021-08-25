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
        definition: "",
        guessed: false,
        skipped: false,
      });
    }
    wordsList = arr;
    console.log(wordsList);
    setWord(wordsList[currentIndex.current].word);
    handleShowQuiz();
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
      {showQuiz && <Quiz word={word} />}
    </div>
  );
};

export default Controller;
