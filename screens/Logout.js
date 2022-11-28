import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

const Logout = ({navigation}) => {
    const { removeToken } = useContext(AuthContext)
    
    useEffect(() => {
        removeToken();
    },[])
    return (
        <>
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator />
            </View>
            
        </>
        
    );
}

export default Logout