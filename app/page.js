import Hero from '../components/Hero'
import LogoBar from '../components/LogoBar'
import FeaturedWork from '../components/FeaturedWork'
import AboutBlock from '../components/AboutBlock'
import ContactBlock from '../components/ContactBlock'
import { works as staticWorks } from '../data/works'
import { client } from '../lib/sanity/client'
import { worksQuery } from '../lib/sanity/queries'

export const revalidate = 10

async function getWorks() {
  try {
    const data = await client.fetch(worksQuery)
    return data?.length > 0 ? data : staticWorks
  } catch { return staticWorks }
}

export default async function HomePage() {
  const works = await getWorks()

  return (
    <main>
      <Hero />
      <LogoBar />
      <FeaturedWork works={works} />
      <AboutBlock />
      <ContactBlock />
    </main>
  )
}
