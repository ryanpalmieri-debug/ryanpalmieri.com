import SectionHero from '../components/SectionHero'
import LogoBar from '../components/LogoBar'
import SectionAbout from '../components/SectionAbout'
import SectionProjects from '../components/SectionProjects'
import SectionContact from '../components/SectionContact'
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

function Divider() {
  return (
    <div className="kanso-divider"><hr /></div>
  )
}

export default async function HomePage() {
  const works = await getWorks()
  return (
    <main style={{ width: '100%', backgroundColor: 'var(--color-white)' }}>
      <FadeIn><SectionHero /></FadeIn>
      <FadeIn><LogoBar /></FadeIn>
      <Divider />
      <FadeIn><SectionProjects works={works} /></FadeIn>
      <Divider />
      <FadeIn><SectionAbout /></FadeIn>
      <Divider />
      <FadeIn><SectionContact /></FadeIn>
    </main>
  )
}
