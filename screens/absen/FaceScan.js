import { Platform, View, Text, StyleSheet, StatusBar, BackHandler, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { Camera } from 'expo-camera'
// import * as FaceDetector from 'expo-face-detector'
import { AppLoader } from '../../components'
import { ROUTES, tw } from '../../constants'
import { useContext } from 'react'
import { AbsenContext } from '../../context/AbsenContext'
import { AuthContext } from '../../context/AuthContext'
// import { useBackHandler } from '@react-native-community/hooks'

const FaceScan = ({navigation, route}) => {

    const { status, kategory_id, tanggal, jam } = route.params
    const cameraRef = useRef(null)
    const [hasPermission, setHasPermission] = useState()
    const [faceData, setFaceData] = useState([])

    const {pegawai} = useContext(AuthContext)

    function handleAbsen() {
        const data = "khusus"
        navigation.navigate(ROUTES.ABSEN_LOADING, { data, status, kategory_id, tanggal, jam })
    }

    useEffect(() => {
        (async () => { 
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted')
        })();
    }, [])
    

    if (hasPermission === false) {
        return <AppLoader visible={hasPermission === false}  />
    }


    const handleFaceDetected = ({faces}) => {
        if (faces.length > 0) {
            setFaceData(faces)
            console.log(faces)
        }
    }


    const getFaces = () => 
        <View style={styles.facesContainer} pointerEvents="none">
            {faceData.map(getFaceDataView)}
        </View>
    

    function getFaceDataView({ bounds, faceID, rollAngle, yawAngle, smilingProbability }) {
        const smiling = smilingProbability > 0.7;
        smiling ? handleAbsen() : null
        
        return (
        <View
            key={faceID}
            transform={[
                { perspective: 600 },
                { rotateZ: `${rollAngle.toFixed(0)}deg` },
                { rotateY: `${yawAngle.toFixed(0)}deg` },
            ]}
            style={[
            styles.face,
            {
                ...bounds.size,
                left: bounds.origin.x,
                top: bounds.origin.y,
            },
            ]}>
            {/* <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
            <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text> */}
                <Text className="font-poppins relative text-center mx-4 bg-secondary text-white text-ellipsis">
                    Wajah Terdeteksi
                </Text>
            {/* <Text >Eyes Shut: {eyesShut.toString()}</Text>
            <Text >Winking: {winking.toString()}</Text> */}
            <Text className="font-poppins absolute bottom-0 left-0 right-0 text-center mx-8 bg-secondary text-white text-ellipsis" >{ smiling ? 'Tahan' : 'Senyum = Absen' }</Text>
        </View>
        );
    }


  if (pegawai.user.status === "8" || pegawai.user.status === 8) { //scan wajah
    return (
        <View style={styles.container}>
            <Text className="font-poppinsBold absolute top-0 left-0 right-0 z-10 bg-white text-center pt-8 pb-2">Scan Wajah</Text>
            {/* <Camera
                style={styles.camera}
                ratio={'16:9'}
                type={Camera.Constants.Type.front}
                autoFocus={Camera.Constants.AutoFocus.on}
                onFacesDetected={handleFaceDetected}
                faceDetectorSettings={{
                    mode: FaceDetector.FaceDetectorMode.accurate,
                    detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                    runClassifications: FaceDetector.FaceDetectorClassifications.all,
                    minDetectionInterval: 300,
                    tracking: true
                }}
            > */}
                
            {/* <View style={styles.topBar}>
                <Text style={styles.textcolor}>x: {faceData.length ? faceData[0].bounds.origin.x.toFixed(0) : 0}</Text>
                <Text style={styles.textcolor}>y: {faceData.length ? faceData[0].bounds.origin.y.toFixed(0) : 0}</Text>
            </View>
            <View style={styles.bottomBar}>
                <Text style={styles.textcolor}>Heigth: {faceData.length ? faceData[0].bounds.size.height.toFixed(0) : 0}</Text>
                <Text style={styles.textcolor}>width: {faceData.length ? faceData[0].bounds.size.width.toFixed(0) : 0}</Text>
            </View> */}
            {/* </Camera> */}

            {/* {faceData.length? getFaces(): undefined}   */}

            <View className="p-4 bg-white absolute bottom-0 left-0 right-0">
                <Text className="font-poppinsBold text-xs mb-2">🏷️  Rekam Wajah</Text>
                <Text className="font-poppins text-xs">
                    Proses pengenalan wajah memerlukan pencahayaan yang baik. Pastikan wajah Anda yang terekam dan tidak diperkenankan diwakilkan orang lain.
                </Text>
            </View>
        </View>
    )
  } else { // pegawai.user.status === 9
      // device ini tidak bisa barcode dan wajah
      return (
          <View className="flex-1 items-center justify-center">
              <Text className="font-poppinsBold absolute top-0 left-0 right-0 z-10 bg-white text-center pt-8 pb-2">Pemakluman</Text>
              
              <TouchableOpacity onPress={()=> handleAbsen()}>
                  <View className="w-32 h-32 bg-primary items-center justify-center rounded-full">
                    <Text className="font-poppinsBold text-white text-xl">GO</Text>
                </View>
              </TouchableOpacity>
              
          </View>
      )

  }  
  
}

export default FaceScan


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flex: 0.3,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 50 : 0,
  },
  bottomBar: {
    flex: 0.3,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  face: {
    // padding: 10,
    borderWidth: 3,
    borderRadius: 2,
    position: 'absolute',
    borderColor: tw.color('secondary'),
    // justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  faceText: {
    color: '#32CD32',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  textcolor:{
    color: '#008080',
    }
});