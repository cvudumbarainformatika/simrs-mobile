import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { IMGS, ROUTES, tw } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AppBtn } from '../../components';
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

    const [waiting, setWaiting] = useState(true)
    const [errorMsg, setErrorMsg] = useState(null)
    const [radius, setRadius] = useState(100) //default 30 kesepakatan
    const [distance, setDistance] = useState(0) // jarak

    // console.log(route)

    const handleLocation = async () => {
        setWaiting(true)
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status)
        if (status !== 'granted' || status === 'denied') {
            setErrorMsg('Harap Ijinkan Dahulu Lokasi Anda ...');
            setLocation(null)
            setWaiting(false)
            return;
        }

        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: 6, accuracy: Location.Accuracy.High });
        setLocation(location.coords);
        setFaker(location.mocked)
        // setWaiting(false)

        console.log(location)

    }






    useEffect(() => {

        let interval = setInterval(() => {
            handleLocation()
        }, 1000)

        return () => clearInterval(interval)
    }, []);

    if (faker) {
        return (
            <AppAlert visible={faker} msg="Maaf ... Kamu Terdeteksi Memakai Aplikasi FAKE GPS " onOk={() => {
                navigation.goBack()
            }} />
        )
    }


    let jarakDariKantor = 0;
    let isFar = true;
    if (errorMsg) {
        jarakDariKantor = 0
    } else if (location) {
        jarakDariKantor = hitungJarak(location, mapRegion)
        if (jarakDariKantor > radius) {
            isFar = true;
        } else {
            isFar = false;

        }
        console.log('ssss', jarakDariKantor)
        console.log('aaa', isFar)
    } else {
        jarakDariKantor = 0
    }

    return (
        <View className="flex-1 justify-center items-center">

            {(waiting) && (
                <Text className="font-poppins text-lg mb-2">Cek Lokasi</Text>
            )}

            {faker ? (
                <>
                    <Icon name="alert-octagram-outline" color={tw.color('negative')} size={80} />
                    <Text className="font-poppins">{errorMsg}</Text>
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
                            <AppBtn label={isFar ? 'Kamu jauh dari kantor' : 'Lanjutkan Absen'} rounded color={isFar ? 'negative' : 'primary'}
                                clicked={() => {
                                    if (!isFar) {
                                        navigation.navigate(ROUTES.QR_SCAN, { status, kategory_id, tanggal, jam })
                                    } else {
                                        navigation.goBack()
                                        // navigation.navigate(ROUTES.QR_SCAN, { status, kategory_id, tanggal, jam })
                                    }
                                }}
                            />
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