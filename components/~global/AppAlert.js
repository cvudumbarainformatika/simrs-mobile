import { View, Text, useWindowDimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import tw from '../../constants/tw'

const AppAlert = ({
    visible = false,
    status = 'Error',
    msg = 'Maaf, Data tidak ditemukan',
    ...props
}) => {
    // const { height, width } = useWindowDimensions();
    return (
      visible && (
        <View style={[styles.container]}>
              
                <View style={tw`bg-white flex items-center justify-center mx-10 rounded`}>
                    <View style={tw`bg-${status === 'Error'? 'negative':'primary'} w-14 h-14 rounded-full items-center justify-center absolute -top-8 border-4 border-white`}>
                        <Icon name={`${status === 'Error'? 'close':'thumb-up'}`} size={32} color={tw.color('white')} />
                    </View>
                    <View style={tw`p-4 pt-8`}><Text>{msg}</Text></View>
                    <TouchableOpacity style={tw.style('p-3 w-full bg-gray-light border-primary border-t items-center')}
                        onPress={props.onOk}
                    >
                        <Text style={tw`text-primary`}>OK</Text>
                    </TouchableOpacity>
                    
            </View>
        </View>
      )
  )
}


const styles = StyleSheet.create({
  container: {
        flex: 1,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right:0,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent:'center'
    },
  });

export default AppAlert