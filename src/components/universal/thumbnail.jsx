import React from "react";
import "./thumbnail.css";

const Thumbnail = (props) => {
  return (
    <picture className={props.styles}>
      <source
        type="image/webp"
        media="(min-width: 2560px)"
        srcSet={
          require(`../../images/${props.imageCategory}/1920/${props.image}.webp`)
            .default
        }
      />
      <source
        type="image/jpg"
        media="(min-width: 2560px)"
        srcSet={
          require(`../../images/${props.imageCategory}/1920/${props.image}.jpg`)
            .default
        }
      />
      <source
        type="image/webp"
        media="(max-width: 2560px)"
        srcSet={
          require(`../../images/${props.imageCategory}/1280/${props.image}.webp`)
            .default
        }
      />
      <source
        type="image/jpg"
        media="(max-width: 2560px)"
        srcSet={
          require(`../../images/${props.imageCategory}/1280/${props.image}.jpg`)
            .default
        }
      />
      <source
        type="image/webp"
        media="(max-width: 1280px)"
        srcSet={
          require(`../../images/${props.imageCategory}/960/${props.image}.webp`)
            .default
        }
      />
      <source
        type="image/jpg"
        media="(max-width: 1280px)"
        srcSet={
          require(`../../images/${props.imageCategory}/960/${props.image}.jpg`)
            .default
        }
      />
      <img
        className="shadow-bg"
        onClick={props.onClickAction}
        alt={`${props.alt}`}
        src={
          require(`../../images/${props.imageCategory}/1920/${props.image}.jpg`)
            .default
        }
        type="image/jpg"
      />
    </picture>
  );
};

export default Thumbnail;
