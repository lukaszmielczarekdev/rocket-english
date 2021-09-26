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
};

export default renders;
