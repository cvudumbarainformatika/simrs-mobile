import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { tw } from '../../constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchKategoryJadwals, updateJadwalToDb } from '../../redux/actions/jadwalActions'
import { AppAlert, AppLoader } from '../../components'
import dayjs from 'dayjs'
require('dayjs/locale/id')

const KategoriJadwalScreen = ({ navigation, route }) => {
  
  const dispatch = useDispatch()
  const {jadwal} = route.params
  const { kategories, jadwals, loading } = useSelector(state => state.jadwalReducer)

  const [kategori, setKategori] = useState(null)

  const [date, setDate] = useState(dayjs().locale('id'))


  function selectedKategori(id) {
    setKategori(id)

    Alert.alert(
      `Konfirmasi Hari : ${jadwal.hari}`,
      "Apakah benar kamu akan ganti SHIFT ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => sendUpdateJadwal(id) }
      ]
    );

  }

  function sendUpdateJadwal(kategory_id) {
    let form = {
      kategory_id: kategory_id,
      id: jadwal.id,
      status:'2' //MASUK
    }
    // console.log(form)
    if (date.format("dddd") === jadwal.hari || date.format("dddd") === jadwal.day) {
      if (jadwal.pulang !== null || jadwal.pulang < date.format("hh:mm:ss")) {
        Alert.alert("PERINGATAN !", "Maaf, Anda Ada jadwal dihari ini dan Belum Absen Pulang!, Boleh Mengganti jadwal setelah Absen Pulang")
        return
      }
    } else {
      dispatch(updateJadwalToDb(form))
      navigation.goBack()
    }
  }

  const callbackKategori = useCallback((kategory_id)=> { selectedKategori(kategory_id)}, [])

  const cutItems = () => {
      let newArr = []
      if (kategories.length > 2) {
          newArr = kategories.slice(2)
          return newArr
      }
      return newArr
    }

  useEffect(() => {

    console.log('jad :',jadwals.length)
    // console.log('oo :',loading)
    // console.log('kat :',kategories)
    cutItems()
    const interval = setInterval(() => {
      setDate(dayjs())
    }, 1000 * 60)

    return ()=> clearInterval(interval)
  }, [kategories.length, jadwals.length, dispatch, jadwal])

  return (
    <View style={[{
      marginTop: 50,
      backgroundColor: tw.color('gray-light'),
      flex:1
    }, tw`rounded-t-4`]}>

      <AppLoader visible={loading} />
      {/* HEADER */}
      <View style={tw`p-3 border-b-2 border-gray bg-white flex-row justify-between`}>
        <Text>Pilih Kategory Shift Hari : {jadwal.hari}</Text>
        <TouchableOpacity  onPress={()=> navigation.goBack()}>
          <Icon name="close" size={22} />
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={cutItems()}
          renderItem={({ item }) => (
            <KategoriJadwal
              item={item}
              setKategori={callbackKategori}
              selectKategori={kategori}
              />
          )}
          keyExtractor={item=>item.id}
          contentContainerStyle={{paddingBottom:120}}
      />
      </View>

    </View>
  )
}

export default KategoriJadwalScreen

const KategoriJadwal = ({ item, selectKategori, setKategori }) => {
  
  const {id, nama, warna} = item

  return (
      <>
        <TouchableOpacity style={tw`bg-white mt-1`} onPress={()=>setKategori(id) }>
          <View style={tw`p-3 flex-row justify-between`}>
          <View style={tw`flex-row`}>
            <View style={{
              height: 16,
              width: 16,
              borderRadius: 8,
              backgroundColor: warna,
              marginRight:10
            }} />
            <Text style={{minWidth:120}}>{nama}</Text>
          </View>
          {selectKategori === id && (
            <Icon name="check" size={22} color={tw.color('primary')} />
          )}
            
          </View>
        </TouchableOpacity>
      </>
      
    )
  }
