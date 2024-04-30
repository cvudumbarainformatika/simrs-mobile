import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import { ROUTES, tw } from '../../../constants';
import { AppBtn, HeaderUser } from '../../../components';
import Icon from 'react-native-vector-icons/Ionicons'
import CategoryButton from './comp/CategoryButton';
import ListingComp from './comp/ListingComp';
import { useDispatch, useSelector } from 'react-redux';
import { getPasienAsync, setCategory, setKodepoli } from '../../../redux/features/pasien/pasienReducer';
import { getPoliAsync } from '../../../redux/features/master/poliReducer';
import { AuthContext } from '../../../context/AuthContext';

import dayjs from 'dayjs'
import 'dayjs/locale/id'
import HeaderComp from './comp/HeaderComp';

const UploadDokumenPoli = ({ navigation }) => {

  const dispatch = useDispatch()

  
  const { pegawai } = useContext(AuthContext);

  const { date, tglAwal, tglAkhir, page, q, category, kodepoli, pasiens, waiting } = useSelector(state => state.pasien)
  // console.log('pasien', pasiens);

  // console.log('pegawai', pegawai);
  const [akses, setAkses] = useState([])
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
    // console.log('set', arr)
    setAkses(arr)

    const sendt = arr.length? arr.map(x => x?.kodepoli) : []
    const filt = sendt.filter(x=> x !== 'SEMUA POLI')

    dispatch(setKodepoli(filt))
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
    console.log('onCatChange', filt)
  }

  
  // console.log('poli', akses);

  


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
    console.log('params :', params);
    dispatch(getPasienAsync(params))
  }


  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      dispatch(getPoliAsync())
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
  }, [kodepoli]); // Only re-run the effect if pegawai changes


  function onItemClick (val) {
    console.log('item click',val);
    navigation.navigate(ROUTES.UPLOAD_DET_PASIEN, {pasien:val})
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



  return (
    <View style={tw`flex-1 bg-gray-300`}>

      <HeaderComp title="Kunjungan Poliklinik" close={ ()=> navigation.goBack() }/>
      {/* ===================== */}
      <View className="flex-1">
      {waiting && (
        <View style={[styles.container]} className="flex-1 justify-center items-center p-4 bg-gray-200 ">
          <Text>Loading</Text>
          <View style={tw`bg-negative w-14 h-14 rounded-full items-center justify-center border-4 border-white`}>
            <ActivityIndicator size={'large'} color={tw.color('white')} />
          </View>
        </View>
      )}

      {pasiens.length > 0  ? viewHistory() : emptyHistory()}
      </View>
      {/* ===================== */}
      <CategoryButton poli={akses} onCategoryChanged={onCatChange} />
      <View className="p-3">
        <View className="flex-row items-center">
            <View className="flex-1 flex-row items-center bg-white p-2 mr-3 rounded-md">
              <Icon name={'search'} size={20} color={tw.color('gray-dark')} className="mr-1"/>
              <TextInput placeholder='Cari Pasien ...' />
            </View>
            <TouchableOpacity onPress={()=>{}} className="bg-dark p-3 rounded-lg">
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