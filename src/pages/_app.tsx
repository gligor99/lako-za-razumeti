import { AppProps } from 'next/app'
import { Inter, Open_Sans, Roboto, Source_Sans_Pro } from '@next/font/google'
import '@/styles/globals.css'

const inter = Source_Sans_Pro({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '600', '700'],
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}
export default MyApp
