
import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import axios from 'axios';
import { BASE } from '../config';
import {api} from '../helpers/axiosInterceptor';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [alerts, setAlerts] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [user, setUser] = useState(null);
    const [pegawai, setPegawai] = useState(null);


    const login = async (username, password) => {
        let device = Device.osInternalBuildId
        let email = username + '@app.com'
        setIsLoading(true);
        await api.post(`/v2/login`, {
            email,password,device
        }).then(resp => {
            let token = resp.data.token
            let userInfo = resp.data.user
            AsyncStorage.setItem('userToken', token)
            AsyncStorage.setItem('user', JSON.stringify(userInfo))
            setUserToken(token)
            setUser(userInfo)

            getMe()
            setIsLoading(false)
            // console.log(token)
        }).catch(e => {
            console.log(`Login Error ${e}`)
            setIsLoading(false)
            setAlerts(true)
        })
    }

    const getMe = async () => {
        await api.get(`/v2/user/me`).then(resp => {
        setPegawai(resp.data.result)
        }).catch(err => {
        console.log(err)
        })
    }

    const logout = async () => {
        setIsLoading(true);
        await api.get(`/v2/user/logout`).then(resp => {
            removeToken()
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })
    }

    const removeToken = async () => {
        setIsLoading(true);
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('user');
        setUserToken(null)
        setUser(null)
        setTimeout(() => {
            setIsLoading(false)
        },300)
    }

    const isLoggedIn = async () => {
        setIsLoading(true)
        try {
            let userInfo = await AsyncStorage.getItem('user');
            let token = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo)
            setUser(userInfo)
            setUserToken(token)

            getMe()
            setIsLoading(false)
            console.log('setUser:', userInfo)
        } catch (e) {
            console.log(`isLoggedIn Error ${e}`)
            setIsLoading(false)
        }

    }

    useEffect(() => {
        isLoggedIn();
    },[])



    return (
        <AuthContext.Provider value={{login, logout, removeToken, alerts, isLoading, userToken, user, pegawai}}>
            {children}
        </AuthContext.Provider>
    )
}