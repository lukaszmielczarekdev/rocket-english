import axios from "axios";

const api = {
  getWordData: async (word) => {
    const endpoint = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`;
    const response = await axios(endpoint);
    throwOnErrorStatusCode(response.status);
    const definition = getSingleWordDefinition(response.data);
    return definition.charAt(0).toUpperCase() + definition.slice(1);
  },
};

export default api;

const getSingleWordDefinition = (data) => {
  return data[0].meanings.find((elem) => elem.partOfSpeech === "noun")
    .definitions[0].definition;
};

const throwOnErrorStatusCode = (statusCode) => {
  if (statusCode >= 400) {
    throw new Error(`API responded with: ${statusCode}`);
  } else if (!statusCode) {
    throw new Error("Status code is missing");
  }
};
