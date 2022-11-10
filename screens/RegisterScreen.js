import { View, Text, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import tw from '../constants/tw'
import AppBtn from '../components/~global/AppBtn'
import AppInput from '../components/~global/AppInput'
import { SafeAreaView } from 'react-native-safe-area-context'

const RegisterScreen = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={tw.style('flex-1')}>
            <View style={tw`justify-center`}>
                <Image
                style={tw.style('w-40 h-64')}
                source={require('../assets/static/mad_saleh_menunjuk.png')}
            />
            </View>
            <View style={tw.style('p-8')}>
                <AppInput placeholder="Masukkan Nip Anda" />
                <AppInput placeholder="Masukkan Tanggal Lahir Anda" />
            </View>

            <AppBtn label="Back to Login"
                clicked={() => {
                   navigation.navigate('Login')     
                }}
            />
        </SafeAreaView>
    )
}

export default RegisterScreen