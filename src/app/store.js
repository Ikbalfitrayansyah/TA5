import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";
const reduxLogger = require("redux-logger");

const logger = reduxLogger.createLogger();

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
