/**
 * Framer CMS → JSON
 * Runs before every build (via "prebuild" in package.json).
 * Fetches all Portfolio items from Framer and writes data/cms-data.json.
 */

import { connect } from 'framer-api'
import { writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_PATH = join(__dirname, '../data/cms-data.json')

// Field ID → readable name map (matches your Framer Portfolio collection)
const FIELDS = {
  pt0tcowpZ: 'title',
  cQt0gVzvJ: 'category',
  HxbBFQImD: 'thumbnail',
  sX9sOymo7: 'description',
  RZN7HYjWO: 'year',
  yaesiy_HB: 'client',
  ms6yzWiba: 'website',
  ukUtdRLh8: 'featured',
  ksKDi_8qE: 'date',
  VHm1teIXh: 'summary',
  AhUjtestR: 'role',
  kT2_UXGrQ: 'videoUrl',
  XEWHGhpkS: 'image1',
  iwaeI3t7j: 'image2',
  TSC8U5o_y: 'image3',
}

function extractValue(fieldData) {
  if (!fieldData) return null
  const { type, value } = fieldData
  if (type === 'image') return value?.url ?? null
  if (type === 'link') return value?.url ?? value ?? null
  if (type === 'boolean') return value ?? false
  if (type === 'formattedText') return value ?? null
  return value ?? null
}

async function main() {
  const apiKey = process.env.FRAMER_API_KEY
  const projectId = process.env.FRAMER_PROJECT_ID || 'ZrOrjeQvsqihCssDxY2F'

  if (!apiKey) {
    console.error('❌  FRAMER_API_KEY env var is not set.')
    process.exit(1)
  }

  console.log('🔄  Connecting to Framer CMS...')

  const framer = await connect(
    `https://framer.com/projects/${projectId}`,
    apiKey
  )

  const collections = await framer.getCollections()
  const portfolio = collections.find(c => c.name === 'Portfolio')

  if (!portfolio) {
    console.error('❌  Could not find "Portfolio" collection.')
    await framer.disconnect()
    process.exit(1)
  }

  const items = await portfolio.getItems()
  console.log(`✅  Found ${items.length} items in Portfolio`)

  const works = items.map(item => {
    const mapped = { id: item.id, slug: item.slug }
    for (const [fieldId, key] of Object.entries(FIELDS)) {
      mapped[key] = extractValue(item.fieldData?.[fieldId])
    }
    return mapped
  })

  // Sort: featured first, then by year desc
  works.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return (b.year || '').localeCompare(a.year || '')
  })

  mkdirSync(dirname(OUT_PATH), { recursive: true })
  writeFileSync(OUT_PATH, JSON.stringify(works, null, 2))
  console.log(`📄  Written to data/cms-data.json (${works.length} items)`)

  await framer.disconnect()
  console.log('✨  Done.')
}

main().catch(err => {
  console.error('❌  fetch-cms failed:', err.message)
  process.exit(1)
})
