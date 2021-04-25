import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import colors from '../styles/colors'

import { Header } from '../components/Header'
import { fonts } from '../styles/fonts'
import { EnvironmentButton } from '../components/EnvironmentButton'
import { FlatList } from 'react-native-gesture-handler'
import { api } from '../services/api'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { Loading } from '../components/Loading'
import { useNavigation } from '@react-navigation/core'
import { Plant } from '../libs/storage'

interface Environment {
  key: string
  title: string
}

export function PlantSelect() {
  const { navigate } = useNavigation()
  const [isLoading, setIsLoading] = useState(true)

  const [environments, setEnvironments] = useState<Environment[]>([])
  const [environmentSelected, setEnvironmentSelected] = useState('all')
  const [plants, setPlants] = useState<Plant[]>([])
  const [filteredPlants, setFilterendPlants] = useState<Plant[]>([])

  const [page, setPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  function handleSelectEnvironment(environment: string) {
    setEnvironmentSelected(environment)

    if(environment === 'all') return setFilterendPlants(plants)

    const filtered = plants.filter(plant => plant.environments.includes(environment))
    setFilterendPlants(filtered)
  }

  async function fetchPlants() {
    const { data } = 
      await api.get<Plant[]>(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

    if(!data) return setIsLoading(true)

    if(page > 1) {
      setPlants(oldState => [...oldState, ...data])
      setFilterendPlants(oldState => [...oldState, ...data])
    } else {
      setPlants(data)
      setFilterendPlants(data)
    }
    
    setIsLoading(false)
    setIsLoadingMore(false)
  }

  function handleFetchMorePlants(distance: number) {
    if(distance < 1) return

    setIsLoadingMore(true)
    setPage(oldState => oldState + 1)
    fetchPlants()
  }

  function handlePlantSelect(plant: Plant) {
    navigate('PlantSave', { plant })
  }

  useEffect(() => {
    async function fetchEnvironments() {
      const { data } = await api.get<Environment[]>('plants_environments?_sort=title&_order=asc')
      setEnvironments([{ key: 'all', title: 'Todos' }, ...data])
    }

    fetchEnvironments()
  }, [])

  useEffect(() => { fetchPlants() }, [])

  if(isLoading) return <Loading />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>
          Em qual ambiente
        </Text>
        <Text style={styles.subtitle}>
          Você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList 
          data={environments} 
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnvironmentButton 
              title={item.title} 
              isActive={item.key === environmentSelected}
              onPress={() => handleSelectEnvironment(item.key)}
            />
          )} 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList 
          data={filteredPlants} 
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary data={item} onPress={() => handlePlantSelect(item)} />
          )} 
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleFetchMorePlants(distanceFromEnd)}
          ListFooterComponent={ isLoadingMore ? <ActivityIndicator color={colors.green}/>  : <></> }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 30
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.heading,
    lineHeight: 20,
    color: colors.heading,
    marginTop: 15
  },
  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    lineHeight: 20,
    color: colors.heading
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingLeft: 32,
    marginVertical: 32
  },
  plants: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32
  },
})