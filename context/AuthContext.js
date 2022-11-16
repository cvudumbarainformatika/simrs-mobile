
import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);


    const login = async (username, password) => {
        console.log(username + '@app.com')
        setIsLoading(true);
        await AsyncStorage.setItem('userToken', 'cobatokenfewfew')
        setUserToken('cobatokenfewfew')
        setIsLoading(false)
    }

    const logout = async () => {
        setIsLoading(true);
        await AsyncStorage.removeItem('userToken');
        setUserToken(null)
        setIsLoading(false)
        console.log(userToken)
    }

    const isLoggedIn = async () => {
        setIsLoading(true)
        try {
            let token = await AsyncStorage.getItem('userToken');
            token === null? setUserToken(null): setUserToken('userToken', token)
            console.log(token)
            setIsLoading(false)
        } catch (e) {
            console.log(`isLoggedIn Error ${e}`)
        }

    }

    useEffect(() => {
        isLoggedIn();
    },[])



    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
            {children}
        </AuthContext.Provider>
    )
}