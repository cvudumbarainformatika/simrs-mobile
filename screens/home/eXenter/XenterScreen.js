import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Camera } from 'expo-camera'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { AppAlert, AppLoader } from '../../../components'
import { ROUTES, tw } from '../../../constants'

const XenterScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const [X, setX] = useState(0)
    const [Y, setY] = useState(0)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    const [load, setLoad] = useState(false)
    // const navigation = useNavigation()

    React.useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    if (hasPermission === null || hasPermission === false) {
        return <AppAlert visible={hasPermission === null || hasPermission === false} msg="Maaf, Kamu tidak mengizinkan Camera untuk Aplikasi ini."
            onOk={() => navigation.goBack()}
        />
    }

    function renderHeader() {
        return (
            <View className="absolute top-0 z-10 bg-white left-0 right-0">
                <View className="">
                    <Text className="font-poppinsBold">Qrcode Scanner</Text>
                </View>
            </View>
        )
    }

    const handleBarCodeScanned = ({ bounds, data }) => {
        let kotak = (bounds === undefined || bounds === 'undefined' || bounds === null || bounds === false)
        // setScanned(true);
        // console.log('handleBarcodeScanned', kotak)
        // console.log('handleBarcodeScanned data ..', data)
        if (!kotak) {
            const { origin, size } = bounds
            setX(origin.x)
            setY(origin.y)
            setHeight(size.height)
            setWidth(size.width)

            if (size.width === width || size.height === height || X === origin.x) {
                setScanned(true);
                console.log('kotak', data);
                // navigation.navigate(ROUTES.ABSEN_LOADING, { data, status, kategory_id, tanggal, jam })
                setLoad(true);
                setTimeout(() => {
                    setLoad(false)
                    navigation.navigate("Home")
                }, 1000)

            }
        } else {
            if (data) {
                setScanned(true);
                console.log('kotak gakbisa ', data)
                // navigation.navigate(ROUTES.ABSEN_LOADING, { data, status, kategory_id, tanggal, jam })
            }
        }


    };

    const handleCamera = () => {
        setType(
            type === BarCodeScanner.Constants.Type.back ? BarCodeScanner.Constants.Type.front : BarCodeScanner.Constants.Type.back
        )
        console.log('type:', type)
    }
    return (
        <View className="flex-1">

            < AppLoader visible={load} />
            <View className="flex-1 relative">
                <Text className="font-poppinsBold z-10 bg-white text-center pt-10 pb-2">Qrcode Scann Aplikasi  Xenter Sim</Text>
                <BarCodeScanner
                    flashMode={flash}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                >

                    <View style={{
                        position: 'absolute',
                        top: Y,
                        left: X,
                        width: width,
                        height: height,
                        borderColor: scanned ? tw.color('secondary') : tw.color('negative'),
                        borderWidth: 3,
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        {scanned && (
                            <Text className="font-poppinsBold bg-secondary p-1 rounded-lg">Scanned</Text>
                        )}
                    </View>
                </BarCodeScanner>
            </View>
        </View>
    )
}

export default XenterScreen