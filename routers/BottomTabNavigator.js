import { Easing, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


import { ROUTES, tw } from '../constants';
import { AbsenScreen, HistoryScreen, HomeScreen, JadwalScreen, SettingsScreen } from '../screens';
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
      <View style={tw`w-18 h-18 bg-primary rounded-full border-4 border-gray-light`}>
        {children}
      </View>
    </TouchableOpacity>
  </View>
  );


const BottomTabNavigator = () => {
    
    const Tab = createBottomTabNavigator();

  return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: tw.color('primary'),
              tabBarShowLabel: false,
              tabBarInactiveTintColor: tw.color('gray'),
              tabBarStyle: styles.tabBarStyle,
              tabBarIcon: ({ color, size, focused }) => {
                  let iconName;
                  if (route.name === ROUTES.HOME_TAB) {
                    iconName = focused? "view-dashboard":"view-dashboard-outline"
                  } else if (route.name === ROUTES.SETTINGS_TAB) {
                    iconName = focused? "account-cog":"account-cog-outline"
                  } else if (route.name === ROUTES.HISTORY_TAB) {
                    iconName = focused? "clipboard-list":"clipboard-list-outline"
                  } else if (route.name === ROUTES.JADWAL_TAB) {
                    iconName = focused? "calendar-text":"calendar-clock-outline"
                  }

                  return <Icon name={iconName} size={22} color={color} />
              }
         })}
        
      >
        <Tab.Screen name={ROUTES.HOME_TAB} component={HomeScreen} />
        <Tab.Screen name={ ROUTES.JADWAL } component={JadwalScreen} />
        <Tab.Screen name={ROUTES.ABSEN} component={AbsenScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name={'qrcode-scan'} size={28} color={`${ focused? tw.color('gray-light') : tw.color('gray') }`} />
          ),
          tabBarButton: (props) => (<CustomTab {...props} />) 
            }}
        />
        <Tab.Screen name={ ROUTES.HISTORY } component={HistoryScreen} />
        <Tab.Screen name={ ROUTES.SETTINGS } component={SettingsScreen}  />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator


const styles = StyleSheet.create({
  tabBarStyle: {
    position:'absolute',
    backgroundColor: tw.color('white'),
    elevation: 0,
    borderTopWidth: 1,
    borderTopColor: tw.color('gray-light'),
    bottom:0,
    
  }
})