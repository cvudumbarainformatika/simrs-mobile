import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const XenterScreen = () => {
    const navigation = useNavigation()

    useEffect(() => { })
    return (
        <View className="flex-1">
            <Text>Xenter Screen</Text>
        </View>
    )
}

export default XenterScreen