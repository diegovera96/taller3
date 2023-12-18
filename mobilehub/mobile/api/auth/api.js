import axios from "axios";
const publicIp = process.env.REACT_APP_PUBLIC_IP;
axios.defaults.baseURL = `http://${publicIp}:8000`; 

const responseBody = (response) => response.data;

const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    delete: (url) => axios.delete(url).then(responseBody),
  };

const Login = {
    login: (email, password) => requests.post("/api/auth/login", { email, password }),
}

const Register = {
    register: ( newUser ) => requests.post("/api/auth/register", newUser),
}

const Update = {
    update: ( user ) => requests.put(`/api/auth/update/${user.id}`, user),
}

const api = {
    Login,
    Register,
    Update,
  };

export default api;