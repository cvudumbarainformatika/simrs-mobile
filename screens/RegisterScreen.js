import { View, Text, Image, ScrollView, Keyboard } from 'react-native'
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
    const [inputs, setInputs] = useState({
        nip: '',
        tgllahir:''
    })
    const [errors, setErrors] = useState({});


    // METHODE

    function validate() {
        Keyboard.dismiss();
        let valid = true;
        if (!inputs.nip) {
            handleError('Harap diisi terlebih dahulu', 'nip')
            valid = false
        }
        if (!inputs.tgllahir) {
            handleError('Harap diisi terlebih dahulu', 'tgllahir')
            valid = false
        }

        if (valid) {
            lanjut()
        }
    }
    function submitClicked() {
        setLoading(true)
        setTimeout(() => {
            validate()
            setLoading(false)
        }, 500)
    }

    function lanjut() {
        console.log(inputs)
    }

    function handleOnChanged(text, input) {
        setInputs(states => ({ ...states, [input]: text }))
    }
    function handleError(msg, input) {
        setErrors(states => ({ ...states, [input]: msg }))
    }

    return (
        <SafeAreaView>
            {
                (loading || alerts)  && (
                    <View style={tw.style('h-full')}>
                        <AppLoader visible={loading} />
                        <AppAlert visible={alerts} status="Success" msg="Success Broo" onOk={ ()=> setAlerts(false) } />
                    </View>
                )
            }
            
            <ScrollView >
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

                {/* ================================================================================== FORM INPUT */}
                <View style={tw.style('px-8 py-4')}>
                    <AppInput placeholder="Masukkan Nip Anda"
                        value={inputs.nip}
                        changed={(val) => handleOnChanged(val, 'nip')}
                        error={errors.nip}
                        onFocus={() => {
                            handleError(null,'nip')
                        }}

                    />
                    <AppInput placeholder="Masukkan Tanggal Lahir Anda"
                        value={inputs.tgllahir}
                        changed={(val) => handleOnChanged(val, 'tgllahir')}
                        error={errors.tgllahir}
                        onFocus={() => {
                            handleError(null,'tgllahir')
                        }}
                    />
                </View>

                <AppBtn label="Submit"
                    clicked={() => {
                        submitClicked()   
                    }}
                />
            </ScrollView>
        </SafeAreaView>

        
    )
}

export default RegisterScreen