import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Search, Bell, ChevronDown } from 'lucide-react'
import { lerSessao, iniciais } from '../utils/sessao'

// Sino de notificações + usuário logado (padrão da maioria das páginas)
function AreaUsuario() {
  const navigate = useNavigate()
  const [notificacoes, setNotificacoes] = useState(false)

  const usuario = lerSessao()
  // Sem sessão, usa um nome de demonstração
  const nome = usuario?.nome || 'Ana Souza'
  const perfil = usuario?.perfil || 'Estudante'

  return (
    <>
      <div className="notificacao">
        <button
          type="button"
          className="icone-btn"
          onClick={() => setNotificacoes((v) => !v)}
          aria-label="Notificações"
          aria-expanded={notificacoes}
        >
          <Bell size={18} />
        </button>
        {notificacoes && (
          <div className="notificacao__caixa" role="status">
            Você não tem novas notificações.
          </div>
        )}
      </div>

      <button type="button" className="usuario" onClick={() => navigate('/perfil')}>
        <span className="usuario__avatar">{iniciais(nome)}</span>
        <span className="usuario__info">
          <strong>{nome}</strong>
          <small>{perfil} • Nível 5</small>
        </span>
        <ChevronDown size={14} />
      </button>
    </>
  )
}

// Barra superior: logo + busca + área da direita.
// Sem children, mostra sino e usuário. Com children, mostra o que for passado.
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

      <div className="topbar__direita">{children ?? <AreaUsuario />}</div>
    </header>
  )
}