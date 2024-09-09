import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth, googleProvider } from '@/lib/firebase'
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import ParticleAnimation from '@/components/ParticleAnimation'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        if (password !== confirmPassword) {
          alert("Passwords don't match")
          return
        }
        await createUserWithEmailAndPassword(auth, email, password)
      }
      router.push('/dashboard')
    } catch (error) {
      console.error('Authentication error:', error)
      alert('Authentication failed. Please try again.')
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      router.push('/dashboard')
    } catch (error) {
      console.error('Google sign-in error:', error)
      alert('Google sign-in failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
      <ParticleAnimation />
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg z-10"
      >
        <h1 className="text-4xl font-bold mb-2 text-center text-white drop-shadow-md">
          Confezz.GG
        </h1>
        <h2 className="text-xl font-semibold mb-6 text-center text-white drop-shadow-md">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-white font-semibold drop-shadow-md">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white bg-opacity-20 text-white placeholder-gray-300 border-white border-opacity-30 focus:border-white focus:ring-white"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-white font-semibold drop-shadow-md">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white bg-opacity-20 text-white placeholder-gray-300 border-white border-opacity-30 focus:border-white focus:ring-white"
            />
          </div>
          {!isLogin && (
            <div>
              <Label htmlFor="confirmPassword" className="text-white font-semibold drop-shadow-md">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white bg-opacity-20 text-white placeholder-gray-300 border-white border-opacity-30 focus:border-white focus:ring-white"
              />
            </div>
          )}
          <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold transition-all duration-300 transform hover:scale-105">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <div className="mt-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full bg-white text-gray-700 hover:bg-gray-100 font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_13183_10121)"><path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3F83F8"/><path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z" fill="#34A853"/><path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z" fill="#FBBC04"/><path d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z" fill="#EA4335"/></g><defs><clipPath id="clip0_13183_10121"><rect width="20" height="20" fill="white" transform="translate(0.5)"/></clipPath></defs>
            </svg>
            Sign in with Google
          </Button>
        </div>
        <div className="mt-4 text-center">
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-300 hover:text-white font-semibold transition-colors duration-300"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}