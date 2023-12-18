// Formik x React Native example
import React, { useEffect } from 'react';
import { 
  TextInput, 
  View, 
  StyleSheet, 
  Image, 
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Formik } from 'formik';
import api from '../../api/auth/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { login } from "../../navigators/userSlice";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const id = useSelector(state => state.id);

  const handleLogin = async (credentials) => {
    try {
      const response = await api.Login.login(credentials.email, credentials.password);
      const token = response.access_token;
      dispatch(login(token));
      navigation.replace('Home');
    } catch (e) { 
      Alert.alert("Error", "Usuario o contraseña incorrectos");
      console.log("error", e);
    }
  }

  const handleRegister = async () => {
    navigation.navigate('Register');
  }

  return (
    <SafeAreaView style={styles.container1}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={
          values => {
            handleLogin(values);
          }
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/logo.png')} />
            <View style={styles.containerStyle}>
              <Text style={styles.title}>Mobile Hub</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Email"
              />
              <TextInput
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Password"
                secureTextEntry={true}
              />
              <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit}>
                <Text style={styles.buttonTextPrimary}>Iniciar sesión</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonSecondary} onPress={handleRegister}>
                <Text style={styles.buttonTextSecondary}>Registrarse</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: "100%"
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 250,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5 ,
  },
  image: {
    height: "30%",
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonPrimary: {
    backgroundColor: '#4200bd',
    width: "40%",
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    margin: 5
  },
  buttonSecondary: {
    padding: 10,
    width: "40%",
    alignItems: 'center',
    borderRadius: 5,
    margin: 5
  },
  buttonTextPrimary: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  buttonTextSecondary: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15
  },
  containerStyle: {
    backgroundColor: 'white',
    paddingBottom: 10,
    width: "100%",
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  paperProvider: {
    backgroundColor: 'white',
    width: "100%",
  },
  portal: {
    backgroundColor: 'white',
    width: "100%",
  },

  textModal: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  }
});