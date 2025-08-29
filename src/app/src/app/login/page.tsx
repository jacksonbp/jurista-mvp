'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function sendLink(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo:
          typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : undefined,
      },
    })
    if (error) setError(error.message)
    else setSent(true)
  }

  return (
    <div style={{maxWidth: 420, margin: '40px auto', fontFamily: 'system-ui, sans-serif'}}>
      <h1 style={{fontSize: 28, fontWeight: 600}}>Entrar</h1>
      <p style={{color:'#555'}}>Informe seu e-mail para receber um link mágico.</p>

      <form onSubmit={sendLink} style={{marginTop: 16, display:'grid', gap: 8}}>
        <input
          placeholder="seu@email.com"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{padding:12, border:'1px solid #ddd', borderRadius:8}}
        />
        <button
          type="submit"
          style={{padding:12, borderRadius:8, background:'#000', color:'#fff'}}
        >
          Enviar link
        </button>
      </form>

      {sent && <p style={{marginTop:12, color:'#0a7'}}>Link enviado! Verifique seu e-mail.</p>}
      {error && <p style={{marginTop:12, color:'#c00'}}>{error}</p>}
    </div>
  )
}
