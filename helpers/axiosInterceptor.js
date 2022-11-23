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

api.defaults.timeout = 30000
api.defaults.timeoutErrorMessage='timeout'

api.interceptors.request.use(
    async (config) => {
   
        const token = await AsyncStorage.getItem('userToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;

    }, (error) => {
        console.log('interceptors.request code:', error.code)
        console.log('interceptors.request mess:', error.message)
        console.log('interceptors.request stack:', error.stack)
        Promise.reject(error)
})

api.interceptors.response.use(response => new Promise((resolve, reject) => {
    resolve(response);
}), error => {

    console.log('interceptors.response code:', error.code)
    console.log('interceptors.response mess:', error.message)
    console.log('interceptors.response stack:', error.stack)

    if (!error.response) {
        if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
            RootNavigation.navigate(ROUTES.ERROR_TIMEOUT, { timeout: true });
        }
        return new Promise((resolve, reject) => {
            reject(error)
        })
    }

    if (error.response.status === 401 || error.response.status === 402) {
        RootNavigation.navigate(ROUTES.LOGOUT, { tokenExpiry:true });
    } else if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        RootNavigation.navigate(ROUTES.ERROR_TIMEOUT, { timeout:true });
    }else {
        return new Promise((resolve, reject) => {
            reject(error)
        })
    }

    
})

export { api };
