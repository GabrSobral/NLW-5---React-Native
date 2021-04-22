import React, { useEffect, useState } from 'react'
import { Alert, Image, Platform, StyleSheet, Text, View } from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import { useNavigation, useRoute } from '@react-navigation/core'
import { format, isBefore } from 'date-fns'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'

import { Button } from '../components/Button'
import { PlantProps, savePlant } from '../libs/storage'

import waterdrop from '../assets/waterdrop.png'
import fonts from '../styles/fonts'
import colors from '../styles/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface PlantParams{
  plant : PlantProps
}

export function PlantSave(){
  const [ selectedDatetime, setSelectedDatetime ] = useState(new Date())
  const [ showDatePicker, setShowDatePicker ] = useState(Platform.OS == 'ios')
  const navigation = useNavigation()

  const routes = useRoute()
  const { plant } = routes.params as PlantParams

  function handleChangeTime(event : Event, datetime : Date | undefined){
    if(Platform.OS === "android"){
      setShowDatePicker(oldState => !oldState)
    }
    if(datetime && isBefore(datetime, new Date())){
      setSelectedDatetime(new Date())
      return Alert.alert("Escolha um horário futuro.")
    }

    if(datetime){
      setSelectedDatetime(datetime)
    }
  }
  function handleOpenDateTimePickerForAndroid(){
    setShowDatePicker(oldState => !oldState)
  }

  async function handleSave(){
    try{
      await savePlant({
        ...plant,
        dateTimeNotification : selectedDatetime
      })
      navigation.navigate('Confirmation', {
        title : 'Tudo certo',
        subtitle : 'Fique tranquilo que sempre vamos lembrar você de cuidadar da sua plantinha com muito cuidado.',
        buttonTitle : 'Muito Obrigado :D',
        icon: 'hug',
        nextScreen : 'MyPlants'
      })

    }catch{
      Alert.alert("Não foi possivel salvar :(")
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.plantInfo}>
            <SvgFromUri
              uri={plant.photo}
              height={150}
              width={150}
            />

            <Text style={styles.plantName}>
              {plant.name}
            </Text>

            <Text style={styles.plantAbout}>
              {plant.about}
            </Text>
        </View>

        <View style={styles.controllers}>
          <View style={styles.tipContainer}>
            <Image
              source={waterdrop}
              style={styles.tipImage}
            />
            <Text style={styles.tipText}>
            {plant.water_tips}
            </Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado
          </Text>

          {
            showDatePicker &&(
              <DateTimePicker
                value={selectedDatetime}
                mode="time"
                display='spinner'
                onChange={handleChangeTime}
              />
            )
          }

          {
            Platform.OS === "android" && (
              <TouchableOpacity 
                style={styles.dataTimePickerButton}
                onPress={
                  handleOpenDateTimePickerForAndroid
              }>
                <Text style={styles.dataTimePickerText}>
                  {`Mudar ${format(selectedDatetime, "HH:mm")}`}
                </Text>
              </TouchableOpacity>
              
            )
          }

          <Button 
            text="Cadastrar planta"
            onPress={handleSave}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'space-between',
    backgroundColor : colors.shape
  },
  plantInfo: {
    flex : 1,
    paddingHorizontal  :30,
    paddingVertical : 50,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : colors.shape,

  },
  plantName: {
    fontFamily : fonts.heading,
    fontSize : 24,
    color : colors.heading,
    marginTop : 15
  },
  plantAbout :{
    textAlign : 'center',
    fontFamily : fonts.text,
    color : colors.heading,
    fontSize : 17,
    marginTop : 10
  },
  controllers : {
    backgroundColor : colors.white,
    paddingHorizontal : 20,
    paddingTop : 20,
    paddingBottom : 20
  },
  tipContainer: {
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    backgroundColor : colors.blue_light,
    padding : 20,
    borderRadius : 20,
    position : 'relative',
    bottom : 60
  },
  tipImage : {
    width : 56,
    height : 56,
  },
  tipText : {
    flex : 1,
    marginLeft : 20,
    fontFamily : fonts.text,
    color : colors.blue,
    fontSize : 17,
    textAlign : 'justify'
  },
  alertLabel : {
    textAlign : 'center',
    fontFamily :fonts.complement,
    color : colors.heading,
    fontSize : 12,
    marginBottom : 5
  },
  dataTimePickerButton:{
    width : '100%',
    alignItems : 'center',
    paddingVertical : 40,
  },
  dataTimePickerText : {
    color : colors.heading,
    fontSize : 24,
    fontFamily : fonts.text
  }
})