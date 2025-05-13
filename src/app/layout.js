import "./globals.css"

export const metadata = {
  title: "AI Avatar Dashboard",
  description: "Manage your AI-generated avatars",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
