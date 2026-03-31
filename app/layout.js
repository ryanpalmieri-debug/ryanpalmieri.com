import './globals.css'

export const metadata = {
  title: 'Ryan Palmieri — Creative Director',
  description: 'Creative director, producer, and strategist working at the intersection of culture, brand, and film.',
  openGraph: {
    title: 'Ryan Palmieri — Creative Director',
    description: 'Creative director, producer, and strategist working at the intersection of culture, brand, and film.',
    url: 'https://ryanpalmieri.com',
    siteName: 'Ryan Palmieri',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
