import React, { useState, useEffect } from "react";
import mercenaries from "../utils/mercenaries";

export const InventoryContext = React.createContext();
InventoryContext.displayName = "InventoryContext";

export const initialUserInventory = {
  credits: 500,
  word: 1,
  stardust: 0,
  steel: 0,
  aluminum: 0,
  crystal: 0,
  favs: {},
  mercenaries: mercenaries,
};

const InventoryProvider = (props) => {
  const [userInventory, setUserInventory] = useState(
    JSON.parse(localStorage.getItem("userInventory")) || initialUserInventory
  );

  useEffect(() => {
    localStorage.setItem("userInventory", JSON.stringify(userInventory));
  }, [userInventory]);

  // credits
  const handleAddCredits = (amount) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    userInventoryDummy.credits += amount;
    setUserInventory(userInventoryDummy);
  };

  const handleSubtractCredits = (amount) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    userInventoryDummy.credits -= amount;
    setUserInventory(userInventoryDummy);
  };

  // subtract an item
  const handleSubtractItem = (item, amount) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    userInventoryDummy[item] -= amount;
    setUserInventory(userInventoryDummy);
  };

  // free item
  const handleAddItem = (item, amount) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    userInventoryDummy[item] += amount;
    setUserInventory(userInventoryDummy);
  };

  // add to favorites
  const handleAddToFavorite = (word, def) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    userInventoryDummy.favs[word] = def;
    setUserInventory(userInventoryDummy);
  };

  // remove from favorites
  const handleRemoveFromFavorite = (word) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    delete userInventoryDummy.favs[word];
    setUserInventory(userInventoryDummy);
  };

  // get hired & selected mercenaries
  const handleGetHiredAndSelectedMercenaries = () => {
    return userInventory.mercenaries.filter(
      (merc) => merc.hired && merc.selected && merc.alive && !merc.sended
    );
  };

  // get hired & sended mercenaries
  const handleGetHiredAndSendedMercenaries = () => {
    return userInventory.mercenaries.filter(
      (merc) => merc.hired && merc.alive && merc.sended
    );
  };

  // hire a mercenary
  const handleHireMercenary = (ID) => {
    const userInventoryDummy = { ...userInventory };
    const selectedMercenary = userInventoryDummy.mercenaries.find(
      (merc) => merc.id === ID
    );
    if (userInventory.credits >= selectedMercenary.price) {
      selectedMercenary.hired = true;
      userInventoryDummy.credits -= selectedMercenary.price;
      setUserInventory(userInventoryDummy);
    }
  };

  // remove a mercenary
  const handleRemoveMercenary = (ID) => {
    const userInventoryDummy = { ...userInventory };
    const selectedMercenary = userInventoryDummy.mercenaries.find(
      (merc) => merc.id === ID
    );
    selectedMercenary.hired = false;
    selectedMercenary.selected = false;
    userInventoryDummy.credits += selectedMercenary.price / 2;
    setUserInventory(userInventoryDummy);
  };

  // change mercenary status
  const handleChangeMercenaryStatus = (IDs, action) => {
    const userInventoryDummy = { ...userInventory };

    for (let mercenary of userInventoryDummy.mercenaries) {
      if (IDs.includes(mercenary.id)) {
        if (action === "mark") {
          mercenary.selected = true;
        } else if (action === "release") {
          mercenary.selected = false;
        } else if (action === "dead") {
          mercenary.alive = false;
        } else if (action === "sended") {
          mercenary.selected = false;
          mercenary.sended = true;
        } else if (action === "back") {
          mercenary.sended = false;
        }
      }
    }

    setUserInventory(userInventoryDummy);
  };

  // free multiple items
  const handleAddItems = (items) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    for (const [key, value] of Object.entries(items)) {
      userInventoryDummy[key] = userInventoryDummy[key] + value;
    }
    setUserInventory(userInventoryDummy);
  };

  // exchange multiple items
  const handleExchange = (giveItems, getItems) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    for (const [item, amount] of Object.entries(giveItems)) {
      userInventoryDummy[item] -= amount;
    }
    for (const [item, amount] of Object.entries(getItems)) {
      userInventoryDummy[item] += amount;
    }
    setUserInventory(userInventoryDummy);
  };

  // upgrade the rocket
  const handleUpgradeRocketCost = (giveItems) => {
    const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
    for (const [item, amount] of Object.entries(giveItems)) {
      userInventoryDummy[item] -= amount;
    }
    setUserInventory(userInventoryDummy);
  };

  // shop
  const handleBuyItem = (item, amount, price, multiplier) => {
    if (userInventory.credits >= price * multiplier) {
      const userInventoryDummy = JSON.parse(JSON.stringify(userInventory));
      userInventoryDummy[item] += amount;
      userInventoryDummy.credits =
        userInventoryDummy.credits - price * multiplier;
      setUserInventory(userInventoryDummy);
    }
  };

  // reset inventory
  const resetInventory = () => {
    const userInventoryDummy = { ...userInventory };
    for (let item of ["credits", "stardust", "steel", "aluminum", "crystal"]) {
      userInventoryDummy[item] = 0;
    }
    setUserInventory(userInventoryDummy);
  };

  // handle expedition data
  const handleExpeditionInventoryData = (items, IDs, action) => {
    const userInventoryDummy = { ...userInventory };
    for (const [key, value] of Object.entries(items)) {
      userInventoryDummy[key] = userInventoryDummy[key] + value;
    }
    for (let mercenary of userInventoryDummy.mercenaries) {
      if (IDs.includes(mercenary.id)) {
        if (action === "mark") {
          mercenary.selected = true;
        } else if (action === "release") {
          mercenary.selected = false;
        } else if (action === "dead") {
          mercenary.alive = false;
        } else if (action === "sended") {
          mercenary.selected = false;
          mercenary.sended = true;
        } else if (action === "back") {
          mercenary.sended = false;
        }
      }
    }

    setUserInventory(userInventoryDummy);
  };

  return (
    <InventoryContext.Provider
      value={{
        resetInventory: resetInventory,
        inventory: userInventory,
        addItem: handleAddItem,
        addItems: handleAddItems,
        buyItem: handleBuyItem,
        upgradeRocketCost: handleUpgradeRocketCost,
        exchangeItems: handleExchange,
        subtractItem: handleSubtractItem,
        addCredits: handleAddCredits,
        subtractCredits: handleSubtractCredits,
        addToFavorite: handleAddToFavorite,
        removeFromFavorite: handleRemoveFromFavorite,
        removeMercenary: handleRemoveMercenary,
        hireMercenary: handleHireMercenary,
        changeMercenaryStatus: handleChangeMercenaryStatus,
        getHiredAndSelectedMercenaries: handleGetHiredAndSelectedMercenaries,
        getHiredAndSendedMercenaries: handleGetHiredAndSendedMercenaries,
        expeditionInventoryData: handleExpeditionInventoryData,
      }}
    >
      {props.children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
