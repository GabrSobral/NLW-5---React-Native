import React from 'react'
import { StatusBar } from 'react-native'
import AppLoading from 'expo-app-loading'

import colors from './src/styles/colors'
import { 
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost'
import { Routes } from './src/routes'

export default function App(){
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })
  if(!fontsLoaded){
    return <AppLoading />
  }
  return(
    <>
      <StatusBar 
        translucent={true}
        animated={true}
        barStyle="dark-content"
        backgroundColor= { colors.background }
        showHideTransition="slide"
      />
      <Routes/>
    </>
  )
}