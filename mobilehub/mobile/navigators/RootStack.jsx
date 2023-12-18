import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { 
  Image,
  View
} from "react-native";
import { logout } from "./userSlice";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

const Stack = createStackNavigator();
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Home from "../features/user/Home";
import Repo from "../features/user/Repo";
import Edit from "../features/user/Edit";
import { useSelector } from "react-redux";
import { selectId } from "./userSlice";


/**
 * Componente RootStack
 *
 * Este componente define la navegación de la aplicación utilizando un stack navigator de React Navigation.
 * Define varias pantallas (Login, Register, Home, Repo, Edit) y la lógica para cerrar la sesión del usuario.
 *
 * @component
 */
function RootStack() {
  const isAuth = useSelector(selectId);
  const dispatch = useDispatch();


    /**
   * Maneja el cierre de sesión del usuario.
   *
   * Despacha la acción de cierre de sesión, elimina el token de acceso del almacenamiento y navega a la pantalla de inicio de sesión.
   *
   * @param {object} navigation - El objeto de navegación de React Navigation.
   */
  const handleLogout = async (navigation) => {
    try {
      console.log("cerrando sesión");
      dispatch(logout());
      await AsyncStorage.removeItem("AccessToken");
      navigation.replace("Iniciar sesión");
      console.log("sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator

        initialRouteName="Iniciar sesión"
      >
        {!isAuth && (
          <>
            <Stack.Screen name="Iniciar sesión" component={Login} />
            <Stack.Screen name="Registrar" component={Register} />
          </>
        )}
                <Stack.Screen 
          name="Home" 
          component={Home} 
          options={({ navigation }) => ({
            headerRight: () => (
              <View style={{ flexDirection: "row" }}>
                <Icon
                  name="sign-out"
                  type="font-awesome"
                  color="#ff0000"
                  onPress={() => {
                    handleLogout(navigation);
                  }}
                  containerStyle={{ marginRight: 10 }}
                />
              </View>
            ),
            headerLeft: () => (
              <View style={{ flexDirection: "row" }}>
                <Icon
                  name="edit" 
                  type="font-awesome"
                  color="#0000ff" 
                  onPress={() => {
                    navigation.navigate('Edit'); 
                  }}
                  containerStyle={{ marginRight: 10 }}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen name="Edit" component={Edit} />
        <Stack.Screen name="Repo" component={Repo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
