import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeWindStyleSheet } from "nativewind";
import { AuthProvider } from './context/AuthContext';
import AppNav from './routers/AppNav';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';




export default function App() {
    
NativeWindStyleSheet.setOutput({
  default: "native",
});


  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 1000)

  return (
      <AuthProvider>
        <SafeAreaProvider>
          <AppNav />
          <StatusBar translucent={true} backgroundColor="transparent" />
        </SafeAreaProvider>
      </AuthProvider>
  );
}

