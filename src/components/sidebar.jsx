import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  PanelLeft,
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  Compass,
  CirclePlay,
  ListChecks,
  ChartNoAxesCombined,
  CalendarDays,
  MessagesSquare,
  Award,
  User,
  Briefcase,
  Sparkles,
  Library,
  GraduationCap,
  CircleHelp,
} from 'lucide-react'

// Cada item aponta para uma página em src/pages (rotas definidas em App.jsx)
const ITENS = [
  { rotulo: 'Início', to: '/', Icone: LayoutGrid },
  { rotulo: 'Cursos', to: '/curso', Icone: Compass },
  { rotulo: 'Aula', to: '/aulas', Icone: CirclePlay },
  { rotulo: 'Exercícios', to: '/exercicios', Icone: ListChecks },
  { rotulo: 'Desempenho', to: '/desempenho', Icone: ChartNoAxesCombined },
  { rotulo: 'Planejador', to: '/planejamento', Icone: CalendarDays },
  { rotulo: 'Comunidade', to: '/comunidade', Icone: MessagesSquare },
  { rotulo: 'Conquistas', to: '/conquistas', Icone: Award },
  { rotulo: 'Perfil', to: '/perfil', Icone: User },
  { rotulo: 'Oportunidades', to: '/oportunidade', Icone: Briefcase },
  { rotulo: 'Tutor virtual', to: '/tutor-virtual', Icone: Sparkles },
  { rotulo: 'Biblioteca', to: '/biblioteca', Icone: Library },
  { rotulo: 'Educador', to: '/painel-educador', Icone: GraduationCap },
  { rotulo: 'Suporte', to: '/ajuda', Icone: CircleHelp },
]

export default function Sidebar() {
  const [aberta, setAberta] = useState(false)

  return (
    <aside
      className={`sidebar ${aberta ? 'sidebar--aberta' : ''}`}
      aria-label="Menu principal"
    >
      <button
        type="button"
        className="sidebar__toggle"
        onClick={() => setAberta((v) => !v)}
        aria-expanded={aberta}
        aria-label={aberta ? 'Fechar menu' : 'Abrir menu'}
      >
        <PanelLeft size={18} />
        <span className="sidebar__toggle-texto">Menu</span>
        {aberta ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      <nav className="sidebar__nav">
        {ITENS.map(({ rotulo, to, Icone }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            title={rotulo}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--ativo' : ''}`
            }
          >
            <Icone size={18} strokeWidth={1.8} />
            <span>{rotulo}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__ods">
        <strong>ODS 4</strong>
        <span>Educação de qualidade</span>
      </div>
    </aside>
  )
}