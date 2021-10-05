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
    1200: {
      items: 4,
    },
    2200: {
      items: 5,
    },
  },
};

export const responsiveImage = (imageCategory, image, alt, cls) => {
  return (
    <picture>
      <source
        type="image/webp"
        media="(max-width: 320px)"
        srcSet={require(`../images/${imageCategory}/320/${image}.webp`).default}
      />
      <source
        type="image/jpg"
        media="(max-width: 320px)"
        srcSet={require(`../images/${imageCategory}/320/${image}.jpg`).default}
      />
      <source
        type="image/webp"
        media="(max-width: 480px)"
        srcSet={require(`../images/${imageCategory}/480/${image}.webp`).default}
      />
      <source
        type="image/jpg"
        media="(max-width: 480px)"
        srcSet={require(`../images/${imageCategory}/480/${image}.jpg`).default}
      />
      <source
        type="image/webp"
        media="(max-width: 640px)"
        srcSet={require(`../images/${imageCategory}/640/${image}.webp`).default}
      />
      <source
        type="image/jpg"
        media="(max-width: 640px)"
        srcSet={require(`../images/${imageCategory}/640/${image}.jpg`).default}
      />
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
