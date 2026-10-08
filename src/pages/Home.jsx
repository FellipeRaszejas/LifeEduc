import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Bell,
  ChevronDown,
  Flame,
  BookOpenCheck,
  BookOpen,
  Clock,
  Target,
  Award,
  Play,
  ArrowRight,
} from 'lucide-react'
import Topbar from '../components/topbar'

// Dados fixos (sem back-end)
const AULA_ATUAL = {
  titulo: 'Porcentagem no dia a dia',
  detalhe: 'Matemática para o ENEM • Módulo 3 • Aula 18 de 25 • 18 min',
}

const METRICAS = [
  {
    rotulo: 'Cursos em andamento',
    valor: '3',
    detalhe: '17 aulas de matemática concluídas',
    Icone: BookOpen,
    cor: 'azul',
  },
  {
    rotulo: 'Estudo nesta semana',
    valor: '4h 30min',
    detalhe: '75% da sua meta de 6 horas',
    Icone: Clock,
    cor: 'verde',
  },
  {
    rotulo: 'Acerto nos exercícios',
    valor: '82%',
    detalhe: '+8 pontos em relação a setembro',
    Icone: Target,
    cor: 'azul',
  },
  {
    rotulo: 'Conquistas desbloqueadas',
    valor: '8',
    detalhe: 'Próxima meta: 10 conquistas',
    Icone: Award,
    cor: 'roxo',
  },
]

// Coloque as fotos em public/cursos/ (sem elas aparece um fundo colorido)
const CURSOS = [
  {
    id: 'matematica-enem',
    area: 'Matemática',
    corArea: 'azul',
    titulo: 'Matemática para o ENEM',
    professor: 'Prof. Marcos Lima',
    meta: '25 aulas • 12 h • Iniciante',
    progresso: 68,
    imagem: '/cursos/matematica.jpg',
    fundo: '#9db7d9',
  },
  {
    id: 'redacao-1000',
    area: 'Linguagens',
    corArea: 'roxo',
    titulo: 'Redação nota 1000',
    professor: 'Profa. Juliana Costa',
    meta: '24 aulas • 10 h • Iniciante',
    progresso: 42,
    imagem: '/cursos/redacao.jpg',
    fundo: '#b8b2c9',
  },
  {
    id: 'intro-programacao',
    area: 'Tecnologia',
    corArea: 'verde',
    titulo: 'Introdução à programação',
    professor: 'Prof. Rafael Santos',
    meta: '20 aulas • 16 h • Iniciante',
    progresso: 15,
    imagem: '/cursos/programacao.jpg',
    fundo: '#6f8f96',
  },
]

// Lê o usuário salvo no login/cadastro. Sem sessão, usa um nome de demonstração.
function lerSessao() {
  try {
    const bruto = localStorage.getItem('lifeeduc:usuario') || sessionStorage.getItem('lifeeduc:usuario')
    return bruto ? JSON.parse(bruto) : null
  } catch {
    return null
  }
}

function iniciais(nome) {
  const partes = nome.trim().split(/\s+/)
  return (partes[0][0] + (partes.length > 1 ? partes[partes.length - 1][0] : '')).toUpperCase()
}

function dataPorExtenso() {
  const texto = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

export default function Home() {
  const navigate = useNavigate()
  const [notificacoes, setNotificacoes] = useState(false)

  const usuario = lerSessao()
  const nome = usuario?.nome || 'Ana Souza'
  const perfil = usuario?.perfil || 'Estudante'
  const primeiroNome = nome.split(' ')[0]

  return (
    <div className="home">
      <Topbar>
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
      </Topbar>

      {/* Saudação */}
      <section className="home__titulo">
        <div>
          <p className="sobretitulo">Seu espaço de aprendizagem</p>
          <h1>Olá, {primeiroNome}! Vamos dar o próximo passo?</h1>
          <p className="subtitulo">{dataPorExtenso()} • Seu futuro se constrói um pouco a cada dia.</p>
        </div>
        <span className="constancia">
          <Flame size={13} /> 7 dias de constância
        </span>
      </section>

      {/* Continue de onde parou */}
      <section className="continuar" aria-label="Continue de onde parou">
        <div className="continuar__icone">
          <BookOpenCheck size={44} strokeWidth={1.4} />
        </div>
        <div className="continuar__texto">
          <p>Continue de onde parou</p>
          <h2>{AULA_ATUAL.titulo}</h2>
          <small>{AULA_ATUAL.detalhe}</small>
        </div>
        <button type="button" className="btn-branco" onClick={() => navigate('/aulas')}>
          <Play size={14} />
          Continuar aula
        </button>
      </section>

      {/* Métricas */}
      <section className="metricas" aria-label="Resumo do seu progresso">
        {METRICAS.map(({ rotulo, valor, detalhe, Icone, cor }) => (
          <article key={rotulo} className="metrica">
            <div className="metrica__topo">
              <span>{rotulo}</span>
              <span className={`metrica__icone metrica__icone--${cor}`}>
                <Icone size={16} />
              </span>
            </div>
            <strong className="metrica__valor">{valor}</strong>
            <small className={`metrica__detalhe metrica__detalhe--${cor}`}>{detalhe}</small>
          </article>
        ))}
      </section>

      {/* Cursos */}
      <section aria-labelledby="titulo-cursos">
        <div className="secao-topo">
          <h2 id="titulo-cursos">Seus cursos</h2>
          <Link to="/curso" className="link">
            Explorar cursos <ArrowRight size={12} />
          </Link>
        </div>

        <div className="cursos">
          {CURSOS.map((c) => (
            <article key={c.id} className="curso">
              <div
                className="curso__imagem"
                style={{ backgroundColor: c.fundo, backgroundImage: `url(${c.imagem})` }}
                role="img"
                aria-label={`Imagem do curso ${c.titulo}`}
              />
              <div className="curso__corpo">
                <span className={`tag tag--${c.corArea}`}>{c.area}</span>
                <h3>{c.titulo}</h3>
                <p className="curso__prof">{c.professor}</p>
                <p className="curso__meta">{c.meta}</p>

                <div className="progresso">
                  <div className="progresso__rotulos">
                    <span>Concluído</span>
                    <strong>{c.progresso}%</strong>
                  </div>
                  <div
                    className="progresso__barra"
                    role="progressbar"
                    aria-valuenow={c.progresso}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div className="progresso__preenchido" style={{ width: `${c.progresso}%` }} />
                  </div>
                </div>

                <button type="button" className="btn btn--contorno" onClick={() => navigate('/curso')}>
                  <ArrowRight size={14} />
                  Continuar curso
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}