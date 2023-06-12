import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import tw from '../../constants/tw'

const AppBtnIcon = (props) => {

    const [txtColor, setTxtColor] = useState('white')
    return (
        <TouchableOpacity
            onPress={props.clicked}
            style={tw`bg-${props.color ? props.color : 'primary'} 
        ${props.round ? 'p-2 h-9 w-9' : 'px-4 py-4'} flex self-center justify-center ${props.round ? 'rounded-full' : 'rounded'}
        ${props.rounded ? 'rounded-full p-2' : 'rounded'}
        `}
        >
            <View style={tw.style('flex-row self-center')}>
                {props.icon && (
                    <Icon
                        name={props.icon}
                        size={20}
                        color={tw.color(`${props.colorIcon}`)}
                    />
                )}
            </View>
        </TouchableOpacity>
    )
}

export default AppBtnIcon