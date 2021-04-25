import React from 'react'
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost'
import AppLoading from 'expo-app-loading'

import { Routes } from './src/routes'

export default function App() {
  const [areFontsLoaded] = useFonts({ Jost_400Regular, Jost_600SemiBold })

  if(!areFontsLoaded) return <AppLoading />

  return (
    <>
      <Routes />
    </>
  )
}