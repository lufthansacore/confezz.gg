import { useEffect, useState } from 'react'
import { auth, db } from '@/lib/firebase'
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'

interface Confession {
  id: string;
  text: string;
  timestamp: Timestamp;
  username: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [confession, setConfession] = useState('')
  const [confessions, setConfessions] = useState<Confession[]>([])
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        const q = query(collection(db, 'confessions'), orderBy('timestamp', 'desc'))
        onSnapshot(q, (snapshot) => {
          setConfessions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Confession)))
        })
      } else {
        router.push('/')
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleConfessionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (confession.trim()) {
      await addDoc(collection(db, 'confessions'), {
        text: confession,
        userId: user.uid,
        username: `AnonymousUser:${Math.floor(Math.random() * 1000000)}`,
        timestamp: Timestamp.now()
      })
      setConfession('')
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Confessions Dashboard</h1>
          <form onSubmit={handleConfessionSubmit} className="mb-8">
            <Textarea
              value={confession}
              onChange={(e) => setConfession(e.target.value)}
              placeholder="Write your confession..."
              className="w-full p-2 mb-4 border rounded"
            />
            <Button type="submit">Post Confession</Button>
          </form>
          <div className="space-y-4">
            {confessions.map((conf) => (
              <motion.div 
                key={conf.id} 
                className="bg-gray-100 p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-800">{conf.text}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-600">
                    {conf.username}
                  </p>
                  <p className="text-sm text-gray-600">
                    {conf.timestamp.toDate().toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}