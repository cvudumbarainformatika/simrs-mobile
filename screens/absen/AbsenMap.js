import { View, Text } from 'react-native'
import React from 'react'
import MapView, { Callout, Circle, Marker } from 'react-native-maps';


const AbsenMap = () => {
  return (
      <View className="flex-1">
          <Text className="font-poppinsBold z-10 bg-white text-center pt-6 pb-2">Lokasi Absen</Text>
          <MapView className="flex-1"
                initialRegion={{
                    latitude: -7.745489896339227,
                    longitude: 113.21069094863365,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
          >
              <Marker
                  coordinate={{ latitude: -7.745489896339227, longitude: 113.21069094863365, }}
                  pinColor='gold'
              >
                  <Callout>
                      <Text className="font-poppins">Kantor</Text>
                  </Callout>
              </Marker>
                <Circle
                    center={{ latitude: -7.745489896339227, longitude: 113.21069094863365, }}
                    radius={50}
                />
          </MapView>
          <View className="h-1/2 bg-white rounded-t-xl">
              
          </View>
    </View>
  )
}

export default AbsenMap

// color for map
// red (default)
// tomato
// orange
// yellow
// gold
// wheat
// tan
// linen
// green
// blue / navy
// aqua / teal / turquoise
// violet / purple / plum
// indigo