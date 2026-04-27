import SectionHero from '../components/SectionHero'
import SectionAbout from '../components/SectionAbout'
import LogoBar from '../components/LogoBar'
import SectionProjects from '../components/SectionProjects'
import SectionDisciplines from '../components/SectionDisciplines'
import SectionProcess from '../components/SectionProcess'
import SectionFAQs from '../components/SectionFAQs'
import FadeIn from '../components/FadeIn'
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
    <main style={{ width: '100%', backgroundColor: 'var(--auvra-bg)' }}>
      <FadeIn><SectionHero /></FadeIn>
      <FadeIn><SectionAbout /></FadeIn>
      <FadeIn><LogoBar /></FadeIn>
      <FadeIn><SectionProjects works={works} /></FadeIn>
      <FadeIn><SectionDisciplines /></FadeIn>
      <FadeIn><SectionProcess /></FadeIn>
      <FadeIn><SectionFAQs /></FadeIn>
    </main>
  )
}
