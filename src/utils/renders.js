const renders = {
  logo: (webpImg, pngImg, src, alt) => {
    return (
      <picture>
        <source srcSet={webpImg} type="image/webp" />
        <source srcSet={pngImg} type="image/png" />
        <img src={src} type="image/png" width="100em" height="auto" alt={alt} />
      </picture>
    );
  },
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
    1400: {
      items: 4,
    },
    2200: {
      items: 5,
    },
  },
};

export default renders;
