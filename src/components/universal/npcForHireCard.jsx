import React, { useContext } from "react";
import InventoryContext from "../../contexts/inventoryContext";
import { responsiveImageThumbnail } from "../../utils/renders";
import "./npcForHireCard.css";

const NpcForHireCard = (props) => {
  const inventory = useContext(InventoryContext);

  const renderHireButton = () => {
    return inventory.inventory.credits >= props.price ? (
      <button
        onClick={() => inventory.hireMercenary(props.id)}
        className="button small margin-1rem"
      >
        Hire
      </button>
    ) : (
      <button className="button small margin-1rem">Not enough [!]</button>
    );
  };

  return (
    <article
      id="mercenaries-list"
      className="padding-places border carousel-card"
    >
      <header className="fav-title">
        <h4>{props.name}</h4>
      </header>
      <p className="thumbnail logo-place image fit margin-bottom-0">
        {responsiveImageThumbnail(
          "planet-images",
          "thumbnail-rocket",
          "mercenary"
        )}
      </p>
      <ul className="align-center">
        <li>Lvl: {props.lvl}</li>
        <li>Price: {props.price}</li>
        <li>Strength: {props.strength}</li>
      </ul>

      {!props.hired && renderHireButton()}
      {props.hired && (
        <button
          onClick={() => inventory.removeMercenary(props.id)}
          className="button small margin-1rem"
        >
          Dismiss
        </button>
      )}
    </article>
  );
};

export default NpcForHireCard;
