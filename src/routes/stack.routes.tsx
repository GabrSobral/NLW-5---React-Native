import React, { useEffect, useState } from 'react'

import { Welcome } from '../pages/Welcome'
import { UserIdentification } from '../pages/UserIdentification'
import { Confirmation } from '../pages/Confirmation'

import { createStackNavigator } from '@react-navigation/stack'

import colors from '../styles/colors'
import { PlantSave } from '../pages/PlantSave'
import { MyPlants } from '../pages/MyPlants'
import { AuthRoutes } from './tab.routes'
import { PlantDetails } from '../pages/PlantDetails'
import AsyncStorage from '@react-native-async-storage/async-storage'

const stackRoutes = createStackNavigator()

export function AppRoutes(){
  const [ username, setUsername ] = useState<string>()

  useEffect(()=> {
    async function getName(){
      const user = await AsyncStorage.getItem('@plantmanager:user')
      setUsername(user || '')
   }
   getName()
   console.log(username)
  },[])


  if(!username) {
    return (
      <stackRoutes.Navigator
        headerMode='none'
        screenOptions={{
          cardStyle : {
            backgroundColor : colors.white
          },
        }}
      >
          <stackRoutes.Screen
            name="Welcome"
            component={Welcome}
          />
          <stackRoutes.Screen
            name="UserIdentification"
            component={UserIdentification}
          />
          <stackRoutes.Screen
            name="Confirmation"
            component={Confirmation}
          />
      
          <stackRoutes.Screen 
            name="PlantSelect"
            component={AuthRoutes}
          />
          <stackRoutes.Screen 
            name="PlantSave"
            component={PlantSave}
          />
          <stackRoutes.Screen 
            name="MyPlants"
            component={AuthRoutes}
          />
          <stackRoutes.Screen 
            name="PlantDetails"
            component={PlantDetails}
          />

     </stackRoutes.Navigator>
    )
  }

  return(
      <stackRoutes.Navigator
          headerMode='none'
          screenOptions={{
            cardStyle : {
              backgroundColor : colors.white
            },
          }}
      >
    
        <stackRoutes.Screen 
          name="PlantSelect"
          component={AuthRoutes}
        />
        <stackRoutes.Screen 
          name="PlantSave"
          component={PlantSave}
        />
        <stackRoutes.Screen 
          name="MyPlants"
          component={AuthRoutes}
        />
        <stackRoutes.Screen 
          name="PlantDetails"
          component={PlantDetails}
        />
      </stackRoutes.Navigator>
  )
}
 