import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import colors from '../styles/colors'
import { fonts } from '../styles/fonts'

export function Header() {
  const [name, setName] = useState('')

  useEffect(() => {
    async function getUserNameFromStorage() {
      const storagedName = await AsyncStorage.getItem('@plantmanager:username')
      if(!storagedName) return

      setName(storagedName)
    }

    getUserNameFromStorage()
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greetings}>Olá,</Text>
        <Text style={styles.name}>{name?? ''}</Text>
      </View>
      <Image source={{uri: 'https://github.com/ladeira1.png'}} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: getStatusBarHeight(),
    backgroundColor: colors.background
  },
  greetings: {
    fontSize: 32,
    fontFamily: fonts.text,
    lineHeight: 40,
    color: colors.heading
  },
  name: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: fonts.heading,
    color: colors.heading
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 40
  }
})