import './globals.css'

export const metadata = {
  title: 'Ryan Palmieri — Creative Director',
  description: 'Creative director, producer, and strategist working at the intersection of culture, brand, and film.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://unpkg.com/@phosphor-icons/web" defer></script>
      </head>
      <body className="bg-white text-black w-full min-h-screen overflow-x-hidden flex flex-col">
        {children}
      </body>
    </html>
  )
}
