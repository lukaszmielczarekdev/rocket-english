const renders = {
  carousel: {
    0: {
      items: 1,
    },
    550: {
      items: 2,
    },
    760: {
      items: 3,
    },
    960: {
      items: 3,
    },
    1022: {
      items: 3,
    },
    1278: {
      items: 4,
    },
    1610: {
      items: 5,
    },
    2550: {
      items: 6,
    },
  },
};

export const planets = [
  "crion",
  "therion",
  "crystalia",
  "thalia",
  "bathea",
  "axios",
  "desertia",
  "xillon",
  "centuria",
];

export const modalStyle = {
  content: {
    letterSpacing: "0.05rem",
    padding: "2rem 0 2rem 0",
    textAlign: "center",
    backgroundColor: "rgb(1, 9, 27)",
    borderRadius: "15px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    maxWidth: "90%",
    maxHeight: "90%",
    transform: "translate(-50%, -50%)",
  },
};

export const responsiveImageThumbnail = (
  imageCategory,
  image,
  alt,
  cls,
  onClickAction
) => {
  return (
    <picture>
      <source
        type="image/webp"
        media="(min-width: 2560px)"
        srcSet={
          require(`../images/${imageCategory}/1920/${image}.webp`).default
        }
      />
      <source
        type="image/jpg"
        media="(min-width: 2560px)"
        srcSet={require(`../images/${imageCategory}/1920/${image}.jpg`).default}
      />
      <source
        type="image/webp"
        media="(max-width: 2560px)"
        srcSet={
          require(`../images/${imageCategory}/1280/${image}.webp`).default
        }
      />
      <source
        type="image/jpg"
        media="(max-width: 2560px)"
        srcSet={require(`../images/${imageCategory}/1280/${image}.jpg`).default}
      />
      <source
        type="image/webp"
        media="(max-width: 1280px)"
        srcSet={require(`../images/${imageCategory}/960/${image}.webp`).default}
      />
      <source
        type="image/jpg"
        media="(max-width: 1280px)"
        srcSet={require(`../images/${imageCategory}/960/${image}.jpg`).default}
      />
      <img
        onClick={onClickAction}
        className={`${cls}`}
        alt={`${alt}`}
        src={require(`../images/${imageCategory}/1920/${image}.jpg`).default}
        type="image/jpg"
      />
    </picture>
  );
};

export default renders;
