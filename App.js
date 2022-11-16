import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeWindStyleSheet } from "nativewind";
import { AuthProvider } from './context/AuthContext';
import AppNav from './routers/AppNav';

NativeWindStyleSheet.setOutput({
  default: "native",
});


export default function App() {
  return (
      <AuthProvider>
        <SafeAreaProvider>
            <AppNav />
        </SafeAreaProvider>
      </AuthProvider>
  );
}

