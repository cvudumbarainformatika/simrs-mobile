import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StackActions } from '@react-navigation/native';
import { CameraView, CameraType, useCameraPermissions, FlashMode } from 'expo-camera';
import { AppAlert, AppLoader } from '../../../components';
import { ROUTES, tw } from '../../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const XenterScreen = ({ navigation }) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [flash, setFlash] = useState('off');
    const [type, setType] = useState('back');
    const [X, setX] = useState(0);
    const [Y, setY] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        (async () => {
            setLoad(true);
            const { status } = await requestPermission();
            setLoad(false);
        })();
    }, []);

    const hasPermission = permission?.status === 'granted';

    if (!permission || !hasPermission) {
        return (
            <AppAlert
                visible={!permission || !hasPermission}
                msg="Maaf, Kamu tidak mengizinkan Camera untuk Aplikasi ini."
                onOk={() => navigation.dispatch(StackActions.replace(ROUTES.HOME))}
            />
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
                navigation.dispatch(StackActions.replace(ROUTES.KirimQr, { data }));
            }
        } else {
            if (data) {
                setScanned(true);
                console.log('kotak gakbisa ', data);
                navigation.dispatch(StackActions.replace(ROUTES.KirimQr, { data }));
            }
        }
    };

    const handleCamera = () => {
        setType(type === CameraType.back ? CameraType.front : CameraType.back);
        console.log('type:', type);
    };

    if (load) {
        return <AppLoader visible={load} />;
    }

    return (
        <View className="flex-1">
            <View className="flex-1 relative">
                <Text className="font-poppinsBold z-10 bg-white text-center pt-10 pb-2">
                    Qrcode Scann Aplikasi Xenter Sim
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
                        <View></View>
                        <TouchableOpacity
                            className="bg-dark p-4 rounded-full self-end"
                            onPress={() => navigation.dispatch(StackActions.push(ROUTES.HOME))}
                        >
                            <Icon name="close" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default XenterScreen;