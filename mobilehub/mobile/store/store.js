import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "../navigators/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",

  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
