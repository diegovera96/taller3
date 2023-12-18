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
    ScrollView,
    Dimensions,
} from 'react-native';
import { Formik } from 'formik';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import api from '../../api/auth/api';
import { useSelector } from 'react-redux';
import { selectToken, selectId, selectName, selectRut, selectEmail, selectBirthDate } from '../../navigators/userSlice';

export default function Edit({ navigation }) {
    const [dateValue, setDateValue] = useState(dayjs(selectBirthDate));
    const [errors, setErrors] = useState({});
    const [userData, setUserData] = useState({});
    const nameHook = useSelector(selectName);
    const rutHook = useSelector(selectRut);
    const emailHook = useSelector(selectEmail);
    const birthDateHook = useSelector(selectBirthDate);
    const id = useSelector(selectId);

    const update = async (values, setErrors) => {
        const newDateValue = dayjs(dateValue).format('DD/MM/YYYY');
        const updateUser = { ...values, birth_date: newDateValue, id: id };
        try {
            console.log("updateUser", updateUser);
            const response = await api.Update.update(updateUser);
            navigation.replace('Home');
        } catch (e) {
          setErrors(e.response.data.errors);
          console.log("error", e);  
        }
    }

    const handleReturn = async () => {
      navigation.replace('Home');
    }

    useEffect (() => {
      if (id) {
        setDateValue(birthDateHook);
        setUserData({ id: id, rut: rutHook, name: nameHook, email: emailHook });
      }
    }, [id]);

    return (
        <SafeAreaView style={styles.container1}>
        <Formik
            enableReinitialize={true}
            initialValues={{ email: userData.email, birth_date: birthDateHook, name: userData.name, rut: userData.rut, password: '', confirm_password: ''}}
            onSubmit={
                (values, { setErrors }) => {
                  update(values, setErrors);
                }
            }
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <ScrollView contentContainerStyle={styles.container} horizontal={false}>
              <View style={styles.titleContainer}>
               <Text style={styles.title}>Actualizar datos</Text>
              </View>
            <View style={ styles.inputContainer }>
            <Text style={styles.inputText}>Nombre: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                />
            </View>
                {errors && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                <View style={ styles.inputContainer }>
                <Text style={styles.inputText}>Correo electrónico: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    />
            </View>
                {errors && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <View style={ styles.inputContainer }>
            <Text style={styles.inputText}>Rut: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('rut')}
                    onBlur={handleBlur('rut')}
                    value={values.rut}
                    />
            </View>
                {errors && errors.rut && <Text style={styles.errorText}>{errors.rut}</Text>}

            <View style={ styles.inputContainer }>
                <Text style={styles.inputText}>Clave: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={true}
                    />
            </View>
                {errors && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <View style={ styles.inputContainer }>
                <Text style={styles.inputText}>Confirmar clave: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleChange('confirm_password')}
                    onBlur={handleBlur('confirm_password')}
                    value={values.confirm_password}
                    secureTextEntry={true}
                    />
            </View>
                {errors && errors.confirm_password && <Text style={styles.errorText}>{errors.confirm_password}</Text>}

            <View style={styles.datePicker}>
                <Text style={styles.title}>Fecha de nacimiento</Text>
                <DateTimePicker
                    value={values.birth_date}
                    onValueChange={(date) => setDateValue(date)}
                    minimumDate={new Date(1900, 1, 1)}
                    maximumDate={new Date()}
                    mode="date"
                />
            </View>
            <View style={ styles.buttonContainer }>
              <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit}>
                <Text style={styles.buttonTextPrimary}>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonSecondary} onPress={handleReturn}>
                <Text style={styles.buttonTextSecondary}>Cancelar</Text>
              </TouchableOpacity>
              </View>
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
        width: "100%",
        flex: 1,
      },
      container: {
        flexGrow: 1,
        width: "100%",
        alignItems: 'left',
        justifyContent: 'center',
        flex: 1,
      },
      titleContainer: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10,
      },
      inputContainer: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      },
      input: {
        height: 40,
        width: "65%",
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 5,
      },
      inputText: {
        marginLeft: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        flexDirection: 'row',
      },
      buttonPrimary: {
        backgroundColor: '#4200bd',
        padding: 10,
        borderRadius: 5,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonSecondary: {
        padding: 10,
        borderRadius: 5,
        margin: 5
      },
      buttonTextPrimary: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonTextSecondary: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 15
      },
      datePicker: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: "100%",
      },
      errorText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15
      },
      titleText: {
        alignItems: 'left',
        fontSize: 15,
        fontWeight: 'bold',
      },
    });