import { View, Text, ActivityIndicator, useWindowDimensions, StyleSheet } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable'
import tw from '../../constants/tw';
import { IMGS } from '../../constants';

const AppLoader = ({ visible = false }) => {
  // const { height, width } = useWindowDimensions();
  return (
      visible && (
          <View style={[styles.container]}>
              
              <View style={tw`bg-white flex flex-row items-center justify-center mx-16 p-4 rounded`}>
                    <Text className="font-poppins" style={tw`ml-4 pt-4`}>Harap tunggu ...</Text>
                    {/* <Animatable.Image
                      source={IMGS.loadingAnim}
                      animation="fadeIn"
                      className="h-24 w-20 absolute z-10 -top-[130]"
                      iterationCount={1}
                    /> */}
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
        flex: 1,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right:0,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent:'center'
    },
  });


export default AppLoader