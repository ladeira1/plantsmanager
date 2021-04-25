import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './stack.routes'

export const Routes: FC = () => (
  <NavigationContainer>
    <AppRoutes />
  </NavigationContainer>
)