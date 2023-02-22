import { AppProps } from 'next/app'
import { Inter, Open_Sans } from '@next/font/google'
import '@/styles/globals.css'

const inter = Open_Sans({
  subsets: ['latin'],
  variable: '--font-inter',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}
export default MyApp
