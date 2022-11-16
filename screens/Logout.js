import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

const Logout = () => {
    const {logout} = useContext(AuthContext)
    useEffect(() => {
        logout();
    },[])
    return <ActivityIndicator />;
}

export default Logout