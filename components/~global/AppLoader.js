import { View, Text, ActivityIndicator, useWindowDimensions, StyleSheet } from 'react-native'
import React from 'react'
import tw from '../../constants/tw';
import { SafeAreaView } from 'react-native-safe-area-context';

const AppLoader = ({ visible = false }) => {
  const { height, width } = useWindowDimensions();
  return (
      visible && (
          <View style={[styles.container, {height, width}]}>
              
              <View style={tw`bg-white flex flex-row items-center justify-center mx-16 p-4 rounded`}>
                  <Text style={tw`ml-4 pt-4`}>Loading ...</Text>
                    <View style={tw`bg-primary w-14 h-14 rounded-full items-center justify-center absolute -top-8 border-4 border-white`}>
                        <ActivityIndicator size={'large'} color={tw.color('white')} />
                    </View>
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


export default AppLoader