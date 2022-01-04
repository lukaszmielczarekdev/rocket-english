import React, { useEffect, useContext } from "react";
import { InventoryContext } from "../../contexts/inventoryContext";
import { UserContext } from "../../contexts/userContext";
import { GeneralContext } from "../../contexts/generalContext";
import TaskContext from "../../contexts/taskContext";
import Emitter from "../../utils/emitter";

const Expedition = (props) => {
  const user = useContext(UserContext);
  const task = useContext(TaskContext);
  const inventory = useContext(InventoryContext);
  const general = useContext(GeneralContext);

  useEffect(() => {
    Emitter.on("START_AN_EXPEDITION", (expeditionTask) => {
      startAnExpedition(expeditionTask);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task.taskQueue]);

  const expeditionSummary = (object) => {
    const items = [];
    for (let [item, amount] of Object.entries(object)) {
      items.push([item, amount]);
    }
    Emitter.emit("SEND_CONTENT", items);
  };

  const handleFightIfLose = (difficulty) => {
    let defendedCounter = 0;
    const killedMercenaries = [];
    const fightingMercenaries = [];
    const selectedMercenaries = inventory.getHiredAndSendedMercenaries();

    const numberOfAttacked = Math.floor(Math.random() * difficulty);

    for (let i = 0; i < numberOfAttacked; i++) {
      let randomAliveMercenaries = selectedMercenaries.filter(
        (merc) => merc.alive
      );

      let randomMercenary =
        randomAliveMercenaries[
          Math.floor(Math.random() * randomAliveMercenaries.length)
        ];

      if (randomMercenary) {
        if (randomMercenary.strength / difficulty <= difficulty * 10) {
          randomMercenary.alive = false;
          killedMercenaries.push(randomMercenary.id);
          fightingMercenaries.push([randomMercenary.name, "was killed."]);
        } else {
          if (defendedCounter < 1) {
            fightingMercenaries.push([randomMercenary.name, "was defended."]);
            defendedCounter++;
          }
        }
      }
    }

    if (numberOfAttacked === 0) {
      fightingMercenaries.unshift([
        "The crew withdrew",
        "and nobody was hurt.",
      ]);
    } else if (numberOfAttacked > 0) {
      fightingMercenaries.unshift(" ");
    }

    inventory.changeMercenaryStatus([killedMercenaries], "dead");

    Emitter.emit("SEND_CONTENT", fightingMercenaries);
  };

  const handleDifficultyLevels = (difficulty) => {
    if (difficulty === 0.5) {
      return ["loser", "winner", "winner"];
    } else if (difficulty === 1) {
      return ["loser", "winner"];
    } else if (difficulty === 2) {
      return ["loser", "loser", "winner"];
    } else if (difficulty === 3) {
      return ["loser", "loser", "loser", "winner"];
    }
  };

  const startAnExpedition = (givenTask) => {
    general.setNewGame(false);
    const [task, location] = givenTask;
    const founds = {};
    const winRate = [1.2, 1.5, 2.2];
    const loseOrWin = handleDifficultyLevels(task.difficulty);
    const result = loseOrWin[Math.floor(Math.random() * loseOrWin.length)];
    if (result === "loser") {
      handleFightIfLose(task.difficulty);
      inventory.changeMercenaryStatus(
        inventory.getHiredAndSendedMercenaries().map((merc) => merc.id),
        "back"
      );
      Emitter.emit("SHOW_MODAL", true);
    } else {
      const rate = winRate[Math.floor(Math.random() * winRate.length)];
      const credits = Math.floor(task.difficulty * rate * 500);
      const exp = Math.floor(task.difficulty * rate * 150);
      const steel = Math.floor(task.difficulty * rate * 5) + 1;
      const aluminum = Math.floor(task.difficulty * rate * 3) + 1;
      const crystal = Math.floor(task.difficulty * rate * 1) + 1;
      founds["credits"] = credits;
      founds["exp"] = exp;
      founds["steel"] = steel;
      founds["aluminum"] = aluminum;
      founds["crystal"] = crystal;
      expeditionSummary(founds);

      user.expeditionUserData(exp, location);
      general.setAvailablePlanet(location);
      inventory.expeditionInventoryData(
        {
          credits: credits,
          steel: steel,
          aluminum: aluminum,
          crystal: crystal,
        },
        inventory.getHiredAndSendedMercenaries().map((merc) => merc.id),
        "back"
      );
      Emitter.emit("SHOW_MODAL", true);
    }
  };

  return <></>;
};

export default Expedition;
