import { View, Text, SafeAreaView, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from "expo-linear-gradient";
import tw from '../constants/tw'


import AppInput from '../components/~global/AppInput';
import AppBtn from '../components/~global/AppBtn';
import AppLoader from '../components/~global/AppLoader';

const LoginScreen = (props) => {
  // STATE
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)



  // METHODE
  const login = () => {
    setLoading(true)
    setTimeout(() => {
      Alert.alert('Success','Success Brooo')
      setLoading(false)
    }, 3000)
  }

  const registerClicked = () => {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <AppLoader visible={loading} />
      <View style={styles.parentContainer}>
        <LinearGradient
          colors={[tw.color('secondary'), tw.color('primary')]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.topPlace}>
          <View style={tw`flex-1 justify-center items-center pt-4`}>
            <Image
                className="w-16 h-16 mb-2"
                source={require("../assets/static/logo-rsud.png")}
            />
            <Text className="text-white">UOBK RSUD MOHAMMAD SALEH</Text>
            <Text className="text-white font-bold text-xl">SIMRS</Text>
            <Text className="text-white text-xs">Sistem Informasi Management Rumah Sakit</Text>
          </View>
        </LinearGradient>
        <LinearGradient 
          style={styles.bottomPlace}
          colors={[tw.color('secondary'), tw.color('primary')]}
          start={{ x: 1, y: 0 }}
          end={{x:1,y:0.9}}
        />

        <View className="flex-1 items-center  absolute bottom-16 w-full">
          <View style={tw`w-full p-8`}>
            <View style={tw.style('items-center')}>
              <Text style={tw.style(' text-gray-dark pb-4')}>Silahkan Anda Login Terlebih dahulu</Text>
            </View>
            <AppInput icon="email" placeholder="Email" />
            <AppInput icon="key" placeholder="Password" password />

            <View style={tw.style('mt-4')}>
              <AppBtn label="Login" fullwidth
                  clicked={() => {
                      login();
                  }}
              />
            </View>

            <View style={tw`flex-row items-center justify-center pt-8`}>
              <Text style={tw.style('text-xs text-gray-dark')}>Belum Punya Akun? </Text>
              <TouchableOpacity onPress={registerClicked}>
                <Text style={tw.style('text-xs text-primary')}> Register disini</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
      </View>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
  parentContainer: {
    width: "100%",
    height: "100%",
  },

  square: {
    width: 100,
    height: 100,
    backgroundColor: 'crimson',
    position: "absolute",
    bottom: 0,
    right: 0
  },

  topPlace: {
    borderBottomLeftRadius: 180,
    borderBottomRightRadius:180,
    width: '100%',
    height: 300,
    position: "absolute",
    top: 0,
    right: 0,
    overflow: 'hidden'
  },
  bottomPlace: {
    borderTopLeftRadius: 98/100 * 390,
    borderTopLeftRadius:180,
    width: '100%',
    height: 100,
    position: "absolute",
    bottom: 0,
    left: '70%',
    overflow: 'hidden'
  }
  });

export default LoginScreen