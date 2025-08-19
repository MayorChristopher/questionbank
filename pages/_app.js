import '../src/index.css'
import { AuthProvider } from '../src/contexts/SupabaseAuthContext'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'
import { Toaster } from '../src/components/ui/toaster'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
        <Toaster />
      </div>
    </AuthProvider>
  )
}