import { client } from '../../../lib/sanity/client'
import { workBySlugQuery } from '../../../lib/sanity/queries'
import { works as staticWorks } from '../../../data/works'
import WorkDetail from '../../../components/WorkDetail'

export const revalidate = 60

async function getWork(slug) {
  try {
    const data = await client.fetch(workBySlugQuery, { slug })
    if (data) return data
  } catch {}
  return staticWorks.find(w => w.slug === slug) || null
}

export default async function WorkPage({ params }) {
  const work = await getWork(params.slug)

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-lg">Project not found</p>
      </div>
    )
  }

  return <WorkDetail work={work} />
}
