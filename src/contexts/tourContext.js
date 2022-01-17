import React, { useState, useEffect } from "react";

export const TourContext = React.createContext();
TourContext.displayName = "TourContext";

export const initialTourData = {
  tour: false,
};

const TourDataProvider = (props) => {
  const [tourData, setTourData] = useState(
    JSON.parse(localStorage.getItem("tourData")) || initialTourData
  );

  useEffect(() => {
    localStorage.setItem("tourData", JSON.stringify(tourData));
  }, [tourData]);

  const handleSetTour = (state) => {
    const tourDataDummy = { ...tourData };
    tourDataDummy.tour = state;
    setTourData(tourDataDummy);
  };

  return (
    <TourContext.Provider
      value={{
        tour: tourData.tour,
        setTour: handleSetTour,
      }}
    >
      {props.children}
    </TourContext.Provider>
  );
};

export default TourDataProvider;
