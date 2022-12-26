import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { Camera } from 'expo-camera'
import * as FaceDetector from 'expo-face-detector'
import { AppLoader } from '../../components'
import { tw } from '../../constants'

const FaceScan = ({navigation, route}) => {

    const cameraRef = useRef(null)
    const [hasPermission, setHasPermission] = useState()
    const [faceData, setFaceData] = useState([])

    const [X, setX] = useState(0)
    const [Y, setY] = useState(0)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)


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
    

    function getFaceDataView({ bounds, faceID, rollAngle, yawAngle }) {
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
        </View>
        );
    }

  return (
      <View style={styles.container}>
          <Text className="font-poppinsBold absolute top-0 left-0 right-0 z-10 bg-white text-center pt-8 pb-2">Scan Wajah</Text>
          <Camera
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
        >
        <View style={styles.topBar}>
            <Text style={styles.textcolor}>x: {faceData.length ? faceData[0].bounds.origin.x.toFixed(0) : 0}</Text>
            <Text style={styles.textcolor}>y: {faceData.length ? faceData[0].bounds.origin.y.toFixed(0) : 0}</Text>
        </View>
        <View style={styles.bottomBar}>
            <Text style={styles.textcolor}>Heigth: {faceData.length ? faceData[0].bounds.size.height.toFixed(0) : 0}</Text>
            <Text style={styles.textcolor}>width: {faceData.length ? faceData[0].bounds.size.width.toFixed(0) : 0}</Text>
        </View>
        </Camera>

        {faceData.length? getFaces(): undefined}  

        <View className="p-4 bg-white absolute bottom-0 left-0 right-0">
            <Text className="font-poppinsBold text-xs mb-2">🏷️  Rekam Wajah</Text>
            <Text className="font-poppins text-xs">
                Proses pengenalan wajah memerlukan pencahayaan yang baik. Pastikan wajah Anda yang terekam dan tidak diperkenankan diwakilkan orang lain.
            </Text>
        </View>
    </View>
  )
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