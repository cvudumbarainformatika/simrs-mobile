import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native'


import { tw, ROUTES } from '../../constants';
import { AppConfirm, AppLoader } from '../../components';
import { api } from '../../helpers/axiosInterceptor';
import { useDispatch, useSelector } from 'react-redux';
import { getAbsenTodayAsync, setId, setWaiting } from '../../redux/features/jadwal/absenReducer';

import dayjs from 'dayjs'
import { getCurrentJadwal } from '../../redux/features/jadwal/jadwalsReducer';
require('dayjs/locale/id')

const AbsenScreen = () => {

  const dispatch = useDispatch()

  const navigation = useNavigation()
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [animLoad, setAnimLoad] = useState(false)
  const [msg, setMsg] = useState('');

  const { id, interv, waiting, isDone } = useSelector(state => state.absen)
  
  const { jadwals } = useSelector(state => state.jadwal)
  const [date, setDate] = useState(dayjs().locale("id"))
  const [cam, setCam] = useState('_qmasuk')   // _qmasuk || _qpending  || _qpulang

  const currentJadwal = useSelector((state) => getCurrentJadwal(state, date.format("dddd")))
  // const jamMasuk = currentJadwal[0].masuk
  // const jamPulang = currentJadwal[0].pulang
  // const status = currentJadwal[0].status
  // const hari = currentJadwal[0].hari
  // const day = currentJadwal[0].day

  // const prioritas = () => {
  //   if (hari === date.format("dddd") || day === date.format("dddd") || id === 0) {
  //     setCam('_qmasuk')
  //   } 
  // }

  // METHOD
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);




  const handleBarCodeScanned = async ({ type, data }) => {
    // setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setScanned(true)
    let form = {
      id: id,
      qr: data
    }
    console.log('absen form : ', form)
    
        
    dispatch(setWaiting(true))
    await api.post('/v2/absensi/qr/scan', form).then((response) => {
      navigation.navigate(ROUTES.HOME_TAB)
      // console.log('response absen',response.data);
      let trans_id = response.data.jadwal.data.id;
      dispatch(setId(trans_id))
      dispatch(getAbsenTodayAsync())
      // dispatch(setWaiting(false))
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