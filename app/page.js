import Nav from '../components/staging/Nav'
import Hero from '../components/staging/Hero'
import About from '../components/staging/About'
import LogoBar from '../components/staging/LogoBar'
import SelectedWork from '../components/staging/SelectedWork'
import Disciplines from '../components/staging/Disciplines'
import Process from '../components/staging/Process'
import FAQ from '../components/staging/FAQ'
import Footer from '../components/staging/Footer'
import { client } from '../lib/sanity/client'
import { worksQuery } from '../lib/sanity/queries'
import { works as staticWorks } from '../data/works'

export const revalidate = 10

async function getWorks() {
  try {
    const data = await client.fetch(worksQuery)
    return data && data.length > 0 ? data : staticWorks
  } catch {
    return staticWorks
  }
}

export default async function Home() {
  const works = await getWorks()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <LogoBar />
        <SelectedWork works={works} />
        <Disciplines />
        <Process />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
