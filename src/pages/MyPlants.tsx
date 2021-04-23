import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View, Text, FlatList, Alert } from 'react-native'

import { Header } from '../components/Header'
import colors from '../styles/colors'
import waterdrop from '../assets/waterdrop.png'
import { loadPlant, PlantProps, removePlant } from '../libs/storage'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import fonts from '../styles/fonts'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { Loading } from '../components/Load'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'

export function MyPlants(){
  const [ myPlants , setMyPlants ] = useState<PlantProps[]>([])
  const [ loading, setLoading ] = useState(true)
  const [ nextWatered, setNextWatered ] = useState<string>()
  const navigation = useNavigation()


  function handleRemove(plant: PlantProps){
    Alert.alert("Remover", `Deseja remover a ${plant.name} mesmo?`, [
      {
        text : "Não 😉",
        style : "cancel"
      },
      {
        text : 'Sim 😢',
        onPress : async ()=> {
          try{
            await removePlant(plant.id)

            setMyPlants(oldData => (
              oldData.filter((item) => item.id !== plant.id)
            ))
          }catch(err){
            Alert.alert("Não foi possível :(")
          }
        }
      }
  ])
  }
  function handlePlantSelect(plant : PlantProps){
    navigation.navigate("PlantDetails", { plant })
  }

  useEffect(()=> {
    async function loadStorageData() {
      const plnatsStoraged = await loadPlant()
      if(plnatsStoraged.length == 0){
        setNextWatered("Não há plantas para regar :(")
        setLoading(false)
        return 
      }
      const nextTime = formatDistance(
        new Date(plnatsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale : ptBR }
      )

      setNextWatered(`Não esqueça de regar a ${plnatsStoraged[0].name} em ${nextTime}.`)
      setMyPlants(plnatsStoraged)
      setLoading(false)
    }
    loadStorageData()
  },[AsyncStorage])

  if(loading){
    return <Loading />
  }
  
  return(
    <View style={styles.container}>
      <Header/>

      <View style={styles.spotlight}>
        <Image
          source={waterdrop}
          style={styles.spotlightImage}
        />
        <Text style={styles.spotlightText}>
          {nextWatered}
        </Text>
      </View>

      <View style={styles.plants} > 
        <Text style={styles.plantsTtle}>
            Próximas regadas
        </Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <PlantCardSecondary 
              data={item}
              handleRemove={() => handleRemove(item)}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ flex : 1 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
    justifyContent :'space-between',
    paddingHorizontal : 30,
    paddingTop : 25,
    backgroundColor : colors.background
  },
  spotlight : {
    backgroundColor : colors.blue_light,
    paddingHorizontal : 20,
    borderRadius : 20,
    height : 110,
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center'
  },
  spotlightImage : {
    width : 60,
    height : 60,
  },
  spotlightText : {
    flex : 1,
    color : colors.blue,
    paddingHorizontal : 20,
  }, 
  plants: {
    flex : 1,
    width : "100%",
  },
  plantsTtle : {
    fontSize: 24,
    fontFamily : fonts.heading,
    color : colors.heading,
    marginVertical : 20
  }
})