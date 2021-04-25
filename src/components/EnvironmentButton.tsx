import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../styles/colors'
import { fonts } from '../styles/fonts'

interface EnvironmentButtonProps extends RectButtonProps {
  title: string
  isActive?: boolean
}

export function EnvironmentButton({ 
  title, 
  isActive = false,
  ...rest
}: EnvironmentButtonProps) {
  return (
    <RectButton 
    style={[styles.container, isActive && styles.activeContainer]} 
    {...rest}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>
        {title}
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 76,
    backgroundColor: colors.shape,
    borderRadius: 12,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: fonts.text,
    color: colors.heading,
  },
  activeContainer: {
     backgroundColor: colors.green_light
  },
  activeText: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  }
})