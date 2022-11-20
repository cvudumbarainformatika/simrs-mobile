import { View, Text, BackHandler, ScrollView, Image, Alert } from 'react-native'
import React, {  useState } from 'react'
import { useEffect } from 'react'
import { IMGS, ROUTES, tw } from '../../constants'
import { AppBtn, AppLoader } from '../../components'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJadwals } from '../../redux/actions/jadwalActions'
import { useBackHandler } from '@react-native-community/hooks'

const SetJadwalAwalScreen = ({navigation}) => {
  // const navigation = useNavigation()
  // const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { jadwals, loading } = useSelector(state => state.jadwalReducer)

    useEffect(() => {
      dispatch(fetchJadwals())
      jadwals.length > 0 ? navigation.navigate(ROUTES.HOME_TAB) : false
    // return () => BackHandler.removeEventListener("hardwareBackPress", backAction);


    }, [dispatch, jadwals.length])
  
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
        <AppLoader visible={loading} />
          <View style={tw`h-32 w-48 rounded-full border-gray border-2 p-8`}>
              <Text>Tinggal Selangkah lagi... Klik Lanjutkan untuk memilih Kategori jadwal Anda</Text>
          </View>
          <View style={tw`h-4 w-4 rounded-full border-gray border-2 right-9`} />
          <View style={tw`h-2 w-2 rounded-full border-gray border-2 right-6`} />
          <Image
            style={tw.style('w-48 h-64')}
            source={IMGS.madSalehMinum}
          /> 
          <View style={tw`absolute bottom-4 right-4`}>
              <AppBtn label="Lanjutkan" clicked={()=> navigation.navigate(ROUTES.JADWAL_SET_PILIH)} />
          </View>
    </ScrollView>
  )
}

export default SetJadwalAwalScreen