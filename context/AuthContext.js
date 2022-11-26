
import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import {api} from '../helpers/axiosInterceptor';
import * as RootNavigation from '../routers/RootNavigation.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [alerts, setAlerts] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [user, setUser] = useState(null);
    const [pegawai, setPegawai] = useState(null);

    const [msgError, setMsgError] = useState(null)
    const [msgOk, setMsgOk] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isSignin, setIsSignin] = useState(false)
    const [isSignout, setIsSignout] = useState(false)


    const login = async (username, password) => {
        let device = Device.osInternalBuildId
        let email = username + '@app.com'
        let form = {
            email: email,
            password: password,
            device:device
        }
        setIsLoading(true);
        await api.post(`/v2/login`, form).then(resp => {
            let token = resp.data.token
            let userInfo = resp.data.user
            saveToken(token, userInfo)
            getMe()
            setIsLoading(false)
            // console.log(token)
        }).catch(e => {
            // if (e.response) {
            //     console.log(e.response.data);
            //     console.log(e.response.status);
            //     console.log(e.response.headers);
            // }
            const err = e
            console.log('auth context : ', err);
            setIsLoading(false)
            setAlerts(true)
            
            if (err.response.status === 406) {
                setMsgError('Maaf, Kamu sudah terdaftar pada device lain ... Harap menghubungi admin untuk mengganti device')
                return
            }
            if (err.response.status === 409) {
                setMsgError('Username dan Password Tidak Valid !')
                return
            }
            if (err.response.status === 410) {
                // console.log(e.response)
                setMsgOk('Klik OK untuk ganti device')
                setUserId(e.response.data.id)
                return
            }
        })
    }

    const resetDevice = async () => {
        setIsLoading(true);
        let form = {
            id: userId,
            device: Device.osInternalBuildId
        }
        await api.post(`/v2/reset-device`, form)
        .then(resp => {
            setIsLoading(false)
            setAlerts(false)
            setMsgOk(null)
        }).catch(err => {
            setAlerts(true)
            setIsLoading(false)
            setMsgError('Maaf, Ada Kesalahan silahkan diulangi')
        })
    }

    const getMe = async () => {
        await api.get(`/v2/user/me`).then(resp => {
         resp?setPegawai(resp.data.result):setPegawai(null)
        }).catch(err => {
            console.log('me :', err)
            removeToken()
            // setIsLoading(false)
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

    const saveToken = async (token, userInfo) => {
        AsyncStorage.setItem('userToken', token)
        AsyncStorage.setItem('user', JSON.stringify(userInfo))
        setUserToken(token)
        setUser(userInfo)
        setIsSignin(true)
        setIsSignout(false)
    }
    const removeToken = async () => {
        // setIsLoading(true);
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('user');
        setUserToken(null)
        setUser(null)
        setIsSignout(true)
        setIsSignin(false)
        // setTimeout(() => {
        //     setIsLoading(false)
        // },300)
    }

    const isLoggedIn = async () => {
        setMsgOk(null)
        setUserId(null)
        try {
            let userInfo = await AsyncStorage.getItem('user');
            let token = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo)
            setUser(userInfo)
            setUserToken(token)
            // setIsLoading(false)

            getMe()
            console.log('setUser:', userInfo)
        } catch (e) {
            console.log(`isLoggedIn Error : ${e}`)
        }

    }

    const closeAlerts = () => {
        setMsgOk(null)
        setAlerts(false)
        console.log('token', userToken)
    }

    useEffect(() => {
        isLoggedIn();

    },[])



    return (
        <AuthContext.Provider value={{
            login, logout, removeToken, closeAlerts, resetDevice, getMe, 
            alerts, isLoading, userToken, user, pegawai, msgError, msgOk, isSignin, isSignout, 
        }}>
            {children}
        </AuthContext.Provider>
    )
}