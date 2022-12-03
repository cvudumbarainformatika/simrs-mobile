import { View, Text, Image, ScrollView, Keyboard} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'


import { tw,IMGS,ROUTES } from '../../constants'
import { AppInput, AppLoader, AppAlert, BottomTwoBtn } from '../../components'
import ModalConfirmKaryawan from '../../components/authentifikasi/ModalConfirmKaryawan'
import { api } from '../../helpers/axiosInterceptor'

const RegisterScreen = () => {
    // STATE
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
        nip: '012001141074',
        tgllahir:''
    })
    const [details, setDetails] = useState({
        id : '',
        nip : '',
        nama : '',
        foto: '',
        user:null
    });

    const [alerts, setAlerts] = useState(false);
    const [msg, setMsg] = useState({
        status: 'Error',
        msg: 'Error Brooo'
    })
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
                    let det = resp.data
                    
                    
                    if (det) {

                        if (det.message) {
                            msg.msg = det.message
                            setLoading(false)
                            setAlerts(true)
                            return
                        }

                        setDetails({
                            id: det.id,
                            nip:det.nip,
                            nama: det.nama,
                            foto: det.foto,
                            user:det.user
                        })
                        setLoading(false)
                        setModal(true)
                        
                    } 
                    
                    // setLoading(false)
                }).catch(err => {
                    console.log(err)
                    msg.msg = 'Error, Ada Kesalahan mungkin dikarenakan Jaringan... Harap ulangi'
                    setAlerts(true)
                    setLoading(false)
            })
        }
        setLoading(false)
    }

    // function handleOnChanged(value, input) {
    //     setInputs(states => ({ ...states, [input]: text }))
    // }

    function handleOnChanged(text, input) {
        setInputs(states => ({ ...states, [input]: text }))
    }
    function handleError(msg, input) {
        setErrors(states => ({ ...states, [input]: msg }))
    }

    function toConfirmPassword(nip) {
        if (details.user !== null) {
            setModal(false)
            return
        }
        setModal(false)
        navigation.navigate(ROUTES.REGISTRASIPASSWORD, {
            pegawai_id: details.id,
            nip: nip,
            nama:details.nama
        });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading && (<AppLoader visible={loading} />)}

            {/* CONFIRMASI USER ============================================================================ */}

            {modal && (<ModalConfirmKaryawan visible={modal}
                nip={inputs.nip}
                nama={details.nama}
                id={details.id}
                foto={details.foto}
                user={details.user}
                onDismiss={() => setModal(false)}
                onOk={() => {
                    toConfirmPassword(details.nip)
                }}
            />)}

            {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++========================ALERT */}
            {alerts && (<AppAlert visible={alerts} status={msg.status} msg={msg.msg} onOk={ ()=> setAlerts(false) } />)}
            
            <ScrollView >
                <View style={tw.style('flex-row p-4')}>
                    <Text className="font-poppinsBold">Cari Data Kepegawaian </Text>
                </View>
                <View style={tw.style('flex-row items-center py-2 px-8')}>
                    <View style={tw.style('flex-1')}>
                        <View  style={tw.style('border-2 p-4 rounded-4 ')}>
                            <Text className="font-poppinsBold text-xs">
                                Masukkan Nip dan tanggal Lahir Anda, 
                            </Text>
                            <Text className="font-poppins text-xs">lalu Klik Cari data dan ikuti
                                langkah selanjutnya</Text>
                            <Text className="font-poppinsItalic text-xs pt-2">
                                
                                Data anda tidak ditemukan? Harap lapor kepada 
                                petugas yang berwenang...
                            </Text>
                            <Text className="font-poppinsBold pt-2">
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
                    <AppInput placeholder="Tanggal Lahir , Format: yyyy-mm-dd"
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