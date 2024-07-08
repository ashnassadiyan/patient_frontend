import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import alertReducer from "./slices/alertSlice";

const reducers = {
  alertStore: alertReducer,
  todoStore: todoReducer,
};

const store = configureStore({
  reducer: reducers,
});

export default store;
