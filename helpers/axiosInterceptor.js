import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE } from '../config';
import { ROUTES } from '../constants';
import * as RootNavigation from '../routers/RootNavigation.js';



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

    if (!error.response) {
        return new Promise((resolve, reject) => {
            reject(error)
        })
    }

    if (error.response.status === 401 || error.response.status === 402) {
        console.log('interceptors.response: hahaa')
        RootNavigation.navigate(ROUTES.LOGOUT, { tokenExpiry:true });
    } else {
        return new Promise((resolve, reject) => {
            reject(error)
        })
    }

    
})

export { api };
