import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Alert, Keyboard, Dimensions, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from "expo-linear-gradient";


import { IMGS, ROUTES, tw } from '../../constants';
import { AppInput,AppBtn,AppLoader, AppAlert } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import Svg, {Image, Ellipse, ClipPath} from 'react-native-svg';
import Animated, { useAnimatedStyle, useSharedValue, interpolate, withTiming, withDelay } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { StatusBar } from 'expo-status-bar';


const LoginScreen = (props) => {
  const { width, height } = Dimensions.get('screen');
  const imagePosition = useSharedValue(1);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [1, 1], [-height/2 , 0])
    return {
      transform: [{ translateY: withTiming(interpolation, { duration: 500 }) }]
    }
  })

  // const closeBtnAnimatedStyle = useAnimatedStyle(() => {
  //   const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360])
  //   return {
  //     opacity: withTiming(imagePosition.value === 1? 0:1, {duration:500}),
  //     transform: [{ rotate: withTiming(interpolation + "deg", { duration: 500 }) }]
      
  //   }
  // })

  // STATE
  const navigation = useNavigation()
  const { login, isLoading } = useContext(AuthContext)
  const [err, setErr] = useState(false)
  const [errors, setErrors] = useState({});

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
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

  const loginHandler = () => {
    imagePosition.value = 0
  }

  return (
    <View className="flex-1 bg-white">
      <AppLoader visible={isLoading} />
      <AppAlert visible={err} onOk={() => setErr(false)} />
      {/* TOP */}
      <Animated.View style={[tw`flex-1`, imageAnimatedStyle]}>
        <Svg height={height} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width /2 } rx={height} ry={height} />
          </ClipPath>
          <Image
            href={IMGS.bg}
            x="0"
            y="0"
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
            clipPath='url(#clipPathId)'
          />
        </Svg>
          
        {/* <Animated.View className="-top-5" style={{closeBtnAnimatedStyle}}>
          <TouchableOpacity className="flex items-center justify-center self-center h-10 w-10 bg-white shadow border-gray border rounded-full" onPress={()=> imagePosition.value = 1}>
            <Text>X</Text>
          </TouchableOpacity>
        </Animated.View> */}
      </Animated.View>


      {/* LOGO */}
     <View className="absolute left-0 right-0 justify-center items-center" style={{ height: height / 2 }}>
          <Svg height={80} width={80} style={{marginBottom:20}}>
            <Image href={IMGS.logo} height={80} width={80} />
          </Svg>
          
          <Text className="text-white text-[32px] font-rubikMaze" >XENTER</Text>
          <Text className="text-white font-poppins text-lg" >UOBK RSUD MOHAMMAD SALEH</Text>
      </View>
      

      {/* ALL BUTTON AWAL */}
     

      {/* FORM */}
      <View className="flex-1 z-10">
        <View className="absolute bottom-12 items-center w-full">
           <View style={[tw`w-full px-8`]}>
              <View style={[tw.style('items-center')]}>
                <Text className="text-primary pb-4 font-poppinsBold text-xs">Login Xenter</Text>
            </View>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps={'handled'}
              extraScrollHeight={-300}
              contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent:'center'
              }}
            >
              
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

            </KeyboardAwareScrollView>
              

              <View className="pt-4 items-center">
                <AppBtn label="Login" fullwidth rounded
                  clicked={()=> validate()}
              />
              
              <TouchableOpacity className="mt-4" onPress={()=> registerClicked()}>
                <Text className="font-poppins">Belum Register? <Text className="font-poppins text-primary">Register disini</Text></Text>
              </TouchableOpacity>
              </View>
          </View> 
        </View>  
      </View>
    </View>
  )
}

export default LoginScreen