import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ROUTES, tw } from '../../constants'
import { AppBtn } from '../../components'
import AppSheet from '../../components/~global/AppSheet'

const SettingsScreen = ({ navigation }) => {
  const [sheet, setSheet] = useState(false)
  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <AppBtn label="Go To Settings Detail"
          clicked={()=> navigation.navigate(ROUTES.SETTINGS_DETAIL)}
        />
        <View style={tw`mt-2`}>
          <AppBtn label="HOME"
            clicked={()=> navigation.navigate(ROUTES.HOME_TAB)}
          />
          <AppBtn label="OPEN SHEET"
            clicked={()=> setSheet(true)}
          />
        </View>
      </View>

      <AppSheet open={sheet} />
    </View>
  )
}

export default SettingsScreen