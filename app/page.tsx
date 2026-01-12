import CoinOverview from '@/components/home/CoinOverview'
import TrendingCoin from '@/components/home/TrendingCoin'
import React, { Suspense } from 'react'

const  page=() =>{
  return (
    <main className='main-container'>
      <section className='home-grid'></section>
      <Suspense fallback={<div>Loading Overview...</div>}>
      <CoinOverview/>
      </Suspense>
      <Suspense fallback={<div>Loading trending...</div>}>
           <TrendingCoin/>
      </Suspense>
      <section className='w-full mt-7 space-y-4'>
        <p>Categories</p>
      </section>
    </main>
  )
}

export default page
