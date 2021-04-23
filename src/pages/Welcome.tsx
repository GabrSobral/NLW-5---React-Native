import React from 'react'
import { Feather } from '@expo/vector-icons'
import { 
  Text, 
  StyleSheet, 
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  View
} from 'react-native'

import wateringImg from '../assets/watering.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { useNavigation } from '@react-navigation/core'

export function Welcome(){
  const navigation = useNavigation()

  function handleStart(){
    navigation.navigate('UserIdentification')
  }
  
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'}
          suas plantas de {'\n'}
          forma fácil
        </Text>

        <Image 
          source={wateringImg} 
          style={styles.image}
          resizeMode='contain'
        />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. {'\n'}
          Nós cuidamos de lembrar você sempre que  precisar.
        </Text>

        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.5}
          onPress={handleStart}
        >
              <Feather 
                style={styles.buttonIcon}
                name="chevron-right"
              />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor : colors.background
  },
  wrapper :{
    flex : 1,
    alignItems : 'center',
    justifyContent : "space-around",
    paddingHorizontal : 20
  },
  title : {
    fontSize: 32,
    fontFamily : fonts.heading,
    
    textAlign :"center",
    lineHeight: 38,
    color : colors.heading,
    marginTop : 28
  },
  subtitle : {
    fontSize : 18,
    fontFamily : fonts.text,
    textAlign : 'center',
    paddingHorizontal : 20,
    color : colors.heading 
  },
  button : {
    backgroundColor : colors.green,
    justifyContent  : 'center',
    alignItems : 'center',
    borderRadius : 16,
    marginBottom : 10,
    height : 56,
    width : 56
  },
  image : {
    height : Dimensions.get('window').width * 0.7
  },
  buttonIcon: {
    color : colors.white,
    fontSize : 30,
  }
})