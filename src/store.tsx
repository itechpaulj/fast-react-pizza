import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import createSlice from "./features/cart/CreateSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: createSlice,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
