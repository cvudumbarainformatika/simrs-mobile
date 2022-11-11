import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import tw from '../constants/tw'
import AppBtn from '../components/~global/AppBtn'
import AppInput from '../components/~global/AppInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppLoader from '../components/~global/AppLoader'
import AppAlert from '../components/~global/AppAlert'

const RegisterScreen = () => {
    // STATE
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false);
    const [alerts, setAlerts] = useState(false);


    // METHODE
    function submitClicked() {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setAlerts(true)
        }, 3000)
    }

    return (
        <SafeAreaView>
            <View style={tw.style('h-full')}>
                <AppLoader visible={loading} />
                <AppAlert visible={alerts} status="Success" msg="Success Broo" onOk={ ()=> setAlerts(false) } />
                <View style={tw.style('flex-row p-4')}>
                    <AppBtn icon="keyboard-backspace" round color="dark"
                        clicked={() => {
                            navigation.navigate('Login')     
                        }}
                    />
                </View>
                <View style={tw.style('flex-row items-center py-2 px-8')}>
                    <View style={tw.style('flex-1')}>
                        <View  style={tw.style('border-2 p-4 rounded-4 ')}>
                            <Text style={tw.style('font-bold')}>
                                Masukkan Nip dan tanggal Lahir Anda, lalu ikuti
                                langkah selanjutnya
                            </Text>
                            <Text style={tw.style('italic pt-2 text-gray-dark')}>
                                Data anda tidak ditemukan? Harap lapor kepada 
                                petugas yang berwenang...
                            </Text>
                            <Text style={tw.style('font-bold pt-2')}>
                                Terimakasih
                            </Text>
                        </View>
                    </View>
                    <Image
                        style={tw.style('w-40 h-64')}
                        source={require('../assets/static/mad_saleh_menunjuk.png')}
                    />
                </View>
                <View style={tw.style('px-8 py-4')}>
                    <AppInput placeholder="Masukkan Nip Anda" />
                    <AppInput placeholder="Masukkan Tanggal Lahir Anda" />
                </View>

                <AppBtn label="Submit"
                    clicked={() => {
                        submitClicked()   
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default RegisterScreen