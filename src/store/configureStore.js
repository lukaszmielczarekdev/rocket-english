import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const configStore = () => {
  return configureStore({ reducer });
};

export default configStore;
