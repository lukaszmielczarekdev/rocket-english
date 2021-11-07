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
  // const [summary, setSummary] = useState([]);

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
    // make a summary with proper answers and colored labels
    if (props.ifPrize) {
      gapTestPrize(counter);
    }
    toggleModal();
  };

  const onSubmit = (data) => handleSubmitUserData(data);

  const splitText = (text) => {
    const words = {};
    const splittedText = text.split(" ");
    const filtered = [];

    for (let [index, word] of splittedText.entries()) {
      if (word === "the" || word === "a") {
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
          <button type="submit" className="button large">
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
        <button
          className="button large"
          onClick={() => {
            toggleModal();
          }}
        >
          <Link
            to={`/galaxy/${user.user.currentPlanet}`}
            style={{ textDecoration: "none" }}
          >
            x
          </Link>
        </button>
        {/* <ul>{renderSummary()}</ul> */}
        <p>{props.text}</p>
      </Modal>
    </div>
  );
};

export default GapTest;