import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  ChevronDown,
  Bookmark,
  Download,
  FileText,
  ListChecks,
  PenLine,
  PlayCircle,
  Play,
  Network,
  ClipboardCheck,
  BookOpenCheck,
  X,
} from 'lucide-react'
import Topbar from '../components/topbar'

/* Conteúdo fictício para demonstração: ainda não há arquivos reais vinculados */
const MATERIAIS = [
  {
    id: 1,
    titulo: 'Resumo: porcentagem e descontos',
    desc: 'Fórmulas, exemplos resolvidos e situações do cotidiano.',
    capa: ['Porcentagem', 'sem complicação'],
    icone: FileText,
    cor: 'azul',
    area: 'Matemática',
    tipo: 'PDF',
    formato: 'PDF acessível',
    meta: '1,3 MB • 6 páginas',
    acao: 'Abrir material',
    relevancia: 1,
  },
  {
    id: 2,
    titulo: 'Lista de prática — Módulo 3',
    desc: 'Porcentagem e descontos com gabarito comentado.',
    capa: ['Pratique.', 'Entenda. Avance.'],
    icone: ListChecks,
    cor: 'azul',
    area: 'Matemática',
    tipo: 'PDF',
    formato: 'PDF acessível',
    meta: '900 KB • 15 questões',
    acao: 'Abrir material',
    relevancia: 2,
  },
  {
    id: 3,
    titulo: 'Guia da redação argumentativa',
    desc: 'Introdução, desenvolvimento e proposta de intervenção.',
    capa: ['Sua ideia,', 'com estrutura.'],
    icone: PenLine,
    cor: 'roxo',
    area: 'Redação',
    tipo: 'PDF',
    formato: 'PDF acessível',
    meta: '780 KB • 9 páginas',
    acao: 'Abrir material',
    relevancia: 3,
  },
  {
    id: 4,
    titulo: 'Variáveis em 9 minutos',
    desc: 'Nomes claros e primeiros exemplos com Python.',
    capa: ['Uma variável.', 'Muitas ideias.'],
    icone: PlayCircle,
    cor: 'verde',
    area: 'Programação',
    tipo: 'Vídeo',
    formato: 'Vídeo com legendas',
    meta: '9 min • Nível iniciante',
    acao: 'Assistir',
    relevancia: 4,
  },
  {
    id: 5,
    titulo: 'Mapa mental: regra de três',
    desc: 'Um mapa com descrição textual para revisão rápida.',
    capa: ['Conecte', 'os conceitos.'],
    icone: Network,
    cor: 'azul',
    area: 'Matemática',
    tipo: 'Imagem',
    formato: 'Imagem + descrição',
    meta: '420 KB • Leitura de 5 min',
    acao: 'Abrir material',
    relevancia: 5,
  },
  {
    id: 6,
    titulo: 'Checklist para estudar melhor',
    desc: 'Prepare o ambiente e organize sessões possíveis.',
    capa: ['Seu ritmo.', 'Seu plano.'],
    icone: ClipboardCheck,
    cor: 'roxo',
    area: 'Rotina de estudo',
    tipo: 'PDF',
    formato: 'PDF acessível',
    meta: '320 KB • 2 páginas',
    acao: 'Abrir material',
    relevancia: 6,
  },
]

const AREAS = ['Todas as áreas', 'Matemática', 'Redação', 'Programação', 'Rotina de estudo']
const FORMATOS = ['Todos os formatos', 'PDF', 'Vídeo', 'Imagem']
const COR_AREA = { Matemática: 'azul', Redação: 'roxo', Programação: 'verde', 'Rotina de estudo': 'roxo' }
const COR_FORMATO = { PDF: 'azul', Vídeo: 'verde', Imagem: 'azul' }
const ORDENS = {
  relevancia: 'Mais relevantes',
  nome: 'Ordem alfabética',
}

function normalizar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export default function Biblioteca() {
  const [busca, setBusca] = useState('')
  const [area, setArea] = useState(AREAS[0])
  const [formato, setFormato] = useState(FORMATOS[0])
  const [aba, setAba] = useState('todos')
  const [ordem, setOrdem] = useState('relevancia')
  const [salvos, setSalvos] = useState([1, 4, 6])
  const [recentes, setRecentes] = useState([2, 1])
  const [aberto, setAberto] = useState(null)
  const [aviso, setAviso] = useState('')

  useEffect(() => {
    if (!aberto) return undefined
    const fechar = (e) => e.key === 'Escape' && setAberto(null)
    window.addEventListener('keydown', fechar)
    return () => window.removeEventListener('keydown', fechar)
  }, [aberto])

  useEffect(() => {
    if (!aviso) return undefined
    const id = setTimeout(() => setAviso(''), 4000)
    return () => clearTimeout(id)
  }, [aviso])

  const lista = useMemo(() => {
    const termo = normalizar(busca.trim())
    let base = MATERIAIS
    if (aba === 'salvos') base = MATERIAIS.filter((m) => salvos.includes(m.id))
    if (aba === 'recentes') base = recentes.map((id) => MATERIAIS.find((m) => m.id === id))

    const filtrada = base.filter((m) => {
      if (area !== AREAS[0] && m.area !== area) return false
      if (formato !== FORMATOS[0] && m.tipo !== formato) return false
      if (termo && !normalizar(`${m.titulo} ${m.desc} ${m.area} ${m.formato}`).includes(termo)) return false
      return true
    })

    if (ordem === 'nome') return [...filtrada].sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'))
    if (aba === 'recentes') return filtrada
    return [...filtrada].sort((a, b) => a.relevancia - b.relevancia)
  }, [busca, area, formato, aba, ordem, salvos, recentes])

  function alternarSalvo(id) {
    setSalvos((atual) => (atual.includes(id) ? atual.filter((s) => s !== id) : [...atual, id]))
  }

  function abrir(material) {
    setAberto(material)
    setRecentes((atual) => [material.id, ...atual.filter((r) => r !== material.id)].slice(0, 6))
  }

  function limpar() {
    setBusca('')
    setArea(AREAS[0])
    setFormato(FORMATOS[0])
  }

  const vazios = {
    todos: 'Nenhum material encontrado. Tente outra palavra ou limpe os filtros.',
    salvos: 'Você ainda não salvou materiais com esses filtros. Use o marcador nos cartões para guardar o que quiser rever.',
    recentes: 'Nada aberto recentemente com esses filtros.',
  }

  return (
    <div className="bib">
      <Topbar />

      <header className="bib__titulo">
        <span className="sobretitulo">SEU ESPAÇO DE APRENDIZAGEM</span>
        <h1>Biblioteca</h1>
        <p className="subtitulo">Bons recursos, sempre por perto. Explore, salve e revise.</p>
      </header>

      <div className="bib__filtros">
        <div>
          <label htmlFor="bib-busca">Buscar na biblioteca</label>
          <div className="campo">
            <Search size={16} />
            <input
              id="bib-busca"
              type="search"
              placeholder="Tema, título ou tipo de material"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="bib-area">Área de conhecimento</label>
          <div className="campo campo--select">
            <select id="bib-area" value={area} onChange={(e) => setArea(e.target.value)}>
              {AREAS.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
            <ChevronDown size={16} />
          </div>
        </div>
        <div>
          <label htmlFor="bib-formato">Formato</label>
          <div className="campo campo--select">
            <select id="bib-formato" value={formato} onChange={(e) => setFormato(e.target.value)}>
              {FORMATOS.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      <section className="bib-banner">
        <span className="bib-banner__icone">
          <BookOpenCheck size={22} />
        </span>
        <div className="bib-banner__texto">
          <h2>Uma revisão antes da próxima prática</h2>
          <p>O resumo de porcentagem acompanha a Aula 18 e ajuda no estudo de hoje, às 19h.</p>
        </div>
        <button type="button" className="btn-branco" onClick={() => abrir(MATERIAIS[0])}>
          Abrir resumo
        </button>
      </section>

      <div className="bib__abas">
        <div className="segmentos" role="group" aria-label="Lista de materiais">
          <button
            type="button"
            className={aba === 'todos' ? 'ativo' : ''}
            aria-pressed={aba === 'todos'}
            onClick={() => setAba('todos')}
          >
            Todos os materiais ({MATERIAIS.length})
          </button>
          <button
            type="button"
            className={aba === 'salvos' ? 'ativo' : ''}
            aria-pressed={aba === 'salvos'}
            onClick={() => setAba('salvos')}
          >
            Salvos ({salvos.length})
          </button>
          <button
            type="button"
            className={aba === 'recentes' ? 'ativo' : ''}
            aria-pressed={aba === 'recentes'}
            onClick={() => setAba('recentes')}
          >
            Recentes
          </button>
        </div>

        <label className="bib__ordem">
          <span className="sr-only">Ordenar materiais</span>
          <select value={ordem} onChange={(e) => setOrdem(e.target.value)}>
            {Object.entries(ORDENS).map(([chave, rotulo]) => (
              <option key={chave} value={chave}>
                {rotulo}
              </option>
            ))}
          </select>
          <ChevronDown size={12} />
        </label>
      </div>

      <p className="bib__aviso" role="status">
        {aviso}
      </p>

      {lista.length === 0 ? (
        <div className="cartao bib__vazio">
          <p>{vazios[aba]}</p>
          <button type="button" className="btn-contorno" onClick={limpar}>
            Limpar filtros
          </button>
        </div>
      ) : (
        <ul className="bib__grade">
          {lista.map((m) => {
            const Icone = m.icone
            const salvo = salvos.includes(m.id)
            const Acao = m.acao === 'Assistir' ? Play : FileText
            return (
              <li key={m.id} className="bib-card">
                <div className={`bib-card__capa bib-card__capa--${m.cor}`}>
                  <p>
                    {m.capa[0]}
                    <br />
                    {m.capa[1]}
                  </p>
                  <span className="bib-card__capa-icone">
                    <Icone size={22} />
                  </span>
                </div>

                <div className="bib-card__corpo">
                  <div className="bib-card__topo">
                    <span className={`tag tag--${COR_AREA[m.area]}`}>{m.area}</span>
                    <button
                      type="button"
                      className={`bib-card__salvar${salvo ? ' ativo' : ''}`}
                      aria-pressed={salvo}
                      aria-label={salvo ? `Remover ${m.titulo} dos salvos` : `Salvar ${m.titulo}`}
                      onClick={() => alternarSalvo(m.id)}
                    >
                      <Bookmark size={15} fill={salvo ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <h3>{m.titulo}</h3>
                  <p className="bib-card__desc">{m.desc}</p>
                  <strong className={`bib-card__formato bib-card__formato--${COR_FORMATO[m.tipo]}`}>
                    {m.formato}
                  </strong>
                  <small className="bib-card__meta">{m.meta}</small>

                  <div className="bib-card__rodape">
                    <button type="button" className="btn-contorno" onClick={() => abrir(m)}>
                      <Acao size={14} />
                      {m.acao}
                    </button>
                    <button
                      type="button"
                      className="icone-btn bib-card__baixar"
                      aria-label={`Baixar ${m.titulo}`}
                      onClick={() => setAviso('Exemplo ilustrativo: ainda não há arquivo vinculado para baixar.')}
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}

      {aberto && (
        <div className="modal-fundo" onClick={(e) => e.target === e.currentTarget && setAberto(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="bib-modal-titulo">
            <div className="modal__topo">
              <h2 id="bib-modal-titulo">{aberto.titulo}</h2>
              <button type="button" className="icone-btn" aria-label="Fechar" onClick={() => setAberto(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="bib-modal__corpo">
              <span className={`tag tag--${COR_AREA[aberto.area]}`}>{aberto.area}</span>
              <p>{aberto.desc}</p>
              <dl>
                <div>
                  <dt>Formato</dt>
                  <dd>{aberto.formato}</dd>
                </div>
                <div>
                  <dt>Detalhes</dt>
                  <dd>{aberto.meta}</dd>
                </div>
              </dl>
              <p className="bib-modal__nota">
                Exemplo ilustrativo: o arquivo real será vinculado quando o conteúdo estiver publicado.
              </p>
              <div className="bib-modal__acoes">
                {aberto.acao === 'Assistir' && (
                  <Link to="/aulas" className="btn-azul">
                    Ir para as aulas
                  </Link>
                )}
                <button type="button" className="btn-contorno" onClick={() => setAberto(null)}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}