import { View, Text, Image, ScrollView, Keyboard} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'


import { tw,IMGS,ROUTES } from '../../constants'
import { AppInput, AppLoader, AppAlert, BottomTwoBtn } from '../../components'
import ModalConfirmKaryawan from '../../components/authentifikasi/ModalConfirmKaryawan'
import { api } from '../../helpers/axiosInterceptor'
import { BASE } from '../../config'
// import { useSelector } from 'react-redux'

const RegisterScreen = () => {
    // STATE
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false);
    const [alerts, setAlerts] = useState(false);
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
        nip: '',
        tgllahir:''
    })
    const [details, setDetails] = useState({
        id : '',
        nip : '',
        nip_baru : '',
        nama : '',
        foto:'',
    });


    // METHODE

    useEffect(() => {
    }, [])

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

        return valid;
    }
    async function submitClicked() {
        let valid = validate();
        setLoading(true)
        if (valid) {
            let form = {
                nip: inputs.nip,
                tgllahir:inputs.tgllahir
            }
            await api.post(`/v2/data/cari-pegawai`, form)
                .then(resp => {
                    console.log(resp.data)
                    setLoading(false)
                }).catch(err => {
                console.log(err)
                    setLoading(false)
            })
        }

    }

    function handleOnChanged(value, input) {
        setInputs(states => ({ ...states, [input]: text }))
    }

    function handleOnChanged(text, input) {
        setInputs(states => ({ ...states, [input]: text }))
    }
    function handleError(msg, input) {
        setErrors(states => ({ ...states, [input]: msg }))
    }

    function toConfirmPassword() {
        setModal(false)
        navigation.navigate(ROUTES.REGISTRASIPASSWORD, {
            userId: 'xenter0001'
        });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading && (<AppLoader visible={loading} />)}
            {modal && (<ModalConfirmKaryawan visible={modal}
                onDismiss={() => setModal(false)}
                onOk={() => {
                    toConfirmPassword()
                }}
            />)}
            {alerts && (<AppAlert visible={alerts} status="Success" msg="Success Broo" onOk={ ()=> setAlerts(false) } />)}
            
            <ScrollView >
                <View style={tw.style('flex-row p-4')}>
                    <Text style={tw`font-bold text-lg`}>Cari Data Kepegawaian </Text>
                </View>
                <View style={tw.style('flex-row items-center py-2 px-8')}>
                    <View style={tw.style('flex-1')}>
                        <View  style={tw.style('border-2 p-4 rounded-4 ')}>
                            <Text style={tw.style('font-bold')}>
                                Masukkan Nip dan tanggal Lahir Anda, lalu Klik Cari data dan ikuti
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
                        source={IMGS.madSalehMenunjuk}
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
            </ScrollView>
            
            <BottomTwoBtn labelBtnOk="Cari Data"
                onOk={()=> submitClicked()}
                onDismiss={() => navigation.navigate(ROUTES.LOGIN)}
            />
        </SafeAreaView>

        
    )
}

export default RegisterScreen