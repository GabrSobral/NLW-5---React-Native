import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { EnviromentButton } from '../components/EnviromentButton'
import { Header } from '../components/Header'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { Loading } from '../components/Load'

import { api } from '../services/api'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { useNavigation } from '@react-navigation/core'
import { PlantProps } from '../libs/storage'

interface EnvironmentProps{
  key : string,
  title : string
}

export function PlantSelect(){
  const [ environment, setEnvironment ] = useState<EnvironmentProps[]>([])
  const [ plants, setPlants ] = useState<PlantProps[]>([])
  const [ filteredPlants, setFilteredPlants ] = useState<PlantProps[]>([])
  const [ environmentSelected, setEnvironmentSelected ] = useState('all')
  const [ loading, setLoading ] = useState(true)
  const [ page, setPage ] = useState(1)
  const [ loadMore, setLoadMore ] = useState(false)

  const navigation = useNavigation()

  async function fetchPlants(){
    const { data } = await api.get(`/plants?_sort=name&_order=asc&_page=${page}&_limit=8`)
    if(!data){
      return setLoading(true)
    }
    if(page > 1){
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data])
    } else {
      setPlants(data)
      setFilteredPlants(data)
    }
    setLoading(false)
    setLoadMore(false)
  }

  function handleEnvironmentSelected(environment : string){
    setEnvironmentSelected(environment)

    if(environment == 'all')
      return setFilteredPlants(plants)

    const filtered = plants.filter(plant => 
      plant.environments.includes(environment)
      )

    setFilteredPlants(filtered)
  }

  function handleFetchMore(distance : number){
    if(distance < 1){
      return
    }

    setLoadMore(true)
    setPage(oldValue => oldValue + 1)
    fetchPlants()
    
  }

  function handlePlantSelect(plant : PlantProps){
    navigation.navigate("PlantSave", { plant })
  }

  useEffect(()=>{
    async function fetchEnviroment(){
      const { data } = await api.get('/plants_environments?_sort=title&_order=asc')
      setEnvironment([
        {
          key : 'all',
          title : 'Todos'
        },
        ...data
      ])
    }
    fetchEnviroment()
  },[])

  useEffect(()=>{
    fetchPlants()
  },[])

  if(loading){
    return <Loading />
  }
  
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header/>
        <Text style={styles.title}>
          Em qual ambiente 
        </Text>
        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>
      
      <View>
        <FlatList
          data={environment}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton 
              title={item.title}
              active={item.key == environmentSelected} 
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>

      <View style={styles.plants}>
            <FlatList
              data={filteredPlants}
              keyExtractor={(item) => String(item.id)}
              renderItem={ ({item}) => (
                <PlantCardPrimary 
                  data={item} 
                  onPress={() => handlePlantSelect(item)}
                />
              )}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              contentContainerStyle={styles.contentContainerStyle}
              onEndReachedThreshold={0.1}
              onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
              ListFooterComponent={
                loadMore 
                ? <ActivityIndicator color={colors.green} />
                : <></>
              }
            />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container :{
    flex : 1,
    backgroundColor : colors.background,
  },
  header : {
    paddingHorizontal : 30
  },
  title : {
    fontSize : 17,
    color : colors.heading,
    fontFamily : fonts.heading,
    lineHeight : 20,
    marginTop : 15
  },
  subtitle : {
    fontFamily : fonts.text,
    fontSize : 20,
    lineHeight : 25,
    color : colors.heading
  },
  enviromentList : {
    height : 40,
    justifyContent : 'center',
    paddingBottom : 5,
    marginLeft : 32,
    marginVertical : 32,
    paddingRight : 65
  },
  plants : {
    flex : 1,
    paddingHorizontal : 26,
    justifyContent : 'center',
  },
  contentContainerStyle : {
  }
})