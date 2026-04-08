/**
 * Sanity Studio embedded at /studio
 * Login with your Sanity account to manage content.
 */
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
