import { View, Text, SafeAreaView, Image, ScrollView, StyleSheet, TouchableOpacity, Alert, Keyboard, Dimensions, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from "expo-linear-gradient";


import { IMGS, ROUTES, tw } from '../../constants';
import { AppInput,AppBtn,AppLoader, AppAlert } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import Svg from 'react-native-svg';
import Animated, { useAnimatedStyle, useSharedValue, interpolate, withTiming } from 'react-native-reanimated';
// import { StatusBar } from 'expo-status-bar';


const LoginScreen = (props) => {

  const { width, height } = Dimensions.get('screen');
  const imagePosition = useSharedValue(1);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0,1], [-height/2, 0])
    return {
      transform:[{translateY: withTiming(interpolation, {duration:500})}]
    }
  })
  // const height = Platform.OS === 'android' && Platform.Version > 26 ? Dimensions.get('screen').height - StatusBar.currentHeight : Dimensions.get('window').height;

  // STATE
  const navigation = useNavigation()
  const {login, isLoading} = useContext(AuthContext)
  const [err, setErr] = useState(false)
  const [errors, setErrors] = useState({});

  const [inputs, setInputs] = useState({
        username: '',
        password:''
  })

  function handleOnChanged(text, input) {
        setInputs(states => ({ ...states, [input]: text }))
    }
    function handleError(msg, input) {
        setErrors(states => ({ ...states, [input]: msg }))
    }

  function validate() {
      Keyboard.dismiss();
      let valid = true;
      if (!inputs.username) {
          handleError('Harap diisi terlebih dahulu', 'username')
          valid = false
      }
      if (!inputs.password) {
          handleError('Harap diisi terlebih dahulu', 'password')
          valid = false
      }

      if (valid) {
          lanjut()
      }
  }

  function lanjut() {
    login(inputs.username, inputs.password)
  }

  const registerClicked = () => {
    navigation.navigate('Register')
  }

  const loginHandler = () => [
    imagePosition.value =0
  ]

  return (
    
    <View className="flex-1 bg-white justify-end">
      {/* TOP */}
      <AppLoader visible={isLoading} />
      <AppAlert visible={err} onOk={() => setErr(false)} />

      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height} width={width}>
          <LinearGradient
              colors={[tw.color('secondary'), tw.color('primary')]}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{height:height, width: width}}>
            {/* <View style={tw`flex-1 justify-center items-center pt-1`}>
              <Image
                  className="w-20 h-20 mb-2"
                  source={IMGS.logo}
              />
              <Text className="text-white font-poppins" >UOBK RSUD MOHAMMAD SALEH</Text>
              <Text className="text-white text-[25px] font-rubikMaze" >XENTER</Text>
            </View> */}
          </LinearGradient>
        </Svg>
          <TouchableOpacity className="flex items-center justify-center self-center h-8 w-8 shadow border-gray border rounded-full">
            <Text>X</Text>
          </TouchableOpacity>
      </Animated.View>

      {/* <View className="mx-4">
        <AppInput icon="account-outline" placeholder="Username"
          value={inputs.username}
          changed={(val) => handleOnChanged(val, 'username')}
          error={errors.username}
          onFocus={() => {
              handleError(null,'username')
          }}
        />
        <AppInput icon="key" placeholder="Password" password
          value={inputs.password}
          changed={(val) => handleOnChanged(val, 'password')}
          error={errors.password}
          onFocus={() => {
              handleError(null,'password')
          }}
        />

        <View className="my-5 mb-16">
          <AppBtn label="Login" fullwidth rounded color="primary" clicked={() => validate()} />
        </View>
      </View> */}
      

      {/* ALL BUTTON AWAL */}
      <View className="justify-center" style={{height:height /3}}>
        <View className="my-2 mx-4">
          <AppBtn label="Login" fullwidth rounded color="dark" clicked={() => loginHandler()} />
        </View>
        <View className="my-2 mx-4">
          <AppBtn label="Register" fullwidth rounded color="dark" clicked={() => validate()} />
        </View>
      </View>
      

      {/* <View className="flex-auto bg-white h-1/5 rounded-b-[180] overflow-hidden">
          <LinearGradient
            colors={[tw.color('secondary'), tw.color('primary')]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{height:'100%'}}>
           <View style={tw`flex-1 justify-center items-center pt-1`}>
             <Image
                className="w-20 h-20 mb-2"
                source={IMGS.logo}
            />
            <Text className="text-white font-poppins" >UOBK RSUD MOHAMMAD SALEH</Text>
            <Text className="text-white text-[25px] font-rubikMaze" >XENTER</Text>
          </View>
        </LinearGradient>
      </View> */}

      {/* FORM */}
      {/* <View className="flex-auto h-1/5">
        <View className="flex-1 items-center absolute bottom-10 w-full">
           <View style={tw`w-full px-8`}>
              <View style={tw.style('items-center')}>
              <Text className="text-gray-dark pb-4 font-poppins text-xs">Login Xenter</Text>
              </View>
              <AppInput icon="account-outline" placeholder="Username"
                value={inputs.username}
                changed={(val) => handleOnChanged(val, 'username')}
                error={errors.username}
                onFocus={() => {
                    handleError(null,'username')
                }}
              />
              <AppInput icon="key" placeholder="Password" password
                value={inputs.password}
                changed={(val) => handleOnChanged(val, 'password')}
                error={errors.password}
                onFocus={() => {
                    handleError(null,'password')
                }}
              />

              <View style={tw.style('mt-4')}>
                <AppBtn label="Login" fullwidth rounded
                  clicked={()=> validate()}
                />
              </View>
          </View> 
        </View>  
      </View> */}



      {/* BOTTOM */}
      {/* <View className="flex-auto">
          <View style={tw`flex-row items-center justify-center pt-8`}>
            <Text style={tw.style('text-xs text-gray-dark')}>Belum Punya Akun? </Text>
            <TouchableOpacity onPress={registerClicked}>
              <Text style={tw.style('text-xs text-primary')}> Register disini</Text>
            </TouchableOpacity>
          </View>
      </View> */}
    </View>
  )
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     },
  
//   parentContainer: {
//     width: "100%",
//     height: "100%",
//   },

//   square: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'crimson',
//     position: "absolute",
//     bottom: 0,
//     right: 0
//   },

//   topPlace: {
//     borderBottomLeftRadius: 180,
//     borderBottomRightRadius:180,
//     width: '100%',
//     height: 280,
//     position: "absolute",
//     top: 0,
//     right: 0,
//     overflow: 'hidden'
//   },
//   bottomPlace: {
//     borderTopLeftRadius: 98/100 * 390,
//     borderTopLeftRadius:180,
//     width: '100%',
//     height: '100%',
//     position: "absolute",
//     bottom: 0,
//     left: '70%',
//     overflow: 'hidden'
//   }
//   });

export default LoginScreen