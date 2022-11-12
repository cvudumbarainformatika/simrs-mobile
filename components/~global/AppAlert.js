import { View, Text, useWindowDimensions, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import tw from '../../constants/tw'
import AppBtn from './AppBtn'

const AppAlert = ({
    visible = false,
    status = 'Error',
    msg = 'Maaf, Data tidak ditemukan',
    ...props
}) => {
    const { height, width } = useWindowDimensions();
    return (
      visible && (
        <View style={[styles.container, {height, width}]}>
              
            <View style={tw`bg-white flex items-center justify-center mx-10 p-4 rounded`}>
                    <Text style={tw`py-4`}>{msg}</Text>
                    <View style={tw.style('pt-4')}>
                        <AppBtn label="OK" color="dark"
                            clicked={props.onOk}
                        />
                    </View>
                <View style={tw`bg-${status === 'Error'? 'negative':'secondary'} w-14 h-14 rounded-full items-center justify-center absolute -top-8 border-4 border-white`}>
                    <Icon name={`${status === 'Error'? 'close':'thumb-up'}`} size={32} color={tw.color('white')} />
                </View>
            </View>
        </View>
      )
  )
}


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 10,
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent:'center'
    },
  });

export default AppAlert