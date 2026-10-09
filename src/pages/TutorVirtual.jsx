import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  Sparkles,
  Ellipsis,
  ThumbsUp,
  ThumbsDown,
  Send,
  Play,
  Lightbulb,
  History,
} from 'lucide-react'
import Topbar from '../components/topbar'
import { lerSessao } from '../utils/sessao'

// ---------------------------------------------------------------------------
// Dados fixos. Não há chat executável: nada aqui é resposta de IA de verdade.
// ---------------------------------------------------------------------------
const SUGESTOES = [
  { rotulo: 'Quero uma pista', texto: 'Quero uma pista, sem a resposta completa.' },
  { rotulo: 'Mais um exemplo', texto: 'Pode me dar mais um exemplo?' },
  { rotulo: 'Explicar de outro jeito', texto: 'Pode explicar de outro jeito?' },
]

const AVISO_DEMO =
  'Esta é uma versão de demonstração: o tutor ainda não está conectado e não responde mensagens. Anote sua dúvida e leve para a aula ou para seu educador.'

function criarConversas(nome) {
  return [
    {
      id: 'porcentagem',
      titulo: 'Entendendo porcentagem',
      materia: 'Matemática',
      grupo: 'hoje',
      data: 'Hoje',
      mensagens: [
        {
          id: 1,
          autor: 'voce',
          hora: '18:42',
          texto: 'Não entendi por que 20% vira 0,20. Pode explicar de outro jeito?',
        },
        {
          id: 2,
          autor: 'tutor',
          hora: '18:42',
          texto: `Claro, ${nome}! "Por cento" significa dividir por 100. Imagine 100 quadradinhos e pinte 20: você pintou 20/100, ou 0,20 do total. Por isso, 20% = 20 ÷ 100 = 0,20.`,
        },
        {
          id: 3,
          autor: 'voce',
          hora: '18:43',
          texto: 'Então, na mochila de R$ 150, faço 150 × 0,20 e desconto R$ 30?',
        },
        {
          id: 4,
          autor: 'tutor',
          hora: '18:43',
          texto:
            'Isso mesmo! O desconto é R$ 30 e o preço final fica R$ 120. Agora tente aplicar a ideia: se um produto custa R$ 200 e o desconto é de 15%, qual é o primeiro cálculo que você faria?',
        },
      ],
    },
    {
      id: 'redacao',
      titulo: 'Estrutura da redação',
      materia: 'Linguagens',
      grupo: 'semana',
      data: '06/10',
      mensagens: [
        {
          id: 1,
          autor: 'voce',
          hora: '20:10',
          texto: 'Como organizo os parágrafos de uma redação do ENEM?',
        },
        {
          id: 2,
          autor: 'tutor',
          hora: '20:10',
          texto:
            'Uma estrutura comum tem introdução com a tese, dois parágrafos de desenvolvimento e uma conclusão com proposta de intervenção. Qual tema você vai treinar?',
        },
      ],
    },
    {
      id: 'variavel',
      titulo: 'O que é uma variável?',
      materia: 'Tecnologia',
      grupo: 'semana',
      data: '07/10',
      mensagens: [
        { id: 1, autor: 'voce', hora: '19:05', texto: 'O que é uma variável?' },
        {
          id: 2,
          autor: 'tutor',
          hora: '19:05',
          texto:
            'Pense em uma caixa com etiqueta: o nome da variável é a etiqueta e o valor é o que está dentro da caixa. Quer ver um exemplo com idade = 17?',
        },
      ],
    },
  ]
}

const horaAgora = () =>
  new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

const resumir = (texto) => (texto.length > 36 ? `${texto.slice(0, 36).trim()}…` : texto)

const contarMensagens = (c) => c.mensagens.filter((m) => m.autor !== 'aviso').length
const rotuloMensagens = (n) => `${n} ${n === 1 ? 'mensagem' : 'mensagens'}`

// ---------------------------------------------------------------------------
// Página
// ---------------------------------------------------------------------------
export default function TutorVirtual() {
  const navigate = useNavigate()
  const listaRef = useRef(null)
  const campoRef = useRef(null)

  const primeiroNome = (lerSessao()?.nome || 'Ana Souza').split(' ')[0]

  const [conversas, setConversas] = useState(() => criarConversas(primeiroNome))
  const [ativaId, setAtivaId] = useState('porcentagem')
  const [texto, setTexto] = useState('')
  const [menuAberto, setMenuAberto] = useState(false)

  // Telas menores: histórico em menu e contexto em aba
  const [historicoAberto, setHistoricoAberto] = useState(false)
  const [aba, setAba] = useState('conversa')

  const ativa = conversas.find((c) => c.id === ativaId) || {
    id: 'nova',
    titulo: 'Nova conversa',
    materia: 'Geral',
    mensagens: [],
  }

  // Mantém a última mensagem à vista
  useEffect(() => {
    const el = listaRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [ativaId, ativa.mensagens.length])

  useEffect(() => {
    if (!menuAberto) return
    const aoTeclar = (e) => e.key === 'Escape' && setMenuAberto(false)
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [menuAberto])

  // ----- Ações -----
  const novaConversa = () => {
    setAtivaId('nova')
    setTexto('')
    setMenuAberto(false)
    setHistoricoAberto(false)
    setAba('conversa')
    campoRef.current?.focus()
  }

  const abrirConversa = (id) => {
    setAtivaId(id)
    setHistoricoAberto(false)
    setMenuAberto(false)
    setAba('conversa')
  }

  const enviar = () => {
    const conteudo = texto.trim()
    if (!conteudo) return

    const minha = { id: Date.now(), autor: 'voce', hora: horaAgora(), texto: conteudo }
    const aviso = { id: Date.now() + 1, autor: 'aviso', texto: AVISO_DEMO }

    if (ativaId === 'nova') {
      const criada = {
        id: `c${Date.now()}`,
        titulo: resumir(conteudo),
        materia: 'Geral',
        grupo: 'hoje',
        data: 'Hoje',
        mensagens: [minha, aviso],
      }
      setConversas((lista) => [criada, ...lista])
      setAtivaId(criada.id)
    } else {
      setConversas((lista) =>
        lista.map((c) => {
          if (c.id !== ativaId) return c
          const temAviso = c.mensagens.some((m) => m.autor === 'aviso')
          return { ...c, mensagens: [...c.mensagens, minha, ...(temAviso ? [] : [aviso])] }
        })
      )
    }
    setTexto('')
  }

  const aoTeclar = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      enviar()
    }
  }

  const usarSugestao = (sugestao) => {
    setTexto(sugestao)
    campoRef.current?.focus()
  }

  const avaliar = (idMensagem, valor) =>
    setConversas((lista) =>
      lista.map((c) =>
        c.id !== ativaId
          ? c
          : {
              ...c,
              mensagens: c.mensagens.map((m) => (m.id === idMensagem ? { ...m, feedback: valor } : m)),
            }
      )
    )

  const limparConversa = () => {
    setConversas((lista) => lista.map((c) => (c.id === ativaId ? { ...c, mensagens: [] } : c)))
    setMenuAberto(false)
  }

  const apagarConversa = () => {
    setConversas((lista) => lista.filter((c) => c.id !== ativaId))
    setAtivaId('nova')
    setMenuAberto(false)
  }

  const grupos = [
    { rotulo: 'Hoje', itens: conversas.filter((c) => c.grupo === 'hoje') },
    { rotulo: 'Esta semana', itens: conversas.filter((c) => c.grupo === 'semana') },
  ]

  const temMensagens = ativa.mensagens.length > 0

  return (
    <div className={`tutor tutor--aba-${aba}`}>
      <Topbar />

      {/* Título */}
      <section className="tutor__titulo">
        <div>
          <p className="sobretitulo">Seu espaço de aprendizagem</p>
          <h1>Tutor virtual</h1>
          <p className="subtitulo">Um apoio para construir seu raciocínio, uma pergunta de cada vez.</p>
        </div>
        <span className="tag tag--roxo">Apoio com inteligência artificial</span>
      </section>

      {/* Navegação das telas menores: histórico em menu e contexto em aba */}
      <div className="tutor__navmobile">
        <button
          type="button"
          className="btn-contorno"
          onClick={() => setHistoricoAberto((v) => !v)}
          aria-expanded={historicoAberto}
        >
          <History size={14} />
          Histórico
        </button>

        <div className="segmentos tutor__abas" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={aba === 'conversa'}
            className={aba === 'conversa' ? 'ativo' : ''}
            onClick={() => setAba('conversa')}
          >
            Conversa
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={aba === 'contexto'}
            className={aba === 'contexto' ? 'ativo' : ''}
            onClick={() => setAba('contexto')}
          >
            Contexto
          </button>
        </div>
      </div>

      <div className="tutor__grade">
        {/* ------------------------------ Histórico ------------------------------ */}
        <aside className={`cartao tutor__historico ${historicoAberto ? 'tutor__historico--aberto' : ''}`}>
          <button type="button" className="btn btn--contorno tutor__nova" onClick={novaConversa}>
            <Plus size={14} />
            Nova conversa
          </button>

          {grupos.map(
            (g) =>
              g.itens.length > 0 && (
                <div key={g.rotulo} className="tutor-hist__grupo">
                  <h2>{g.rotulo}</h2>
                  {g.itens.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`tutor-hist__item ${c.id === ativaId ? 'tutor-hist__item--ativo' : ''}`}
                      aria-current={c.id === ativaId}
                      onClick={() => abrirConversa(c.id)}
                    >
                      <strong>{c.titulo}</strong>
                      <small>
                        {c.materia} • {c.grupo === 'hoje' ? rotuloMensagens(contarMensagens(c)) : c.data}
                      </small>
                    </button>
                  ))}
                </div>
              )
          )}

          <p className="tutor-hist__privacidade">
            Evite enviar senhas, documentos ou informações pessoais.
          </p>
        </aside>

        {/* ------------------------------- Conversa ------------------------------- */}
        <section className="cartao tutor__chat" aria-label="Conversa com o tutor">
          <header className="tutor-chat__topo">
            <span className="tutor-chat__icone">
              <Sparkles size={18} />
            </span>
            <div className="tutor-chat__info">
              <h2>{ativa.titulo}</h2>
              <p>Modo guiado • Explicações passo a passo</p>
            </div>

            <div className="tutor-chat__menu">
              <button
                type="button"
                className="icone-btn"
                onClick={() => setMenuAberto((v) => !v)}
                aria-label="Mais opções da conversa"
                aria-expanded={menuAberto}
              >
                <Ellipsis size={18} />
              </button>
              {menuAberto && (
                <ul className="player__menu tutor-chat__opcoes">
                  <li>
                    <button type="button" onClick={limparConversa} disabled={ativa.mensagens.length === 0}>
                      Limpar conversa
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={apagarConversa} disabled={ativa.id === 'nova'}>
                      Apagar conversa
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </header>

          <div className="tutor-chat__lista" ref={listaRef} tabIndex={0} aria-label="Mensagens da conversa">
            {ativa.mensagens.length === 0 && (
              <div className="tutor-vazio">
                <span className="tutor-chat__icone">
                  <Sparkles size={18} />
                </span>
                <h3>Sobre o que você quer conversar?</h3>
                <p>
                  Conte o que você já tentou ou onde travou. A ideia é construir o raciocínio, um passo
                  de cada vez.
                </p>
                <div className="tutor-chips">
                  {SUGESTOES.map((s) => (
                    <button key={s.rotulo} type="button" className="chip-acao" onClick={() => usarSugestao(s.texto)}>
                      {s.rotulo}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {ativa.mensagens.map((m) =>
              m.autor === 'aviso' ? (
                <p key={m.id} className="tutor-aviso">
                  {m.texto}
                </p>
              ) : (
                <article key={m.id} className={`msg msg--${m.autor}`}>
                  <span className="msg__meta">
                    {m.autor === 'voce' ? 'Você' : 'Tutor LifeEduc'} • {m.hora}
                  </span>
                  <p className="msg__balao">{m.texto}</p>

                  {m.autor === 'tutor' && (
                    <div className="msg__feedback">
                      <button
                        type="button"
                        aria-label="Ajudou"
                        aria-pressed={m.feedback === 'sim'}
                        className={m.feedback === 'sim' ? 'ativo' : ''}
                        onClick={() => avaliar(m.id, 'sim')}
                      >
                        <ThumbsUp size={12} />
                      </button>
                      <button
                        type="button"
                        aria-label="Não ajudou"
                        aria-pressed={m.feedback === 'nao'}
                        className={m.feedback === 'nao' ? 'ativo' : ''}
                        onClick={() => avaliar(m.id, 'nao')}
                      >
                        <ThumbsDown size={12} />
                      </button>
                      <span>{m.feedback ? 'Obrigado pelo retorno.' : 'Essa explicação ajudou?'}</span>
                    </div>
                  )}
                </article>
              )
            )}

            {temMensagens && (
              <div className="tutor-chips">
                {SUGESTOES.slice(0, 2).map((s) => (
                  <button key={s.rotulo} type="button" className="chip-acao" onClick={() => usarSugestao(s.texto)}>
                    {s.rotulo}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="tutor-compositor">
            <textarea
              ref={campoRef}
              rows={2}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={aoTeclar}
              placeholder="Escreva sua dúvida ou seu raciocínio..."
              aria-label="Escreva sua dúvida ou seu raciocínio"
            />
            <div className="tutor-compositor__rodape">
              <small>Enter envia • Shift + Enter quebra linha</small>
              <button type="button" className="btn-azul" onClick={enviar} disabled={!texto.trim()}>
                <Send size={14} />
                Enviar
              </button>
            </div>
          </div>

          <p className="tutor-chat__nota">
            O tutor pode cometer erros. Confira com os materiais e com seu educador.
          </p>
        </section>

        {/* ------------------------------- Contexto ------------------------------- */}
        <aside className="tutor__contexto">
          <section className="cartao">
            <span className="tag tag--azul">Contexto da conversa</span>
            <h2 className="tutor-ctx__titulo">Matemática para o ENEM</h2>
            <p className="tutor-ctx__sub">Módulo 3 • Aula 18 Porcentagem no dia a dia</p>

            <div className="progresso">
              <div className="progresso__rotulos">
                <span>Concluído</span>
                <strong className="progresso__pct">68%</strong>
              </div>
              <div className="progresso__barra" role="progressbar" aria-valuenow={68} aria-valuemin={0} aria-valuemax={100}>
                <div className="progresso__preenchido" style={{ width: '68%' }} />
              </div>
            </div>

            <button type="button" className="btn btn--contorno tutor__revisar" onClick={() => navigate('/aulas')}>
              <Play size={14} />
              Revisar aula
            </button>
          </section>

          <section className="tutor-dica">
            <Lightbulb size={18} />
            <h2>Aprender, não copiar</h2>
            <p>
              Conte o que você já tentou. Peça uma pista, compare exemplos e explique a resposta com
              suas palavras.
            </p>
            <button type="button" className="btn-azul" onClick={() => navigate('/exercicios')}>
              Praticar agora
            </button>
          </section>
        </aside>
      </div>
    </div>
  )
}