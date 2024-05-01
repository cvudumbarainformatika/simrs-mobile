import React from 'react'
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const PreviewDokumen = ({isVisible, onClose, img}) => {
  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <View className="bg-black flex-1 justify-center items-center">
        <TouchableOpacity className="absolute top-4 right-4 z-10" onPress={onClose}>
          <Icon name="close" size={40} color={'white'} />
        </TouchableOpacity>
        <Image source={{uri:img}} 
          style={{
            width:'100%',
            height:'100%'
          }}
          resizeMode='contain'
        />
      </View>
    </Modal>
  )
}

export default PreviewDokumen