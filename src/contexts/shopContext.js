import React, { useState, useEffect } from "react";

export const ShopContext = React.createContext();
ShopContext.displayName = "ShopContext";

export const initialShop = {
  word: 450,
  stardust: 5000,
  steel: 3500,
  aluminum: 4000,
};

const ShopDataProvider = (props) => {
  const [shop] = useState(
    JSON.parse(localStorage.getItem("shop")) || initialShop
  );
  useEffect(() => {
    localStorage.setItem("shop", JSON.stringify(shop));
  }, [shop]);

  return (
    <ShopContext.Provider value={{ shopInventory: shop }}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopDataProvider;
