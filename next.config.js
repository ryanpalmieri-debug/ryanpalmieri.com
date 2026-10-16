/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'cdn.sanity.io',
    ],
  },
  async rewrites() {
    return {
      // Preview of the v2 homepage: serve the static page at the site root.
      beforeFiles: [{ source: '/', destination: '/v2/index.html' }],
    }
  },
}

module.exports = nextConfig
