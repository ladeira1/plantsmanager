import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, Text, FlatList, Alert } from 'react-native'
import { Header } from '../components/Header'
import colors from '../styles/colors'

import waterdrop from '../assets/waterdrop.png'
import { loadPlants, Plant, removePlant } from '../libs/storage'
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'
import { fonts } from '../styles/fonts'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { Loading } from '../components/Loading'
import { useNavigation } from '@react-navigation/core'

export function MyPlants() {
  const { navigate } = useNavigation()
  const [plants, setPlants] = useState<Plant[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [nextWater, setNextWater] = useState('')

  function handleRemovePlant(plant: Plant) {
    Alert.alert(
      'Remover',
      `Deseja remover ${plant.name}?`, 
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: async () => {
          try {
            await removePlant(String(plant.id))
            setPlants(oldState => oldState.filter(item => item.id !== plant.id))
          } catch (err) {
            Alert.alert('Não foi possível remover a planta')
          }
        }}
      ]
      )
  }

  useEffect(() => {
    async function loadStoragedPlants() {
      const storagedPlants = await loadPlants()
      if(!storagedPlants) navigate('PlantSelect')
      const nextWaterTime = formatDistance(
        new Date(storagedPlants[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      )

      setNextWater(`Não esqueça de regar a ${storagedPlants[0].name} em ${nextWaterTime}`)
      setPlants(storagedPlants)
      setIsLoading(false)
    }

    loadStoragedPlants()
  }, [])

  if(isLoading) return <Loading />

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWater}</Text>
      </View>      
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>
        <FlatList 
          data={plants}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <PlantCardSecondary data={item} onRemove={() => handleRemovePlant(item)} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }
})