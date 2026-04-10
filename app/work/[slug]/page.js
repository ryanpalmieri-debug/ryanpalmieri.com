import { works } from '../../../data/works'
import WorkDetail from '../../../components/WorkDetail'

export default function WorkPage({ params }) {
  const work = works.find(w => w.slug === params.slug)

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-lg">Project not found</p>
      </div>
    )
  }

  return <WorkDetail work={work} />
}

export function generateStaticParams() {
  return works.map(w => ({ slug: w.slug }))
}
