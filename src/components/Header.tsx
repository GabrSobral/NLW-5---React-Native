import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  Image
} from 'react-native'

import UserIMG from '../assets/userIMG.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Header(){
  return(
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>Gabriel</Text>
      </View>

      <Image 
        source={UserIMG}
        style={styles.userImage}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    width : '100%',
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : "center",
    marginTop : 10
  },
  userImage : {
    width : 56,
    height : 56,
    borderRadius : 28
  },
  greeting : {
    fontSize : 32,
    color : colors.heading,
    fontFamily : fonts.text
  },
  userName : {
    fontSize : 32,
    fontFamily : fonts.heading,
    color: colors.heading,
    lineHeight :40
  }
})