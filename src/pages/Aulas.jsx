import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  FileText,
  Download,
  CircleCheck,
  CirclePlay,
  Circle,
  Sparkles,
} from 'lucide-react'
import Topbar from '../components/topbar'

// ---------------------------------------------------------------------------
// Dados fixos (sem back-end)
// ---------------------------------------------------------------------------
const DURACAO = 18 * 60 // 18:00 em segundos
const TEMPO_INICIAL = 7 * 60 + 42 // 07:42
const VELOCIDADES = [0.75, 1, 1.25, 1.5, 2]
const TOTAL_AULAS = 25
const AULAS_BASE = 16 // aulas concluídas antes deste módulo (a "Regra de três" entra na lista abaixo)
const CHAVE_CONCLUIDAS = 'lifeeduc:aulas-concluidas'
const CHAVE_ANOTACAO = 'lifeeduc:anotacao:porcentagem-no-dia-a-dia'

const MODULO = [
  { id: 'regra-de-tres', titulo: 'Regra de três', minutos: 18 },
  { id: 'porcentagem', titulo: 'Porcentagem no dia a dia', minutos: 18 },
  { id: 'juros-simples', titulo: 'Juros simples', minutos: 22 },
  { id: 'juros-compostos', titulo: 'Juros compostos', minutos: 24 },
  { id: 'revisao', titulo: 'Revisão do módulo', minutos: 15 },
]

const LEGENDAS = [
  { ate: 300, texto: 'Vamos começar entendendo o que significa "por cento".' },
  { ate: 480, texto: 'Vinte por cento é o mesmo que vinte partes de cem.' },
  { ate: 700, texto: 'Então multiplicamos 150 por 0,20 e chegamos a 30.' },
  { ate: 900, texto: 'O desconto é de R$ 30, e o preço final fica em R$ 120.' },
  { ate: DURACAO, texto: 'Agora é com você: pratique com a lista de exercícios.' },
]

const TRANSCRICAO = [
  { t: 0, texto: 'Hoje vamos usar porcentagem em situações do dia a dia, como descontos.' },
  { t: 150, texto: 'Porcentagem é uma fração de denominador 100: 20% é 20 sobre 100.' },
  { t: 462, texto: 'Para calcular 20% de R$ 150, multiplicamos 150 por 0,20.' },
  { t: 700, texto: 'O resultado é R$ 30, que é o valor do desconto.' },
  { t: 900, texto: 'Subtraindo o desconto, o preço final é R$ 120.' },
]

const MATERIAIS = [
  {
    nome: 'Resumo: porcentagem e descontos',
    detalhe: 'PDF acessível • 1,2 MB',
    arquivo: '/materiais/resumo-porcentagem.pdf',
  },
  {
    nome: 'Lista de prática — Módulo 3',
    detalhe: 'PDF acessível • 860 KB',
    arquivo: '/materiais/lista-pratica-modulo-3.pdf',
  },
]

const ABAS = ['Sobre a aula', 'Transcrição', 'Minhas anotações']

// ---------------------------------------------------------------------------
// Utilitários
// ---------------------------------------------------------------------------
function formatar(segundos) {
  const m = Math.floor(segundos / 60)
  const s = Math.floor(segundos % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function lerConcluidas() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_CONCLUIDAS))
    return Array.isArray(salvo) ? salvo : ['regra-de-tres']
  } catch {
    return ['regra-de-tres']
  }
}

// ---------------------------------------------------------------------------
// Página
// ---------------------------------------------------------------------------
export default function Aulas() {
  const navigate = useNavigate()
  const playerRef = useRef(null)

  // Player (simulado: não há arquivo de vídeo, só o tempo e os controles)
  const [tempo, setTempo] = useState(TEMPO_INICIAL)
  const [tocando, setTocando] = useState(false)
  const [mudo, setMudo] = useState(false)
  const [velocidade, setVelocidade] = useState(1)
  const [legendaAtiva, setLegendaAtiva] = useState(true)
  const [menuConfig, setMenuConfig] = useState(false)

  // Abas
  const [aba, setAba] = useState(ABAS[0])
  const [anotacao, setAnotacao] = useState(() => {
    try {
      return localStorage.getItem(CHAVE_ANOTACAO) || ''
    } catch {
      return ''
    }
  })
  const [anotacaoSalva, setAnotacaoSalva] = useState(false)

  // Progresso do módulo
  const [concluidas, setConcluidas] = useState(lerConcluidas)

  useEffect(() => {
    if (!tocando) return
    const id = setInterval(() => setTempo((t) => Math.min(t + 1, DURACAO)), 1000 / velocidade)
    return () => clearInterval(id)
  }, [tocando, velocidade])

  useEffect(() => {
    if (tempo >= DURACAO) setTocando(false)
  }, [tempo])

  const progressoVideo = (tempo / DURACAO) * 100
  const legenda = LEGENDAS.find((l) => tempo <= l.ate)?.texto

  const alternarPlay = () => {
    if (tempo >= DURACAO) setTempo(0)
    setTocando((v) => !v)
  }

  const buscarNaBarra = (e) => {
    const area = e.currentTarget.getBoundingClientRect()
    const razao = Math.min(Math.max((e.clientX - area.left) / area.width, 0), 1)
    setTempo(Math.round(razao * DURACAO))
  }

  const teclasBarra = (e) => {
    if (e.key === 'ArrowRight') setTempo((t) => Math.min(t + 5, DURACAO))
    if (e.key === 'ArrowLeft') setTempo((t) => Math.max(t - 5, 0))
  }

  const alternarTelaCheia = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else playerRef.current?.requestFullscreen?.()
  }

  const ciclarVelocidade = () => {
    const i = VELOCIDADES.indexOf(velocidade)
    setVelocidade(VELOCIDADES[(i + 1) % VELOCIDADES.length])
  }

  const salvarAnotacao = () => {
    try {
      localStorage.setItem(CHAVE_ANOTACAO, anotacao)
    } catch {
      /* sem armazenamento disponível */
    }
    setAnotacaoSalva(true)
    setTimeout(() => setAnotacaoSalva(false), 2000)
  }

  // A aula atual é a primeira do módulo que ainda não foi concluída
  const idAtual = MODULO.find((a) => !concluidas.includes(a.id))?.id
  const idProxima = MODULO.find((a) => !concluidas.includes(a.id) && a.id !== idAtual)?.id
  const totalConcluidas = AULAS_BASE + concluidas.length
  const porcentagem = Math.round((totalConcluidas / TOTAL_AULAS) * 100)

  const concluirEPraticar = () => {
    const novas = concluidas.includes('porcentagem') ? concluidas : [...concluidas, 'porcentagem']
    setConcluidas(novas)
    try {
      localStorage.setItem(CHAVE_CONCLUIDAS, JSON.stringify(novas))
    } catch {
      /* sem armazenamento disponível */
    }
    navigate('/exercicios')
  }

  return (
    <div className="aula">
      <Topbar />

      {/* Título */}
      <section className="aula__titulo">
        <div>
          <p className="sobretitulo">Seu espaço de aprendizagem</p>
          <h1>Porcentagem no dia a dia</h1>
          <p className="subtitulo">
            Matemática para o ENEM / Módulo 3: Razões e proporções / Aula 18 de 25
          </p>
        </div>
        <button type="button" className="btn-contorno" onClick={() => navigate('/curso')}>
          <ArrowLeft size={14} />
          Voltar ao curso
        </button>
      </section>

      <div className="aula__grade">
        {/* ------------------------- Coluna principal ------------------------- */}
        <div className="aula__principal">
          <div className="player" ref={playerRef}>
            <div className="player__palco">
              <div className="slide">
                <p className="slide__area">Matemática na prática</p>
                <h2>Quanto vale 20% de R$ 150?</h2>
                <div className="slide__formula">150 × 0,20 = 30</div>
                <p className="slide__texto">
                  O desconto é de R$ 30. Preço final: R$ 150 − R$ 30 = R$ 120.
                </p>
                <span className="tag tag--verde">Porcentagem é uma parte de 100</span>
              </div>

              {/* Coloque a foto em public/professor.jpg */}
              <div
                className="player__professor"
                role="img"
                aria-label="Professor explicando a aula"
              />

              {legendaAtiva && <p className="player__legenda">{legenda}</p>}
            </div>

            <div className="player__controles">
              <div
                className="player__barra"
                role="slider"
                tabIndex={0}
                aria-label="Progresso do vídeo"
                aria-valuemin={0}
                aria-valuemax={DURACAO}
                aria-valuenow={tempo}
                aria-valuetext={`${formatar(tempo)} de ${formatar(DURACAO)}`}
                onClick={buscarNaBarra}
                onKeyDown={teclasBarra}
              >
                <div className="player__barra-cheia" style={{ width: `${progressoVideo}%` }} />
              </div>

              <div className="player__linha">
                <div className="player__grupo">
                  <button
                    type="button"
                    className="player__btn"
                    onClick={alternarPlay}
                    aria-label={tocando ? 'Pausar' : 'Reproduzir'}
                  >
                    {tocando ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button
                    type="button"
                    className="player__btn"
                    onClick={() => setMudo((v) => !v)}
                    aria-label={mudo ? 'Ativar som' : 'Silenciar'}
                  >
                    {mudo ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <span className="player__tempo">
                    {formatar(tempo)} / {formatar(DURACAO)}
                  </span>
                </div>

                <div className="player__grupo">
                  <button
                    type="button"
                    className="player__btn player__btn--texto"
                    onClick={ciclarVelocidade}
                    aria-label="Mudar velocidade"
                  >
                    {velocidade}×
                  </button>
                  <button
                    type="button"
                    className="player__btn player__btn--texto"
                    onClick={() => setLegendaAtiva((v) => !v)}
                    aria-pressed={legendaAtiva}
                  >
                    CC {legendaAtiva ? 'ativado' : 'desativado'}
                  </button>

                  <div className="player__config">
                    <button
                      type="button"
                      className="player__btn"
                      onClick={() => setMenuConfig((v) => !v)}
                      aria-label="Configurações"
                      aria-expanded={menuConfig}
                    >
                      <Settings size={16} />
                    </button>
                    {menuConfig && (
                      <ul className="player__menu" aria-label="Velocidade de reprodução">
                        {VELOCIDADES.map((v) => (
                          <li key={v}>
                            <button
                              type="button"
                              className={v === velocidade ? 'ativo' : ''}
                              onClick={() => {
                                setVelocidade(v)
                                setMenuConfig(false)
                              }}
                            >
                              {v}×
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button
                    type="button"
                    className="player__btn"
                    onClick={alternarTelaCheia}
                    aria-label="Tela cheia"
                  >
                    <Maximize size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Abas */}
          <section className="cartao aula__abas">
            <div className="abas" role="tablist">
              {ABAS.map((nome) => (
                <button
                  key={nome}
                  type="button"
                  role="tab"
                  aria-selected={aba === nome}
                  className={`abas__item ${aba === nome ? 'abas__item--ativa' : ''}`}
                  onClick={() => setAba(nome)}
                >
                  {nome}
                </button>
              ))}
            </div>

            {aba === 'Sobre a aula' && (
              <div role="tabpanel">
                <p className="aula__descricao">
                  Aprenda a transformar porcentagens em números decimais e calcular descontos. Ao
                  final, você vai comparar ofertas e resolver situações comuns do ENEM com mais
                  segurança.
                </p>

                <h3 className="aula__subtitulo">Materiais desta aula</h3>
                <ul className="materiais">
                  {MATERIAIS.map((m) => (
                    <li key={m.nome}>
                      <FileText size={16} />
                      <div>
                        <strong>{m.nome}</strong>
                        <small>{m.detalhe}</small>
                      </div>
                      <a href={m.arquivo} download aria-label={`Baixar ${m.nome}`}>
                        <Download size={16} />
                      </a>
                    </li>
                  ))}
                </ul>

                <button type="button" className="btn btn--primario btn--auto" onClick={concluirEPraticar}>
                  <ArrowRight size={14} />
                  Concluir e praticar
                </button>
              </div>
            )}

            {aba === 'Transcrição' && (
              <ul className="transcricao" role="tabpanel">
                {TRANSCRICAO.map((linha) => (
                  <li key={linha.t}>
                    <button type="button" onClick={() => setTempo(linha.t)}>
                      <span>{formatar(linha.t)}</span>
                      {linha.texto}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {aba === 'Minhas anotações' && (
              <div role="tabpanel" className="anotacoes">
                <label htmlFor="anotacao">Suas anotações desta aula</label>
                <textarea
                  id="anotacao"
                  rows={6}
                  value={anotacao}
                  onChange={(e) => setAnotacao(e.target.value)}
                  placeholder="Escreva aqui o que quer lembrar. Fica salvo neste navegador."
                />
                <div className="anotacoes__acoes">
                  <button type="button" className="btn btn--primario btn--auto" onClick={salvarAnotacao}>
                    Salvar anotação
                  </button>
                  {anotacaoSalva && <span className="anotacoes__ok">Anotação salva.</span>}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* --------------------------- Coluna lateral -------------------------- */}
        <aside className="aula__lateral">
          <section className="cartao">
            <h3 className="lateral__titulo">Seu caminho até aqui</h3>
            <p className="lateral__sub">
              {totalConcluidas} de {TOTAL_AULAS} aulas concluídas
            </p>
            <div className="progresso">
              <div className="progresso__rotulos">
                <span>Concluído</span>
                <strong className="progresso__pct">{porcentagem}%</strong>
              </div>
              <div
                className="progresso__barra"
                role="progressbar"
                aria-valuenow={porcentagem}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="progresso__preenchido" style={{ width: `${porcentagem}%` }} />
              </div>
            </div>
          </section>

          <section className="cartao">
            <h3 className="lateral__titulo">Módulo 3 Razões e proporções</h3>
            <ol className="modulo">
              {MODULO.map((aula) => {
                const feita = concluidas.includes(aula.id)
                const atual = aula.id === idAtual
                const status = feita
                  ? `Concluída • ${aula.minutos} min`
                  : atual
                    ? `Em andamento • ${aula.minutos} min`
                    : aula.id === idProxima
                      ? `Próxima aula • ${aula.minutos} min`
                      : `${aula.minutos} min`
                return (
                  <li key={aula.id} className={atual ? 'modulo__item modulo__item--atual' : 'modulo__item'}>
                    {feita ? (
                      <CircleCheck size={18} className="icone-verde" />
                    ) : atual ? (
                      <CirclePlay size={18} className="icone-azul" />
                    ) : (
                      <Circle size={18} className="icone-azul" />
                    )}
                    <div>
                      <strong>{aula.titulo}</strong>
                      <small>{status}</small>
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>

          <section className="duvida">
            <h3>Uma dúvida no caminho?</h3>
            <p>O tutor pode explicar com outro exemplo, sem pular seu raciocínio.</p>
            <button type="button" className="btn-branco btn-branco--borda" onClick={() => navigate('/tutor-virtual')}>
              <Sparkles size={14} />
              Tirar dúvida
            </button>
          </section>
        </aside>
      </div>
    </div>
  )
}