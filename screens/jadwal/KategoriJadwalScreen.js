import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { tw } from '../../constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchKategoryJadwals } from '../../redux/actions/jadwalActions'
import { AppAlert, AppLoader } from '../../components'

const KategoriJadwalScreen = ({ navigation, route }) => {
  
  // const dispatch = useDispatch()
  const {jadwal} = route.params
  const { kategories } = useSelector(state => state.jadwalReducer)

  const [kategori, setKategori] = useState(null)


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
      jadwal_id: jadwal.hari
    }
    console.log(form)
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
  }, [])

  return (
    <View style={[{
      marginTop: 50,
      backgroundColor: tw.color('gray-light'),
      flex:1
    }, tw`rounded-t-4`]}>

      <AppLoader visible={false} />
      {/* HEADER */}
      <View style={tw`p-3 border-b-2 border-gray bg-white flex-row justify-between`}>
        <Text>Pilih Kategory Shift Hari : {jadwal.hari}</Text>
        <TouchableOpacity  onPress={()=> navigation.goBack()}>
          <Icon name="close" size={22} />
        </TouchableOpacity>
      </View>

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
  )
}

export default KategoriJadwalScreen

const KategoriJadwal = ({ item, selectKategori, setKategori }) => {
  
  const {id, nama} = item

  

  return (
      <>
        <TouchableOpacity style={tw`bg-white mt-1`} onPress={()=>setKategori(id) }>
          <View style={tw`p-3 flex-row justify-between`}>
          <Text>{nama}</Text>
          {selectKategori === id && (
            <Icon name="check" size={22} color={tw.color('primary')} />
          )}
            
          </View>
        </TouchableOpacity>
      </>
      
    )
  }
