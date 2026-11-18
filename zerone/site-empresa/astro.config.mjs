import react from '@astrojs/react'
import { defineConfig } from 'astro/config'
import { profile } from './src/data/profile.js'

export default defineConfig({
  site: profile.siteUrl.replace(/\/$/, ''),
  output: 'static',
  integrations: [react()],
})
