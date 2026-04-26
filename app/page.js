import SectionHero from '../components/SectionHero'
import SectionAbout from '../components/SectionAbout'
import SectionProjects from '../components/SectionProjects'
import SectionServices from '../components/SectionServices'
import SectionProcess from '../components/SectionProcess'
import SectionFAQs from '../components/SectionFAQs'
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
      <SectionAbout />
      <SectionProjects works={works} />
      <SectionServices />
      <SectionProcess />
      <SectionFAQs />
      <SectionContact />
    </main>
  )
}
