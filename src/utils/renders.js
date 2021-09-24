const renders = {
  logo: (webpImg, pngImg, src, alt) => {
    return (
      <picture>
        <source srcset={webpImg} type="image/webp" />
        <source srcset={pngImg} type="image/png" />
        <img src={src} type="image/png" width="100em" height="auto" alt={alt} />
      </picture>
    );
  },
};

export default renders;
