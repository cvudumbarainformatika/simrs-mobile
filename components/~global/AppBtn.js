import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import tw from '../../constants/tw'

const AppBtn = (props) => {
  
  const [txtColor, setTxtColor] = useState('white')

  const textColorChanged = (val) => {
    if (val === 'primary' || !val) {
      return 'white'
    } 
      return 'white'
  }
  return (
    <TouchableOpacity
        onPress={props.clicked}
      style={tw`bg-${props.color ? props.color : 'primary'} 
        ${props.round?'px-1 py-1':'px-4 py-3'} flex self-center ${props.round ? 'rounded-full' : 'rounded'}`}
    >
      <View style={tw.style('flex-row items-center')}>
        {props.icon && (
          <Icon
            name={props.icon}
            size={22}
            color={tw.color(`${textColorChanged(props.color)}`)}
          />
        )}
        <Text style={tw.style(`text-${textColorChanged(props.color)}`)} > {props.label}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default AppBtn