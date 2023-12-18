import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';

const withAuthentication = (Component) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigation = useNavigation();

    const token = useSelector(state => state.token);
    const t = jwtDecode(token);
    console.log(t);
    const id = useSelector((state) => state.user.id);
console.log(id);

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