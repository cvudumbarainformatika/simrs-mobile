import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from '../../constants/tw'

const AppBtn = (props) => {
  return (
    <TouchableOpacity
        onPress={props.clicked}
        style={tw`bg-primary py-3 px-4 flex self-center rounded ${props.width} ${props.margin}`}
    >
          <Text className="text-center" style={{ color: tw.color('white') }} >{props.label}</Text>
    </TouchableOpacity>
  )
}

export default AppBtn