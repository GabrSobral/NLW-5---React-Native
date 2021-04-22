import React from 'react'
import { 
  Image,
  SafeAreaView, 
  StyleSheet,
  Text,
  View,
} from 'react-native'

import EmojiConfirm from '../assets/EmojiConfirm.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/core'

export function Confirmation(){
  const { navigate } = useNavigation()

  function handleMoveOn(){
    navigate('PlantSelect')
  }
  
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={EmojiConfirm} 
          resizeMode="contain"
        />
        <Text style={styles.title}>Prontinho</Text>

        <Text style={styles.subtitle}>
          Agora vamos começar a cuidas das suas plantinhas com muito cuidado.
        </Text>

        <View style={styles.footer}>
          <Button 
            onPress={handleMoveOn}
            text="Começar" 
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'space-around'
  },
  content : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    width : '100%',
    padding : 30
  },
  title : {
    fontSize  : 32,
    fontFamily : fonts.heading,
    textAlign: 'center',
    color : colors.heading,
    lineHeight : 38,
    marginTop : 50,
    marginBottom : 10
  },
  subtitle : {
    fontFamily : fonts.text,
    textAlign : 'center',
    fontSize : 17,
    paddingHorizontal : 20,
    color: colors.heading,
  },
  footer : {
    width : "100%",
    paddingHorizontal : 50,
    marginTop : 30
  }
})