/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useContext, useEffect } from "react";
import Menu from "./menu";
import Quiz from "./quiz";
import Summary from "./quizSummary";
import { Redirect } from "react-router-dom";
import getRandomWords from "../utils/wordsList";
import UserContext from "../contexts/userContext";
import InventoryContext from "../contexts/inventoryContext";
import GeneralContext from "../contexts/generalContext";
import Modal from "react-modal";
import "./controller.css";
import "./quiz.css";

Modal.setAppElement(document.getElementById("root"));

const modalStyle = {
  content: {
    textAlign: "center",
    backgroundColor: "rgb(1, 9, 27)",
    borderRadius: "15px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Controller = (props) => {
  const user = useContext(UserContext);
  useEffect(() => {
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const general = useContext(GeneralContext);

  const [showMenu, setShowMenu] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [key, setKey] = useState(Math.random());
  const [modalTrigger, setModalTrigger] = useState(false);

  const toggleModal = () => {
    setModalTrigger(!modalTrigger);
  };

  let quizLength = useRef(0);
  let wordsList = useRef([]);
  let currentIndex = useRef(0);
  let currentWord = useRef("");
  let counter = useRef(1);
  let quizPoints = useRef(0);
  let wordsWithAnswers = useRef({});

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

  const handleSetUpQuiz = (num) => {
    const inputValue = num;
    quizLength.current = inputValue;
    makeWordsList(quizLength.current);
  };

  const handleWordsWithAnswers = (word, definition) => {
    wordsWithAnswers.current[word] = definition;
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

  const handleSubmitAnswer = (data) => {
    const answer = data;
    inputValidation(answer);
  };

  const inputValidation = (answer) => {
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
      toggleModal();
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

  const renderOrRedirect = (place) => {
    if (
      !general.general.availablePlanets[
        user.user.currentPlanet
      ].places.includes(place)
    ) {
      return <Redirect to="/space" />;
    }
  };

  return (
    <main id="quiz" className="quiz-wrapper">
      {renderOrRedirect("quiz")}
      {showMenu && (
        <Menu
          showMenu={handleShowMenu}
          showQuiz={handleShowQuiz}
          setUpQuiz={handleSetUpQuiz}
        />
      )}
      {showQuiz && (
        <Quiz
          showMenu={handleShowMenu}
          showQuiz={handleShowQuiz}
          count={counter.current}
          len={quizLength.current}
          key={key}
          word={currentWord.current}
          submitAnswer={handleSubmitAnswer}
          skipDefinition={handleSkipDefinition}
          fillTheWord={inputValidation}
          addAnswerToWord={handleWordsWithAnswers}
        />
      )}
      {showSummary && (
        <Summary
          wordsWithDefs={wordsWithAnswers.current}
          summary={quizPoints.current}
          showQuiz={handleShowQuiz}
          showMenu={handleShowMenu}
          showSummary={handleShowSummary}
        />
      )}
      <Modal
        style={modalStyle}
        isOpen={modalTrigger}
        onRequestClose={toggleModal}
        contentLabel="Quiz answer"
      >
        <ul>
          <i onClick={toggleModal} class="far fa-times-circle modal-button"></i>
          <li>Try again</li>
        </ul>
      </Modal>
    </main>
  );
};

export default Controller;
