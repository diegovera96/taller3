import React, { useEffect, useState } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    TextInput,
    Alert,
    Button,
    ScrollView
} from 'react-native';
import { Formik } from 'formik';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import api from '../../api/auth/api';


export default function Register({ navigation }) {
    const [dateValue, setDateValue] = useState(dayjs());
    const [errors, setErrors] = useState({});

    const register = async (values, setErrors) => {
        const dateValue = dayjs(dateValue).format('DD/MM/YYYY');
        const newUser = { ...values, birth_date: dateValue };
        console.log(newUser);
        try {
            const response = await api.Register.register(newUser);
            Alert.alert("Bien!", response.message);  
            navigation.replace('Home');
        } catch (e) {
          setErrors(e.response.data.errors);
          console.log("error", e);  
        }
    }

    return (
        <SafeAreaView style={styles.container1}>
        <Formik
            enableReinitialize={true}
            initialValues={{ email: '', date: '', name: '', rut: '' }}
            onSubmit={
                (values, { setErrors }) => {
                  register(values, setErrors);
                }
            }
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.title}>Registro</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                placeholder="Nombre completo"
                />
                {errors && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              <TextInput
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Correo electrónico"
                />
                {errors && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                <TextInput
                style={styles.input}
                onChangeText={handleChange('rut')}
                onBlur={handleBlur('rut')}
                value={values.rut}
                placeholder="Rut"
                />
                {errors && errors.rut && <Text style={styles.errorText}>{errors.rut}</Text>}
                <View style={styles.datePicker}>
                    <Text style={styles.title}>Fecha de nacimiento</Text>
                    <DateTimePicker
                        value={dateValue}
                        onValueChange={(date) => setDateValue(date)}
                        minimumDate={new Date(1900, 1, 1)}
                        maximumDate={new Date()}
                        mode="date"
                    />
                </View>

              <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit}>
                <Text style={styles.buttonTextPrimary}>Registrar</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </Formik>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
      container1: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: "100%"
      },
      container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      },
      input: {
        height: 40,
        width: "100%",
        borderColor: 'gray',
        borderWidth: 1,
        margin: 5 ,
      },
      image: {
        width: "30%",
        resizeMode: 'contain',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      buttonPrimary: {
        backgroundColor: '#4200bd',
        padding: 10,
        borderRadius: 5,
        margin: 5
      },
      buttonSecondary: {
        padding: 10,
        borderRadius: 5,
        margin: 5
      },
      buttonTextPrimary: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
      },
      datePicker: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "80%",
        backgroundColor: '#fff',
        marginTop: 100
      },
      errorText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15
      }
    });