import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { tw } from '../../constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchKategoryJadwals, updateJadwalToDb } from '../../redux/actions/jadwalActions'
import { AppAlert, AppConfirm, AppLoader } from '../../components'
import dayjs from 'dayjs'
import { ScrollView } from 'react-native-gesture-handler'
import { updateJadwalsAsync } from '../../redux/features/jadwal/jadwalsReducer'
require('dayjs/locale/id')

const KategoriJadwalScreen = ({ navigation, route }) => {
  
  const dispatch = useDispatch()

  const {jadwal, kategories, loading} = route.params

  const [kategoriCut, setKategoriCut] = useState(kategories)
  const [kategori, setKategori] = useState(0)

  const [date, setDate] = useState(dayjs().locale('id'))

  const [konf, setKonf] = useState(false)
  const [alert, setAlert] = useState(false)
  const [isLibur, setIsLibur] = useState('1')


  const cutItems = () => {
    if (kategories.length > 2) {
        setKategoriCut(kategories.slice(2))
    }
  }

  // const callbackLibur = useCallback((sta)=> { setIsLibur(sta)}, [isLibur])

  function simpanShift(sta, kat) {
    setIsLibur(sta)
    if (sta === '2' && kat === 0) {
      setAlert(true)
    } else {
      setKonf(true)
    }
  }

  function sendUpdateJadwal() {
    let form = {
      kategory_id: kategori,
      id: jadwal.id,
      status: isLibur //MASUK 2 LIBUR 1
    }
    console.log(form)
    setKonf(false)
    if (jadwal.status === 1  &&  isLibur === '1') {
      navigation.goBack()
      return false;
    }

    if (date.format("dddd") === jadwal.hari || date.format("dddd") === jadwal.day) {
      if (jadwal.status === '2' && date.format("HH:mm:ss") < jadwal.pulang) {
        console.log(date.format("HH:mm:ss"))
        Alert.alert("PERINGATAN !",
          `Maaf, Anda Ada jadwal dihari ini dan Belum Absen Pulang!, Boleh Mengganti jadwal setelah Absen Pulang `)
        return
      }
      dispatch(updateJadwalsAsync(form))
      navigation.goBack()
    } else {
      dispatch(updateJadwalsAsync(form))
      navigation.goBack()
    }
  }

  
  

  useEffect(() => {
    cutItems()
    setKategori(0)


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
    }, tw`rounded-t-4`]}>

      <AppLoader visible={loading} />
      
      <AppConfirm visible={konf} status="Success" msg={`${isLibur === '1' ?'Pilih Libur ?': 'Ganti SHIFT ?'} `}
        labelBtnOk='IYA'
        labelBtnBack='BATAL'
        onOk={() => sendUpdateJadwal()}
        onDismiss={()=> setKonf(false)}
      />

      <AppAlert visible={alert} msg="Maaf Pilih Shift Atau Libur terlebih dahulu"
        onOk={()=> setAlert(false)}
      />

      <View style={tw`px-3 py-4 border-b-2 border-gray bg-white flex-row justify-between`}>
        <Text style={tw`font-bold`}>Pilih Kategory Shift Hari </Text>
        <TouchableOpacity  onPress={()=> navigation.goBack()}><Icon name="close" size={22} /></TouchableOpacity>
      </View>
      <ScrollView>
        {kategoriCut.map((kat, i) => {
          return (
            <TouchableOpacity key={i} style={[tw`mt-1`, { backgroundColor: kategori === kat.id ? 'rgba(0,0,0,0.5)' : 'white' }]}
              onPress={() => setKategori(kat.id)} >
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
          <TouchableOpacity style={tw`bg-negative h-full w-1/2 justify-center items-center`}
            onPress={() => {
              if (jadwal.status == 2) {
                setKategori(0)
                simpanShift('1', kategori)
              }
            }}
          >
            <Text style={tw`text-white`}>Pilih Libur</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-dark h-full w-1/2 justify-center items-center`}
            onPress={() => {
              simpanShift('2', kategori)
            }}
          >
            <Text style={tw`text-white`} >Simpan Shift</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default KategoriJadwalScreen
