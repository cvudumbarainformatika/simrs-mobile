import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { tw } from '../../../../constants'
import Icon from 'react-native-vector-icons/Ionicons'

const HeaderComp = (props) => {
  return (
    <>
    <SafeAreaView style={tw`pt-1 bg-${props.bg ? props.bg : 'red-800'} shadow`}>
      <View style={tw`flex-row items-center mx-4 mb-2`}>
        <Text className={`flex-1 font-poppins text-${props.txtColor ?? 'white'}`}>{props.title?? 'Title'}</Text>
        <TouchableOpacity
            onPress={props.close}
          >
            <Icon name={'close'} size={28} color={tw.color(`${props.txtColor ?? 'white'}`)} />
          </TouchableOpacity>
      </View>
    </SafeAreaView>
    </>
  )
}

export default HeaderComp