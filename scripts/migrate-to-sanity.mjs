/**
 * One-time migration: pushes all works from data/works.js into Sanity.
 * Run with: SANITY_TOKEN=your_token node scripts/migrate-to-sanity.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'k7b94oei',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const works = [
  { slug: 'samsung', title: 'Gaia x Samsung: The First Sovereign AI Phone', category: 'Strategy & Brand', client: 'Samsung / Gaia', year: '2024', role: 'Creative Strategist', summary: 'Repositioning on-device AI as a consumer sovereignty story — reframing the phone itself as the message.', featured: true },
  { slug: 'generosity', title: 'From Water to Data: Powering the Future of Intelligent Hydration', category: 'Campaigns & Partnerships', client: 'Generosity™', year: '2024', role: 'Campaign Director', summary: 'A partnership campaign connecting water infrastructure data to consumer health intelligence.', featured: false },
  { slug: 'hackathon', title: 'Agents of Change — The First Ever Autonomous Hackathon', category: 'Campaigns & Partnerships', client: 'Gaia', year: '2024', role: 'Executive Producer', summary: "Designing the world's first fully autonomous hackathon event — where AI agents competed alongside humans.", featured: true },
  { slug: 'dc-visionnaires', title: "DC's Visionnaires", category: 'Branded Content', client: 'DC', year: '2023', role: 'Director', summary: "A branded content series celebrating the next generation of visionary creators in DC's extended universe.", featured: false },
  { slug: 'verifiable-intelligence', title: 'Verifiable Intelligence: When AI Outputs Require Proof', category: 'Campaigns & Partnerships', client: 'Gaia', year: '2024', role: 'Creative Director', summary: 'A thought-leadership campaign redefining trust in AI systems through verifiable, on-chain proof of output.', featured: true },
  { slug: 'center-for-common-ground', title: 'Center for Common Ground', category: 'Branded Content', client: 'Center for Common Ground', year: '2022', role: 'Director', summary: 'A civic engagement campaign mobilizing underrepresented communities through authentic storytelling and film.', featured: false },
  { slug: 'kettle', title: 'Kettle Finance — Breaking Down Authentication', category: 'Branded Content', client: 'Kettle Finance', year: '2023', role: 'Creative Director', summary: 'Translating complex DeFi authentication concepts into approachable, human-centered branded content.', featured: false },
  { slug: 'syngenta', title: 'Feeding the Future — Innovation, Sustainability, and the Modern Farmer', category: 'Branded Content', client: 'Syngenta', year: '2023', role: 'Director & Producer', summary: 'A documentary-style branded series exploring how agricultural innovation is reshaping global food systems.', featured: true },
  { slug: 'contact-high', title: 'Contact High (Teaser)', category: 'Film & Production', client: 'Independent', year: '2023', role: 'Director', summary: 'A short film teaser exploring the visceral, kinetic energy of street culture and human connection.', featured: false },
  { slug: 'eth-anniversary', title: 'ETH Anniversary', category: 'Strategy & Brand', client: 'Ethereum Foundation', year: '2022', role: 'Creative Director', summary: "Commemorating Ethereum's anniversary through a brand campaign that honored the protocol's cultural impact.", featured: false },
  { slug: 'dc-daily', title: 'DC Daily', category: 'Branded Content', client: 'DC', year: '2022', role: 'Producer', summary: "Daily branded content production for DC's digital channels — building a consistent editorial voice for superfans.", featured: false },
]

async function migrate() {
  console.log(`Migrating ${works.length} works to Sanity...`)
  for (const work of works) {
    const doc = {
      _type: 'work',
      title: work.title,
      slug: { _type: 'slug', current: work.slug },
      featured: work.featured,
      category: work.category,
      client: work.client,
      year: work.year,
      role: work.role,
      summary: work.summary,
    }
    try {
      await client.create(doc)
      console.log(`  ✓ ${work.title}`)
    } catch (e) {
      console.error(`  ✗ ${work.title}: ${e.message}`)
    }
  }
  console.log('\nDone! Add thumbnails in the Sanity Studio at ryanpalmieri.com/studio')
}

migrate()
