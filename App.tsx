import React from 'react'
import { StatusBar } from 'react-native'
import { Welcome } from './src/pages/Welcome'
import colors from './src/styles/colors'

export default function App(){
  return(
    <>
      <StatusBar 
        translucent={true}
        animated={true}
        barStyle="dark-content"
        backgroundColor= { colors.background }
        showHideTransition="slide"
      />
      <Welcome />
    </>
  )
}