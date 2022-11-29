import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { getAbsenTodayAsync } from '../../redux/features/jadwal/absenReducer'
import { api } from '../../helpers/axiosInterceptor'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { AppAlert, AppConfirm, AppLoader } from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ROUTES, tw } from '../../constants'

const QrScan = ({navigation}) => {


const dispatch = useDispatch()
    
  const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    
    const [animLoad, setAnimLoad] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [msg, setMsg] = useState(null);
    
    const { id, absenToday } = useSelector(state => state.absen)
  // METHOD
    useEffect(() => {
        (async () => {
            dispatch(getAbsenTodayAsync())
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            // console.log('today qrcode:', id)
        })();
  }, []);




  const handleBarCodeScanned = async ({ type, data }) => {
    // setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setMsg(null)
    setScanned(true)
    let form = {
      id: id,
      qr: data
    }
    // console.log('absen form : ', form)
    
    //   setWaiting(true)
      navigation.navigate(ROUTES.ABSEN_LOADING, {data, id})
        
    // await api.post('/v2/absensi/qr/scan', form).then((response) => {
    // //   console.log('response absen',response.data);
    // //   let trans_id = response.data.jadwal.data.id;
        
    //     dispatch(getAbsenTodayAsync())
    //     setWaiting(false)
    // //   dispatch(setWaiting(false))
    // }).catch(error => {
    //   setScanned(true)
    //   console.log('absen :', error.response);
    //     setWaiting(false)
    //     setMsg('Maaf Ada Kesalahan Ulangi Lagi')
    // })
       
  };

  if (hasPermission === null) {
      return <AppAlert visible={hasPermission === null} msg="Camera tidak diijinkan" onOk={()=>navigation.goBack()} />
    //   (<View className="bg-dark flex-1">
    //       <Text className="self-center text-center">Requesting for camera permission</Text>
    //   </View>
    //   )
  }

  if (hasPermission === false) {
      return <AppAlert visible={hasPermission === false} msg="Camera tidak diijinkan" onOk={()=>navigation.goBack()}/>
    //   (<View className="bg-dark flex-1">
    //       <Text className="self-center text-center">Requesting for camera permission</Text>
    //   </View>
    //   )
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-dark">
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          >
              <TouchableOpacity className="absolute top-8 right-4"
                onPress={()=> navigation.goBack()}
              >
                  <Icon name="close" color={'white'} size={40} />
            </TouchableOpacity>
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
      <AppConfirm visible={msg !== null} status="Error" msg={msg} labelBtnBack="Scan Lagi!" labelBtnOk="OK"
        onDismiss={() => {
            setScanned(false)
            setMsg(null)
        }}
      
        onOk={() => {
        setScanned(false)
            setMsg(null)
          navigation.goBack()
        }}
      />
    </SafeAreaView>
  )
}

export default QrScan

// const opacity = 'rgba(0, 0, 0, .6)';
const opacity = tw.color('dark');
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