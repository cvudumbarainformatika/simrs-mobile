import { View, Text, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'


import { SafeAreaView } from 'react-native-safe-area-context'
import tw from '../constants/tw'
import { AppInput, BottomTwoBtn } from '../components'

const RegistrasiPasswordScreen = () => {

    const navigation = useNavigation();
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    // METHOD
    function handleOnChanged(text, input) {
        setInputs(states => ({ ...states, [input]: text }))
    }
    function handleError(msg, input) {
        setErrors(states => ({ ...states, [input]: msg }))
    }

  return (
    <SafeAreaView style={tw`flex-1`}>
          <View style={tw`p-4`}>
                <Text style={tw`font-bold text-lg mb-4`}>Konfirmasi Password Anda</Text>
                {/* MAD SALEH INFO */}
                <View style={tw`flex-row`}>
                  <Image
                    style={[
                        tw.style('w-16 h-24'),
                        { transform: [{ scaleX: -1 }] }
                        ]}
                        source={require('../assets/static/mad_saleh_menunjuk.png')}
                  />
                  <View style={tw.style('flex-1')}>
                        <View style={tw.style('border-2 p-4 rounded-4 bg-secondary')}>
                            <Text style={tw.style('font-bold')}>
                                INFORMASI PENTING !!!
                            </Text>
                            <Text style={tw.style('pt-2')}>
                                Data dibawah ini Adalah informasi tentang <Text style={tw`font-bold`}>Username </Text> 
                                dan <Text style={tw`font-bold`}>Password</Text> Anda...
                            </Text>
                            <Text style={tw.style('pt-2')}>
                                Anda boleh mengganti Username dan Password yang telah diberikan..
                            </Text>
                            <Text style={tw.style('italic pt-2')}>
                                Jika Setuju ... Klik <Text style={tw`font-bold`}>OK. </Text> Login sesuai username dan password Anda.
                            </Text>
                            <Text style={tw.style('italic pt-2')}>
                                Klik <Text style={tw`font-bold`}>Kembali </Text> untuk Batal.
                            </Text>
                        </View>
                    </View>
              </View>
              
              <ScrollView style={tw`px-4 mt-8`}>
                  <Text style={tw`font-bold text-lg mb-4`}>Username dan Password 🤫</Text>
                  <AppInput placeholder="Masukkan Username Anda"
                        value={inputs.username}
                        changed={(val) => handleOnChanged(val, 'username')}
                        error={errors.username}
                        onFocus={() => {
                            handleError(null,'username')
                        }}

                    />
                    <AppInput placeholder="Masukkan Password Anda"
                        value={inputs.password}
                        changed={(val) => handleOnChanged(val, 'password')}
                        error={errors.password}
                        onFocus={() => {
                            handleError(null,'password')
                        }}
                    />
              </ScrollView>
            </View>
          <BottomTwoBtn
            onDismiss={()=> navigation.navigate('Login')}
          />
    </SafeAreaView>
  )
}

export default RegistrasiPasswordScreen