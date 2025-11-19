import './globals.css'

export const metadata = {
  title: 'Core Synergy - Reformer Pilates Milperra',
  description: 'Book your reformer pilates classes at Core Synergy, Milperra\'s premier pilates studio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
