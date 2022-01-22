import React, { useContext } from "react";
import { InventoryContext } from "../../contexts/inventoryContext";

const FavoritesCard = (props) => {
  const inventory = useContext(InventoryContext);
  return (
    <article className="padding-places border carousel-card">
      <div className="fav-title">
        <h4>{props.title}</h4>
        <i
          onClick={() => inventory.removeFromFavorite(props.title)}
          class="fas fa-times fav-del-button cursor-pointer"
        ></i>
      </div>
      <p className="align-center">{props.description}</p>
    </article>
  );
};

export default FavoritesCard;
