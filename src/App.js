/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router";
import Welcome from "./components/places/welcome";
import NotFound from "./components/places/notFound";
import UserDataProvider from "./contexts/userContext";
import InventoryProvider from "./contexts/inventoryContext";
import ShopDataProvider from "./contexts/shopContext";
import GeneralDataProvider from "./contexts/generalContext";
import TaskDataProvider from "./contexts/taskContext";
import TourDataProvider from "./contexts/tourContext";
import Factory from "./components/places/factory";
import Shop from "./components/places/shop";
import Inventory from "./components/places/inventory";
import Favorites from "./components/places/favorites";
import Controller from "./components/places/controller";
import Casino from "./components/places/casino";
import Mine from "./components/places/mine";
import Ufo from "./components/places/ufo";
import Bar from "./components/places/bar";
import Xillon from "./components/planets/xillon";
import Centuria from "./components/planets/centuria";
import Crion from "./components/planets/crion";
import Therion from "./components/planets/therion";
import Crystalia from "./components/planets/crystalia";
import Thalia from "./components/planets/thalia";
import Bathea from "./components/planets/bathea";
import Axios from "./components/planets/axios";
import Desertia from "./components/planets/desertia";
import TestMenu from "./components/places/testMenu";
import Trophies from "./components/places/trophies";
import Help from "./components/places/help";
import Modal from "react-modal";
import { renderSummary } from "./utils/summary";
import { modalStyle } from "./utils/renders";
import Emitter from "./utils/emitter";
import Expedition from "./components/universal/expedition";
import Icon from "./components/universal/icon";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

Modal.setAppElement(document.getElementById("root"));

export const App = (props) => {
  const [modalTrigger, setModalTrigger] = useState(false);
  const [summary, setSummary] = useState([]);
  const toggleModal = () => {
    setModalTrigger(!modalTrigger);
  };

  useEffect(() => {
    Emitter.on("SEND_CONTENT", (summaryContent) => setSummary(summaryContent));
    Emitter.on("SHOW_MODAL", () => toggleModal());
  }, []);

  return (
    <TaskDataProvider>
      <TourDataProvider>
        <GeneralDataProvider>
          <ShopDataProvider>
            <InventoryProvider>
              <UserDataProvider>
                <Switch>
                  <Route path="/space" exact component={NotFound} />
                  <Route path="/ufo" component={Ufo} />
                  <Route path="/factory" component={Factory} />
                  <Route path="/casino" component={Casino} />
                  <Route path="/quiz" component={Controller} />
                  <Route path="/shop" component={Shop} />
                  <Route path="/bar" component={Bar} />
                  <Route path="/mine" component={Mine} />
                  <Route path="/favorites" component={Favorites} />
                  <Route path="/university" component={TestMenu} />
                  <Route path="/inventory" component={Inventory} />
                  <Route path="/help" component={Help} />
                  <Route path="/trophies" component={Trophies} />
                  <Route path="/xillon" component={Xillon} />
                  <Route path="/centuria" component={Centuria} />
                  <Route path="/crion" component={Crion} />
                  <Route path="/therion" component={Therion} />
                  <Route path="/crystalia" component={Crystalia} />
                  <Route path="/thalia" component={Thalia} />
                  <Route path="/bathea" component={Bathea} />
                  <Route path="/axios" component={Axios} />
                  <Route path="/desertia" component={Desertia} />
                  <Route path="/" exact component={Welcome} />
                  <Redirect to="/space" />
                </Switch>
                <Expedition />
                <Modal
                  style={modalStyle}
                  isOpen={modalTrigger}
                  onRequestClose={toggleModal}
                  contentLabel="Expedition summary modal"
                >
                  <Icon
                    cls={"far fa-times-circle modal-button"}
                    onClickAction={toggleModal}
                  />
                  <ul>
                    <li>
                      <h4>Expedition results:</h4>
                    </li>
                    {renderSummary(summary, " ")}
                  </ul>
                </Modal>
              </UserDataProvider>
            </InventoryProvider>
          </ShopDataProvider>
        </GeneralDataProvider>
      </TourDataProvider>
    </TaskDataProvider>
  );
};

export default App;
