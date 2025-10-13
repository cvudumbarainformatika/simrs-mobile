import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { CameraView, CameraType, useCameraPermissions, FlashMode } from 'expo-camera';
import { AppAlert, AppLoader } from '../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ROUTES, tw } from '../../constants';

const QrScanV2 = ({ navigation, route }) => {
    const { status, kategory_id, tanggal, jam } = route.params;

    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [flash, setFlash] = useState('off');
    const [type, setType] = useState('back');
    const [X, setX] = useState(0);
    const [Y, setY] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [wait, setWait] = useState(false);

    useEffect(() => {
        (async () => {
            setWait(true);
            const { status } = await requestPermission();
            setWait(false);
        })();
    }, []);

    const hasPermission = permission?.status === 'granted';

    if (wait) {
        return <AppLoader visible={wait} />;
    }

    if (!permission || !hasPermission) {
        return (
            <AppAlert
                visible={!permission || !hasPermission}
                msg="Harap Izinkan Kamera terlebih dahulu.... "
                onOk={() => navigation.goBack()}
            />
        );
    }

    function renderHeader() {
        return (
            <View className="absolute top-0 z-10 bg-white left-0 right-0">
                <View className="">
                    <Text className="font-poppinsBold">Qrcode Scanner</Text>
                </View>
            </View>
        );
    }

    const handleBarCodeScanned = ({ bounds, data }) => {
        let kotak = (bounds === undefined || bounds === 'undefined' || bounds === null || bounds === false);
        if (!kotak) {
            const { origin, size } = bounds;
            setX(origin.x);
            setY(origin.y);
            setHeight(size.height);
            setWidth(size.width);

            if (size.width === width || size.height === height || X === origin.x) {
                setScanned(true);
                console.log(data);
                navigation.navigate(ROUTES.ABSEN_LOADING, { data, status, kategory_id, tanggal, jam });
            }
        } else {
            if (data) {
                setScanned(true);
                console.log('kotak gakbisa ', data);
                navigation.navigate(ROUTES.ABSEN_LOADING, { data, status, kategory_id, tanggal, jam });
            }
        }
    };

    const handleCamera = () => {
        // setType(type === CameraType.back ? CameraType.front : CameraType.back);
        setType(type === 'back' ? 'front' : 'back');
        console.log('type:', type);
    };

    const handleFlash = () => {
        // setFlash(flash === FlashMode.off ? FlashMode.torch : FlashMode.off);
        setFlash(flash === 'off' ? 'on' : 'off');  // 'on' equivalent torch; compare string
        console.log('flash:', flash);
    };

    return (
        <View className="flex-1">
            <View className="flex-1 relative">
                <Text className="font-poppinsBold z-10 bg-white text-center pt-10 pb-2">
                    Qrcode Scann Absensi {status}
                </Text>

                <CameraView
                    style={StyleSheet.absoluteFillObject}
                    facing={type}
                    flash={flash}
                    barcodeScannerSettings={{
                        barcodeTypes: ['qr', 'pdf417', 'code128'], // Sesuaikan tipe barcode jika diperlukan
                    }}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                />

                <View
                    style={{
                        position: 'absolute',
                        top: Y,
                        left: X,
                        width: width,
                        height: height,
                        borderColor: scanned ? tw.color('secondary') : tw.color('negative'),
                        borderWidth: 3,
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {scanned && (
                        <Text className="font-poppinsBold bg-secondary p-1 rounded-lg">Scanned</Text>
                    )}
                </View>

                <View className="h-32 absolute bottom-0 left-0 right-0 px-8 justify-center">
                    <View className="flex-row items-center justify-between">
                        <TouchableOpacity
                            className="bg-dark p-4 rounded-full"
                            onPress={handleFlash}
                        >
                            <Icon
                                name={flash === FlashMode.off ? 'flashlight-off' : 'flashlight'}
                                size={30}
                                color="white"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-dark p-4 rounded-full self-end"
                            onPress={() => navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)}
                        >
                            <Icon name="close" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default QrScanV2;