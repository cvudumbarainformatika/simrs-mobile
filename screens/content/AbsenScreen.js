import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native'


import { tw, ROUTES } from '../../constants';
import { AppConfirm, AppLoader } from '../../components';

const AbsenScreen = () => {

  const navigation = useNavigation()
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // METHOD
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setLoading(true)
    setTimeout(() => {
      setScanned(true);
      setLoading(false)
      setMsg(`Bar code type ${type} and data ${data} has been scanned!`)
    }, 500);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        >
          <View style={styles.layerTop} />
          <View style={styles.layerCenter}>
            <View style={styles.layerLeft} />
            <View style={styles.focused} />
            <View style={styles.layerRight} />
          </View>
          <View style={styles.layerBottom} />
        </BarCodeScanner>
      
      {/* setelah scann */}
      <AppLoader visible={loading} />
      <AppConfirm visible={scanned} status="Success" msg={msg} labelBtnBack="Scan Lagi!" labelBtnOk="OK"
        onDismiss={() => {
          setScanned(false)
        }}
      
        onOk={() => {
        setScanned(false)
          navigation.navigate(ROUTES.HOME_TAB)
        }}
      />
    </View>
  )
}

export default AbsenScreen

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    borderRadius:30,
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10,
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 4,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity
  },

  // edge
  topLeftEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRightEdge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeftEdge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomRightEdge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  lineAnim: { height: 2, backgroundColor: '#fff' },
});