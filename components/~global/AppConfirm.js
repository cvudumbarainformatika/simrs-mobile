import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { tw } from '../../constants';
import BottomTwoBtn from './layouts/BottomTwoBtn';

const AppConfirm = ({
    visible = false,
    status = 'Error',
    msg = 'Apakah Anda Benar',
    labelBtnBack='Bukan !',
    labelBtnOk='Benar',
    ...props
}) => {
  const { height, width } = useWindowDimensions();
    return (
      visible && (
        <View style={[styles.container, {height, width}]}>
              
                <View style={tw`bg-white flex items-center justify-center mx-10 rounded`}>
                    <View style={tw`bg-${status === 'Error'? 'negative':'primary'} w-14 h-14 rounded-full items-center justify-center absolute -top-8 border-4 border-white`}>
                        <Icon name={`${status === 'Error'? 'close':'thumb-up'}`} size={32} color={tw.color('white')} />
                    </View>
                    <View style={tw`px-4 pt-8 pb-18`}><Text>{msg}</Text></View>
                    <BottomTwoBtn labelBtnBack={labelBtnBack} labelBtnOk={labelBtnOk}
                      onDismiss={props.onDismiss}
                      onOk={props.onOk}
                  />
                    
            </View>
        </View>
      )
  )
}

export default AppConfirm

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 10,
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent:'center'
    },
  });