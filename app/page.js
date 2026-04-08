import Nav from '../components/Nav'
import Hero from '../components/Hero'
import About from '../components/About'
import WorkGrid from '../components/WorkGrid'
import Services from '../components/Services'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <WorkGrid />
        <Services />
      </main>
      <Footer />
    </>
  )
}
