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

export const responsiveImage = (imageCategory, image, alt, cls) => {
  return (
    <picture>
      <source
        type="image/webp"
        media="(max-width: 960px)"
        srcSet={require(`../images/${imageCategory}/960/${image}.webp`).default}
      />
      <source
        type="image/jpg"
        media="(max-width: 960px)"
        srcSet={require(`../images/${imageCategory}/960/${image}.jpg`).default}
      />
      <source
        type="image/webp"
        media="(max-width: 1280px)"
        srcSet={
          require(`../images/${imageCategory}/1280/${image}.webp`).default
        }
      />
      <source
        type="image/jpg"
        media="(max-width: 1280px)"
        srcSet={require(`../images/${imageCategory}/1280/${image}.jpg`).default}
      />
      <source
        type="image/webp"
        media="(max-width: 1920px)"
        srcSet={
          require(`../images/${imageCategory}/1920/${image}.webp`).default
        }
      />
      <source
        type="image/jpg"
        media="(max-width: 1920px)"
        srcSet={require(`../images/${imageCategory}/1920/${image}.jpg`).default}
      />

      <img
        className={`${cls}`}
        alt={`${alt}`}
        src={require(`../images/${imageCategory}/1920/${image}.jpg`).default}
        type="image/jpg"
      />
    </picture>
  );
};

export default renders;
