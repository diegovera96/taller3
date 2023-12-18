/**
 * Módulo para gestionar la autenticación en componentes de React.
 *
 * Este módulo exporta una función de orden superior (HOC) que se puede utilizar para envolver
 * componentes de React. El componente envuelto se renderizará solo si el usuario está autenticado.
 * Si el usuario no está autenticado, se redirigirá a la pantalla de inicio de sesión.
 *
 * @module withAuthentication
 */


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';


/**
 * Función de orden superior (HOC) para gestionar la autenticación en componentes de React.
 *
 * @param {React.ComponentType} Component - El componente de React que se va a envolver.
 * @returns {React.ComponentType} Un componente de React que se renderiza solo si el usuario está autenticado.
 */
const withAuthentication = (Component) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigation = useNavigation();

    const token = useSelector(state => state.token);
    const t = jwtDecode(token);
    const id = useSelector((state) => state.user.id);

    useEffect(() => {
      setIsLoading(false);
      setIsAuthenticated(!!token);
    }, [token]);

    if (isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    if (!isAuthenticated) {
      navigation.navigate('Login');
      return null;
    }

    return <Component {...props} />;
  };
};

export default withAuthentication;