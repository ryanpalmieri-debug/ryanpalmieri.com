import SectionHero from '../components/SectionHero'
import LogoBar from '../components/LogoBar'
import SectionAbout from '../components/SectionAbout'
import SectionProjects from '../components/SectionProjects'
import SectionServices from '../components/SectionServices'
import SectionContact from '../components/SectionContact'
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
    <main style={{ width: '100%', backgroundColor: 'var(--color-white)' }}>
      <SectionHero />
      <LogoBar />
      <SectionProjects works={works} />
      <SectionAbout />
      <SectionServices />
      <SectionContact />
    </main>
  )
}
