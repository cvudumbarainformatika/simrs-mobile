import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Camera } from 'expo-camera';
import { AppAlert, AppLoader } from '../../components'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ROUTES, tw } from '../../constants';

const QrScanV2 = ({ navigation, route }) => {
    // console.log('route params ... ',route.params)
    const { status, kategory_id, tanggal, jam } = route.params

    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false);
    // const [type, setType] = useState(Camera.Constants.Type.back)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const [X, setX] = useState(0)
    const [Y, setY] = useState(0)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    const [wait, setWait] = useState(false)


    React.useEffect(() => {
        (async () => {
            setWait(true);
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            // const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            setWait(false)
        })();
    }, []);

    if (wait) {
        return <AppLoader visible={wait} />
    }
    if (hasPermission === null || hasPermission === false) {
        return <AppAlert visible={hasPermission === null || hasPermission === false} msg="Harap Izinkan Kamera terlebih dahulu.... "
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
                console.log(data)
                navigation.navigate(ROUTES.ABSEN_LOADING, { data, status, kategory_id, tanggal, jam })

            }
        } else {
            if (data) {
                setScanned(true);
                console.log('kotak gakbisa ', data)
                navigation.navigate(ROUTES.ABSEN_LOADING, { data, status, kategory_id, tanggal, jam })
            }
        }


    };

    const handleCamera = () => {
        setType(
            type === BarCodeScanner.Constants.Type.back ? BarCodeScanner.Constants.Type.front : BarCodeScanner.Constants.Type.back
        )
        console.log('type:', type)
    }
    // const handleFlash = () => {
    //     setFlash(
    //         flash === Camera.Constants.FlashMode.off? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off
    //     )
    //     console.log('type:', type)
    // }



    return (
        <View className="flex-1">
            <View className="flex-1 relative">
                <Text className="font-poppinsBold z-10 bg-white text-center pt-10 pb-2">Qrcode Scann Absensi {status}</Text>

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
                        {/* <TouchableOpacity className="bg-dark p-4 rounded-full"
                            onPress={()=> handleFlash()}
                        >
                            <Icon name={flash=== Camera.Constants.FlashMode.off? "flashlight-off" : "flashlight"} size={30} color="white" />
                        </TouchableOpacity> */}
                        <View></View>
                        <TouchableOpacity className="bg-dark p-4 rounded-full self-end"
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name="close" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default QrScanV2