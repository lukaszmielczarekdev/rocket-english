/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import LinkButton from "../universal/linkButton";
import Nav from "../nav";
import Footer from "../footer";
import { InventoryContext } from "../../contexts/inventoryContext";
import { UserContext } from "../../contexts/userContext";
import TaskContext from "../../contexts/taskContext";
import { GeneralContext } from "../../contexts/generalContext";
import NpcForHireCard from "../universal/npcForHireCard";
import AliceCarousel from "react-alice-carousel";
import renders from "../../utils/renders";
import ActionButton from "../universal/actionButton";
import Header from "../universal/header";
import "react-alice-carousel/lib/alice-carousel.css";
import "./inventory.css";
import "./favorites.css";
import "../planets/planet.css";

const Inventory = (props) => {
  const user = useContext(UserContext);
  const inventory = useContext(InventoryContext);
  const general = useContext(GeneralContext);
  const task = useContext(TaskContext);
  const mercenaries = useRef(null);

  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(user.user.currentPlanet);
  }, []);

  const addATaskToQueue = (id, difficulty, delay) => {
    const taskDataDummy = JSON.parse(JSON.stringify(task.task));
    taskDataDummy.taskQueue.push({
      id: id,
      taskName: "expedition",
      difficulty: difficulty,
      delay: delay,
      startingTurnNumber: general.general.currentTurnNumber + delay,
    });

    task.updateTaskData(taskDataDummy);
  };

  const showHiredMercenaries = () => {
    const hired = inventory.inventory.mercenaries.filter(
      (merc) => merc.hired && merc.alive && !merc.sended
    );

    if (hired.length !== 0) {
      return hired.map((elem) => (
        <NpcForHireCard
          id={elem.id}
          name={elem.name}
          lvl={elem.lvl}
          price={elem.price}
          strength={elem.strength}
          hired={elem.hired}
          selected={elem.selected}
          sended={elem.sended}
          alive={elem.alive}
        />
      ));
    } else {
      return null;
    }
  };

  const renderInventory = () => {
    const items = [];
    for (let [item, amount] of Object.entries(inventory.inventory)) {
      if (
        item !== "favs" &&
        item !== "mercenaries" &&
        item !== "expeditions" &&
        amount
      ) {
        items.push([item, amount]);
      }
    }
    return items.map((element) => (
      <li key={element[0]}>
        {element[0]} - {element[1]}{" "}
      </li>
    ));
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

  mercenaries.current = showHiredMercenaries();

  const countExpeditionETA = (name) => {
    const ETA =
      task.task.taskQueue.find((task) => task.taskName === name)
        .startingTurnNumber - general.general.currentTurnNumber;

    return ETA > 1 ? `ETA: ${ETA} turns.` : `ETA: ${ETA} turn.`;
  };

  return (
    <main className="inventory-wrapper flex-auto">
      <Nav />
      <div id="inventory-container">
        {renderOrRedirect("inventory")}
        <section className="planet-container main-background border border-radius padding margin-block-planet-container margin-bottom-2rem">
          <section id="inventory" className="padding border">
            <article>
              <Header headerSize={"h3"} header={"inventory"} />
              <ul>{renderInventory()}</ul>
            </article>
          </section>
          <article id="mercenaries" className="planet-activities-container">
            <Header headerSize={"h3"} header={"mercenaries"} />
            {mercenaries.current && (
              <AliceCarousel
                controlsStrategy={"responsive"}
                responsive={renders.carousel}
                keyboardNavigation
                infinite
                items={mercenaries.current}
              />
            )}
            {!mercenaries.current && (
              <p className="place-description">
                No mercenaries available. <br />
                Visit a bar to hire someone.
              </p>
            )}
          </article>
          <section className="padding border">
            <article>
              <Header headerSize={"h3"} header={"expedition"} />
              {!mercenaries.current && (
                <p className="place-description">
                  You need at least one mercenary to proceed.
                </p>
              )}

              {inventory.getHiredAndSelectedMercenaries().length !== 0 &&
                task.task.taskQueue.length === 0 && (
                  <>
                    <ActionButton
                      callbackFnc={() => {
                        addATaskToQueue(Date.now(), 0.5, 1);
                        inventory.changeMercenaryStatus(
                          inventory
                            .getHiredAndSelectedMercenaries()
                            .map((merc) => merc.id),
                          "sended"
                        );
                      }}
                      cls={"button small"}
                      title={"Send (easy)"}
                    />
                    <ActionButton
                      callbackFnc={() => {
                        addATaskToQueue(Date.now(), 1, 1);
                        inventory.changeMercenaryStatus(
                          inventory
                            .getHiredAndSelectedMercenaries()
                            .map((merc) => merc.id),
                          "sended"
                        );
                      }}
                      cls={"button small"}
                      title={"Send (medium)"}
                    />
                    <ActionButton
                      callbackFnc={() => {
                        addATaskToQueue(Date.now(), 2, 1);
                        inventory.changeMercenaryStatus(
                          inventory
                            .getHiredAndSelectedMercenaries()
                            .map((merc) => merc.id),
                          "sended"
                        );
                      }}
                      cls={"button small"}
                      title={"Send (hard)"}
                    />
                    <ActionButton
                      callbackFnc={() => {
                        addATaskToQueue(Date.now(), 3, 1);
                        inventory.changeMercenaryStatus(
                          inventory
                            .getHiredAndSelectedMercenaries()
                            .map((merc) => merc.id),
                          "sended"
                        );
                      }}
                      cls={"button small"}
                      title={"Send (impossible)"}
                    />
                  </>
                )}
              {mercenaries.current &&
                inventory.getHiredAndSelectedMercenaries().length === 0 &&
                task.task.taskQueue.length === 0 && (
                  <p>No mercenaries selected.</p>
                )}
              {task.task.taskQueue.length > 0 && (
                <p>
                  Expedition in progress... <br />
                  {countExpeditionETA("expedition")}
                </p>
              )}
            </article>
          </section>
          <LinkButton destination={user.user.currentPlanet} title={"go back"} />
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Inventory;
