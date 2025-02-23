import {
  configureStore,
  combineReducers,
  Store,
  AnyAction,
} from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';

const staticReducers = {
  auth: authReducer,
};

const asyncReducers: Record<string, any> = {};

const createReducer = () =>
  combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });

export const store: Store<any, AnyAction> = configureStore({
  reducer: createReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Disable thunk middleware
    }),
});

export const injectReducer = (key: string, reducer: any) => {
  if (!asyncReducers[key]) {
    asyncReducers[key] = reducer;
    store.replaceReducer(createReducer());
  }
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
