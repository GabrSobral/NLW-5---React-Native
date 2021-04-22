import React from 'react'
import { StyleSheet, View } from 'react-native'
import LotttieView from 'lottie-react-native'

import loadAnimation from '../assets/load.json'

export function Loading(){
  return(
    <View style={styles.container}>
      <LotttieView
        source={loadAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  animation : {
    backgroundColor : 'transparent',
    width : 200,
    height : 200
  }
})