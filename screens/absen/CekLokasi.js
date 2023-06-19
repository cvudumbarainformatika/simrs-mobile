import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { IMGS, ROUTES, tw } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AppAlert, AppBtn, AppLoader } from '../../components';
import NetInfo from '@react-native-community/netinfo';
// import * as Permissions from 'expo-permissions'

const CekLokasi = ({ navigation, route }) => {
    const { status, kategory_id, tanggal, jam } = route.params

    const [location, setLocation] = useState({
        latitude: -6.745297732746753,
        longitude: 113.20952966064942,
    });
    const [faker, setFaker] = useState(false)
    const [mapRegion, setMapRegion] = useState({
        // latitude: -7.745281861965679,//yang lama
        latitude: -7.745527419472046,
        // longitude: 113.21061643874336,
        longitude: 113.21081986255665,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0015,
    });

    const [start, setStart] = useState(true)
    const [waiting, setWaiting] = useState(true)
    const [errorMsg, setErrorMsg] = useState(null)
    // const [isFar, setIsFar] = useState(true)
    const [radius, setRadius] = useState(100) //default 100 kesepakatan
    const [distance, setDistance] = useState(0) // jarak

    const [inet, setInet] = useState(false)

    NetInfo.fetch().then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        setInet(state.isConnected)
    });

    // console.log(route)

    const handleLocation = async () => {




        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status)
        if (status !== 'granted' || status === 'denied') {
            setErrorMsg('Harap Ijinkan Dahulu Lokasi Anda ...');
            setLocation(null)
            setWaiting(false)
            setStart(false)
            return;
        }

        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: 6, accuracy: Location.Accuracy.High });
        setLocation(location.coords);
        setFaker(location.mocked)
        setWaiting(false)
        setStart(false)

        // console.log(location)

        // setTimeout(() => {
        //     navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)
        // }, 6000)

        // handleRouting()

    }


    function handleRouting() {
        let jarakDariKantor = 0;
        jarakDariKantor = hitungJarak(location, mapRegion)
        if (jarakDariKantor > radius) {
            navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)
        } else {
            navigation.navigate(ROUTES.QR_SCAN, { status, kategory_id, tanggal, jam })
        }
    }




    useEffect(() => {
        let interval = setInterval(() => {
            handleLocation()
        }, 1000)

        return () => clearInterval(interval)
    }, [start]);

    if (faker) {
        return (
            <AppAlert visible={faker} msg="Maaf ... Kamu Terdeteksi Memakai Aplikasi FAKE GPS " onOk={() => {
                navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)
            }} />
        )
    }
    if (!inet) {
        return (
            <AppAlert visible={!inet} msg="Maaf ... Internet Kamu Tidak Aktif" onOk={() => {
                navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)
            }} />
        )
    }


    let jarakDariKantor = 0;
    let text = 'wait'
    let isFar = true;
    if (errorMsg) {
        jarakDariKantor = 0
        text = 'Kamu Mematikan Lokasi'
    } else if (location) {
        jarakDariKantor = hitungJarak(location, mapRegion)
        if (faker) {
            text = 'Maaf ... Kamu Terdeteksi Memakai Aplikasi FAKE GPS'
        }
        if (jarakDariKantor > radius) {
            isFar = true
            // setTimeout(() => {
            //     // navigation.goBack()
            //     navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)
            // }, 3000)
            text = 'Maaf Kamu Belum Bisa Absen Karena'
            // return navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)
        } else {
            // INI BERADA DIKANTR
            isFar = false
            text = 'Lanjutkan Absen'
        }
        console.log('ssss', jarakDariKantor)
        console.log('aaa', isFar)
    }

    // return (
    //     <AppLoader visible={waiting} />
    // )

    return (
        <View className="flex-1 justify-center items-center">

            {/* {(text === 'wait' || waiting) && (
                <>
                    <AppLoader visible={waiting} />
                </>
            )} */}

            {(text === 'wait' || waiting) ? (
                <>
                    <Text className="font-poppins text-lg mb-2">Harap Tunggu</Text>
                    <ActivityIndicator size={60} color={tw.color('primary')} className="p-4" />
                    <Text className="font-poppinsBold text-lg mb-2">Cek Lokasi...</Text>
                </>
            ) : (
                <>
                    {faker ? (
                        <>
                            <Icon name="alert-octagram-outline" color={tw.color('negative')} size={80} />
                            <Text className="font-poppins">Maaf ... Kamu Terdeteksi Memakai Aplikasi FAKE GPS </Text>
                        </>
                    ) : (
                        <>
                            {(errorMsg !== null) ? (
                                <>
                                    <Icon name="alert-octagram-outline" color={tw.color('negative')} size={80} />
                                    <Text className="font-poppins">{errorMsg}</Text>
                                </>
                            ) : (
                                <>
                                    <Image
                                        className="w-28 h-36 mb-5"
                                        source={IMGS.madSalehMinum}
                                    />

                                    {(isFar) && (
                                        <>
                                            <View className="p-4">
                                                <Text className="font-poppinsBold">{text}</Text>
                                            </View>
                                        </>
                                    )}
                                    <AppBtn label={isFar ? 'Kamu jauh dari kantor' : 'Lanjutkan Absen'} rounded color={isFar ? 'negative' : 'primary'}
                                        clicked={() => {
                                            text = 'wait'
                                            if (!isFar) {
                                                navigation.navigate(ROUTES.QR_SCAN, { status, kategory_id, tanggal, jam })
                                            } else {
                                                navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)
                                                // navigation.navigate(ROUTES.QR_SCAN, { status, kategory_id, tanggal, jam })
                                            }
                                        }}
                                    />
                                </>
                            )}

                        </>

                    )}
                </>
            )}



        </View>
    )
}

export default CekLokasi



function hitungJarak(lokasiku, lokasiKantor) {
    console.log('hitung jarak ...', lokasiku)
    if (lokasiku.latitude == lokasiKantor.latitude && lokasiku.longitude == lokasiKantor.longitude) {
        return 0;
    }

    const radlat1 = (Math.PI * lokasiku.latitude) / 180;
    const radlat2 = (Math.PI * lokasiKantor.latitude) / 180;

    const theta = lokasiku.longitude - lokasiKantor.longitude;
    const radtheta = (Math.PI * theta) / 180;

    let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    if (dist > 1) {
        dist = 1;
    }

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344; //convert miles to km
    return Math.trunc(dist * 1000);
}