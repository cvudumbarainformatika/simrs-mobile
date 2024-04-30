import { View, Text, Image } from 'react-native'
import React from 'react'
import { IMGS, tw } from '../../../../constants'

const AvatarPasien = (props) => {

  function setImage(val){
    const perempuan = val ? val?.kelamin === 'Perempuan' || val?.kelamin === 'perempuan' : false
    const usia = val?.usia
    const usiath = usia ? parseInt(usia.substring(0, 2)) : 25
    if (perempuan) {
      if (usiath <= 99 && usiath > 59) {
        return IMGS.avatarGrandma
      } else if (usiath <= 59 && usiath > 25) {
        return IMGS.avatarWoman
      } else if (usiath <= 25 && usiath > 15) {
        return IMGS.avatarFemale
      } else if (usiath <= 15 && usiath > 5) {
        return IMGS.avatarYoungGirl
      } else if (usiath <= 5) {
        return IMGS.avatarBaby
      } else {
        return IMGS.avatarFemale
      }
    } else {
      if (usiath <= 99 && usiath > 59) {
        return IMGS.avatarGrandpa
      } else if (usiath <= 59 && usiath > 25) {
        return IMGS.avatarMan
      } else if (usiath <= 25 && usiath > 15) {
        return IMGS.avatarMale
      } else if (usiath <= 15 && usiath > 5) {
        return IMGS.avatarYoungMan
      } else if (usiath <= 5) {
        return IMGS.avatarBaby
      } else {
        return IMGS.avatarMan
      }
    }
  }



  return (
    <View style={tw`h-${props.width ?? '12'} w-${props.height ?? '12'} bg-primary border-${props.border??'2'} border-${props.borderColor ?? 'white'} rounded-full overflow-hidden items-center justify-center`}>
      <Image
        source={setImage(props.pasien)}
        style={[tw`h-${props.width ?? '12'} w-${props.height ?? '12'}`, { resizeMode: 'contain' }]}
      />
    </View> 
  )
}

export default AvatarPasien