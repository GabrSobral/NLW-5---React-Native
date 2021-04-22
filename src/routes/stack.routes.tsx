import React from 'react'

import { Welcome } from '../pages/Welcome'
import { UserIdentification } from '../pages/UserIdentification'
import { Confirmation } from '../pages/Confirmation'
import { PlantSelect } from '../pages/PlantSelect'

import { createStackNavigator } from '@react-navigation/stack'

import colors from '../styles/colors'

const stackRoutes = createStackNavigator()

export const AppRoutes : React.FC = () => (
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
      component={PlantSelect}
    />
  </stackRoutes.Navigator>
)