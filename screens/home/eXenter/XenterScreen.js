import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackActions, useNavigation } from '@react-navigation/native'
import { Camera } from 'expo-camera'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { AppAlert, AppLoader } from '../../../components'
import { ROUTES, tw } from '../../../constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

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
            setLoad(true);
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            setLoad(false)
        })();
    }, [hasPermission]);

    if (hasPermission === null || hasPermission === false) {
        return <AppAlert visible={hasPermission === null || hasPermission === false} msg="Maaf, Kamu tidak mengizinkan Camera untuk Aplikasi ini."
            onOk={() => navigation.pop(1)}
        />
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
                // navigation.navigate(ROUTES.KirimQr, { data })
                navigation.dispatch(StackActions.push(ROUTES.KirimQr, { data }))

            }
        } else {
            if (data) {
                setScanned(true);
                console.log('kotak gakbisa ', data)
                // navigation.navigate(ROUTES.KirimQr, { data })
                navigation.dispatch(StackActions.push(ROUTES.KirimQr, { data }))
            }
        }


    };

    const handleCamera = () => {
        setType(
            type === BarCodeScanner.Constants.Type.back ? BarCodeScanner.Constants.Type.front : BarCodeScanner.Constants.Type.back
        )
        console.log('type:', type)
    }

    if (load) {
        return (
            < AppLoader visible={load} />
        )
    }
    return (
        <View className="flex-1">

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
                <View className="h-32 absolute bottom-0 left-0 right-0 px-8 justify-center">
                    <View className="flex-row items-center justify-between">
                        <View></View>
                        <TouchableOpacity className="bg-dark p-4 rounded-full self-end"
                            onPress={() => navigation.pop(1)}
                        >
                            <Icon name="close" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default XenterScreen