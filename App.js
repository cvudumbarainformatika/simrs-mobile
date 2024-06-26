import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeWindStyleSheet } from "nativewind";
import { AuthProvider } from './context/AuthContext';
import AppNav from './routers/AppNav';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
// import NetInfo from '@react-native-community/netinfo';
// import * as Font from 'expo-font';

// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import { AppAlert } from './components';





//1. import the library
//2. get permission
//3. do push notifications on button click
//4. schedule push notifications

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false
//   })
// })


// Notifications.setNotificationChannelAsync('absensi', {
//   name: 'Absensi',
//   // sound: 'mySoundFile.wav', // Provide ONLY the base filename
// });



export default function App() {

  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();
  // const [inet, setInet] = useState(false)



  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/poppins/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/poppins/Poppins-Bold.ttf'),
    'Poppins-Italic': require('./assets/fonts/poppins/Poppins-Italic.ttf'),
    'Poppins-Thin': require('./assets/fonts/poppins/Poppins-Thin.ttf'),
    'RubikMaze-Regular': require('./assets/fonts/Rubik_Maze/RubikMaze-Regular.ttf'),
  })


  // NetInfo.fetch().then(state => {
  //   console.log('Connection type', state.type);
  //   console.log('Is connected?', state.isConnected);
  //   setInet(state.isConnected)
  // });

  NativeWindStyleSheet.setOutput({
    default: "native",
  });


  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 500)



  useEffect(() => {
    // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //   setNotification(notification);
    // });

    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //   console.log(response);
    // });

    // return () => {
    //   Notifications.removeNotificationSubscription(notificationListener.current);
    //   Notifications.removeNotificationSubscription(responseListener.current);
    // };

  }, [])

  // if (!inet) {
  //   return (
  //     <AppAlert visible={!inet} msg="Maaf ... Internet Kamu Tidak Aktif" />
  //   )
  // }

  if (!fontsLoaded) {
    return null;
  }


  return (
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar translucent={true} backgroundColor="transparent" style="light" />
        <AppNav />
      </SafeAreaProvider>
    </AuthProvider>
  );
}

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: 'Here is the notification body',
//       data: { data: 'goes here' },
//     },
//     trigger: { seconds: 2 },
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   return token;
// }

