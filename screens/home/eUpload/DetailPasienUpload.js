import { View, Text, ScrollView, Image, Modal, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import HeaderComp from './comp/HeaderComp'
import { IMGS, tw } from '../../../constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AvatarPasien from './comp/AvatarPasien'

const DetailPasienUpload = ({ navigation, route }) => {

  const {pasien } = route?.params
  const [modalOpen, setModalOpen] = useState(false)
  // console.log('route', pasien)

  const onModalClose = ()=> {setModalOpen(false)}
  const onModalOpen = ()=> {setModalOpen(true)}

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

  const ModalUploadImage=({isVisible, onClose})=> {
    return (
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View className="h-1/4 w-full bg-white absolute bottom-0 rounded-t-lg overflow-hidden">
          <View className="flex-1">
              <View className="flex-row justify-between p-2  bg-gray-400">
                <Text className="font-poppins">Media Pilihan</Text>
                <Pressable onPress={onClose}>
                  <Icon name="close" color="#fff" size={22} />
                </Pressable>
              </View>
              <View className="flex-1 flex h-screen justify-center items-center">
                <View className="flex-row justify-around w-full p-4">
                  <TouchableOpacity className="p-2 bg-transparent justify-center items-center rounded-md">
                    <Icon name="image" size={50} color={'gray'}/>
                    <Text className="font-poppins text-xs">Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="p-2 bg-transparent justify-center items-center rounded-md">
                    <Icon name="camera" size={50} color={'gray'}/>
                    <Text className="font-poppins text-xs">Gallery</Text>
                  </TouchableOpacity>
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
      <ModalUploadImage isVisible={modalOpen} onClose={onModalClose}/>
      <View>
        <View className="flex flex-center items-center p-4">
          <AvatarPasien pasien={pasien} width="35" height="35" border="4" borderColor="gray-300" />
          <Text className="font-poppinsBold mt-4">{pasien?.nama}</Text>
        </View>
      </View>
        <ScrollView className="px-4">
          
          <CardInfo />

          <View>
            <View className="flex-row justify-between items-center py-4">
              <TouchableOpacity className="" onPress={onModalOpen}>
                <Text className="font-poppins text-primary">Upload 📤</Text>
              </TouchableOpacity>
              <Text className="font-poppinsBold text-gray">Dokument</Text>
            </View>
            <View className="py-2 bg-white ">
              <View className="px-4 py-2 items-center">
                <Text className="font-poppins text-gray mr-4">Tempat Dokument</Text>
              </View>
              
            </View>
          </View>
          
        </ScrollView>
    </View>
  )
}

export default DetailPasienUpload