import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import { fonts } from '../styles/fonts'

export function UserIdentification() {
  const { navigate } = useNavigation()

  const [isInputFocusedOrFilled, setIsInputFocusedOrFilled] = useState(false)
  const [name, setName] = useState('')

  function handleInputFocus() {
    setIsInputFocusedOrFilled(true)
  }

  function handleInputBlur() {
    if(name === '') setIsInputFocusedOrFilled(false)
  }

  function handleInputTextChange(text: string) {
    setName(text)
  }

  async function handleSubmit() {
    if(!name || name === '') return Alert.alert('Por favor, me informe o seu nome') 
   
    try {
      await AsyncStorage.setItem('@plantmanager:username', name)
      navigate('Confirmation', {
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidas das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect'
      })
    } catch {
      Alert.alert('Não foi possível salvar o seu nome')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios'? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.form}>
            <View style={styles.formWrapper}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  {name !== ''? '😄' : '😀'}
                </Text>
                <Text style={styles.title}>
                  Como podemos {'\n'} 
                  chamar você?
                </Text>
              </View>
              <TextInput 
                style={[styles.input, isInputFocusedOrFilled && styles.inputFocused]} 
                placeholder="Digite seu nome" 
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={name}
                onChangeText={handleInputTextChange}
              />
            </View>
            <View style={styles.footer}>
              <Button text="Começar" onPress={handleSubmit} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 54,
  },
  formWrapper: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center'
  },
  emoji: {
    fontSize: 34
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 32,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    fontSize: 18,
    fontFamily: fonts.text,
    color: colors.heading,
    textAlign: 'center'
  },
  inputFocused: {
    borderColor: colors.green
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 15
  }
})