import React from 'react'
import { 
  Image,
  SafeAreaView, 
  StyleSheet,
  Text,
  View,
} from 'react-native'

import EmojiConfirm from '../assets/EmojiConfirm.png'
import EmojiHug from '../assets/EmojiHug.png'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { Button } from '../components/Button'
import { useNavigation, useRoute } from '@react-navigation/core'

interface Params {
  title : string,
  subtitle : string,
  buttonTitle : string,
  icon : 'smile' | 'hug',
  nextScreen : string
}

const emojis = {
  hug : EmojiHug,
  smile : EmojiConfirm
}

export function Confirmation(){
  const { navigate } = useNavigation()
  const routes = useRoute()

  const { 
    title,
    subtitle,
    buttonTitle,
    nextScreen,
    icon
  } = routes.params as Params

  function handleMoveOn(){
    navigate(nextScreen)
  }
  
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={emojis[icon]} 
          resizeMode="contain"
        />
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>

        <View style={styles.footer}>
          <Button 
            onPress={handleMoveOn}
            text={buttonTitle} 
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