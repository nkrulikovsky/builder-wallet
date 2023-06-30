import { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Builder Mobile App',
  description:
    'All your Builder Daos in the pocket. Track proposals and auctions. Vote and bid.',
  openGraph: {
    url: 'https://builderapp.wtf',
    images: 'https://builderapp.wtf/img/og-image.png',
    title: 'Builder Mobile App',
    description:
      'All your Builder Daos in the pocket. Track proposals and auctions. Vote and bid.'
  },
  twitter: {
    title: 'Builder Mobile App',
    description:
      'All your Builder Daos in the pocket. Track proposals and auctions. Vote and bid.',
    card: 'summary_large_image',
    creator: '@iamng_eth',
    images: ['https://builderapp.wtf/img/og-image.png']
  },
  themeColor: 'white',
  appLinks: {
    // ios: {
    //   url: 'https://nextjs.org/ios',
    //   app_store_id: 'app_store_id',
    // },
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
