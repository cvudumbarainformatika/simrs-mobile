import { View, Text } from 'react-native'
import React from 'react'

const CustomBottomTabBar = props => {
  // console.log("🚀 ~ file: CustomBottomTabBar.js ~ line 5 ~ CustomBottomTabBar ~ props", props)
  console.log(props)
  
  const { children } = props;
  
  return (
    <View>
      <Text>{ children }</Text>
    </View>
  )
}

export default CustomBottomTabBar