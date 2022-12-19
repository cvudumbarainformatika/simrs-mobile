import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Alert, Keyboard, Dimensions, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from "expo-linear-gradient";


import { IMGS, ROUTES, tw } from '../../constants';
import { AppInput,AppBtn,AppLoader, AppAlert } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import Svg, {Image, Ellipse, ClipPath} from 'react-native-svg';
import Animated, { useAnimatedStyle, useSharedValue, interpolate, withTiming, withDelay } from 'react-native-reanimated';
// import { StatusBar } from 'expo-status-bar';


const LoginScreen = (props) => {

  const { width, height } = Dimensions.get('screen');
  const imagePosition = useSharedValue(1);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [-height / 2 - 80, 0])
    return {
      transform: [{ translateY: withTiming(interpolation, { duration: 500 }) }]
    }
  })

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0])
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [{ translateY: withTiming(interpolation, { duration: 500 }) }]
      
    }
  })
  const closeBtnAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360])
    return {
      opacity: withTiming(imagePosition.value === 1? 0:1, {duration:500}),
      transform: [{ rotate: withTiming(interpolation + "deg", { duration: 500 }) }]
      
    }
  })
  const formAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: imagePosition.value === 0 ? 
        withDelay(300, withTiming(1, { duration: 500 })) :
        withTiming(0, {duration:300})
      ,
      
    }
  })
  // const height = Platform.OS === 'android' && Platform.Version > 26 ? Dimensions.get('screen').height - StatusBar.currentHeight : Dimensions.get('window').height;

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
    
    <View className="flex-1 bg-white justify-end">
      {/* TOP */}
      <AppLoader visible={isLoading} />
      <AppAlert visible={err} onOk={() => setErr(false)} />

      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 100} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width /2 } rx={height} ry={height + 100} />
          </ClipPath>
          <Image
            href={IMGS.bg}
            width={width + 100}
            height={height + 100}
            preserveAspectRatio="xMidYMid slice"
            clipPath='url(#clipPathId)'
          />
        </Svg>
          
        <Animated.View className="-top-5" style={{closeBtnAnimatedStyle}}>
          <TouchableOpacity className="flex items-center justify-center self-center h-10 w-10 bg-white shadow border-gray border rounded-full" onPress={()=> imagePosition.value = 1}>
            <Text>X</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>


      {/* LOGO */}
      <View className="justify-center items-center" style={{ height: 140 + height / 2 }}>
          <Svg height={80} width={80} style={{marginBottom:20}}>
            <Image href={IMGS.logo} height={80} width={80} />
          </Svg>
          
          <Text className="text-white font-poppins text-lg" >UOBK RSUD MOHAMMAD SALEH</Text>
          <Text className="text-white text-[32px] font-rubikMaze" >XENTER</Text>
      </View>
      

      {/* ALL BUTTON AWAL */}
      <Animated.View className="justify-center z-10" style={[{height:height /3}, buttonsAnimatedStyle]}>
        <View className="my-2 mx-8">
          <AppBtn label="Login" fullwidth rounded color="dark" clicked={() => loginHandler()} />
        </View>
        <View className="my-2 mx-8">
          <AppBtn label="Register" fullwidth rounded color="dark" clicked={() => registerClicked()} />
        </View>
      </Animated.View>

      {/* FORM */}
      <View className="flex-auto h-1/5 z-0">
        <View className="flex-1 items-center absolute bottom-11 w-full">
           <Animated.View style={[tw`w-full px-8`, formAnimationStyle]}>
              <View style={[tw.style('items-center')]}>
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
          </Animated.View> 
        </View>  
      </View>
    </View>
  )
}

export default LoginScreen