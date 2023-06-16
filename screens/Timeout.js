import { View, Text } from 'react-native'
import React from 'react'
import { ROUTES, tw } from '../constants'
import { AppAlert } from '../components'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const Timeout = () => {

  const [alert, setAlert] = useState(true)
  const navigation = useNavigation()

  function keHome() {
    setAlert(false)
    navigation.navigate(ROUTES.HOME)
  }
  return (
    <View style={tw`flex-1 bg-primary`}>
      <AppAlert visible={alert} status="Error" msg="Ada Kendala Pada Jaringan Anda Atau Server sedang Sibuk! Kembali lagi Nanti"
        onOk={() => keHome()}
      />
    </View>
  )
}

export default Timeout