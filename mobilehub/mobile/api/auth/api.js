/**
 * Módulo para gestionar las peticiones HTTP a la API.
 *
 * Utiliza la biblioteca axios para realizar las peticiones HTTP.
 * La URL base de las peticiones se configura con la IP pública proporcionada en las variables de entorno.
 */

import axios from "axios";

// Configura la URL base de axios con la IP pública proporcionada en las variables de entorno
const publicIp = process.env.REACT_APP_PUBLIC_IP;
axios.defaults.baseURL = `http://${publicIp}:8000`; 

// Extrae los datos de la respuesta HTTP
const responseBody = (response) => response.data;

// Define las funciones para realizar peticiones HTTP
const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    delete: (url) => axios.delete(url).then(responseBody),
  };

  // Define las funciones para realizar peticiones a la API de autenticación
const Login = {
    login: (email, password) => requests.post("/api/auth/login", { email, password }),
}

const Register = {
    register: ( newUser ) => requests.post("/api/auth/register", newUser),
}

const Update = {
    update: ( user ) => requests.put(`/api/auth/update/${user.id}`, user),
}

// Exporta las funciones de la API
const api = {
    Login,
    Register,
    Update,
  };

export default api;