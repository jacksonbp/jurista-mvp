'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const [session, setSession] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s)
      setReady(true)
    })
    return () => { sub.subscription.unsubscribe() }
  }, [])

  if (!ready) return <div className='p-6'>Carregando...</div>
  if (!session) {
    router.replace('/login')
    return <div className='p-6'>Redirecionando para login...</div>
  }
  return <>{children}</>
}