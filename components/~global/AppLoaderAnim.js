import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { LinearGradient } from 'expo-linear-gradient'
import { IMGS, tw } from '../../constants'

const { width, height } = Dimensions.get('screen');

const AppLoaderAnim = ({ visible = false }) => {
    return (
    <View style={styles.container}>
      <ImageBackground 
          source={IMGS.splash}
          style={styles.background}
          resizeMode="cover"
      >
        <LinearGradient 
            style={styles.overlay}
            colors={['rgba(15, 23, 42, 0.7)', 'rgba(15, 23, 42, 0.9)']} // Subtle dark overlay
        >
            <Animatable.View 
                animation="pulse" 
                iterationCount="infinite"
                style={styles.loaderContainer}
            >
                <Progress.Circle 
                    size={50} 
                    indeterminate={true} 
                    color={'#fbbf24'} 
                    borderWidth={4}
                />
            </Animatable.View>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

export default AppLoaderAnim

const styles = StyleSheet.create({
  container: {
        width: width,
        height: height,
        backgroundColor: '#0f172a',
    },
    background: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderContainer: {
        position: 'absolute',
        bottom: 100,
        alignItems: 'center',
    }
  });