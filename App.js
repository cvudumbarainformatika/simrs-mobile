import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';



import { NativeWindStyleSheet } from "nativewind";
import AuthNavigator from './routers/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './routers/AuthStack';

NativeWindStyleSheet.setOutput({
  default: "native",
});


export default function App() {
  return (
    <SafeAreaProvider>

      <NavigationContainer>
        {/* <AuthNavigator /> */}
        <AuthStack />
      </NavigationContainer>
      
    </SafeAreaProvider>
  );
}

