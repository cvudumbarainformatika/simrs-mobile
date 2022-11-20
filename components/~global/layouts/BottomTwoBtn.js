import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from '../../../constants/tw'

const BottomTwoBtn = (props) => {
  return (
    <View style={[{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex:1
      },
      tw`flex-row items-center justify-between`
    ]}>
          <TouchableOpacity style={tw`h-12 w-1/2 bg-dark justify-center items-center`}
            onPress={props.onDismiss}
          >
              <Text style={tw`text-white`}>{ `${props.labelBtnBack?props.labelBtnBack: 'Kembali'}` }</Text>
      </TouchableOpacity>
          <TouchableOpacity style={tw`h-12 w-1/2 bg-primary justify-center items-center`}
            onPress={props.onOk}
          >
              <Text style={tw`text-white`}>{ `${props.labelBtnOk?props.labelBtnOk: 'OK'}` }</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BottomTwoBtn