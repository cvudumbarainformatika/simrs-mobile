import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

const Logout = () => {
    const {removeToken} = useContext(AuthContext)
    useEffect(() => {
        removeToken();
    },[])
    return <ActivityIndicator />;
}

export default Logout