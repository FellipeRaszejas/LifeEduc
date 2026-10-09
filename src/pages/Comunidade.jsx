import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Plus,
  Users,
  ThumbsUp,
  MessageCircle,
  MoreHorizontal,
  Check,
  Flag,
  X,
  ChevronDown,
  Send,
} from 'lucide-react'
import Topbar from '../components/topbar'

/* Conteúdo fictício para demonstração */
const POSTS_INICIAIS = [
  {
    id: 3,
    autor: 'Lucas Oliveira',
    iniciais: 'LO',
    papel: 'Estudante',
    tempo: 'há 23 min',
    tempoMin: 23,
    tema: 'Matemática',
    area: 'Matemática',
    titulo: 'Por que 20% vira 0,20 no cálculo do desconto?',
    texto:
      'Entendi a conta da mochila de R$ 150, mas ainda estou confundindo a porcentagem com o número decimal. Alguém tem uma forma de lembrar?',
    curtidas: 12,
    respostasBase: 6,
    resolvida: true,
    tags: ['ENEM 2026'],
    educador: {
      nome: 'Prof. Marcos Lima',
      texto:
        'O símbolo % significa "por cento". Então, 20% = 20 ÷ 100 = 0,20. Pense em uma régua de 100 partes: você está usando 20 delas.',
    },
  },
  {
    id: 2,
    autor: 'Marina Santos',
    iniciais: 'MS',
    papel: 'Estudante',
    tempo: 'há 1 hora',
    tempoMin: 60,
    tema: 'Redação',
    area: 'Redação',
    titulo: 'Como conectar o repertório ao argumento?',
    texto:
      'Estou revisando a estrutura da redação. Como evitar que uma referência fique solta no parágrafo de desenvolvimento?',
    curtidas: 8,
    respostasBase: 4,
    resolvida: false,
    tags: ['Minha primeira redação'],
  },
  {
    id: 1,
    autor: 'Ana Souza',
    iniciais: 'AS',
    papel: 'Estudante',
    tempo: 'há 2 horas',
    tempoMin: 120,
    tema: 'Programação',
    area: 'Tecnologia',
    titulo: 'Meu primeiro exercício com variáveis 🎉',
    texto:
      'Consegui criar uma calculadora simples depois da aula! Compartilho aqui minha dica: dar nomes claros às variáveis ajuda muito.',
    curtidas: 15,
    respostasBase: 3,
    resolvida: false,
    tags: ['Lógica sem medo'],
  },
]

const FILTROS = ['Todos', 'Matemática', 'Redação', 'Tecnologia']
const TEMAS = { Matemática: 'Matemática', Redação: 'Redação', Programação: 'Tecnologia' }
const COR_TEMA = { Matemática: 'azul', Redação: 'roxo', Programação: 'verde' }
const EM_ALTA = ['ENEM 2026', 'Minha primeira redação', 'Lógica sem medo']
const COMBINADOS = [
  'Respeite diferentes vivências.',
  'Compartilhe o raciocínio, não só a resposta.',
  'Proteja seus dados pessoais.',
  'Acolha quem está começando.',
]

const ORDENS = {
  recentes: { rotulo: 'Mais recentes', fn: (a, b) => a.tempoMin - b.tempoMin },
  curtidas: { rotulo: 'Mais curtidas', fn: (a, b) => totalCurtidas(b) - totalCurtidas(a) },
  respostas: { rotulo: 'Mais respostas', fn: (a, b) => totalRespostas(b) - totalRespostas(a) },
}

function totalCurtidas(p) {
  return p.curtidas + (p.curtiu ? 1 : 0)
}

function totalRespostas(p) {
  return p.respostasBase + (p.novas ? p.novas.length : 0)
}

function normalizar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

/* ---------- Cartão de publicação ---------- */
function Post({ post, aberto, onAlternar, onCurtir, onResponder }) {
  const [menu, setMenu] = useState(false)
  const [texto, setTexto] = useState('')
  const novas = post.novas || []
  const respostas = totalRespostas(post)

  function enviar(e) {
    e.preventDefault()
    const limpo = texto.trim()
    if (!limpo) return
    onResponder(post.id, limpo)
    setTexto('')
  }

  return (
    <article className="cartao com-post">
      <header className="com-post__topo">
        <span className="usuario__avatar">{post.iniciais}</span>
        <div className="com-post__autor">
          <strong>{post.autor}</strong>
          <small>
            {post.tempo} • {post.papel}
          </small>
        </div>
        <span className={`tag tag--${COR_TEMA[post.tema]}`}>{post.tema}</span>
        <div className="com-post__menu">
          <button
            type="button"
            className="icone-btn"
            aria-label="Mais opções"
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            <MoreHorizontal size={16} />
          </button>
          {menu && (
            <div className="com-post__opcoes">
              <Link to="/ajuda" onClick={() => setMenu(false)}>
                <Flag size={13} />
                Denunciar
              </Link>
            </div>
          )}
        </div>
      </header>

      <h3 className="com-post__titulo">{post.titulo}</h3>
      <p className="com-post__texto">{post.texto}</p>

      <div className="com-post__acoes">
        <button
          type="button"
          className={`com-acao${post.curtiu ? ' com-acao--ativa' : ''}`}
          aria-pressed={!!post.curtiu}
          onClick={() => onCurtir(post.id)}
        >
          <ThumbsUp size={14} />
          {totalCurtidas(post)}
        </button>
        <button
          type="button"
          className="com-acao"
          aria-expanded={aberto}
          onClick={() => onAlternar(post.id)}
        >
          <MessageCircle size={14} />
          {respostas} {respostas === 1 ? 'resposta' : 'respostas'}
        </button>
        <button type="button" className="link" onClick={() => onAlternar(post.id)}>
          Responder
        </button>
        {post.resolvida && <span className="tag tag--verde">Dúvida resolvida</span>}
      </div>

      {post.educador && (
        <div className="com-educador">
          <strong>{post.educador.nome} • Educador</strong>
          <p>{post.educador.texto}</p>
          <Link to="/aulas" className="link">
            Ver aula de porcentagem →
          </Link>
        </div>
      )}

      {aberto && (
        <div className="com-respostas">
          {novas.map((r, i) => (
            <p key={i} className="com-respostas__item">
              <strong>Ana Souza</strong>
              {r}
            </p>
          ))}
          <form className="com-respostas__form" onSubmit={enviar}>
            <label htmlFor={`resp-${post.id}`} className="sr-only">
              Escreva sua resposta
            </label>
            <textarea
              id={`resp-${post.id}`}
              className="com__texto"
              rows={2}
              placeholder="Escreva uma resposta com respeito e clareza."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            <button type="submit" className="btn-azul" disabled={!texto.trim()}>
              <Send size={14} />
              Enviar resposta
            </button>
          </form>
        </div>
      )}
    </article>
  )
}

/* ---------- Página ---------- */
export default function Comunidade() {
  const [posts, setPosts] = useState(POSTS_INICIAIS)
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState('Todos')
  const [ordem, setOrdem] = useState('recentes')
  const [aberto, setAberto] = useState(null)
  const [modal, setModal] = useState(false)
  const [grupos, setGrupos] = useState(false)
  const [form, setForm] = useState({ titulo: '', tema: 'Matemática', texto: '' })

  useEffect(() => {
    if (!modal) return undefined
    const fechar = (e) => e.key === 'Escape' && setModal(false)
    window.addEventListener('keydown', fechar)
    return () => window.removeEventListener('keydown', fechar)
  }, [modal])

  const lista = useMemo(() => {
    const termo = normalizar(busca.trim())
    return posts
      .filter((p) => {
        if (filtro !== 'Todos' && p.area !== filtro) return false
        if (!termo) return true
        return normalizar(`${p.titulo} ${p.texto} ${p.autor} ${p.tags.join(' ')}`).includes(termo)
      })
      .sort(ORDENS[ordem].fn)
  }, [posts, busca, filtro, ordem])

  function atualizar(id, mudar) {
    setPosts((atuais) => atuais.map((p) => (p.id === id ? mudar(p) : p)))
  }

  function curtir(id) {
    atualizar(id, (p) => ({ ...p, curtiu: !p.curtiu }))
  }

  function responder(id, texto) {
    atualizar(id, (p) => ({ ...p, novas: [...(p.novas || []), texto] }))
  }

  function publicar(e) {
    e.preventDefault()
    const titulo = form.titulo.trim()
    const texto = form.texto.trim()
    if (!titulo || !texto) return
    setPosts((atuais) => [
      {
        id: Date.now(),
        autor: 'Ana Souza',
        iniciais: 'AS',
        papel: 'Estudante',
        tempo: 'agora',
        tempoMin: 0,
        tema: form.tema,
        area: TEMAS[form.tema],
        titulo,
        texto,
        curtidas: 0,
        respostasBase: 0,
        resolvida: false,
        tags: [],
      },
      ...atuais,
    ])
    setForm({ titulo: '', tema: 'Matemática', texto: '' })
    setBusca('')
    setFiltro('Todos')
    setOrdem('recentes')
    setModal(false)
  }

  return (
    <div className="com">
      <Topbar />

      <header className="com__titulo">
        <div>
          <span className="sobretitulo">SEU ESPAÇO DE APRENDIZAGEM</span>
          <h1>Comunidade</h1>
          <p className="subtitulo">Aprender junto é ir mais longe. Pergunte, compartilhe e acolha.</p>
        </div>
        <button type="button" className="btn-azul" onClick={() => setModal(true)}>
          <Plus size={16} />
          Nova publicação
        </button>
      </header>

      <div className="com__busca">
        <label htmlFor="com-busca">Buscar na comunidade</label>
        <div className="com__busca-linha">
          <div className="campo">
            <Search size={16} />
            <input
              id="com-busca"
              type="search"
              placeholder="Perguntas, temas ou pessoas"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <div className="segmentos" role="group" aria-label="Filtrar por tema">
            {FILTROS.map((f) => (
              <button
                key={f}
                type="button"
                className={filtro === f ? 'ativo' : ''}
                aria-pressed={filtro === f}
                onClick={() => setFiltro(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="com__grade">
        <section className="com__feed">
          <div className="com__feed-topo">
            <h2>Conversas recentes</h2>
            <label className="com__ordem">
              <span className="sr-only">Ordenar conversas</span>
              <select value={ordem} onChange={(e) => setOrdem(e.target.value)}>
                {Object.entries(ORDENS).map(([chave, { rotulo }]) => (
                  <option key={chave} value={chave}>
                    {rotulo}
                  </option>
                ))}
              </select>
              <ChevronDown size={12} />
            </label>
          </div>

          {lista.length === 0 ? (
            <div className="cartao com__vazio">
              <p>Nenhuma conversa encontrada. Tente outra palavra ou comece uma nova publicação.</p>
              <button type="button" className="btn-contorno" onClick={() => { setBusca(''); setFiltro('Todos') }}>
                Limpar busca
              </button>
            </div>
          ) : (
            <div className="com__lista">
              {lista.map((p) => (
                <Post
                  key={p.id}
                  post={p}
                  aberto={aberto === p.id}
                  onAlternar={(id) => setAberto((atual) => (atual === id ? null : id))}
                  onCurtir={curtir}
                  onResponder={responder}
                />
              ))}
            </div>
          )}
        </section>

        <aside className="com__lateral">
          <section className="com-unida">
            <Users size={20} />
            <h2>Você não está só</h2>
            <p>1.248 estudantes trocando ideias. Uma comunidade para aprender com respeito, sem julgamentos.</p>
            <button type="button" className="btn-branco" onClick={() => setGrupos(true)}>
              Ver meus grupos
            </button>
            {grupos && (
              <small role="status">Os grupos de estudo chegam em breve.</small>
            )}
          </section>

          <section className="cartao">
            <h2 className="com__lateral-titulo">Nossos combinados</h2>
            <ul className="com-combinados">
              {COMBINADOS.map((c) => (
                <li key={c}>
                  <Check size={14} />
                  {c}
                </li>
              ))}
            </ul>
            <Link to="/ajuda" className="link">
              Ler diretrizes completas →
            </Link>
          </section>

          <section className="cartao">
            <h2 className="com__lateral-titulo">Em alta por aqui</h2>
            <ul className="com-alta">
              {EM_ALTA.map((t) => (
                <li key={t}>
                  <button type="button" onClick={() => setBusca(t)}>
                    # {t}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      {modal && (
        <div className="modal-fundo" onClick={(e) => e.target === e.currentTarget && setModal(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="com-modal-titulo">
            <div className="modal__topo">
              <h2 id="com-modal-titulo">Nova publicação</h2>
              <button type="button" className="icone-btn" aria-label="Fechar" onClick={() => setModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form className="modal__form" onSubmit={publicar}>
              <label htmlFor="com-titulo">Título *</label>
              <div className="campo">
                <input
                  id="com-titulo"
                  type="text"
                  placeholder="Qual é a sua pergunta ou novidade?"
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                  required
                  autoFocus
                />
              </div>

              <label htmlFor="com-tema">Tema *</label>
              <div className="campo campo--select">
                <select
                  id="com-tema"
                  value={form.tema}
                  onChange={(e) => setForm({ ...form, tema: e.target.value })}
                >
                  {Object.keys(TEMAS).map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown size={16} />
              </div>

              <label htmlFor="com-texto">Mensagem *</label>
              <textarea
                id="com-texto"
                className="com__texto"
                rows={4}
                placeholder="Conte o que você já tentou. Evite dados pessoais."
                value={form.texto}
                onChange={(e) => setForm({ ...form, texto: e.target.value })}
                required
              />

              <p className="com__moderacao">As publicações seguem os combinados e são moderadas pela equipe.</p>

              <button type="submit" className="btn btn--primario">
                Publicar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}