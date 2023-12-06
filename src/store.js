import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./Redux/Reducer/UserReducer";
import { BookReducer } from "./Redux/Reducer/BookReducer";

const store = configureStore({
  reducer: {
    User: UserReducer,
    Books: BookReducer,
  },
});

export default store;
