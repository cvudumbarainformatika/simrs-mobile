
import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import { api, sendXmlHttpRequest } from '../helpers/axiosInterceptor';
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
            // device: device
            device: 'ios' 
        }
        setIsLoading(true);
        try {
            const resp = await api.post(`/v2/login`, form)
            // const resp = await sendXmlHttpRequest(form, '/v2/login');
            console.log('login', resp)
            if (!resp) {
                setIsLoading(false)
                setMsgError('Maaf Ada yang slah ... harap ulangi!')
                setAlerts(true)
                return
            }
            // console.log('login', resp)
            let token = resp.data ? resp.data.token : null
            let userInfo = resp.data ? resp.data.user : null
            let simpeg = userInfo ? userInfo.pegawai : null
            if (token !== null) {
                saveToken(token, userInfo, simpeg)
                // getMe()
            }
            setIsLoading(false)
        } catch (err) {
            console.log('catch login', err)
            setIsLoading(false)
            removeToken()
            if (err.response) {
                setIsLoading(false)
                if (err.response.status === 406) {
                    setMsgError('Maaf, Kamu sudah terdaftar pada device lain ... Harap menghubungi admin untuk mengganti device')
                    setAlerts(true)
                    return
                }
                if (err.response.status === 409) {
                    setMsgError('Username atau Password Tidak Valid !')
                    setAlerts(true)
                    return
                }
                if (err.response.status === 401) {
                    setMsgError('Username atau Password Tidak Valid !')
                    setAlerts(true)
                    return
                }
                if (err.response.status === 410) {
                    // console.log(e.response)
                    setMsgOk('Klik OK untuk ganti device')
                    setUserId(err.response.data.id)
                    setAlerts(true)
                    return
                }
                if (err.response.status === 500) {
                    // console.log(e.response)
                    setMsgError('Ada Kesalahan Harap ulangi')
                    setAlerts(true)
                    // setUserId(e.response.data.id)
                    return
                }
            } else if (err.request) {
                // The request was made but no response was received
                // Error details are stored in err.reqeust
                console.log(err.request);
                setMsgError('Server tidak Merespon .. Atau cek jaringan / internet Anda')
                setAlerts(true)
            } else {
                // Some other errors
                console.log('Error', err.message);
                setMsgError('Server tidak Merespon .. Atau cek jaringan / internet Anda')
                setAlerts(true)
            }


        }


        // await api.post(`/v2/login`, form).then(resp => {
        //     let token = resp.data ? resp.data.token : null
        //     let userInfo = resp.data ? resp.data.user : null
        //     if (token !== null) {
        //         saveToken(token, userInfo)
        //         getMe()
        //     }
        //     setIsLoading(false)
        //     console.log('token', token)
        //     console.log('resp login', resp)
        // }).catch(e => {
        //     const err = e
        //     console.log('login context : ', err);
        //     removeToken()

        //     if (err.response) {
        //         setIsLoading(false)
        //         if (err.response.status === 406) {
        //             setMsgError('Maaf, Kamu sudah terdaftar pada device lain ... Harap menghubungi admin untuk mengganti device')
        //             setAlerts(true)
        //             return
        //         }
        //         if (err.response.status === 409) {
        //             setMsgError('Username atau Password Tidak Valid !')
        //             setAlerts(true)
        //             return
        //         }
        //         if (err.response.status === 401) {
        //             setMsgError('Username atau Password Tidak Valid !')
        //             setAlerts(true)
        //             return
        //         }
        //         if (err.response.status === 410) {
        //             // console.log(e.response)
        //             setMsgOk('Klik OK untuk ganti device')
        //             setUserId(e.response.data.id)
        //             setAlerts(true)
        //             return
        //         }
        //         if (err.response.status === 500) {
        //             // console.log(e.response)
        //             setMsgError('Server tidak Merespon .. Atau cek jaringan / internet Anda')
        //             setAlerts(true)
        //             // setUserId(e.response.data.id)
        //             return
        //         }
        //     } else if (err.request) {
        //         // The request was made but no response was received
        //         // Error details are stored in err.reqeust
        //         console.log(err.request);
        //         setMsgError('Server tidak Merespon .. Atau cek jaringan / internet Anda')
        //         setAlerts(true)
        //     } else {
        //         // Some other errors
        //         console.log('Error', err.message);
        //         setMsgError('Server tidak Merespon .. Atau cek jaringan / internet Anda')
        //         setAlerts(true)
        //     }


        // })
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
            resp ? setPegawai(resp.data.result) : setPegawai(null)
        }).catch(err => {
            console.log('me :', err)
            removeToken()



            if (err.response) {
                setIsLoading(false)
                if (err.response.status === 406) {
                    setMsgError('Maaf, Kamu sudah terdaftar pada device lain ... Harap menghubungi admin untuk mengganti device')
                    setAlerts(true)
                    return
                }
                if (err.response.status === 409) {
                    setMsgError('Username dan Password Tidak Valid !')
                    setAlerts(true)
                    return
                }
                if (err.response.status === 410) {
                    // console.log(e.response)
                    setMsgOk('Klik OK untuk ganti device')
                    setUserId(e.response.data.id)
                    setAlerts(true)
                    return
                }
                if (err.response.status === 500) {
                    // console.log(e.response)
                    setMsgError('Server tidak Merespon .. Atau cek jaringan / internet Anda')
                    setAlerts(true)
                    // setUserId(e.response.data.id)
                    return
                } else {
                    logout()
                }
            } else if (err.request) {
                // The request was made but no response was received
                // Error details are stored in err.reqeust
                console.log(err.request);
                setMsgError('Server tidak Merespon .. Atau cek jaringan / internet Anda')
                setAlerts(true)
            } else {
                // Some other errors
                console.log('Error', err.message);
                setMsgError('Server tidak Merespon .. Atau cek jaringan / internet Anda')
                setAlerts(true)
            }


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

    const saveToken = async (token, userInfo, simpeg) => {
        AsyncStorage.setItem('userToken', token)
        AsyncStorage.setItem('user', JSON.stringify(userInfo))
        AsyncStorage.setItem('pegawai', JSON.stringify(simpeg))
        setUserToken(token)
        setUser(userInfo)
        setPegawai(simpeg)
        setIsSignin(true)
        setIsSignout(false)
    }
    const removeToken = async () => {
        setIsLoading(true);
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('pegawai');
        setUserToken(null)
        setUser(null)
        setPegawai(null)
        setIsSignout(true)
        setIsSignin(false)
        setTimeout(() => {
            setIsLoading(false)
        }, 300)
    }

    const isLoggedIn = async () => {
        setMsgOk(null)
        setUserId(null)
        try {
            let simpeg = await AsyncStorage.getItem('pegawai');
            let userInfo = await AsyncStorage.getItem('user');
            let token = await AsyncStorage.getItem('userToken');
            simpeg = JSON.parse(simpeg)
            userInfo = JSON.parse(userInfo)
            setUser(userInfo)
            setUserToken(token)
            setPegawai(simpeg)
            // setIsLoading(false)

            // getMe()
            // console.log('setUser:', userInfo)
            // console.log('pegawai:', simpeg)
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
    }, [])



    return (
        <AuthContext.Provider value={{
            login, logout, removeToken, closeAlerts, resetDevice, getMe,
            alerts, isLoading, userToken, user, pegawai, msgError, msgOk, isSignin, isSignout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}