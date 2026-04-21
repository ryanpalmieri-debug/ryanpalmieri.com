import './globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Ryan Palmieri — Head of Marketing',
  description: 'Head of Marketing specializing in AI infrastructure, Web3, and frontier tech. Based in Los Angeles.',
  openGraph: {
    title: 'Ryan Palmieri — Head of Marketing',
    description: 'Head of Marketing specializing in AI infrastructure, Web3, and frontier tech. Based in Los Angeles.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
