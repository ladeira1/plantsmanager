import React from 'react'
import { SafeAreaView, Text, Image, StyleSheet, Platform, Dimensions, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'


import colors from '../styles/colors'
import wateringImg from '../assets/watering.png'
import { fonts } from '../styles/fonts'

export function Welcome() {
  const { navigate } = useNavigation()

  function handleButtonPress() {
    navigate('UserIdentification')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'}
          suas plantas de {'\n'} 
          forma fácil
        </Text>
        <Image source={wateringImg} style={styles.image} resizeMode="contain" />
        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas.
          Nós cuidamos de lembrar sempre que você precisar.
        </Text>
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.7} 
          onPress={handleButtonPress}
        >
        <Feather name="chevron-right" style={styles.buttonIcon} />
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.heading,
    lineHeight: 38,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38
  },
  image: {
    height: Dimensions.get('window').width * 0.7
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.text,
    color: colors.heading,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56
  },
  buttonIcon: {
    fontSize: 32,
    color: colors.white,
  }
})