import Nav from '../components/Nav'
import Hero from '../components/Hero'
import LogoBar from '../components/LogoBar'
import WorkGallery from '../components/WorkGallery'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="w-full">
        <Hero />
        <LogoBar />
        <WorkGallery />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
