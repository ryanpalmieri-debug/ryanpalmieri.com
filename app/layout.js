import './globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Ryan Palmieri — Head of Marketing',
  description: 'Head of Marketing specializing in AI infrastructure, Web3, and frontier tech. Based in Los Angeles.',
  openGraph: {
    title: 'Ryan Palmieri — Head of Marketing',
    description: 'Head of Marketing specializing in AI infrastructure, Web3, and frontier tech.',
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
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <span className="page-edge page-edge--left" aria-hidden="true" />
        <span className="page-edge page-edge--right" aria-hidden="true" />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
