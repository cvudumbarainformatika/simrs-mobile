import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigations from './routers/Navigations';

import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
});


export default function App() {
  return (
    <SafeAreaProvider>
      <Navigations />
    </SafeAreaProvider>
  );
}

