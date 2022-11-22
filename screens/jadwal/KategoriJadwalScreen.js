import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { tw } from '../../constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchKategoryJadwals, updateJadwalToDb } from '../../redux/actions/jadwalActions'
import { AppAlert, AppLoader } from '../../components'
import dayjs from 'dayjs'
import { ScrollView } from 'react-native-gesture-handler'
require('dayjs/locale/id')

const KategoriJadwalScreen = ({ navigation, route }) => {
  
  const dispatch = useDispatch()

  const {jadwal, kategories} = route.params

  const [kategoriCut, setKategoriCut] = useState(kategories)
  const [kategori, setKategori] = useState(0)

  const [date, setDate] = useState(dayjs().locale('id'))

  const cutItems = () => {
    if (kategories.length > 2) {
        setKategoriCut(kategories.slice(2))
    }
  }
  function selectedKategori(ktgr) {
    setKategori(ktgr.id)
    console.log('aaa :',kategori)

    // Alert.alert(
    //   `Konfirmasi Hari : ${jadwal.hari}`,
    //   "Apakah benar kamu akan ganti SHIFT ?",
    //   [
    //     {
    //       text: "Cancel",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel"
    //     },
    //     { text: "OK", onPress: () => sendUpdateJadwal(id) }
    //   ]
    // );

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

  

  useEffect(() => {
    cutItems()
    const interval = setInterval(() => {
      setDate(dayjs())
    }, 1000 * 60)

    return ()=> clearInterval(interval)
  }, [])

  return (

    <View style={[{
      marginTop: 50,
      backgroundColor: tw.color('gray-light'),
      flex: 1,
      overflow: 'hidden'
    },tw`rounded-t-4`]}>
      <View style={tw`p-3 py-4 border-b-2 border-gray bg-white flex-row justify-between`}>
        <Text>Pilih Kategory Shift</Text>
        <TouchableOpacity  onPress={()=> navigation.goBack()}><Icon name="close" size={22} /></TouchableOpacity>
      </View>
      <ScrollView>
        {kategoriCut.map((kat, i) => {
          return (
            <TouchableOpacity style={[tw`mt-1`,{backgroundColor: kategori===kat.id? 'rgba(0,0,0,0.5)': 'white'}]} onPress={()=> selectedKategori(kat)} >
              <View style={tw`p-3 flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center`}>
                  <View style={{
                      height: 16,
                      width: 16,
                      borderRadius: 8,
                      backgroundColor: kat.warna,
                      marginRight:10
                    }} />
                    <View style={tw``}>
                      <Text >{kat.nama}</Text>
                    <Text style={[tw`text-xs text-gray`, {color: kat.warna}]}>{kat.masuk} - { kat.pulang }</Text>
                    </View>
                </View>
                {kategori === kat.id && (<Icon name="check-all" size={22} color={tw.color('primary')} />)}
              </View>
              
            </TouchableOpacity>)
        })}
        <View style={{ paddingBottom: 100 }} />
      </ScrollView>
      <View style={tw`absolute h-26 w-full bottom-0 bg-white`}>
        <View style={tw`flex-row justify-between`}>
          <TouchableOpacity style={tw`bg-negative h-full w-1/2 justify-center items-center`}>
            <Text style={tw`text-white`}>Pilih Libur</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-dark h-full w-1/2 justify-center items-center`}>
            <Text style={tw`text-white`} >Simpan Shift</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default KategoriJadwalScreen

// const KategoriJadwal = ({ item, selectKategori, setKategori }) => {
  
//   const {id, nama, warna} = item

//   return (
//       <>
//         <TouchableOpacity style={tw`bg-white mt-1`} onPress={()=>setKategori(id) }>
//           <View style={tw`p-3 flex-row justify-between`}>
//           <View style={tw`flex-row`}>
//             <View style={{
//               height: 16,
//               width: 16,
//               borderRadius: 8,
//               backgroundColor: warna,
//               marginRight:10
//             }} />
//             <Text style={{minWidth:120}}>{nama}</Text>
//           </View>
//           {selectKategori === id && (
//             <Icon name="check" size={22} color={tw.color('primary')} />
//           )}
            
//           </View>
//         </TouchableOpacity>
//       </>
      
//     )
//   }
