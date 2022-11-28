import { Easing, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


import { ROUTES, tw } from '../constants';
import { AbsenScreen, HistoryScreen, HomeScreen } from '../screens';
import SettingsNavigator from './SettingsNavigator';
import JadwalNavigator from './JadwalNavigator';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeNavigator from './HomeNavigator';
import SetJadwalNavigator from './SetJadwalNavigator';
import AbsenNavigator from './AbsenNavigator';
// import CustomBottomTabBar from '../components/CustomBottomTabBar';

// CUSTOM TAB BAR =======================
const CustomTab = ({ children, onPress }) => (
  <View
    style={{
      top: -15,
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={tw`w-18 h-18 bg-dark rounded-full border-4 border-gray-light`}>
        {children}
      </View>
    </TouchableOpacity>
  </View>
);
  
const HiddenTab = ({ children }) => (
  
  <View />
)


const BottomTabNavigator = () => {
    
  const Tab = createBottomTabNavigator();
  
  const routes = (val) => {
    const focusedRoute = getFocusedRouteNameFromRoute(val)
    console.log('bottom tab :', focusedRoute)

    const arr = [
      ROUTES.SET_JADWAL_AWAL,
      ROUTES.PILIH_KATEGORI_JADWAL_AWAL,
      ROUTES.LOGOUT,
      ROUTES.SCREEN_ABSEN_AWAL,
      ROUTES.ABSEN,
      ROUTES.ABSEN_TAB
    ]

    let hideBottomTab = arr.some(obj => obj === focusedRoute)
    return hideBottomTab
  }  

  return (
      <Tab.Navigator
        screenOptions={({ route }) => {
          // console.log('bot navigation :', routes(route))
          return {
            headerShown: false,
            tabBarActiveTintColor: tw.color('white'),
            tabBarShowLabel: false,
            tabBarInactiveTintColor: tw.color('gray'),
            tabBarStyle: styles.tabBarStyle,
            tabBarHideOnKeyboard: true,

            tabBarIcon: ({ color, size, focused }) => {
              let iconName;
              if (route.name === ROUTES.HOME_TAB) {
                iconName = focused ? "view-dashboard" : "view-dashboard-outline"
              } else if (route.name === ROUTES.SETTINGS_TAB) {
                iconName = focused ? "account-cog" : "account-cog-outline"
              } else if (route.name === ROUTES.HISTORY_TAB) {
                iconName = focused ? "clipboard-list" : "clipboard-list-outline"
              } else if (route.name === ROUTES.JADWAL_TAB) {
                iconName = focused ? "calendar-text" : "calendar-clock-outline"
              }

              return <Icon name={iconName} size={22} color={color} />
            },
            tabBarStyle: routes(route) ?
              { display: "none" } : styles.tabBarStyle
            };
          }
        }
        initialRouteName={ROUTES.HOME_TAB}
      >
      
      <Tab.Screen name={ROUTES.HOME_TAB} component={HomeNavigator}  />
     
      <Tab.Screen name={ROUTES.JADWAL_TAB} component={JadwalNavigator}/>
      <Tab.Screen name={ROUTES.ABSEN_TAB} component={AbsenNavigator}
        options={{
          // unmountOnBlur:true,
          tabBarIcon: ({ focused }) => (
            <Icon name={'qrcode-scan'} size={28} color={`${ focused? tw.color('gray-light') : tw.color('gray') }`} />
          ),
          tabBarButton: (props) => <CustomTab {...props} />,
          tabBarStyle: {display:"none"}
          }}
        />
        <Tab.Screen name={ ROUTES.HISTORY_TAB } component={HistoryScreen} />
        <Tab.Screen name={ROUTES.SETTINGS_TAB} component={SettingsNavigator} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator


const styles = StyleSheet.create({
  tabBarStyle: {
    // display:"none",
    position: 'absolute',
    backgroundColor: tw.color('primary'),
    elevation: 0,
    
  }
})