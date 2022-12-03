import { View, Text, Image, ScrollView, Keyboard, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Clipboard from '@react-native-clipboard/clipboard'
import * as Device from 'expo-device';


import { tw,IMGS, ROUTES } from '../../constants'
import { AppAlert, AppInput, AppLoader, BottomTwoBtn } from '../../components'
import { api } from '../../helpers/axiosInterceptor'

const RegistrasiPasswordScreen = () => {

    const navigation = useNavigation();
    const route = useRoute()


    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
        username: route.params.nip,
        password: route.params.nip,
        pegawai_id: route.params.pegawai_id,
        device: Device.osInternalBuildId,
        nama:route.params.nama
        
    });

    const [alerts, setAlerts] = useState(false);
    const [msg, setMsg] = useState({
        status: 'Error',
        msg: 'Error Brooo'
    })

    // METHOD
    function handleOnChanged(text, input) {
        setInputs(states => ({ ...states, [input]: text }))
    }
    function handleError(msg, input) {
        setErrors(states => ({ ...states, [input]: msg }))
    }
    function validate() {
        Keyboard.dismiss();
        let valid = true;
        if (!inputs.username) {
            handleError('Harap diisi terlebih dahulu', 'username')
            valid = false
        }
        if (!inputs.password) {
            handleError('Harap diisi terlebih dahulu', 'password')
            valid = false
        }

        if (valid) {
            simpanData()
        }
    }

    async function simpanData() {
        setLoading(true)
        await api.post(`/v2/register`, inputs).then(resp => {
            
            setLoading(false)
            setMsg({
                status: 'Success',
                msg:'Anda Sudah Bisa Login. Terimakasih'
            })
            setAlerts(true)

        }).catch(e => {
            setLoading(false)
            setMsg({
                status: 'Error',
                msg:'Ada Kesalahan Silahkan Ulangi'
            })
            setAlerts(true)
        })
    }

    function lanjut() {
        if (msg.status === 'Success') {
            setAlerts(false)
            navigation.navigate(ROUTES.LOGIN)
        }
        setAlerts(false)
        
    }

    const copyToClipboard = () => {
        Clipboard.setString(inputs.username)
    }

  return (
      <SafeAreaView style={tw`flex-1`}>
          {loading && (<AppLoader visible={loading} />)}
          <AppAlert visible={alerts} status={ msg.status } msg={msg.msg} onOk={()=> lanjut()} />
          <View style={tw`p-4`}>
                <Text style={tw`font-bold text-lg mb-4`}>Konfirmasi Password Anda 🔐</Text>
                {/* MAD SALEH INFO */}
                <View style={tw`flex-row`}>
                  <Image
                    style={[
                        tw.style('w-16 h-24'),
                        { transform: [{ scaleX: -1 }] }
                        ]}
                        source={IMGS.madSalehMenunjuk}
                  />
                  <View style={tw.style('flex-1')}>
                        <View style={tw.style('border-2 p-4 rounded-4 bg-secondary')}>
                            <Text className="font-poppinsBold">
                                INFORMASI PENTING !!!
                            </Text>
                            <Text className="font-poppins pt-2">
                                Data dibawah ini Adalah informasi tentang <Text className="font-poppinsBold">Username </Text> 
                                dan <Text className="font-poppinsBold">Password</Text> Anda...
                            </Text>
                            <Text style={tw.style('pt-2')}>
                                Anda boleh mengganti <Text className="font-poppinsBold"> Password </Text> yang telah diberikan..
                            </Text>
                            <Text className="font-poppinsItalic">
                                Klik <Text className="font-poppinsBold">OK. </Text> jika setuju.
                            </Text>
                            <Text className="font-poppinsItalic pt-2">
                                Klik <Text className="font-poppinsBold">Kembali </Text> untuk Batal.
                            </Text>
                        </View>
                    </View>
              </View>
              
              <ScrollView style={tw`px-4 mt-8`}>
                  <Text className="font-poppinsBold mb-4">Username dan Password 🤐</Text>
                  {/* <AppInput placeholder="Masukkan Username Anda"
                        editable={inputs.username.length === 0}
                        value={inputs.username}
                        changed={(val) => handleOnChanged(val, 'username')}
                        error={errors.username}
                        onFocus={() => {
                            handleError(null,'username')
                      }}

                    /> */}
                  <View style={tw`mb-2`}>
                        <Text className="font-poppins">Username :</Text>
                        <TouchableOpacity onPress={() => copyToClipboard}>
                            <Text>  📋  {inputs.username}</Text>
                        </TouchableOpacity>
                  </View>
                    <AppInput label="Password :" placeholder="Masukkan Password Anda"
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
              onDismiss={() => navigation.navigate(ROUTES.LOGIN)}
              onOk={()=> validate()}
          />
    </SafeAreaView>
  )
}

export default RegistrasiPasswordScreen