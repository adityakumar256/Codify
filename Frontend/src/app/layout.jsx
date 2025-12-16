// app/layout.jsx
import { Inter, Roboto_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react" // new import path (if you're using the newer package)
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" })

// metadata moved to a separate file to keep this file exporting only components:
// see: ./metadata.js

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* inter.className जोड़ने से फ़ॉन्ट global रूप से लागू होगा */}
      <body className={`${inter.className} ${robotoMono.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
