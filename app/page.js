import Nav from '../components/Nav'
import Hero from '../components/Hero'
import WorkGrid from '../components/WorkGrid'
import About from '../components/About'
import ImageStrip from '../components/ImageStrip'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WorkGrid />
        <About />
        <ImageStrip />
      </main>
      <Footer />
    </>
  )
}
