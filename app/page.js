import Nav from '../components/Nav'
import Hero from '../components/Hero'
import WorkGrid from '../components/WorkGrid'
import About from '../components/About'
import Collaborators from '../components/Collaborators'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WorkGrid />
        <About />
        <Collaborators />
      </main>
      <Footer />
    </>
  )
}
