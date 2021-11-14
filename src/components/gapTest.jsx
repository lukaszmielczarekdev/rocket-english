/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import InventoryContext from "../contexts/inventoryContext";
import Modal from "react-modal";
import "./gapTest.css";

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

const GapTest = (props) => {
  const { register, handleSubmit } = useForm();
  const formData = useRef();
  const [modalTrigger, setModalTrigger] = useState(false);
  const [summary, setSummary] = useState([]);

  const toggleModal = () => {
    setModalTrigger(!modalTrigger);
  };

  const user = useContext(UserContext);
  const inventory = useContext(InventoryContext);
  const general = useContext(GeneralContext);

  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const gapTestPrize = (multiplier) => {
    user.onAddExp(500 * multiplier);
    inventory.addItems({
      credits: 500 * multiplier,
      steel: 10 * multiplier,
      aluminum: 5 * multiplier,
      crystal: 1 * multiplier,
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

    if (props.ifPrize) {
      if (counter) {
        setSummary([
          ["exp", 500 * counter],
          ["credits", 500 * counter],
          ["steel", 10 * counter],
          ["aluminum", 5 * counter],
          ["crystal", 1 * counter],
        ]);
      }
      gapTestPrize(counter);
    }
    toggleModal();
  };
  const renderSummary = () => {
    if (summary.length !== 0) {
      return summary.map((element) => (
        <li key={element[0]}>
          + {element[1]} {element[0]}{" "}
        </li>
      ));
    } else {
      return <p>Keep learning...</p>;
    }
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
        words[index] = { word: word, guessed: false };
      } else {
        filtered.push(word);
      }
    }
    formData.current = words;
    return filtered.map((elem) => <li key={filtered.indexOf(elem)}>{elem}</li>);
  };

  return (
    <div id="gapTest" className="padding border">
      <article className="gapTest-activities-container">
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
        onRequestClose={toggleModal}
        contentLabel="Test summary modal"
      >
        <Link to={`/${user.user.currentPlanet}`}>
          <i onClick={toggleModal} class="far fa-times-circle modal-button"></i>
        </Link>
        <ul>{renderSummary()}</ul>
        <p className="modal-description">{props.text}</p>
      </Modal>
    </div>
  );
};

export default GapTest;
