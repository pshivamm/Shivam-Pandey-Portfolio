'use client'

import { Header } from '@/components/Header'
import { Banner } from '@/components/Banner'
import { Manifesto } from '@/components/Manifesto'
import { Skills } from '@/components/Skills'
import { Works } from '@/components/Works'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Footer } from '@/components/Footer'
import { CustomCursor } from '@/components/CustomCursor'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main className="bg-background text-foreground">
        <Banner />
        <Manifesto />
        <Works />
        <Skills />
        <About />
        <Experience />
        <Footer />
      </main>
    </>
  )
}
