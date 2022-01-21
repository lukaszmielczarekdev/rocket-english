/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../contexts/userContext";
import { InventoryContext } from "../../contexts/inventoryContext";
import Modal from "react-modal";
import "./gapTest.css";

Modal.setAppElement(document.getElementById("root"));

const modalStyle = {
  content: {
    boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",
    borderColor: "rgb(1, 9, 27)",
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

const GapTest = (props) => {
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

  const gapTestPrize = (multiplier) => {
    user.onAddExp(500 * multiplier);
    inventory.addItems({
      credits: 500 * multiplier,
      steel: 10 * multiplier,
      aluminum: 5 * multiplier,
    });
  };

  const handleSubmitUserData = (data) => {
    let counter = 0;
    for (let [index, elem] of Object.entries(formData.current)) {
      if (elem.word === data[index]) {
        elem.guessed = true;
        counter++;
      }
    }

    makeSummaryTextColored(props.text, formData.current);

    if (props.ifPrize) {
      if (counter) {
        if (counter === Object.keys(formData.current).length) {
          user.incrementEventCounter("fillTheGapsCompleted");
        }
        setSummary([
          ["exp", 50 * counter],
          ["credits", 50 * counter],
          ["steel", 5 * counter],
          ["aluminum", 1 * counter],
        ]);
      }
      gapTestPrize(counter);
    }
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
      return props.mode !== "user" && <p>Keep learning...</p>;
    }
  };

  const makeSummaryTextColored = (text, answers) => {
    const words = text.split(" ");
    const splitted = splitText(text);

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
    setSummaryText(splitted);
  };

  const onSubmit = (data) => handleSubmitUserData(data);

  const splitText = (text) => {
    const words = {};
    const splittedText = text.split(" ");
    const filtered = [];

    for (let [index, word] of splittedText.entries()) {
      if (
        word === "the" ||
        word === "The" ||
        word === "a" ||
        word === "A" ||
        word === "an" ||
        word === "An"
      ) {
        filtered.push(
          <input
            type="text"
            {...register(String(index), {
              required: true,
              minLength: 1,
              maxLength: 3,
              pattern: /^[A-Za-z]+$/i,
            })}
          />
        );
        words[index] = { id: index, word: word, guessed: false };
      } else {
        filtered.push(word);
      }
    }

    formData.current = words;
    return filtered.map((elem, id) => <li key={id}>{elem}</li>);
  };

  return (
    <div id="gapTest" className="padding border">
      <article className="testMenu-activities-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul>{splitText(props.text)}</ul>
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
          props.resetKey(Math.random());
        }}
        contentLabel="Gap Test summary modal"
      >
        <i
          onClick={() => {
            props.resetMode(null);
            props.hideTest(false);
            props.resetKey(Math.random());
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

export default GapTest;
