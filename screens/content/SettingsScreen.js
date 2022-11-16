import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { ROUTES, tw } from '../../constants'
import { AppBtn } from '../../components'
import AppSheet from '../../components/~global/AppSheet'
// import { AuthContext } from '../../context/AuthContext'

const SettingsScreen = ({ navigation }) => {
  // const { logout } = useContext(AuthContext);
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
        </View>
        <View style={tw`mt-2`}>
          <AppBtn label="LOGOUT"
            clicked={()=> navigation.navigate(ROUTES.LOGOUT)}
          />
        </View>
      </View>

      <AppSheet open={sheet} />
    </View>
  )
}

export default SettingsScreen