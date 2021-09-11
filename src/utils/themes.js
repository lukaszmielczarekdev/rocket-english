const themes = {
  intro: {
    setTheme: () => document.body.classList.add("intro-theme"),
    clearTheme: () => document.body.classList.remove("intro-theme"),
  },

  earth: {
    setTheme: () => document.body.classList.add("earth-theme"),
    clearTheme: () => document.body.classList.remove("earth-theme"),
  },

  mars: {
    setTheme: () => document.body.classList.add("mars-theme"),
    clearTheme: () => document.body.classList.remove("mars-theme"),
  },

  jupiter: {
    setTheme: () => document.body.classList.add("jupiter-theme"),
    clearTheme: () => document.body.classList.remove("jupiter-theme"),
  },

  saturn: {
    setTheme: () => document.body.classList.add("saturn-theme"),
    clearTheme: () => document.body.classList.remove("saturn-theme"),
  },

  uranus: {
    setTheme: () => document.body.classList.add("uranus-theme"),
    clearTheme: () => document.body.classList.remove("uranus-theme"),
  },

  neptune: {
    setTheme: () => document.body.classList.add("neptune-theme"),
    clearTheme: () => document.body.classList.remove("neptune-theme"),
  },

  pluto: {
    setTheme: () => document.body.classList.add("pluto-theme"),
    clearTheme: () => document.body.classList.remove("pluto-theme"),
  },

  mercury: {
    setTheme: () => document.body.classList.add("mercury-theme"),
    clearTheme: () => document.body.classList.remove("mercury-theme"),
  },

  venus: {
    setTheme: () => document.body.classList.add("venus-theme"),
    clearTheme: () => document.body.classList.remove("venus-theme"),
  },
};

const getTheme = (currentPlace) => {
  return themes[currentPlace];
};

export default getTheme;
