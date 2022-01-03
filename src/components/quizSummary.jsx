/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import InventoryContext from "../contexts/inventoryContext";
import { UserContext } from "../contexts/userContext";
import GeneralContext from "../contexts/generalContext";
import Modal from "react-modal";

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

const Summary = (props) => {
  const [summary, setSummary] = useState([]);
  const [modalTrigger, setModalTrigger] = useState(false);

  useEffect(() => {
    quizSummary(props.wordsWithDefs);
    toggleModal();
  }, []);

  const inventory = useContext(InventoryContext);
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);

  const toggleModal = () => {
    setModalTrigger(!modalTrigger);
  };

  const quizSummary = (object) => {
    const items = [];
    for (let [item, amount] of Object.entries(object)) {
      items.push([item, amount]);
    }
    setSummary(items);
  };

  const renderAddOrRemoveButton = (word, def) => {
    if (!inventory.inventory.favs[word]) {
      return (
        <i
          className="far fa-star"
          onClick={() => {
            inventory.addToFavorite(word, def);
            general.showToast("Added to favorites.");
          }}
        ></i>
      );
    } else {
      return (
        <i
          className="fas fa-star"
          onClick={() => {
            inventory.removeFromFavorite(word);
            general.showToast("Removed from favorites.");
          }}
        ></i>
      );
    }
  };

  const renderSummary = () => {
    if (summary.length !== 0) {
      return summary.map((element) => (
        <li className="padding-05rem" key={element[0]}>
          {renderAddOrRemoveButton(element[0], element[1])} {element[0]} -{" "}
          {element[1]}
        </li>
      ));
    } else {
      return <p>Nothing...</p>;
    }
  };
  return (
    <div className="quiz-container flex-column width-80">
      <h3>Summary</h3>
      <ul>{renderSummary()}</ul>
      <Link
        className={"link-button"}
        to={`/${user.user.currentPlanet}`}
        style={{ textDecoration: "none" }}
      >
        <button className="button small">Go Back</button>
      </Link>
      <Modal
        style={modalStyle}
        isOpen={modalTrigger}
        onRequestClose={toggleModal}
        contentLabel="Quiz summary modal"
      >
        <i
          onClick={toggleModal}
          className="far fa-times-circle modal-button"
        ></i>
        <ul className="color-win">
          <li>+{props.summary} exp</li>
          <li>+{props.summary / 2} [!]</li>
        </ul>
      </Modal>
    </div>
  );
};

export default Summary;
