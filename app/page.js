import NavStaging from '../components/staging/NavStaging'
import HeroStaging from '../components/staging/HeroStaging'
import Marquee from '../components/staging/Marquee'
import FeaturedGrid from '../components/staging/FeaturedGrid'
import FooterStaging from '../components/staging/FooterStaging'
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
      <NavStaging />
      <main className="pt-[56px]">
        <HeroStaging />
        <Marquee />
        <FeaturedGrid works={works} />
      </main>
      <FooterStaging />
    </>
  )
}
