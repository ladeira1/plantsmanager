import { useNavigation, useRoute } from '@react-navigation/core'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import { fonts } from '../styles/fonts'

interface ConfirmationParams {
  title: string
  subtitle: string
  buttonTitle: string
  icon: 'smile' | 'hug'
  nextScreen: string
}

const emojis = {
  hug: '🤗',
  smile: '😄'
}

export function Confirmation() {
  const { navigate } = useNavigation()
  const routes = useRoute()
  const { title, subtitle, buttonTitle, icon, nextScreen } = routes.params as ConfirmationParams

  function handleButtonPress() {
    navigate(nextScreen)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          {emojis[icon]}
        </Text>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
          <View style={styles.footer}>
          <Button text={buttonTitle} onPress={handleButtonPress} />
        </View>
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',

  },
  emoji: {
    fontSize: 72
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 38,
    textAlign: 'center',
    marginTop: 15
  },
  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    color: colors.heading,
    textAlign: 'center',
    paddingVertical: 20
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20
  }
})