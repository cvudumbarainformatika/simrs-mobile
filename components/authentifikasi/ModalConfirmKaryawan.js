import { View, Text, useWindowDimensions, StyleSheet, Image } from 'react-native'
import React from 'react'

import { tw,IMGS } from '../../constants';
import BottomTwoBtn from '../~global/layouts/BottomTwoBtn';

const ModalConfirmKaryawan = ({
    visible = false,
    id = '',
    nip = '',
    nip_baru = '',
    nama = '',
    foto='',
    ...props
}) => {
    const { height, width } = useWindowDimensions();
  return (
    visible && (
        <View style={[styles.container, {height, width}]}>
              
            <View style={tw`bg-white flex items-center justify-center mx-10 rounded`}>
                <View style={tw`w-28 h-28 bg-gray rounded-full items-center justify-center absolute -top-16 border-4 border-white overflow-hidden`}>
                    <Image
                        source={IMGS.avatarMale}
                        style={tw`h-32 w-32`}
                    />
                </View>
                <View style={tw`p-4 pt-12 items-center`}>
                    <Text style={tw`font-bold text-lg`}>Percobaan</Text>
                    <View style={tw`items-center`}>
                        <Text style={tw`text-gray-dark`}>Nip : 776767</Text>
                        <Text style={tw`text-gray-dark`}>Jabatan : 776767</Text>
                    </View>
                </View>

                <View style={tw`pb-14 items-center`}>
                    <Text style={tw`text-negative`}>KAMU SUDAH TEREGISTRASI</Text>
                    <Text style={tw`italic text-negative`}>Apakah Benar ini Anda?</Text>
                  </View>
                  <BottomTwoBtn labelBtnBack="Bukan !" labelBtnOk="Benar"
                      onDismiss={props.onDismiss}
                      onOk={props.onOk}
                  />
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