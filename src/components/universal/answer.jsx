import React, { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { InventoryContext } from "../../contexts/inventoryContext";
import GeneralContext from "../../contexts/generalContext";
import "../../App.css";

const Answer = (props) => {
  const user = useContext(UserContext);
  const inventory = useContext(InventoryContext);
  const general = useContext(GeneralContext);

  const handleStory = (planet) => {
    if (planet === "bathea") {
      if (inventory.inventory.credits >= 25000) {
        inventory.subtractCredits(25000);
        user.setNarrationUnlocked(1, "axios");
        user.setDialogueShownAndCompleted(2, "bathea");
        general.showToast("Success!");
      } else {
        general.showToast("Not enough [!]");
      }
    } else if (planet === "axios") {
      user.setNarrationUnlocked(1, "desertia");
      user.setDialogueShownAndCompleted(10, "axios");
      general.showToast("Expedition prepared");
    } else if (planet === "xillon") {
      user.setNarrationUnlocked(1, "centuria");
      user.setDialogueShownAndCompleted(3, "xillon");
      general.showToast("We won!");
    }
  };

  const performASpecialActionIfAvailable = () => {
    const dialogue = user.user.dialogues[user.user.currentPlanet].find(
      (elem) => elem.id === props.questionID
    );

    if (dialogue.specialAction && !dialogue.specialAction.completed)
      return (
        <button
          className="button small"
          onClick={() => {
            handleStory(user.user.currentPlanet);
            props.showAnswer();
          }}
        >
          {dialogue.specialAction.title} ({dialogue.specialAction.requirement}
          [!])
        </button>
      );
  };

  return (
    <>
      <li className="dialogue-line">
        {
          user.user.dialogues[user.user.currentPlanet].find(
            (elem) => elem.id === props.questionID
          ).answer
        }
      </li>
      <li>{performASpecialActionIfAvailable()}</li>
      {props.showAnswer && (
        <li className="visited dialogue-line" onClick={props.showAnswer}>
          Thanks...
        </li>
      )}
    </>
  );
};

export default Answer;
