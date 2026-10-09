import { Link } from 'react-router-dom'
import {
  Trophy,
  Rocket,
  Brain,
  PenLine,
  BookOpen,
  MessagesSquare,
  Target,
  Code,
  Flame,
  Clock,
  Calculator,
  Medal,
  ListChecks,
  Lock,
  Check,
} from 'lucide-react'
import Topbar from '../components/topbar'

/* Dados fictícios para demonstração */
const MEDALHAS = [
  { id: 1, icone: Rocket, cor: 'azul', titulo: 'Primeiro passo', desc: 'Primeira aula concluída', data: '12/08/2026' },
  { id: 2, icone: Brain, cor: 'roxo', titulo: 'Mente curiosa', desc: '10 aulas concluídas', data: '21/08/2026' },
  { id: 3, icone: PenLine, cor: 'verde', titulo: 'Na prática', desc: '10 atividades concluídas', data: '24/08/2026' },
  { id: 4, icone: BookOpen, cor: 'azul', titulo: 'Leitura em dia', desc: '5 materiais explorados', data: '02/09/2026' },
  { id: 5, icone: MessagesSquare, cor: 'azul', titulo: 'Aprender junto', desc: 'Primeira contribuição', data: '10/09/2026' },
  { id: 6, icone: Target, cor: 'roxo', titulo: 'Foco no futuro', desc: '20 horas de estudo', data: '22/09/2026' },
  { id: 7, icone: Code, cor: 'verde', titulo: 'Mão na massa', desc: 'Primeiro código criado', data: '07/10/2026' },
  { id: 8, icone: Flame, cor: 'azul', titulo: 'Ritmo de estudo', desc: '7 dias de constância', data: '08/10/2026' },
]

const METAS = [
  { id: 1, icone: Clock, titulo: 'Meta da semana', detalhe: '4h 30min de 6h', atual: 270, total: 360 },
  { id: 2, icone: Calculator, titulo: 'Matemática completa', detalhe: '17 de 25 aulas', atual: 17, total: 25 },
  { id: 3, icone: Medal, titulo: 'Sempre em movimento', detalhe: '8 de 10 conquistas', atual: 8, total: 10 },
  { id: 4, icone: ListChecks, titulo: 'Maratona de prática', detalhe: '48 de 60 atividades', atual: 48, total: 60 },
]

const PONTOS = '1.280'

export default function Conquistas() {
  return (
    <div className="con">
      <Topbar />

      <header className="con__titulo">
        <span className="sobretitulo">SEU ESPAÇO DE APRENDIZAGEM</span>
        <h1>Conquistas</h1>
        <p className="subtitulo">Celebre sua dedicação. Cada conquista conta uma parte da sua história.</p>
      </header>

      <section className="con-hero">
        <span className="con-hero__icone">
          <Trophy size={40} strokeWidth={1.5} />
        </span>
        <div className="con-hero__texto">
          <p>ANA SOUZA • EXPLORADORA DO CONHECIMENTO</p>
          <h2>Nível 5. Seu esforço está aparecendo.</h2>
          <small>
            {MEDALHAS.length} medalhas desbloqueadas • {METAS.length} metas a caminho • {PONTOS} pontos de
            aprendizado
          </small>
        </div>
        <Link to="/desempenho" className="btn-branco">
          Ver meu progresso
        </Link>
      </section>

      <section aria-labelledby="con-medalhas">
        <div className="secao-topo">
          <h2 id="con-medalhas">Suas medalhas</h2>
          <span className="con__contagem">{MEDALHAS.length} desbloqueadas</span>
        </div>

        <ul className="con__medalhas">
          {MEDALHAS.map(({ id, icone: Icone, cor, titulo, desc, data }) => (
            <li key={id} className="con-medalha">
              <span className={`con-medalha__icone con-medalha__icone--${cor}`}>
                <Icone size={22} />
              </span>
              <h3>{titulo}</h3>
              <p>{desc}</p>
              <small>
                Desbloqueada em {data}
                <Check size={11} aria-hidden="true" />
              </small>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="con-proximas" className="con__proximas">
        <div className="secao-topo">
          <h2 id="con-proximas">Próximas conquistas</h2>
          <span className="con__contagem">Você está perto!</span>
        </div>

        <ul className="con__metas">
          {METAS.map(({ id, icone: Icone, titulo, detalhe, atual, total }) => {
            const pct = Math.round((atual / total) * 100)
            return (
              <li key={id} className="con-meta">
                <div className="con-meta__topo">
                  <Icone size={18} className="con-meta__icone" />
                  <span className="con-meta__pilula">
                    <Lock size={11} aria-hidden="true" />
                    A desbloquear
                  </span>
                </div>
                <h3>{titulo}</h3>
                <p>{detalhe}</p>
                <div
                  className="progresso__barra"
                  role="progressbar"
                  aria-label={titulo}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={pct}
                >
                  <div className="progresso__preenchido" style={{ width: `${pct}%` }} />
                </div>
                <strong>{pct}% concluído</strong>
              </li>
            )
          })}
        </ul>
      </section>

      <p className="con__fim">
        Sem ranking, sem comparação. O melhor progresso é aquele que faz sentido para você.{' '}
        <Link to="/aulas" className="link">
          Continuar estudando →
        </Link>
      </p>
    </div>
  )
}