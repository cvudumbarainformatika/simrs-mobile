import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native'


import { tw, ROUTES } from '../../constants';
import { AppConfirm, AppLoader } from '../../components';
import { api } from '../../helpers/axiosInterceptor';
import { useDispatch, useSelector } from 'react-redux';
import {  setId, setWaiting } from '../../redux/features/jadwal/absenReducer';

const AbsenScreen = () => {

  const dispatch = useDispatch()

  const navigation = useNavigation()
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [animLoad, setAnimLoad] = useState(false)
  const [msg, setMsg] = useState('');

  const { id, interv, waiting, isDone } = useSelector(state => state.absen)
  

  // METHOD
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [waiting, isDone, id]);




  const handleBarCodeScanned = async ({ type, data }) => {
    // setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setScanned(true)
    dispatch(setWaiting(true))
    let form = {
      id: id,
      qr: data
    }
    console.log('absen form : ', form)
    
        
    await api.post('/v2/absensi/qr/scan', form).then((response) => {
      console.log('response absen',response.data);
      let trans_id = response.data.jadwal.data.id;
      dispatch(setId(trans_id))
      navigation.navigate(ROUTES.HOME_TAB)
      dispatch(setWaiting(false))
    }).catch(error => {
      console.log('absen :', error.response);
      dispatch(setWaiting(false))
      setScanned(true)
    })
       
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
      <AppLoader visible={waiting} />
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