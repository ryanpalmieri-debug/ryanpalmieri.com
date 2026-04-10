import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import WorkGridV2 from '../../components/work-v2/WorkGridV2'
import { client } from '../../lib/sanity/client'
import { worksQuery } from '../../lib/sanity/queries'
import { works as staticWorks } from '../../data/works'

export const revalidate = 10

async function getWorks() {
  try {
    const data = await client.fetch(worksQuery)
    return data && data.length > 0 ? data : staticWorks
  } catch {
    return staticWorks
  }
}

export default async function WorkV2Page() {
  const works = await getWorks()

  return (
    <>
      <Nav />
      <main>
        <WorkGridV2 works={works} />
      </main>
      <Footer />
    </>
  )
}
