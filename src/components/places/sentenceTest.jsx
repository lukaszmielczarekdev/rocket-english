/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../contexts/userContext";
import InventoryContext from "../../contexts/inventoryContext";
import Modal from "react-modal";
import "./sentenceTest.css";

Modal.setAppElement(document.getElementById("root"));

const modalStyle = {
  content: {
    padding: "2rem",
    width: "min(80%, 70rem)",
    height: "min(80%, 70rem)",
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

const SentenceTest = (props) => {
  const { register, handleSubmit } = useForm();
  const formData = useRef();
  const [modalTrigger, setModalTrigger] = useState(false);
  const [summary, setSummary] = useState([]);
  const [summaryText, setSummaryText] = useState([]);

  const toggleModal = () => {
    setModalTrigger(!modalTrigger);
  };

  const user = useContext(UserContext);
  const inventory = useContext(InventoryContext);

  const sentenceTestPrize = (multiplier) => {
    user.onAddExp(500 * multiplier);
    inventory.addItems({
      credits: 500 * multiplier,
      steel: 10 * multiplier,
      aluminum: 5 * multiplier,
    });
  };

  const addAposToObject = (elem) => {
    if (elem["word"] === "wasnt") {
      return "wasn't";
    } else if (elem["word"] === "werent") {
      return "weren't";
    } else if (elem["word"] === "isnt") {
      return "isn't";
    } else if (elem["word"] === "arent") {
      return "aren't";
    } else {
      return elem["word"];
    }
  };

  const addAposToWord = (word) => {
    if (word === "wasnt") {
      return "wasn't";
    } else if (word === "werent") {
      return "weren't";
    } else if (word === "isnt") {
      return "isn't";
    } else if (word === "arent") {
      return "aren't";
    } else {
      return word;
    }
  };

  const handleSubmitUserData = (data) => {
    let counter = 0;

    for (let [index, elem] of Object.entries(formData.current)) {
      let currentElem = elem;
      currentElem.word = addAposToObject(currentElem);
      if (elem.word.toLowerCase() === data[index].toLowerCase()) {
        elem.guessed = true;
        counter++;
      }
    }

    makeSummaryTextColored(props.text, formData.current);

    if (counter) {
      setSummary([
        ["exp", 50 * counter],
        ["credits", 50 * counter],
        ["steel", 5 * counter],
        ["aluminum", 1 * counter],
      ]);
    }
    sentenceTestPrize(counter);

    toggleModal();
  };

  const renderSummary = () => {
    if (summary.length !== 0) {
      return summary.map((element, id) => (
        <li key={id + 1000}>
          +{element[1]} {element[0]}{" "}
        </li>
      ));
    } else {
      return <p>Keep learning...</p>;
    }
  };

  const makeListItems = (items) => {
    const listItems = [];
    for (let [index, item] of Object.entries(items)) {
      if (typeof item === "string") {
        if (item === "\n") {
          listItems.push(<br />);
        } else {
          listItems.push(<li key={index}>{item}</li>);
        }
      } else {
        listItems.push(item);
      }
    }
    return listItems;
  };

  const makeSummaryTextColored = (text, answers) => {
    let words = text
      .join(" ")
      .split(" ")
      .map((elem) => addAposToWord(elem));
    const replaced = text.join(" ");
    const splitted = replaced.split(" ");

    for (let [id, answer] of Object.entries(answers)) {
      if (answer.guessed) {
        splitted[answer.id] = (
          <li key={id + 10000} className="win">
            {words[answer.id]}
          </li>
        );
      } else {
        splitted[answer.id] = (
          <li key={id + 10000} className="lose">
            {words[answer.id]}
          </li>
        );
      }
    }
    const list = makeListItems(splitted);
    setSummaryText(list);
  };

  const onSubmit = (data) => handleSubmitUserData(data);

  const splitSentences = (text) => {
    const words = {};
    const joinedSentences = text.join(" ");
    const splittedText = joinedSentences.split(" ");
    const filtered = [];

    for (let [index, word] of splittedText.entries()) {
      if (props.toReplace.includes(word.toLowerCase())) {
        filtered.push(
          <input
            type="text"
            {...register(String(index), {
              required: true,
              minLength: 1,
              maxLength: 10,
              pattern: /^[a-zA-Z ']+$/i,
            })}
          />
        );
        words[index] = { id: index, word: word, guessed: false };
      } else {
        filtered.push(word);
      }
    }
    // display-block

    formData.current = words;
    return filtered.map((elem, id) => {
      return elem === "\n" ? <br /> : <li key={id}>{elem}</li>;
    });
  };

  return (
    <div id="sentenceTest" className="padding border">
      <p>{props.title}</p>
      <article className="testMenu-activities-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul>{splitSentences(props.text)}</ul>
          <button type="submit" className="button small">
            Submit
          </button>
        </form>
      </article>
      <Modal
        style={modalStyle}
        isOpen={modalTrigger}
        onRequestClose={() => {
          props.resetMode(null);
          props.hideTest(false);
        }}
        contentLabel="Sentence Test summary modal"
      >
        <i
          onClick={() => {
            props.resetMode(null);
            props.hideTest(false);
          }}
          className="far fa-times-circle modal-button"
        ></i>
        <ul className="win">{renderSummary()}</ul>
        <ul className="list-horizontal modal-description">
          {summaryText.map((elem) => elem)}
        </ul>
      </Modal>
    </div>
  );
};

export default SentenceTest;
