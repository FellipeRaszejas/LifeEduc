import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Search } from 'lucide-react'

// Barra superior das páginas: logo + busca + conteúdo livre à direita (children)
export default function Topbar({ children }) {
  const navigate = useNavigate()
  const buscaRef = useRef(null)
  const [busca, setBusca] = useState('')

  // Atalho Ctrl/Cmd + K foca na busca
  useEffect(() => {
    const atalho = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        buscaRef.current?.focus()
      }
    }
    window.addEventListener('keydown', atalho)
    return () => window.removeEventListener('keydown', atalho)
  }, [])

  const buscar = (e) => {
    e.preventDefault()
    if (busca.trim()) navigate(`/curso?busca=${encodeURIComponent(busca.trim())}`)
  }

  return (
    <header className="topbar">
      <div className="logo">
        <span className="logo__icone">
          <BookOpen size={20} />
        </span>
        <span className="logo__nome">LifeEduc</span>
      </div>

      <form className="busca" onSubmit={buscar} role="search">
        <Search size={16} />
        <input
          ref={buscaRef}
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="O que você quer aprender hoje?"
          aria-label="Buscar cursos"
        />
        <kbd>⌘ K</kbd>
      </form>

      <div className="topbar__direita">{children}</div>
    </header>
  )
}