import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View, ScrollView, Image, Platform, TouchableOpacity } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { SvgFromUri } from 'react-native-svg'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'

import waterdrop from '../assets/waterdrop.png'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import { fonts } from '../styles/fonts'
import { format, isBefore } from 'date-fns'
import { Plant, savePlant } from '../libs/storage'

interface RouteProps {
  plant: Plant
}

export function PlantSave() {
  const { navigate } = useNavigation()
  const route = useRoute()
  const { plant } = route.params as RouteProps

  const [selectedDateTime, setSelectedDateTime] = useState(new Date())
  const [isDatePickerShown, setIsDatePickerShown] = useState(Platform.OS === 'ios')

  function handleChangeTime(event: Event, dateTime?: Date) {
    if(Platform.OS === 'android') setIsDatePickerShown(oldState => !oldState)
    if(!dateTime) return
    if(dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date())
      return Alert.alert('O horário selecionado não pode ser anterior ao atual.')
    }

    setSelectedDateTime(dateTime)
  }

  function handleOpenDateTimePickerForAndroid() {
    setIsDatePickerShown(oldState => !oldState)
  }
  
  async function handleSavePlant() {
    try {
      await savePlant({ ...plant, dateTimeNotification: selectedDateTime })
      navigate('Confirmation', {
        title: 'Tudo certo!',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito carinho.',
        buttonTitle: 'Muito obrigado!',
        icon: 'hug',
        nextScreen: 'MyPlants'
      })
    } catch (err) {
      Alert.alert(`Não foi possível salvar a planta devido ao erro ${err}`)
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View style={styles.plantInfo}> 
          <SvgFromUri uri={plant.photo} height={150} width={150} />
          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.plantDetails}>{plant.about}</Text>
        </View>
        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image source={waterdrop} style={styles.tipImage} />
            <Text style={styles.tipText}>{plant.water_tips}</Text>
          </View>
          <Text style={styles.alertLabel}>Escolha o melhor horário para ser lembrado:</Text>

          {isDatePickerShown && ( 
            <DateTimePicker 
              value={selectedDateTime} 
              onChange={handleChangeTime} 
              mode="time" 
              display="spinner" 
            />
          )}
          {Platform.OS === 'android' && (
            <TouchableOpacity 
              style={styles.dateTimePickerButton} 
              onPress={handleOpenDateTimePickerForAndroid}
            >
              <Text style={styles.dateTimePickerText}>
                {`${format(selectedDateTime, 'HH:mm')}`}
              </Text>
            </TouchableOpacity>
          )}

          <Button text="Cadastrar planta" onPress={handleSavePlant} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },
  plantInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  plantName: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 15
  },
  plantDetails: {
    fontSize: 17,
    fontFamily: fonts.text,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 10,
  },
  controller: {
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
    paddingHorizontal: 20,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 70,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    fontSize: 17,
    fontFamily: fonts.text,
    textAlign: 'justify',
    color: colors.blue,
    marginLeft: 20,
  },
  alertLabel: {
    fontSize: 12,
    fontFamily: fonts.complement,
    textAlign: 'center',
    color: colors.heading,
    marginBottom: 5,
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30
  },
  dateTimePickerText: {
    fontSize: 32,
    fontFamily: fonts.text,
    color: colors.heading
  }
})