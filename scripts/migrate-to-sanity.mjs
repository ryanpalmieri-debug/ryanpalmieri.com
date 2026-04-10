// Migration: wipes old work documents in Sanity, uploads thumbnails,
// and recreates all projects from data/works.js
// Run with: SANITY_TOKEN=xxx node scripts/migrate-to-sanity.mjs

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { works } from '../data/works.js'

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('Missing SANITY_TOKEN env var')
  process.exit(1)
}

const client = createClient({
  projectId: 'k7b94oei',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function uploadImage(relativePath) {
  const fullPath = path.join('public', relativePath)
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠ Missing: ${fullPath}`)
    return null
  }
  const buffer = fs.readFileSync(fullPath)
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(relativePath),
  })
  return asset._id
}

async function migrate() {
  console.log('🗑  Deleting all existing work documents...')
  const existing = await client.fetch(`*[_type == "work"]._id`)
  for (const id of existing) {
    await client.delete(id)
  }
  console.log(`   Deleted ${existing.length} existing documents.`)

  console.log(`\n📤 Uploading ${works.length} projects...`)

  for (const [index, w] of works.entries()) {
    console.log(`\n[${index + 1}/${works.length}] ${w.title}`)

    const thumbAssetId = await uploadImage(w.thumbnail)
    if (!thumbAssetId) {
      console.log(`  ⏭ Skipping (no thumbnail)`)
      continue
    }

    const galleryAssetIds = []
    if (w.images && w.images.length > 0) {
      for (const img of w.images) {
        const id = await uploadImage(img)
        if (id) galleryAssetIds.push(id)
      }
    }

    const doc = {
      _type: 'work',
      _id: `work-${w.slug}`,
      title: w.title,
      slug: { _type: 'slug', current: w.slug },
      featured: w.featured || false,
      order: index + 1,
      category: w.category,
      client: w.client || '',
      year: w.year || '',
      role: w.role || '',
      summary: w.summary || '',
      thumbnail: {
        _type: 'image',
        asset: { _type: 'reference', _ref: thumbAssetId },
      },
      ...(galleryAssetIds.length > 0 && {
        images: galleryAssetIds.map((id, i) => ({
          _type: 'image',
          _key: `img-${i}-${id.slice(-6)}`,
          asset: { _type: 'reference', _ref: id },
        })),
      }),
      ...(w.videoUrl && { videoUrl: w.videoUrl }),
      ...(w.link && { link: w.link }),
      ...(w.body && {
        body: w.body.split('\n\n').filter(Boolean).map((para, i) => ({
          _type: 'block',
          _key: `blk-${i}`,
          style: 'normal',
          markDefs: [],
          children: [{ _type: 'span', _key: `sp-${i}`, text: para.trim(), marks: [] }],
        })),
      }),
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ Uploaded with ${galleryAssetIds.length > 0 ? `${galleryAssetIds.length} gallery images` : 'thumbnail only'}`)
  }

  console.log(`\n✅ Done. ${works.length} projects live in Sanity.`)
}

migrate().catch((err) => {
  console.error(err)
  process.exit(1)
})
