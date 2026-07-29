'use client'

import { Header } from '@/components/Header'
import { Banner } from '@/components/Banner'
import { FeaturedProjects } from '@/components/FeaturedProjects'
import { Manifesto } from '@/components/Manifesto'
import { Services } from '@/components/Services'
import { Skills } from '@/components/Skills'
import { Works } from '@/components/Works'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Footer } from '@/components/Footer'
export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-background text-foreground">
        <Banner />
        <FeaturedProjects />
        <Manifesto />
        <Services />
        <Works />
        <Skills />
        <About />
        <Experience />
        <Footer />
      </main>
    </>
  )
}
