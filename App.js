import React from 'react';

import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';


const Stack = createStackNavigator()



export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}

