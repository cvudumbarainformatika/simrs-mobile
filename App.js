import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeWindStyleSheet } from "nativewind";
import { AuthProvider } from './context/AuthContext';
import AppNav from './routers/AppNav';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
// import * as Font from 'expo-font';




export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/poppins/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/poppins/Poppins-Bold.ttf'),
    'Poppins-Italic': require('./assets/fonts/poppins/Poppins-Italic.ttf'),
    'Poppins-Thin': require('./assets/fonts/poppins/Poppins-Thin.ttf'),
    'RubikMaze-Regular': require('./assets/fonts/Rubik_Maze/RubikMaze-Regular.ttf'),
  })


    
NativeWindStyleSheet.setOutput({
  default: "native",
});


  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 1000)

  if (!fontsLoaded) {
    return null;
  }

  return (
      <AuthProvider>
        <SafeAreaProvider>
          <AppNav />
          <StatusBar translucent={true} backgroundColor="transparent" />
        </SafeAreaProvider>
      </AuthProvider>
  );
}

