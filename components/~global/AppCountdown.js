import { View, Text } from 'react-native'
import React from 'react'

const AppCountdown = ({
    days,
    hours,
    minutes,
    seconds
}) => {
  return (
    <View className="flex-row space-x-2">
      <View>
        <Text>{ days } : </Text>
      </View> 
      <View>
        <Text>{ hours } : </Text>
      </View> 
      <View>
        <Text>{ minutes } : </Text>
      </View> 
      <View>
        <Text>{ seconds }</Text>
      </View> 
    </View>
  )
}

AppCountdown.defaultProps = {
  days:'00',
  hours:'00',
  minutes:'00',
  seconds:'00',
}

export default AppCountdown