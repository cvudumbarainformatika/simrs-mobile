import { Easing, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // ⬅️ tambahkan ini

import { ROUTES, tw } from '../constants';
import HomeNavigator from './HomeNavigator';
import JadwalNavigator from './JadwalNavigator';
import AbsenNavigator from './AbsenNavigator';
import SettingsNavigator from './SettingsNavigator';
import HistoryScreenV2 from '../screens/content/HistoryScreenV2';

// CUSTOM TAB BUTTON
const CustomTab = ({ children, onPress }) => (
  <View style={{ top: -15, justifyContent: 'center', alignItems: 'center' }}>
    <TouchableOpacity onPress={onPress}>
      <View style={tw`w-18 h-18 bg-dark rounded-full border-4 border-gray-light`}>
        {children}
      </View>
    </TouchableOpacity>
  </View>
);

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets(); // ✅ ambil safe area bawah

  const routes = (val) => {
    const focusedRoute = getFocusedRouteNameFromRoute(val);
    const arr = [
      ROUTES.SET_JADWAL_AWAL,
      ROUTES.PILIH_KATEGORI_JADWAL_AWAL,
      ROUTES.LOGOUT,
      ROUTES.SCREEN_ABSEN_AWAL,
      ROUTES.ABSEN,
      ROUTES.ABSEN_TAB,
      ROUTES.XENTER_NAV,
      ROUTES.UPLOAD_DOK_NAV
    ];
    return arr.includes(focusedRoute);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: tw.color('white'),
        tabBarInactiveTintColor: tw.color('gray'),
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: routes(route)
          ? { display: 'none' }
          : {
              position: 'absolute',
              height: 60 + insets.bottom, // ✅ tambahkan safe area bottom
              backgroundColor: tw.color('primary'),
              elevation: 0,
              borderTopWidth: 0,
              paddingBottom: insets.bottom, // ✅ isi padding agar tidak tertindas
            },
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          switch (route.name) {
            case ROUTES.HOME_TAB:
              iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
              break;
            case ROUTES.SETTINGS_TAB:
              iconName = focused ? 'account-cog' : 'account-cog-outline';
              break;
            case ROUTES.HISTORY_TAB:
              iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
              break;
            case ROUTES.JADWAL_TAB:
              iconName = focused ? 'calendar-text' : 'calendar-clock-outline';
              break;
            default:
              iconName = 'circle';
          }
          return <Icon name={iconName} size={24} color={color} />;
        },
      })}
      initialRouteName={ROUTES.HOME_TAB}
    >
      <Tab.Screen name={ROUTES.HOME_TAB} component={HomeNavigator} />
      <Tab.Screen name={ROUTES.JADWAL_TAB} component={JadwalNavigator} />
      <Tab.Screen
        name={ROUTES.ABSEN_TAB}
        component={AbsenNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={'qrcode-scan'}
              size={32}
              color={focused ? tw.color('gray-light') : tw.color('gray')}
            />
          ),
          tabBarButton: (props) => <CustomTab {...props} />,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tab.Screen name={ROUTES.HISTORY_TAB} component={HistoryScreenV2} />
      <Tab.Screen
        name={ROUTES.SETTINGS_TAB}
        component={SettingsNavigator}
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
