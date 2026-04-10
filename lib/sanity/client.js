import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'k7b94oei',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // fresh data every time
})
