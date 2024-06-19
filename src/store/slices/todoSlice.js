import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    addToDo: (state, action) => {
      const todo = { text: action.payload };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((t) => t.text !== action.payload);
    },
  },
});

export const { addToDo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
