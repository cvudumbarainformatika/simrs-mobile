import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Modal } from 'react-native'
import { ROUTES, tw } from '../../../constants';
import { AppBtn, HeaderUser } from '../../../components';
import Icon from 'react-native-vector-icons/Ionicons'
import CategoryButton from './comp/CategoryButton';
import ListingComp from './comp/ListingComp';
import { useDispatch, useSelector } from 'react-redux';
import { getPasienAsync, setCategory, setKodepoli, setQ, setTglAwal, setTglakhir } from '../../../redux/features/pasien/pasienReducer';
import { getPoliAsync } from '../../../redux/features/master/poliReducer';
import { AuthContext } from '../../../context/AuthContext';

import dayjs from 'dayjs'
import 'dayjs/locale/id'
import HeaderComp from './comp/HeaderComp';
import { useRoute } from '@react-navigation/native';

const menuFilter = ['Hari ini', 'Kemarin', 'Bulan ini', 'Bulan lalu']

const UploadDokumenPoli = ({ navigation }) => {

  const dispatch = useDispatch()

  const route = useRoute()
  // console.log('route', route)

  
  const { pegawai } = useContext(AuthContext);

  const { date, tglAwal, tglAkhir, page, q, category, kodepoli, pasiens, waiting } = useSelector(state => state.pasien)
  // console.log('pasien', pasiens);

  // console.log('pegawai', pegawai);
  const [akses, setAkses] = useState([])
  const [visibleFilter, setVisibleFilter] = useState(false)
  const [filterDay, setFilterDay] = useState('Hari ini')
  const [inputQ, setInputQ] = useState('')
  // const [pasien, setPasien] = useState(null)

  const { items, loading } = useSelector(state => state.masterPoli)

  function settingAkses(val,poli){
    const jabatan = val?.jabatan
    let arr = [...poli]
    if (jabatan==='J00223') {
      arr = mappingAkses(items)
    } else {
      if (val.kdgroupnakes==='2' || val.kdgroupnakes==='3') {
        const aksesruangan = val.kdruangansim
        const split = aksesruangan.split('|')
        const res=[]
        for (let i = 0; i < split.length; i++) {
          const kd = split[i]
          res.push(poli.filter(x => x.kodepoli === kd)[0])
        }
        arr = mappingAkses(res) ?? []
      } else if (val.kdgroupnakes==='1'){
        arr = mappingAkses(items)
      } else {
        arr = []
      }
    }
    arr?.push({
      kodepoli: 'SEMUA POLI',
      nama: 'SEMUA POLI'
    })

    setAkses(arr)

    const sendt = arr.length? arr.map(x => x?.kodepoli) : []
    const filt = sendt.filter(x=> x !== 'SEMUA POLI')

    
    const fromRoute = route.params?.category
    // console.log('category from setting akses from route', fromRoute)
    if (fromRoute === undefined || fromRoute === 'undefined' || fromRoute === null) {
      onCatChange(filt.length? filt[0]: '')
    } else {
      onCatChange(fromRoute)
    }
    
    // dispatch(setKodepoli(filt))
    // console.log('awalKodepoli', filt)
  }

  function mappingAkses(arr){
    return arr.length? arr?.map(x=> {
      return {
        kodepoli:x.kodepoli,
        nama:x.polirs
      }
    }):[]
  }

  const onCatChange = (cat)=> {
    dispatch(setCategory(cat))
    const sendt = cat === 'SEMUA POLI' ? akses.map(x => x?.kodepoli) : [cat ?? '']
    const filt = sendt.filter(x=> x !== 'SEMUA POLI')

    dispatch(setKodepoli(filt))
    // console.log('onCatChange', cat)
  }

  const handleSelectFilterDay = (val) => {
    // console.log(val);
    setFilterDay(val)
    const currentDate = dayjs().locale('id').format('YYYY-MM-DD')
    if (val==='Hari ini') {
      dispatch(setTglAwal(currentDate))
      dispatch(setTglakhir(currentDate))
    } else if(val==='Kemarin'){
      const res = dayjs().subtract(1, 'day').locale('id').format('YYYY-MM-DD')
      dispatch(setTglAwal(res))
      dispatch(setTglakhir(res))
    } else if(val==='Bulan ini'){
      const awal = dayjs().locale('id').format('YYYY-MM-')+'01'
      const akhir = dayjs().locale('id').format('YYYY-MM-')+'31'
      dispatch(setTglAwal(awal))
      dispatch(setTglakhir(akhir))
    } else {
      const awal = dayjs().subtract(1, 'month').locale('id').format('YYYY-MM-')+'01'
      const akhir = dayjs().subtract(1, 'month').locale('id').format('YYYY-MM-')+'31'
      dispatch(setTglAwal(awal))
      dispatch(setTglakhir(akhir))
    }
    setVisibleFilter(false)
  }

  

  const handleSearch = (val) => {
    // console.log('input on enter',val);
    setInputQ(val=== null? '':val)
    dispatch(setQ(val=== null? '':val))
  }
  // console.log('search', q);
  // console.log('category', category);

  


  function getPasien(){
    const payload = {
      tglAwal,
      tglAkhir,
      page,
      category,
      kodepoli,
      q
    }
    const params ={params:payload}
    // console.log('params :', params);
    dispatch(getPasienAsync(params))
  }


  useEffect(() => {
    // console.log('navigation', navigation)
    const subscribe = navigation.addListener("focus", () => {
      dispatch(setTglAwal(dayjs().locale('id').format('YYYY-MM-DD')))
      dispatch(setTglakhir(dayjs().locale('id').format('YYYY-MM-DD')))
      dispatch(getPoliAsync())
      onCatChange(category)
    })
    return () => {
        subscribe
    }
  }, [navigation]);

  useEffect(() => {
    settingAkses(pegawai, items)
  },[pegawai,items]); 

  useEffect(() => {
    getPasien()
  }, [category, filterDay, q]); // Only re-run the effect if pegawai changes


  function onItemClick (val) {
    // console.log('item click',val);
    navigation.navigate(ROUTES.UPLOAD_DET_PASIEN, {pasien:val, category})
  }

  const viewHistory = ()=> {
    return (
      // !waiting && (
        <ListingComp pasien={pasiens} navigation={navigation} date={date} onClickedItem={(val)=>onItemClick(val)} />
      // )
      
    )
  }

  const emptyHistory = () => {
    return (
      !waiting && (
        <View className="flex-1 justify-center items-center p-4 bg-gray-200">
          <Icon name="book" color={tw.color('negative')} size={60} />
          <Text className="font-poppins text-gray-dark  text-xs mt-5" style={{marginTop:-5}}>Tidak Ada Data</Text>
        </View>
      )
      
    )
  }

  

  const ModalMenuFilter=({isVisible, onClose, menus, aktif})=> {
    return (
      <Modal animationType="slide" transparent={true} visible={isVisible} className="shadow-md">
        <View className="w-2/6 bg-gray absolute bottom-10 right-4 rounded-lg overflow-hidden shadow-md">
          {menus.map((item, i)=> {
            return (
              <TouchableOpacity key={i} className={`bg-${aktif === item? 'negative': 'white'} p-2`} style={{marginBottom:1}} onPress={()=> handleSelectFilterDay(item)}>
                <Text className={`text-${aktif === item? 'white': 'black'} font-poppins text-xs`}>{item}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </Modal>
    )
  }


  return (
    <View style={tw`flex-1 bg-gray-300`}>

      <HeaderComp title="Kunjungan Poliklinik" close={ ()=> navigation.goBack() }/>
      

      {visibleFilter && (<ModalMenuFilter aktif={filterDay} visible={visibleFilter} menus={menuFilter} onClose={()=> setVisibleFilter(false)} />)}

      {/* ===================== */}
      <View className="flex-1">
      {waiting && (
        <View style={[styles.container]} className="flex-1 justify-center items-center p-4 bg-gray-200 ">
          <View style={tw`bg-negative w-14 h-14 rounded-full items-center justify-center border-4 border-white`}>
            <ActivityIndicator size={'large'} color={tw.color('white')} />
          </View>
          <Text className="font-poppins mt-2 text-white">Loading...</Text>
        </View>
      )}

      {pasiens.length > 0  ? viewHistory() : emptyHistory()}
      </View>
      {/* ===================== */}
      <View className="w-full px-4 pt-2">
        <CategoryButton poli={akses} onCategoryChanged={onCatChange} ctg={category} />
      </View>
      <View className="p-3">
        <View className="flex-row items-center">
            <View className="flex-1 flex-row items-center bg-white p-2 mr-3 rounded-md">
              <Icon name={'search'} size={20} color={tw.color('gray-dark')} className="mr-1"/>
              <TextInput 
                className="flex-1" 
                placeholder='Cari Pasien ...' 
                autoCorrect={false} 
                onChangeText={(val)=> setInputQ(val)}
                defaultValue={inputQ}
                blurOnSubmit={true}
                onSubmitEditing={({nativeEvent: {text, eventCount, target}})=>handleSearch(text)}
                style={{fontFamily:"Poppins-Regular"}}
              />
              <TouchableOpacity onPress={()=>handleSearch('')} >
                <Icon name={'close'} size={20} color={tw.color('gray-dark')} className="ml-1"/>
              </TouchableOpacity>
              
            </View>
            <TouchableOpacity onPress={()=>{setVisibleFilter(true)}} className="bg-dark p-3 rounded-lg">
              <Icon name={'options'} size={18} color={'white'}/>
            </TouchableOpacity>
        </View>
      </View>
      {/* ======================= */}
    </View>
  );

  
};

const styles = StyleSheet.create({
  container: {
      zIndex: 10,
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right:0,
      backgroundColor: 'rgba(0,0,0,0.8)',
    },
  });

export default UploadDokumenPoli;