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

  const renderMercenaryAvatars = (name) => {
    if (props.hired && !props.selected) {
      return responsiveImageThumbnail(
        "mercenaries",
        name,
        "mercenary",
        "",
        () => inventory.changeMercenaryStatus([props.id], "mark")
      );
    } else if (props.hired && props.selected) {
      return responsiveImageThumbnail(
        "mercenaries",
        "Locked",
        "mercenary",
        "",
        () => inventory.changeMercenaryStatus([props.id], "release")
      );
    } else {
      return responsiveImageThumbnail("mercenaries", name, "mercenary", "");
    }
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
        {renderMercenaryAvatars(props.name)}
      </p>
      <ul className="align-center">
        <li>Lvl: {props.lvl}</li>
        <li>Price: {props.price}</li>
        <li>Strength: {props.strength}</li>
      </ul>
      {!props.hired && renderHireButton()}
      {props.hired && !props.sended && !props.selected && (
        <li>
          <button
            onClick={() => inventory.removeMercenary(props.id)}
            className="button small"
          >
            Send back
          </button>
        </li>
      )}
    </article>
  );
};

export default NpcForHireCard;
