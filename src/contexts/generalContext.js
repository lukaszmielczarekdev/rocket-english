import React, { useState, useEffect } from "react";
import { availablePlanets } from "../utils/planetAccess";
import { ToastContainer, toast } from "react-toastify";

export const GeneralContext = React.createContext();
GeneralContext.displayName = "GeneralContext";

const GeneralDataProvider = (props) => {
  // checks if any data exists in the localStorage and replaces the null object if needed
  const getData = (localStorageData, initialData) => {
    let data = localStorage.getItem(localStorageData);
    if (data === null) {
      data = JSON.stringify(initialData);
    }
    return data !== JSON.stringify(initialData)
      ? JSON.parse(data)
      : initialData;
  };

  // general data
  const initialGeneralData = {
    newGame: true,
    gamePaused: false,
    currentTurnNumber: 0,
    availablePlanets: availablePlanets,
  };

  const [generalData, setGeneralData] = useState(
    getData("generalData", initialGeneralData)
  );

  useEffect(() => {
    localStorage.setItem("generalData", JSON.stringify(generalData));
  }, [generalData]);

  const handleIncrementTurnCounter = () => {
    const generalDataDummy = { ...generalData };
    generalDataDummy.currentTurnNumber += 1;
    setGeneralData(generalDataDummy);
  };

  const handleSetGamePaused = (state) => {
    const generalDataDummy = { ...generalData };
    generalDataDummy.gamePaused = state;
    setGeneralData(generalDataDummy);
  };

  const handleSetNewGame = (state) => {
    const generalDataDummy = { ...generalData };
    generalDataDummy.newGame = state;
    setGeneralData(generalDataDummy);
  };

  const handleMultipleChanges = (param1, value1, param2, value2) => {
    const generalDataDummy = { ...generalData };
    generalDataDummy[param1] = value1;
    generalDataDummy[param2] = value2;
    setGeneralData(generalDataDummy);
  };

  const handleSetLogin = (state) => {
    const generalDataDummy = { ...generalData };
    generalDataDummy.login = state;
    setGeneralData(generalDataDummy);
  };

  const handleSetAvailablePlanet = (planet) => {
    const generalDataDummy = { ...generalData };
    for (const [key] of Object.entries(generalData.availablePlanets)) {
      if (key === planet) {
        generalDataDummy.availablePlanets[key].available = true;
      } else {
        generalDataDummy.availablePlanets[key].available = false;
      }
    }
    setGeneralData(generalDataDummy);
  };

  // toast
  const notify = (text) => toast(text);

  return (
    <GeneralContext.Provider
      value={{
        incrementTurnCounter: handleIncrementTurnCounter,
        setGamePaused: handleSetGamePaused,
        setNewGame: handleSetNewGame,
        setLogin: handleSetLogin,
        general: generalData,
        planets: generalData.availablePlanets,
        setAvailablePlanet: handleSetAvailablePlanet,
        changeMultiple: handleMultipleChanges,
        showToast: notify,
      }}
    >
      <>
        {props.children}
        <div id={"toast-container"}>
          <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop
            closeOnClick
            closeButton={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
            theme={"dark"}
            limit={3}
          />
        </div>
      </>
    </GeneralContext.Provider>
  );
};

export default GeneralDataProvider;
