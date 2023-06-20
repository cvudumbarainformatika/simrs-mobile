import { View, Text, BackHandler, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { IMGS, ROUTES, tw } from '../../constants'
import { AppBtn, AppLoader } from '../../components'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { useBackHandler } from '@react-native-community/hooks'
import { getKategoriesAscync } from '../../redux/features/jadwal/kategoryJadwalReducer'
import { getJadwalsAsync } from '../../redux/features/jadwal/jadwalsReducer'
import AppLoaderAnim from '../../components/~global/AppLoaderAnim'

const SetJadwalAwalScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const { jadwals, loading } = useSelector(state => state.jadwal) // state jadwal
  // const { loading, status } = useSelector( state => state.kategory)   // panggil stte kategori juga

  const navigateToHome = () => {
    dispatch(getJadwalsAsync())
    // jadwals.length > 0 ? navigation.navigate(ROUTES.HOME_TAB) : null
    if (jadwals.length > 0) {
      navigation.navigate(ROUTES.HOME_TAB)
    }
  }

  useEffect(() => {
    navigateToHome()
    console.log('from set jadwal awal :', jadwals.length)
  }, [jadwals.length, dispatch])

  const backAction = () => {
    Alert.alert("Tunggu!", "Apakah Kamu ingin membatalkan dan keluar dari aplikasi?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "IYA", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };



  useBackHandler(() => {
    if (jadwals.length === 0) {
      BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      console.log('backHandler')
      return true
    }
    // let the default thing happen
    BackHandler.removeEventListener("hardwareBackPress", backAction);
    return false
  })

  return (
    <ScrollView contentContainerStyle={tw`flex-1 items-center justify-center`}>
      <AppLoaderAnim visible={loading} />
      <View style={tw`h-38 w-48 rounded-full border-gray border-2 p-8`}>
        <Text>Tinggal Selangkah lagi... Klik Lanjutkan untuk memilih Kategori jadwal Anda</Text>
      </View>
      <View style={tw`h-4 w-4 rounded-full border-gray border-2 right-9`} />
      <View style={tw`h-2 w-2 rounded-full border-gray border-2 right-6`} />
      <Image
        style={tw.style('w-48 h-64')}
        source={IMGS.madSalehMinum}
      />
      <View style={tw`absolute bottom-4 right-4 left-4 flex-row justify-between`}>
        <AppBtn label="Logout" color="dark" clicked={() => navigation.navigate(ROUTES.LOGOUT)} />
        <AppBtn label="Lanjutkan" clicked={() => {
          navigation.navigate(ROUTES.JADWAL_SET_PILIH)
        }} />
      </View>
    </ScrollView>
  )
}

export default SetJadwalAwalScreen