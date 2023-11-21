import { Inter } from 'next/font/google'
import './globals.css'
import ThemeRegistry from '../../theme/ThemeRegistry'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Intelligent Course Management System',
  description: 'Intelligent Course Management System',
  //image to /image/hku-logo.png
  image: '/image/hku-logo.png',
}
// theme
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeRegistry>
      <body className={inter.className}>{children}</body>
      </ThemeRegistry>
    </html>
  )
}
