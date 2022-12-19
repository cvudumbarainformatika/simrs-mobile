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
  days:0,
  hours:0,
  minutes:0,
  seconds:0,
}

export default AppCountdown