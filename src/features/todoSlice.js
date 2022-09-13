import { createSlice } from "@reduxjs/toolkit";

const initialState = { list: [] };

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    added: (state, action) => {
      state.list.push(action.payload);
    },
    deleted: (state, action) => {
      const deleteArr = state.list.filter(
        (element) => element.id !== action.payload.id
      );
      state.list = deleteArr;
    },
    updated: (state, action) => {
      state.list = action.payload;
    },
  },
});

export default todoSlice.reducer;
export const { added, deleted, updated } = todoSlice.actions;
