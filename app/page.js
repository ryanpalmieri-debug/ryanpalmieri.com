import { existsSync } from 'fs'
import { join } from 'path'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import LogoBar from '../components/LogoBar'
import WorkGallery from '../components/WorkGallery'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { works as fallbackWorks } from '../data/works'

async function getWorks() {
  const cmsPath = join(process.cwd(), 'data/cms-data.json')
  if (existsSync(cmsPath)) {
    const data = await import('../data/cms-data.json', { assert: { type: 'json' } })
    return data.default
  }
  return fallbackWorks
}

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
