import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MapView, { Callout, Circle, Marker } from 'react-native-maps';

import * as Location from 'expo-location';
import { useState } from 'react';
import { tw } from '../../constants';

const AbsenMap = ({navigation, route}) => {
// -7.745297732746753, 113.21064194843156
    const mapRef = React.useRef();
    const [location, setLocation] = useState({
        latitude: -7.745489896339227,
        longitude: 113.21069094863365,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0015,
    });
    const [mapRegion, setMapRegion] = useState({
        latitude: -7.745297732746753,
        longitude: 113.21064194843156,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0015,
    });

    const [errorMsg, setErrorMsg] = useState(false)
    const [distance, setDistance] = useState(30)

    let text = 'Waiting..';
    if (errorMsg) {
        text = 'KAMU MEMATIKAN LOKASI';
    } else if (location) {
        let jarakKamuDariKantor = hitungJarak(location, mapRegion)
        if (jarakKamuDariKantor > distance) {
            text = 'Jarak Anda dari kantor Sekitar ' + jarakKamuDariKantor + ' Meter';
        } else {
            text = 'Kamu di Area Kantor ...'+ jarakKamuDariKantor + ' Meter';
        }
    }

    console.log('aaa', location)

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
            longitude: location.coords.longitude,
            latitudeDelta: 0.0015,
            longitudeDelta: 0.0015,
        }
        setLocation(result);
        console.log('useEffect absenMap ...', location)
        })();
    }, []);

  return (
      <View className="flex-1">
          <Text className="font-poppinsBold z-10 bg-white text-center pt-6 pb-2">Lokasi Absen</Text>
          <MapView className="flex-1"
              ref={map => {map = map}}
              initialRegion={mapRegion}
              customMapStyle={retroStyle}
              showsUserLocation={true}
              showsCompass={true}
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
                  radius={distance}
                  fillColor={tw.color('red-500/50')}
                  strokeColor={tw.color('red-500')}
                />   

          </MapView>
          <View className="h-1/2 bg-white rounded-t-2xl overflow-hidden">
              <Text className="font-poppinsBold px-4 pt-3">Absensi</Text>
              <Text className="font-poppins px-4 text-gray text-xs">{ text }</Text>
              {/* <View className="border-t border-gray-light" /> */}
              <ScrollView>
                  <Text className="font-poppins">dsfds</Text>
              </ScrollView>
          </View>
    </View>
  )
}

export default AbsenMap

function hitungJarak(lokasiku, lokasiKantor) {
    console.log('hitung jarak ...', lokasiku)
    if (lokasiku.latitude == lokasiKantor.latitude && lokasiku.longitude == lokasiKantor.longitude) {
        return 0;
    }

    const radlat1 = (Math.PI * lokasiku.latitude) / 180;
    const radlat2 = (Math.PI * lokasiKantor.latitude) / 180;

    const theta = lokasiku.longitude - lokasiKantor.longitude;
    const radtheta = (Math.PI * theta) / 180;

    let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    if (dist > 1) {
        dist = 1;
    }

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344; //convert miles to km
    return Math.trunc( dist * 1000 );
}

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