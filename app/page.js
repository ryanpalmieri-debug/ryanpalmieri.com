import Nav from '../components/Nav'
import Hero from '../components/Hero'
import LogoBar from '../components/LogoBar'
import WorkGallery from '../components/WorkGallery'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { client } from '../lib/sanity/client'
import { worksQuery } from '../lib/sanity/queries'
import { works as fallbackWorks } from '../data/works'

async function getWorks() {
  try {
    const works = await client.fetch(worksQuery)
    if (works && works.length > 0) return works
  } catch (e) {
    console.warn('Sanity fetch failed, using static fallback:', e.message)
  }
  return fallbackWorks
}

export const revalidate = 60 // Revalidate every 60s

export default async function Home() {
  const works = await getWorks()
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <Nav />
      <main>
        <Hero />
        <LogoBar />
        <WorkGallery works={works} />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
