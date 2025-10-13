import { View, Text, ScrollView, Image, Modal, Pressable, TouchableOpacity, Alert, BackHandler, Platform, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComp from './comp/HeaderComp'
import { IMGS, ROUTES, tw } from '../../../constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AvatarPasien from './comp/AvatarPasien'
import * as ImagePicker from 'expo-image-picker'
import { ImageType } from 'expo-camera'
import { api } from '../../../helpers/axiosHttp'
import { PATH_IMG } from '../../../config'
import AppBtn from '../../../components/~global/AppBtn'
import PreviewDokumen from './comp/PreviewDokumen'
import { useDispatch } from 'react-redux'
import { setCategory } from '../../../redux/features/pasien/pasienReducer'
import { useBackHandler } from '@react-native-community/hooks'

const DetailPasienUpload = ({ navigation, route }) => {

  const {pasien, category, filterDay } = route?.params

  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  const [visibleModalMasterUpload, setVisibleModalMasterUpload] = useState(false)
  const [visibleModalPreview, setVisibleModalPreview] = useState(false)

  const [image, setImage] = useState()
  const [imageViewing, setImageViewing] = useState(null)
  const [hapusDok, setHapusDok] = useState(null)

  const [masterUpload, setMasterUpload] = useState([])
  const [uploadCategory, setUploadCategory] = useState(null)
  const [dokumenFromBackend, setDokumenFromBackend] = useState([])

  // console.log('route', filterDay)

  const onModalClose = ()=> {
    setModalOpen(false)
    setVisibleModalMasterUpload(false)
  }
  const onModalOpen = ()=> {setModalOpen(true)}

  const onModalMasterSelected = (val)=> {
    console.log(val);
    setUploadCategory(val)
    // setVisibleModalMasterUpload(false)
    setModalOpen(true)
  }

  const CardInfo = ()=> {
    return (
      <View className="py-2 bg-white">
        <View className="bg-white px-4 py-2 flex-row ">
          <Text className="font-poppins text-gray mr-4">POLIKLINIK</Text>
          <Text className="font-poppins flex-1 text-right">{pasien?.poli}</Text>
        </View>
        <View className="bg-white px-4 py-2 flex-row ">
          <Text className={`font-poppins text-${pasien.dokter==='' || pasien.dokter===null ? 'negative':'gray'} mr-4`}>DPJP</Text>
          <Text className="font-poppins flex-1 text-right">{pasien?.dokter ?? '-'}</Text>
        </View>
        <View className="bg-white px-4 py-2 flex-row justify-between">
          <Text className="font-poppins text-gray">Noreg</Text>
          <Text className="font-poppins">{pasien?.noreg}</Text>
        </View>
        <View className="bg-white px-4 py-2 flex-row justify-between">
          <Text className="font-poppins text-gray">No.RM</Text>
          <Text className="font-poppins">{pasien?.norm}</Text>
        </View>
        <View className="bg-white px-4 py-2 flex-row justify-between">
          <Text className="font-poppins text-gray">NIK</Text>
          <Text className="font-poppins">{pasien?.nktp ?? '-'}</Text>
        </View>
        <View className="bg-white px-4 py-2 flex-row justify-between">
          <Text className="font-poppins text-gray">NOKA</Text>
          <Text className="font-poppins">{pasien?.noka ?? '-'}</Text>
        </View>
        <View className="bg-white px-4 py-2 flex-row justify-between">
          <Text className="font-poppins text-gray">PENJAMIN</Text>
          <Text className="font-poppins">{pasien?.sistembayar ?? '-'}</Text>
        </View>
      </View>
    )
  }


  const onUploadImage = async (mode)=> {
    
    try {
      let result;
      const options = ImagePicker.ImagePickerOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 0.75
      };

      if( mode==='camera'){
        console.log('camera');
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: 'back',
          allowsEditing:true,
          quality:0.75
        })
        // result = await ImagePicker.launchCameraAsync(options);
      } else {
        // console.log('gallery');
        result = await ImagePicker.launchImageLibraryAsync(options);
      }

      // Save image if not cancelled
      if (!result?.canceled) {
        await saveImage(result.assets[0])
        // saveImage(result.assets[0].uri);
      }
    } catch (error) {
      // throw error
      console.log('error', error);
    }
    
  }

  const saveImage = async (image)=> {
    try {
      setImage(image)
      setModalOpen(false)
      setVisibleModalMasterUpload(false)
      uploadImage(image)
    } catch (error) {
      throw error
    }
  }

  const uploadImage = async (img) => {
    // setUploading(true);
    // console.log('img', img);
    const uri =
      Platform.OS === "android"
        ? img.uri
        : img.uri.replace("file://", "");
        const filename = img.uri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const ext = match?.[1];
        const type = match ? `image/${match[1]}` : `image`;
    const form = new FormData()
    form.append('dokumen', {
      uri,
      name: `dokumen.${ext}`,
      type,
    })
    form.append('noreg', pasien?.noreg)
    form.append('norm', pasien?.norm)
    form.append('nama', uploadCategory)
      
    await api.post(`/v2/simrs/layananpoli/upload/dokumen`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(resp => {
      console.log('resp upload', resp);
      if (resp.status===200) {
        alert("Image Uploaded");
        updateDokumenFromBackend(resp?.data?.result)
        setImage(null)
      } else {
        alert("Image upload failed!");
        setImage(null)
      }
    }).catch(err => {
        console.log('imgUpload',err)
        setImage(null)
    })
  };

  const updateDokumenFromBackend = (data)=>{
    data.length ? setDokumenFromBackend(data) : setDokumenFromBackend([])
  }


  const getMasterUploadFromApi = async () => {

    await api.get(`/v2/simrs/layananpoli/upload/master`).then(resp => {
      console.log('master resp', resp);
      setMasterUpload(resp.data)
    }).catch(err => {
        console.log('masterUpload',err)
    })
  }

  const getDokumen = async ()=> {
    const params={params:{noreg:pasien?.noreg}}
    await api.get(`/v2/simrs/layananpoli/upload/dokumenBy`,params).then(resp => {
      console.log('get dok resp', resp);
      if (resp.status === 200) {
        updateDokumenFromBackend(resp.data.result)
      }
    }).catch(err => {
        console.log('getDokumen',err)
    })
  }


  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      Promise.all([getMasterUploadFromApi(),getDokumen()])
    })
    return () => {
        subscribe
    }
  }, [navigation]);



  const ModalUploadImage=({isVisible, onClose, onUpload, title})=> {
    return (
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View className="h-1/4 w-full bg-white absolute bottom-0 rounded-t-lg overflow-hidden">
          <View className="flex-1">
              <View className="flex-row justify-between items-center p-2  bg-gray-400">
                <Text className="font-poppinsBold text-white">UPLOAD {title} via</Text>
                <Pressable onPress={onClose}>
                  <Icon name="close" color="#fff" size={28} />
                </Pressable>
              </View>
              <View className="flex-1 flex h-screen justify-center items-center">
                <View className="flex-row justify-around w-full p-4">
                  <TouchableOpacity className="p-2 bg-transparent justify-center items-center rounded-md"
                    onPress={()=>onUpload('gallery')}
                  >
                    <Icon name="image" size={50} color={'orange'}/>
                    <Text className="font-poppins text-xs">Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="p-2 bg-transparent justify-center items-center rounded-md"
                    onPress={()=>onUpload('camera')}
                  >
                    <Icon name="camera" size={50} color={'red'}/>
                    <Text className="font-poppins text-xs">Camera</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </View>
        </View>
      </Modal>
    )
  }

  const ModalMasterUpload=({isVisible, onClose, onSelectItem})=> {
    return (
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="absolute m-auto left-0 right-0 justify-center items-center">
            <View className="bg-gray-200 rounded-t-md w-11/12 overflow-hidden">
              <View className="p-2 flex-row justify-between items-center bg-white">
                <Text className="font-poppins text-xs">Master Upload</Text>
                <Pressable onPress={onClose}>
                  <Icon name="close" color={'black'} size={28} />
                </Pressable>
              </View> 
              <View className="bg-white p-2">
              {masterUpload?.map((item, i) => {
                  return (
                    <TouchableOpacity 
                      key={i} 
                      className="px-2 py-3 bg-gray-700 rounded-sm" 
                      style={{marginBottom:2}}
                      onPress={()=> onSelectItem(item)}
                    >
                      <Text className="font-poppins text-gray mr-4">{item}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View> 
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  const PreviewImageUpload = () => {
    return (
      <View className="py-2 bg-white items-center">
        <Image 
          source={{uri: image?.uri}}
          style={[tw`w-full h-40`, { resizeMode: 'contain' }]}
        />
        <Text className="font-poppins">Harap Tunggu ... Uploading</Text>
      </View>
    )
  }

  const PreviewImageFromApi = ()=> {
    return (
      <>
        {dokumenFromBackend.length > 0 ? (
          // <ScrollView nestedScrollEnabled horizontal={true} showsHorizontalScrollIndicator={false}
          //   contentContainerStyle={{
          //     gap:15,
          //     paddingVertical:15,
          //     paddingStart:15,
          //     paddingEnd:15
          //   }}
          // >
          //   {dokumenFromBackend?.map((item, i) => {
          //     return (
          //       <View key={i} className="bg-white w-40 rounded-md relative p-2 shadow-md">
          //         <TouchableOpacity onPress={()=> {
          //           setImageViewing(`${PATH_IMG+item.url}`)
          //           setVisibleModalPreview(true)
          //         }}>
          //           <Image source={{uri:`${PATH_IMG+item.url}`}} className="w-full h-40 rounded-md flex-1"
          //             resizeMode='cover'
          //           />
          //         </TouchableOpacity>
                  
          //         <Text className="font-poppinsBold text-xs py-1">{item.nama}</Text>
          //         <View className="flex-row justify-end items-center mt-2">
          //           {/* <TouchableOpacity>
          //             <Icon name='file-eye' size={20} color={'gray'} />
          //           </TouchableOpacity> */}
          //           <TouchableOpacity
          //             onPress={()=> konfirmasiHapus(item)}
          //           >
          //             <Icon name='delete-sweep' size={28} color={'gray'} />
          //           </TouchableOpacity>
          //         </View>
          //       </View>
          //     )
          //   })}
          // </ScrollView>
          <View className="bg-gray-200">
            <FlatList
              data={dokumenFromBackend}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              nestedScrollEnabled={true}
              horizontal={true}
              
              contentContainerStyle={{marginVertical:20, marginHorizontal:15, paddingEnd:45}}
              ItemSeparatorComponent={()=> <View className="w-4"></View>}
              
            />
          </View>
          
        ):(
          <View className="px-4 py-2 items-center bg-white">
            <Text className="font-poppins text-gray mr-4">Tidak ada data</Text>
          </View>
        )}
      </>
      
    )
  }

  const renderItem = ({item})=> {
    return(
      <View className="bg-white w-40 rounded-md relative p-2 shadow-md">
      <TouchableOpacity onPress={()=> {
        setImageViewing(`${PATH_IMG+item.url}`)
        setVisibleModalPreview(true)
      }}>
        <Image source={{uri:`${PATH_IMG+item.url}`}} className="w-full h-40 rounded-md flex-1"
          resizeMode='cover'
        />
      </TouchableOpacity>
      
      <Text className="font-poppinsBold text-xs py-1">{item.nama}</Text>
      <View className="flex-row justify-end items-center mt-2">
        
        <TouchableOpacity
          onPress={()=> konfirmasiHapus(item)}
        >
          <Icon name='delete-sweep' size={28} color={'gray'} />
        </TouchableOpacity>
      </View>
    </View>
    )
         
  }

  const konfirmasiHapus = (val) => {
    Alert.alert("Konfirmasi!", "Apakah Kamu ingin Menghapus dokumen ini?", [
      {
        text: "Cancel",
        onPress: () => setHapusDok(null),
        style: "cancel"
      },
      { text: "IYA", onPress: () => hapusDokumen(val) }
    ]);
    return true;
  };

  const hapusDokumen = async (val)=> {
    // console.log('hapus', val);
    const payload = {id:val?.id}
    await api.post(`/v2/simrs/layananpoli/upload/deletedata`,payload).then(resp => {
      // console.log('resp', resp);
      if (resp.status===200) {
        setDokumenFromBackend([])
        getDokumen()
      }
    }).catch(err => {
      console.log(err)
    })
  }


  const handleGoBack = ()=> {
    // dispatch(setCategory(category))
    // console.log('back', category)
    // console.log('back filterDay', filterDay)
    navigation.navigate(ROUTES.UPLOAD_DOK_POLI, {category, filterDay})
  }

  useEffect(()=> {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleGoBack,
    );
    return () => backHandler.remove();
  },[])
  // useBackHandler(() => {
  //   if (category !== undefined || category !== null) {
  //     BackHandler.addEventListener(
  //       "hardwareBackPress",
  //       handleGoBack
  //     );
  //     // console.log('backHandler')
  //     return true
  //   }
  //   BackHandler.removeEventListener("hardwareBackPress", handleGoBack);
  //   return false
  // })

  return (
    <>
      {(pasien.dokter === '' || pasien.dokter===null) ? (
        <View className="flex-1 bg-gray-800 justify-center items-center">
          <Image source={IMGS.madSalehMinum} style={[tw`h-40 w-40`, { resizeMode: 'contain' }]} />
          <Text className="font-poppins text-white mt-4">Maaf ... Dokter DPJP Belum Ada</Text>
          <Text className="font-poppins text-white mt-4 w-80 text-center mb-4" style={{fontSize:10}}>
            Harap Petugas yang berwenang untuk memasukkan DPJP pada Pasien ini
          </Text>
          <AppBtn label="Kembali" clicked={handleGoBack} />
        </View>
      ):(
        <View className="flex-1">
          <HeaderComp title="Detail Pasien Poli" bg={`${visibleModalPreview?'black':'white'}`} txtColor="gray-dark" close={ handleGoBack }/>

          {visibleModalMasterUpload && (<ModalMasterUpload isVisible={visibleModalMasterUpload} 
          onClose={()=> setVisibleModalMasterUpload(false)} onSelectItem={(val)=> onModalMasterSelected(val)}/>)}

          <ModalUploadImage title={uploadCategory} isVisible={modalOpen} onClose={()=> setModalOpen(false)} onUpload={onUploadImage} />

          {visibleModalPreview && (<PreviewDokumen isVisible={visibleModalPreview} 
          onClose={()=> setVisibleModalPreview(false)} img={imageViewing}/>)}

          <View>
            <View className="flex flex-center items-center p-4">
              <AvatarPasien pasien={pasien} width="35" height="35" border="4" borderColor="gray-300" />
              <Text className="font-poppinsBold mt-4">{pasien?.nama}</Text>
              <Text className="font-poppins">{pasien?.kelamin}, usia : {pasien?.usia}</Text>
            </View>
          </View>
            <ScrollView nestedScrollEnabled={true} className="">
              
              <CardInfo />

              <View>
                <View className="flex-row justify-between items-center p-4">
                  <TouchableOpacity className="" onPress={()=> setVisibleModalMasterUpload(true)}>
                    <Text className="font-poppins text-primary">Upload 📤</Text>
                  </TouchableOpacity>
                  <Text className="font-poppinsBold text-gray">Dokument</Text>
                </View>

                <View className={`${image?'py-2':''}`}>
                  {image ? PreviewImageUpload(image): PreviewImageFromApi()}
                </View>

                <View style={{marginBottom:100}} />
              </View>
              
            </ScrollView>
        </View>
      )}
    </>
    
  )
}

export default DetailPasienUpload