/**
 * Configuración de la tienda Redux para la aplicación.
 *
 * Este módulo configura la tienda Redux para la aplicación utilizando redux-toolkit.
 * Combina los reducers de los diferentes slices en un reducer raíz.
 * Configura redux-persist para persistir el estado de la aplicación en el almacenamiento local.
 * Exporta la tienda configurada y el persistor de redux-persist.
 *
 * @module store
 */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "../navigators/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configura redux-persist para usar AsyncStorage como almacenamiento

const persistConfig = {
  key: "root",

  storage: AsyncStorage,
};

// Combina los reducers de los diferentes slices en un reducer raíz

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

// Configura redux-persist para persistir el reducer raíz

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configura la tienda Redux con el reducer persistido

export const store = configureStore({
  reducer: persistedReducer,
});

// Crea el persistor de redux-persist

export const persistor = persistStore(store);
