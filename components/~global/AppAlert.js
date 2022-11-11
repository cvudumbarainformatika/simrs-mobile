import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import tw from '../../constants/tw'

const AppAlert = ({
    visible = false,
    status = 'Error',
    msg= 'Maaf, Data tidak ditemukan'
}) => {
    const { height, width } = useWindowDimensions();
    return (
      visible && (
        <View style={[tw`w-full h-full absolute z-10 bg-black/50 flex-1 justify-center`, {height, width}]}>
              
            <View style={tw`bg-white flex flex-row items-center justify-center mx-16 p-4 rounded`}>
                <Text style={tw`ml-4 pt-4`}>{ msg }</Text>
                <View style={tw`bg-primary w-14 h-14 rounded-full items-center justify-center absolute -top-8 border-4 border-white`}>
                    <Text>X</Text>
                </View>
            </View>
        </View>
      )
  )
}

export default AppAlert