export const handleColorClass = (elem, condition) => {
  return elem[1] === condition ? "color-lose" : "color-win";
};

export const renderSummary = (summary, tag) => {
  if (summary.length !== 0 && !summary.includes(tag)) {
    return summary.map((element) => (
      <li className="color-win" key={element[0]}>
        +{element[1]} {element[0]}{" "}
      </li>
    ));
  } else if (summary.length !== 0) {
    return (
      <>
        <li>The expedition was attacked.</li>
        {summary.map((element, index) => (
          <li className={handleColorClass(element, "was killed.")} key={index}>
            {element[0]} {element[1]}
          </li>
        ))}
      </>
    );
  } else {
    return <p className="color-lose">Nothing found</p>;
  }
};
