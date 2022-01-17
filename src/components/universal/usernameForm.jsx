import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../../contexts/userContext";
import { GeneralContext } from "../../contexts/generalContext";
import { TourContext } from "../../contexts/tourContext";

const UsernameForm = (props) => {
  const user = useContext(UserContext);
  const general = useContext(GeneralContext);
  const tour = useContext(TourContext);

  let history = useHistory();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => handleSubmitUserData(data["username"]);

  const handleSubmitUserData = (data) => {
    user.onSetName(data);
    general.setAvailablePlanet("crion");
    general.general.availablePlanets["crion"].discovered = true;
    tour.setTour(false);
    history.push("/crion");
  };

  return (
    <form className="welcome-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Please enter your name"
        type="text"
        {...register("username", {
          required: true,
          minLength: 3,
          maxLength: 15,
          pattern: /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/i,
        })}
      />
      <button type="submit" className="button small">
        Play
      </button>
    </form>
  );
};

export default UsernameForm;
