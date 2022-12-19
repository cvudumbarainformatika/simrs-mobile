import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import { api } from '../helpers/axiosInterceptor';

export const AbsenContext = createContext();

export const AbsenProvider = ({ children }) => {

    const [isActive, setIsActive] = useState(false)

    return (
        <AbsenContext.Provider value={{ isActive, setIsActive }}>
            {children}
        </AbsenContext.Provider>
    )
}