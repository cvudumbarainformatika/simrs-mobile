import { View, Text, FlatList, BackHandler } from 'react-native'
import React from 'react'
import { ROUTES, tw } from '../../constants'
import { AppAlert, AppBtn, AppLoader, BottomTwoBtn } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { useCallback } from 'react'
import { api } from '../../helpers/axiosInterceptor'
import KategoriJadwal from '../../components/jadwal/KategoriJadwal'

const PilihJadwalScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const { jadwals} = useSelector(state => state.jadwal)
    const { kategories, loading, error } = useSelector(state => state.kategory)

    const [kategori, setKategori] = useState(null)
    const [status, setStatus] = useState('Idle')
    const [progress, setProgress] = useState(false)
    // const [cutItems, setCutItems] = useState([])
    // const [loading, setLoading] = useState(false)

    const selectedKategory = (kategory_id) => {
        setKategori(kategory_id)
        console.log('pilih jadwal :', kategori)
    }

    const callbackKategori = useCallback((kategory_id)=> {selectedKategory(kategory_id)}, [kategori])

    const cutItems = () => {
        let newArr = []
        let obj = {
            id: 0,
            nama: 'Shift'
        }
        if (kategories.length > 2) {
            newArr = kategories.slice(0, 2)
            newArr.push(obj)
            return newArr
        }
        return newArr
    }

    async function sendData(){
        let form = {
            kategory_id:kategori
        }
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
        console.log('pilih jadwal status :', kategories)
        BackHandler.addEventListener('hardwareBackPress', () => {return false})
    }, [])
    
  return (
      <SafeAreaView style={tw`flex-1`}>
          <AppLoader visible={loading || progress} />
          {status === 'Success' && (<AppAlert visible={status === 'Success'} status={status} msg={'data tersimpan'}
            onOk={()=> konfirmasi()}
          />)}
          {status === 'Error' && (<AppAlert visible={status === 'Error'} status={status} msg={'Ada Kesalahan silahkan diulangi'}
            onOk={()=> setStatus('Idle')}
          />)}
          <View style={tw`p-4 flex-row justify-between`}>
            <Text style={tw`font-bold`}>Pilih Kategori Jadwal</Text>
            <Text style={tw`font-bold`}>{kategori }</Text>
        </View>
          
          <View>
              <FlatList
              data={cutItems()}
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
          
          {/* <View style={tw`bg-primary w-[90%] self-center mt-4 p-4 rounded-4 items-center justify-center`}>
              <Text style={tw`font-bold text-lg text-white`}>{kategories[kategori]? kategories[kategori].nama: 'Shift' }</Text>
          </View> */}
          {/* <AppBtn label="home" clicked={()=>konfirmasi()} /> */}

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

export default PilihJadwalScreen