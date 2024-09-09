import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <nav className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-2xl font-bold text-white">
              Confezz.GG
            </Link>
          </div>
          <div className="flex items-center">
            <Button onClick={handleSignOut} variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}