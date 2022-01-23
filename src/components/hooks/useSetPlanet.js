/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { GeneralContext } from "../../contexts/generalContext";

const useSetPlanet = (planet) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  useEffect(() => {
    general.setGamePaused(false);
    user.onSetPlanet(planet);
  }, []);
};

export default useSetPlanet;
