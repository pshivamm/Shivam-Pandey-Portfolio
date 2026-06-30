'use client'

import { Header } from '@/components/Header'
import { Banner } from '@/components/Banner'
import { Works } from '@/components/Works'
import { About } from '@/components/About'
import { Footer } from '@/components/Footer'
import { CustomCursor } from '@/components/CustomCursor'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main className="bg-background text-foreground">
        <Banner />
        <Works />
        <About />
        <Footer />
      </main>
    </>
  )
}
