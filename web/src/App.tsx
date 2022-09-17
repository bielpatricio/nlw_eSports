import './styles/main.css'

import logoImg from './assets/Logo.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useCallback, useEffect, useState } from 'react'
import { api } from './lib/axios'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModal } from './components/CreateAdModal'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

export function App() {
  const [games, setGames] = useState<Game[]>([])

  // async function updateListGames() {
  //   const response = await api.get('/games')
  //   setGames(response.data)
  //   console.log(response.data)
  // }

  // useEffect(() => {
  //   updateListGames()
  // }, [])
  const updateListGames = useCallback(async () => {
    const response = await api.get('/games')
    setGames(response.data)
  }, [])
  // console.log(games)

  useEffect(() => {
    updateListGames()
  }, [updateListGames])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{' '}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}
