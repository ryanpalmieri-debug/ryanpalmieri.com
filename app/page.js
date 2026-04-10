import Nav from '../components/Nav'
import Hero from '../components/Hero'
import About from '../components/About'
import WorkGrid from '../components/WorkGrid'
import Services from '../components/Services'
import Footer from '../components/Footer'
import { client } from '../lib/sanity/client'
import { worksQuery } from '../lib/sanity/queries'
import { works as staticWorks } from '../data/works'

export const revalidate = 60

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
        <WorkGrid works={works} />
        <Services />
      </main>
      <Footer />
    </>
  )
}
