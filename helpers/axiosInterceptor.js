import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE } from '../config';
import { ROUTES } from '../constants';
import { navigate } from '../screens/content/RootNavigators';



let headers = {};

const api = axios.create({
    baseURL: BASE,
    headers
})

api.interceptors.request.use(
    async (config) => {
   
        const token = await AsyncStorage.getItem('userToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;

    }, (error) => {
        console.log('interceptors.request:', error)
        Promise.reject(error)
})

api.interceptors.response.use(response => new Promise((resolve, reject) => {
    resolve(response);
}), error => {
    console.log('interceptors.response:', error.response.data)
    if (!error.response) {
        return new Promise((resolve, reject) => {
            reject(error)
        })
    }

    if (error.response.status === 401 ) {
        navigate(ROUTES.LOGOUT, {tokenExpired: true})
    } else {
        return new Promise((resolve, reject) => {
            reject(error)
        })
    }
})

export { api };
