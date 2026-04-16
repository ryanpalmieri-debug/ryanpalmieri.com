import './globals.css'

export const metadata = {
  title: 'Ryan Palmieri — Brand Strategist & Creative Director',
  description: 'Brand strategist, marketing leader, and creative director at the intersection of culture and emerging tech.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-black w-full min-h-screen overflow-x-hidden flex flex-col">
        {children}
      </body>
    </html>
  )
}
