import { View, Text, ScrollView, Image, Modal, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComp from './comp/HeaderComp'
import { IMGS, tw } from '../../../constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AvatarPasien from './comp/AvatarPasien'
import * as ImagePicker from 'expo-image-picker'
import { ImageType } from 'expo-camera'
import { api } from '../../../helpers/axiosHttp'

const DetailPasienUpload = ({ navigation, route }) => {

  const {pasien } = route?.params
  const [modalOpen, setModalOpen] = useState(false)
  const [visibleModalMasterUpload, setVisibleModalMasterUpload] = useState(false)
  const [image, setImage] = useState()

  const [masterUpload, setMasterUpload] = useState([])
  const [uploadCategory, setUploadCategory] = useState(null)
  // console.log('route', pasien)

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
        // let result = await ImagePicker.launchCameraAsync({
        //   cameraType: 'back',
        //   allowsEditing:true,
        //   quality:0.75
        // })
        result = await ImagePicker.launchCameraAsync(options);
        if (!result?.canceled) {
          await saveImage(result.assets[0].uri)
        }
      } else {
        console.log('gallery');
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
    } catch (error) {
      throw error
    }
  }


  const getMasterUploadFromApi = async () => {
    await api.get(`/v2/simrs/layananpoli/upload/master`).then(resp => {
      console.log('resp', resp);
      setMasterUpload(resp.data)
    }).catch(err => {
        console.log(err)
    })
  }


  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      getMasterUploadFromApi()
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
      <Modal animationType="slide" transparent={true} visible={isVisible}>
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

  return (
    <View className="flex-1">
      <HeaderComp title="Detail Pasien Poli" bg="white" txtColor="gray-dark" close={ ()=> navigation.goBack() }/>

      {visibleModalMasterUpload && (<ModalMasterUpload isVisible={visibleModalMasterUpload} 
      onClose={()=> setVisibleModalMasterUpload(false)} onSelectItem={(val)=> onModalMasterSelected(val)}/>)}
      <ModalUploadImage title={uploadCategory} isVisible={modalOpen} onClose={()=> setModalOpen(false)} onUpload={onUploadImage} />

      <View>
        <View className="flex flex-center items-center p-4">
          <AvatarPasien pasien={pasien} width="35" height="35" border="4" borderColor="gray-300" />
          <Text className="font-poppinsBold mt-4">{pasien?.nama}</Text>
          <Text className="font-poppins">{pasien?.kelamin}, usia : {pasien?.usia}</Text>
        </View>
      </View>
        <ScrollView className="px-4">
          
          <CardInfo />

          <View>
            <View className="flex-row justify-between items-center py-4">
              <TouchableOpacity className="" onPress={()=> setVisibleModalMasterUpload(true)}>
                <Text className="font-poppins text-primary">Upload 📤</Text>
              </TouchableOpacity>
              <Text className="font-poppinsBold text-gray">Dokument</Text>
            </View>

            <View className="py-2">
              {image ? (
                <View className="py-2 bg-white items-center">
                <Image 
                  source={{uri: image}}
                  style={[tw`w-full h-40`, { resizeMode: 'contain' }]}
                />
                <Text className="font-poppins">Harap Tunggu ... Uploading</Text>
              </View>
              ):(
                <View className="px-4 py-2 items-center bg-white">
                <Text className="font-poppins text-gray mr-4">Tempat Dokument</Text>
              </View>
              )}
              
              
              
            </View>
          </View>
          
        </ScrollView>
    </View>
  )
}

export default DetailPasienUpload