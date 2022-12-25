import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Camera } from 'expo-camera';
import { AppLoader } from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
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


    React.useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            // const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    if (hasPermission === null || hasPermission === false) {
        return <AppLoader visible={hasPermission === null || hasPermission === false}  />
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

    const handleBarCodeScanned = ({bounds, data}) => {
        // setScanned(true);
        const { origin, size } = bounds
        setX(origin.x)
        setY(origin.y)
        setHeight(size.height)
        setWidth(size.width)

        if (size.width === width || size.height === height || X=== origin.x) {
            setScanned(true);
            console.log(data)
            navigation.navigate(ROUTES.ABSEN_LOADING, { data, status, kategory_id, tanggal, jam })
        }
    };

    const handleCamera = () => {
        setType(
            type === BarCodeScanner.Constants.Type.back? BarCodeScanner.Constants.Type.front : BarCodeScanner.Constants.Type.back
        )
        console.log('type:', type)
    }
    const handleFlash = () => {
        setFlash(
            flash === Camera.Constants.FlashMode.off? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off
        )
        console.log('type:', type)
    }
    


    return (
      <View className="flex-1">
            <View className="flex-1 relative">
                <Text className="font-poppinsBold z-10 bg-white text-center pt-10 pb-2">Qrcode Scanner</Text>
                
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
                        borderColor: scanned? tw.color('secondary'):tw.color('negative'),
                        borderWidth: 3,
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent:'center'

                    }}>
                        {scanned && (
                            <Text className="font-poppinsBold bg-secondary p-1 rounded-lg">Scanned</Text>
                        )}
                    </View>
                </BarCodeScanner>
                <View className="h-48 absolute bottom-0 left-0 right-0 px-8 justify-center">
                    <View className="flex-row items-center justify-between">
                        <TouchableOpacity className="bg-dark p-4 rounded-full"
                            onPress={()=> handleFlash()}
                        >
                            <Icon name={flash=== Camera.Constants.FlashMode.off? "flashlight-off" : "flashlight"} size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-dark p-4 rounded-full"
                            onPress={()=> navigation.goBack()}
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