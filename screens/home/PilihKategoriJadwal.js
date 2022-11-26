import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AppBtn, AppLoader, BottomTwoBtn } from '../../components'
import { ROUTES, tw } from '../../constants'
import KategoriJadwal from '../../components/jadwal/KategoriJadwal'
import { SafeAreaView } from 'react-native-safe-area-context'

const PilihKategoriJadwal = ({ navigation, route }) => {
    
  const { newKategories } = route.params
  
  const [kategori, setKategori] = useState(null)
  const [status, setStatus] = useState('Idle')
  const [progress, setProgress] = useState(false)
  
  const selectedKategory = (kategory_id) => {
        setKategori(kategory_id)
        console.log('pilih jadwal :', kategori)
  }
  
  const callbackKategori = useCallback((kategory_id) => { selectedKategory(kategory_id) }, [kategori])
  
  async function sendData(){
        let form = {
            kategory_id:kategori
        }
        console.log(form)
        setProgress(true)
        await api.post('/v2/absensi/jadwal/simpan', form).then(() => {
            setStatus('Success')
            setProgress(false)
        }).catch(err => {
            console.log('error send data :', err.response.data.message)
            setStatus('Error')
            setProgress(false)
        })
    }

    function konfirmasi() {
        setStatus('Idle')
        navigation.navigate(ROUTES.HOME_TAB)
    }
    
    useEffect(() => {
      console.log(newKategories)
    }, [])
    

  return (
    <SafeAreaView className="flex-1">
      <View className="p-4 flex-row justify-between bg-white">
          <Text style={tw`font-bold`}>Pilih Kategori Jadwal</Text>
        <Text style={tw`font-bold`}>{ kategori}</Text>
      </View>
      <View>
        <FlatList
        data={newKategories}
        renderItem={({ item }) => (
            <KategoriJadwal
                selectedKategori={kategori}
                detailKategori={item}
                setKategori={callbackKategori}
            />
        )}
        keyExtractor={item=>item.id}
        />
      </View>

      <View style={tw`absolute bottom-0 bg-secondary h-38 w-full p-4`}>
              <Text style={tw`text-white`}>Pilih Kategori Jadwal Anda, untuk kategori 
                  <Text style={tw`font-bold`}> Shift </Text>, setelah klik simpan ... 
                  harap ke menu pengaturan jadwal untuk mengganti shift berdasarkan
                  jenis masing-masing shift
              </Text>
      </View>
      
      <BottomTwoBtn
              labelBtnOk="Simpan & Lanjutkan"
              onDismiss={() => navigation.goBack()}
              onOk={()=> sendData()}
              
          />
    </SafeAreaView>
  )
}

export default PilihKategoriJadwal