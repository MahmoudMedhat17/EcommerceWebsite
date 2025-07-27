import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from "@/store/categories/CategoriesSlice";
import ProductsSlice from "@/store/products/ProductsSlice";

export const ReduxStore = configureStore({
  reducer: {
    categories: categoriesSlice,
    products:ProductsSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof ReduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof ReduxStore.dispatch;