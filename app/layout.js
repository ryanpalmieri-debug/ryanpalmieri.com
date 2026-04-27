import './globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Ryan Palmieri — Head of Marketing',
  description: 'Senior marketing leader and brand strategist. AI infrastructure, Web3, and frontier tech. Based in Los Angeles.',
  openGraph: {
    title: 'Ryan Palmieri — Head of Marketing',
    description: 'Senior marketing leader and brand strategist. AI infrastructure, Web3, and frontier tech.',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
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
