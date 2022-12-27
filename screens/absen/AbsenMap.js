import { View, Text } from 'react-native'
import React from 'react'
import MapView, { Callout, Circle, Marker } from 'react-native-maps';

import * as Location from 'expo-location';
import { useState } from 'react';

const AbsenMap = ({navigation, route}) => {

    const mapRef = React.useRef();
    const [location, setLocation] = useState({
        latitude: -7.745489896339227,
        longitude: 113.21069094863365,
    });
    const [mapRegion, setMapRegion] = useState({
        latitude: -7.745489896339227,
        longitude: 113.21069094863365,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });




    React.useEffect(() => {
    (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        let result = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }
        setLocation(result);
        console.log('useEffect absenMap ...', location)
        })();
    }, []);

  return (
      <View className="flex-1">
          <Text className="font-poppinsBold z-10 bg-white text-center pt-6 pb-2">Lokasi Absen</Text>
          <MapView className="flex-1"
              ref={mapRef}
              initialRegion={mapRegion}
              customMapStyle={retroStyle}
              showsUserLocation={true}
              onUserLocationChange={(e) => {
                  console.log('onUserLocationChange', e.nativeEvent)
                  setLocation({
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude:e.nativeEvent.coordinate.longitude
                  })
              }}
              

            >
              <Marker
                  coordinate={mapRegion}
                  pinColor='gold'
              >
                  <Callout>
                      <Text className="font-poppins">Kantor</Text>
                  </Callout>
              </Marker>
                <Circle
                    center={mapRegion}
                    radius={50}
              />
              
              <Marker
                  coordinate={location}
              >
                  
              </Marker>
          </MapView>
          <View className="h-1/2 bg-white rounded-t-xl">
              
          </View>
    </View>
  )
}

export default AbsenMap

const retroStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]