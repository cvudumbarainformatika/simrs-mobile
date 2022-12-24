import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'

const QrScanV2 = ({ navigation, route }) => {
    console.log('route params ... ',route.params)
    const { status, kategory_id, tanggal, jam } = route.params
    
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);


    React.useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


  return (
    <View>
      <Text>QrScanV2</Text>
    </View>
  )
}

export default QrScanV2