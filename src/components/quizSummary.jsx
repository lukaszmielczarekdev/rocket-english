/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { modalStyle } from "../utils/renders";
import FavoritesButton from "./universal/favoritesButton";
import Icon from "./universal/icon";
import Modal from "react-modal";

Modal.setAppElement(document.getElementById("root"));

const Summary = (props) => {
  const [summary, setSummary] = useState([]);
  const [modalTrigger, setModalTrigger] = useState(false);

  useEffect(() => {
    quizSummary(props.wordsWithDefs);
    toggleModal();
  }, []);

  const user = useContext(UserContext);

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
  const renderSummary = () => {
    if (summary.length !== 0) {
      return summary.map((element) => (
        <li className="padding-05rem" key={element[0]}>
          <FavoritesButton word={element[0]} definition={element[1]} />{" "}
          {element[0]} - {element[1]}
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
        appElement={document.getElementById("quiz")}
        style={modalStyle}
        isOpen={modalTrigger}
        onRequestClose={toggleModal}
        contentLabel="Quiz summary modal"
      >
        <Icon
          datatestid={"summaryCloseModalButton"}
          cls={"far fa-times-circle modal-button"}
          onClickAction={toggleModal}
        />
        <ul className="color-win">
          <li>+{props.summary} exp</li>
          <li>+{props.summary / 2} [!]</li>
        </ul>
      </Modal>
    </div>
  );
};

export default Summary;
