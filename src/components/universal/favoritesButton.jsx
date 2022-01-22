import React, { useContext } from "react";
import { InventoryContext } from "../../contexts/inventoryContext";
import { GeneralContext } from "../../contexts/generalContext";
import "../../App.css";
import Icon from "./icon";

const FavoritesButton = (props) => {
  const inventory = useContext(InventoryContext);
  const general = useContext(GeneralContext);

  const button = () => {
    if (!inventory.inventory.favs[props.word]) {
      return (
        <Icon
          cls={"far fa-star cursor-pointer"}
          onClickAction={() => {
            inventory.addToFavorite(props.word, props.definition);
            general.showToast("Added to favorites.");
          }}
        />
      );
    } else {
      return (
        <Icon
          cls={"fas fa-star cursor-pointer"}
          onClickAction={() => {
            inventory.removeFromFavorite(props.word);
            general.showToast("Removed from favorites.");
          }}
        />
      );
    }
  };
  return button();
};

export default FavoritesButton;
