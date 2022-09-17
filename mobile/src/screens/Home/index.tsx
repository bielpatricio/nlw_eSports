import { useNavigation } from '@react-navigation/native'
import { useEffect, useState, useCallback } from 'react'
import { Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import logoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background'
import { GameCard, GameCardProps } from '../../components/GameCard'
import { Heading } from '../../components/Heading'
import { api } from '../../lib/axios'

import { styles } from './styles'

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])

  const updateListGames = useCallback(async () => {
    const response = await api.get(`/games`)
    setGames(response.data)
  }, [])

  useEffect(() => {
    updateListGames()
    // fetch('http://192.168.0.30:3333/games').then((response) =>
    //   response.json().then((data) => console.log(data)),
    // )
  }, [updateListGames])

  const navigation = useNavigation()

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl })
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard onPress={() => handleOpenGame(item)} data={item} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  )
}
