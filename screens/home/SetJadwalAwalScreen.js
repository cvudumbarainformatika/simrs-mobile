import { View, Text, Image, ScrollView, Alert, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { AppBtn, AppLoader } from '../../components'
import { IMGS, ROUTES, tw } from '../../constants'
import { LinearGradient } from 'expo-linear-gradient'
import { useBackHandler } from '@react-native-community/hooks'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getKategoriesAscync, sliceKategoriesAwal } from '../../redux/features/jadwal/kategoryJadwalReducer'
// import { useRoute } from '@react-navigation/native'

const SetJadwalAwalScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const { params: {
        jadwals
    } } = useRoute()
    
    const { kategories, loading } = useSelector(state => state.kategory)
    const newKategories = useSelector(state =>sliceKategoriesAwal(state, 2))

    const backAction = () => {
        Alert.alert("Tunggu!", "Apakah Kamu ingin membatalkan dan keluar dari aplikasi?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },{ text: "IYA", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    useBackHandler(() => {
      if (jadwals.length === 0) {
         BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
        // console.log('backHandler')
        return true
      }
      BackHandler.removeEventListener("hardwareBackPress", backAction);
      return false
    })

    
    useEffect(() => {
        const kat = () => {
            dispatch(getKategoriesAscync())
        }

        kat()
        // console.log('KATEGORIES from set jadwal awal:', kategories.length)
        // console.log('JADWALS from set jadwal awal:', jadwals.length)
    },[kategories.length])

    
  return (
    <ScrollView contentContainerStyle={tw`flex-1`}>
          <AppLoader visible={loading} />
          <LinearGradient 
            className="flex-1 justify-center items-center"
            colors={[tw.color('secondary'), tw.color('primary')]}
            start={{ x: 1, y: 0 }}
            end={{x:1,y:0.9}}
            >
              <View style={tw`h-38 w-48 rounded-full border-gray-light border-2 p-8`}>
                  <Text className="text-white">Klik Lanjutkan untuk memilih Kategori jadwal Anda ...
                      atau logout untuk keluar dari aplikasi</Text>
          </View>
          <View style={tw`h-4 w-4 rounded-full border-gray-light border-2 right-9`} />
          <View style={tw`h-2 w-2 rounded-full border-gray-light border-2 right-6`} />
          <Image
            style={tw.style('w-48 h-64')}
            source={IMGS.madSalehMinum}
          /> 
          <View style={tw`absolute bottom-4 right-4 left-4 flex-row justify-between`}>
            <AppBtn label="Logout" color="negative" clicked={()=> navigation.navigate(ROUTES.LOGOUT)} />
            <AppBtn label="Lanjutkan" color="dark" clicked={() => {
                navigation.navigate(ROUTES.PILIH_KATEGORI_JADWAL_AWAL, {newKategories})
              }} />
          </View>

      </LinearGradient>
          
    </ScrollView>
  )
}

export default SetJadwalAwalScreen