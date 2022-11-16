
import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import axios from 'axios';
import { BASE } from '../config';
import api from '../helpers/axiosInterceptor';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [alerts, setAlerts] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [user, setUser] = useState(null);


    const login = async (username, password) => {
        let device = Device.osInternalBuildId
        let email = username + '@app.com'
        setIsLoading(true);
        api.post(`${BASE}/v2/login`, {
            email,password,device
        }).then(resp => {
            let token = resp.data.token
            let userInfo = resp.data.user
            AsyncStorage.setItem('userToken', token)
            AsyncStorage.setItem('user', JSON.stringify(userInfo))
            setUserToken(token)
            setUser(userInfo)
            setIsLoading(false)
            // console.log(token)
        }).catch(e => {
            console.log(`Login Error ${e}`)
            setIsLoading(false)
            setAlerts(true)
        })
    }

    const logout = async () => {
        setIsLoading(true);
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('user');
        setUserToken(null)
        setUser(null)
        setIsLoading(false)
        // console.log(userToken)
    }

    const isLoggedIn = async () => {
        setIsLoading(true)
        try {
            let userInfo = await AsyncStorage.getItem('user');
            let token = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo)
            userInfo === null ? setUser(null): setUser(userInfo)
            token === null ? setUserToken(null): setUserToken(token)
            setIsLoading(false)
            console.log('setUser:', user)
        } catch (e) {
            console.log(`isLoggedIn Error ${e}`)
            setIsLoading(false)
        }

    }

    useEffect(() => {
        isLoggedIn();
    },[])



    return (
        <AuthContext.Provider value={{login, logout, alerts, isLoading, userToken, user}}>
            {children}
        </AuthContext.Provider>
    )
}