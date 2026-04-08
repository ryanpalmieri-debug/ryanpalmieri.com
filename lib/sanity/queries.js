import { groq } from 'next-sanity'

export const worksQuery = groq`
  *[_type == "work"] | order(featured desc, year desc) {
    _id,
    title,
    "slug": slug.current,
    featured,
    category,
    client,
    year,
    role,
    summary,
    "thumbnail": thumbnail.asset->url,
    "images": images[].asset->url,
    videoUrl,
    link
  }
`
