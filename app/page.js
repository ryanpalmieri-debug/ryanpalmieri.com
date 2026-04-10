import Nav from '../components/Nav'
import Hero from '../components/Hero'
import About from '../components/About'
import WorkGrid from '../components/WorkGrid'
import Services from '../components/Services'
import Footer from '../components/Footer'
import { works } from '../data/works'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <WorkGrid works={works} />
        <Services />
      </main>
      <Footer />
    </>
  )
}
