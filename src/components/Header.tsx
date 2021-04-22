import React, { useEffect, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  Image
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import UserIMG from '../assets/userIMG.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Header(){
  const [username, setUsername] = useState<string>()

  useEffect(()=> {
    async function getName(){
       const user = await AsyncStorage.getItem('@plantmanager:user')
       setUsername(user || '')

    }
    getName()
  },[])
  return(
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{username}</Text>
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