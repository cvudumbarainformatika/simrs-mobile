import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppAlert, AppLoader } from '../../../components'
import { ROUTES } from '../../../constants'
import { api } from '../../../helpers/axiosInterceptor'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native'
import * as Location from 'expo-location';

const KirimQr = ({ navigation, route }) => {

    const { data } = route.params
    const [wait, setWait] = useState(false)
    const [err, setErr] = useState(null)

    const sendQr = async () => {
        setWait(true)

        // 1. Minta Izin Lokasi
        console.log('Minta izin lokasi...');
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Izin lokasi ditolak');
            setErr('Harap izinkan akses lokasi untuk melanjutkan login e-Xenter.')
            setWait(false)
            return;
        }

        // 2. Ambil Koordinat
        let lat = null;
        let long = null;
        try {
            console.log('Mengambil koordinat GPS...');
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });
            lat = location.coords.latitude;
            long = location.coords.longitude;
            console.log('Lokasi didapat:', lat, long);
        } catch (e) {
            console.log('Gagal mengambil lokasi:', e);
            setErr('Gagal mendapatkan lokasi GPS. Pastikan GPS Anda aktif.')
            setWait(false)
            return;
        }

        // 3. Kirim ke API
        let token = await AsyncStorage.getItem('userToken');
        let form = {
            qr: data,
            token: token,
            lat: lat,
            long: long
        }

        console.log('Mengirim data ke API:', form);
        await api.post('/v2/user/send-qr', form)
            .then((resp) => {
                console.log('API Response Success:', resp.data);
                setWait(false)
            }).catch((error) => {
                console.log('API Error Detail:', error);
                if (error.response) {
                    console.log('Data:', error.response.data);
                    console.log('Status:', error.response.status);
                } else if (error.request) {
                    console.log('Request Error (No Response):', error.request);
                } else {
                    console.log('Error Message:', error.message);
                }
                setErr('Ada Kesalahan Harap Ulangi!')
                setWait(false)
            })
    }

    useEffect(() => {
        (() => {
            sendQr()
        })()
    }, [])


    return (
        <View className="flex-1 justify-center items-center">
            <AppLoader visible={wait} />
            <AppAlert visible={!wait && err !== null} msg={err} onOk={() => {
                setErr(null)
                navigation.dispatch(StackActions.replace(ROUTES.HOME))
            }} />
            <AppAlert visible={!wait && err === null} msg="Kamu Berhasil Login" status='success' onOk={() => {
                setErr(null)
                navigation.dispatch(StackActions.replace(ROUTES.HOME))
            }} />
        </View>
    )
}

export default KirimQr