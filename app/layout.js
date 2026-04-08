import './globals.css'
import Cursor from '../components/Cursor'

export const metadata = {
  title: 'Ryan Palmieri — Creative Director',
  description: 'Creative director, producer, and strategist working at the intersection of culture, brand, and film.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  )
}
