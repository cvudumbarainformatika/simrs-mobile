import { View, Text, SafeAreaView, Image, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from "expo-linear-gradient";
import tw from '../constants/tw'
import AppInput from '../components/~global/AppInput';

const LoginScreen = (props) => {

  const navigation = useNavigation()
  return (
    // <SafeAreaView>
    //   <View className="bg-white min-h-full flex flex-col">
    //     <View className="">
    //       <LinearGradient
    //           colors={[tw.color('secondary'), tw.color('primary')]}
    //           start={{ x: 1, y: 0 }}
    //           end={{x:1,y:1}}
    //           className="h-64 w-full rounded-tl-[180px] rounded-br-[160px] inset-0 flex justify-center items-center ">
    //           <Image
    //               className="w-16 h-16 mb-2"
    //               source={require("../assets/static/logo-rsud.png")}
    //           />
    //           <Text className="text-white">UOBK RSUD MOHAMMAD SALEH</Text>
    //           <Text className="text-white font-bold text-xl">SIMRS</Text>
    //           <Text className="text-white text-xs">Sistem Informasi Management Rumah Sakit</Text>
    //       </LinearGradient>
    //     </View>
    //     <View className="flex-grow justify-center items-center">
    //       <View style={tw`p-4 bg-white w-full`}>
    //         <AppInput icon="email" placeholder="Email" />
    //         <AppInput icon="email" placeholder="Email" />
    //       </View>
    //     </View>
    //     <View className="bg-secondary h-24 rounded-tl-full overflow-hidden left-72">
    //       <LinearGradient className="h-24 ring-warning ring-inset"
    //           colors={[tw.color('secondary'), tw.color('primary')]}
    //           start={{ x: 1, y: 0 }}
    //           end={{x:1,y:0.9}}
    //       />
    //     </View>
    //   </View>
    // </SafeAreaView>

    <View style={styles.container}>
      <View style={styles.parentContainer}>
        <LinearGradient
          colors={[tw.color('secondary'), tw.color('primary')]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.topPlace}>
          <View style={tw`flex-1 justify-center items-center pt-8`}>
            <Image
                className="w-16 h-16 mb-2"
                source={require("../assets/static/logo-rsud.png")}
            />
            <Text className="text-white">UOBK RSUD MOHAMMAD SALEH</Text>
            <Text className="text-white font-bold text-xl">SIMRS</Text>
            <Text className="text-white text-xs">Sistem Informasi Management Rumah Sakit</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
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
    borderTopRightRadius:180,
    width: '100%',
    height: 300,
    position: "absolute",
    top: 0,
    right: 0,
    overflow: 'hidden'
  },
  bottomPlace: {
    borderBottomLeftRadius: 180,
    borderTopRightRadius:180,
    width: '100%',
    height: 300,
    position: "absolute",
    top: 0,
    right: 0,
    overflow: 'hidden'
  }
  });

export default LoginScreen