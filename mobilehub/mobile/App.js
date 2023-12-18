import * as React from "react";
//Import navigators
import RootStack from "./navigators/RootStack";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootStack />
      </PersistGate>
    </Provider>
  );
};

export default App;
