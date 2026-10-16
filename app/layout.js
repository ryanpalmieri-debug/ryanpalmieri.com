import './globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Ryan Palmieri — Brand, Marketing & Creative Leader | AI & Frontier Tech',
  description: 'Senior brand and marketing leader combining go-to-market, creative direction and AI-native marketing systems for frontier technology companies.',
  openGraph: {
    title: 'Ryan Palmieri — Brand, Marketing & Creative Leadership',
    description: 'Brand strategy, go-to-market, creative direction and AI-native marketing systems for the Machine Age.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <div style={{ paddingTop: 'var(--nav-h)' }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
