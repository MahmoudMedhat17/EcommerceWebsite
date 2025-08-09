import { configureStore } from '@reduxjs/toolkit';
import { persistStore, FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE, REGISTER } from 'redux-persist';
import rootReducers from './rootReducers';

export const ReduxStore = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    // Here this middleware to disable objects from Redux Persist.
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE, REGISTER]
      }
    })
});

// Here we save the ReduxStore to persistStore to use it in main file.
const presistor = persistStore(ReduxStore);

export { presistor };
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof ReduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof ReduxStore.dispatch;