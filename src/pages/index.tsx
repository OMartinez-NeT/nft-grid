import Image from 'next/image'
import { promises as fs } from 'fs'
import path from 'path'

import { Inter } from 'next/font/google'
import SearchBar from '@/components/SearchBar'
import NftGrid from '@/components/NftGrid'

import { useState } from 'react'
import NftContext from '@/contexts/NftContext'
const inter = Inter({ subsets: ['latin'] })

export default function Home(props: any) {
  const [searchText, setSearchText] = useState('')

  return (
    <main
      className={`flex min-h-screen flex-col items-center  p-24 ${inter.className}`}
    >
      <NftContext.Provider value={{
    searchText,
    setSearchText
  }}>
      <SearchBar />
      <NftGrid nfts={props.results}/>
  </NftContext.Provider>
    </main>
  )
}

export const getStaticProps = async () => {
  const dir = path.join(process.cwd(), 'src/data/data1.json')
  const response = JSON.parse(await fs.readFile(dir, 'utf-8'))
  return {
    props: {
      ...response
    },
  }
}
