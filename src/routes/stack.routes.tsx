import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import colors from '../styles/colors'

import { Welcome } from '../pages/Welcome'
import { UserIdentification } from '../pages/UserIdentification'
import { Confirmation } from '../pages/Confirmation'
import { PlantSave } from '../pages/PlantSave'
import { MyPlants } from '../pages/MyPlants'
import { AuthRoutes } from './tabs.routes'

const Stack = createStackNavigator()

export const AppRoutes: FC = () => (
  <Stack.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: { backgroundColor: colors.white }
    }}
  >
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="UserIdentification" component={UserIdentification} />
    <Stack.Screen name="Confirmation" component={Confirmation} />
    <Stack.Screen name="PlantSelect" component={AuthRoutes} />
    <Stack.Screen name="PlantSave" component={PlantSave} />
    <Stack.Screen name="MyPlants" component={AuthRoutes} />
  </Stack.Navigator>
) 