import { View, Text, useWindowDimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { tw,IMGS } from '../../constants';
import BottomTwoBtn from '../~global/layouts/BottomTwoBtn';
import { PATH_IMG100 } from '../../config';
import { AppBtn } from '../~global';

const ModalConfirmKaryawan = ({
    visible = false,
    id = '',
    nip = '',
    nama = '',
    foto = '',
    user = null,
    ...props
}) => {

    const { height, width } = useWindowDimensions();

  return (
    visible && (
        <View style={[styles.container, {height, width}]}>
              
            <View style={tw`bg-white flex items-center justify-center mx-10 rounded`}>
                <View style={tw`w-32 h-32 bg-gray rounded-full items-center justify-center absolute -top-18 border-4 border-white overflow-hidden`}>
                    <Image
                        source={ foto? {uri:`${PATH_IMG100}/${nip}/${foto}`} : IMGS.avatarMale}
                          style={tw`h-32 w-32 `}
                          resizeMode="contain"
                    />
                </View>
                <View style={tw`p-4 pt-16 items-center`}>
                      <Text style={tw`font-bold text-center`}>{ nama }</Text>
                    <View style={tw`items-center`}>
                        <Text style={tw`text-gray-dark`}>Nip : { nip }</Text>
                    </View>
                </View>

                <View style={tw`pb-14 items-center`}>
                      {
                          user === null ? <Text style={tw`italic text-negative`}>Apakah Benar ini Anda?</Text> :
                              <Text style={tw`text-negative`}>KAMU SUDAH TEREGISTRASI</Text>
                      }
                  </View>

                  {user === null ? <BottomTwoBtn labelBtnBack="Bukan !" labelBtnOk="Benar"
                      onDismiss={props.onDismiss}
                      onOk={props.onOk}
                  /> : 
                      <TouchableOpacity style={tw.style('p-3 w-full bg-gray-light border-primary border-t items-center')}
                        onPress={props.onOk}
                    >
                        <Text style={tw`text-primary`}>OK</Text>
                    </TouchableOpacity>
                  }
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
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent:'center'
    },
  });

export default ModalConfirmKaryawan