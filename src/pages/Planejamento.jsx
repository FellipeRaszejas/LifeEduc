import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  CalendarCheck,
  Play,
  Coffee,
  Trash2,
  X,
} from 'lucide-react'
import Topbar from '../components/topbar'

// ---------------------------------------------------------------------------
// Constantes e dados iniciais (sem back-end: tudo fica no localStorage)
// ---------------------------------------------------------------------------
const CHAVE_TAREFAS = 'lifeeduc:tarefas'
const CHAVE_META = 'lifeeduc:meta-semanal'

const MATERIAS = ['Matemática', 'Redação', 'Programação']
const COR_MATERIA = { Matemática: 'azul', Redação: 'roxo', Programação: 'verde' }

const DIAS_CURTOS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM']
const DIAS_EXTENSO = [
  'domingo',
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sábado',
]
const MESES = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
]

const TAREFAS_INICIAIS = [
  { id: 1, data: '2026-10-05', titulo: 'Resolver lista de frações', materia: 'Matemática', hora: null, duracao: 120, concluida: true },
  { id: 2, data: '2026-10-06', titulo: 'Escrever introdução', materia: 'Redação', hora: null, duracao: 105, concluida: true },
  { id: 3, data: '2026-10-07', titulo: 'Praticar variáveis', materia: 'Programação', hora: '19:00', duracao: 45, concluida: true },
  { id: 4, data: '2026-10-08', titulo: 'Praticar porcentagem', materia: 'Matemática', detalhe: 'Matemática para o ENEM', hora: '19:00', duracao: 30, concluida: false },
  { id: 5, data: '2026-10-09', titulo: 'Revisar estrutura da redação', materia: 'Redação', hora: '18:00', duracao: 45, concluida: false },
  { id: 6, data: '2026-10-10', titulo: 'Revisar lógica de programação', materia: 'Programação', hora: '10:00', duracao: 15, concluida: false },
  { id: 7, data: '2026-10-13', titulo: 'Exercícios de razão', materia: 'Matemática', hora: null, duracao: 40, concluida: false },
  { id: 8, data: '2026-10-16', titulo: 'Treinar argumentação', materia: 'Redação', hora: null, duracao: 45, concluida: false },
  { id: 9, data: '2026-10-20', titulo: 'Revisão do módulo 3', materia: 'Matemática', hora: null, duracao: 30, concluida: false },
  { id: 10, data: '2026-10-23', titulo: 'Simulado ENEM', materia: 'Matemática', hora: null, duracao: 90, concluida: false },
  { id: 11, data: '2026-10-27', titulo: 'Praticar laços de repetição', materia: 'Programação', hora: null, duracao: 40, concluida: false },
]

// ---------------------------------------------------------------------------
// Utilitários de data e formatação
// ---------------------------------------------------------------------------
const pad = (n) => String(n).padStart(2, '0')
const paraIso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const deIso = (iso) => {
  const [a, m, d] = iso.split('-').map(Number)
  return new Date(a, m - 1, d)
}
const somarDias = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
const inicioSemana = (d) => somarDias(d, -((d.getDay() + 6) % 7)) // semana começa na segunda
const maiuscula = (t) => t.charAt(0).toUpperCase() + t.slice(1)

function formatarHora(hora) {
  const [h, m] = hora.split(':')
  return m === '00' ? `${Number(h)}h` : `${Number(h)}h${m}`
}

function somarMinutos(hora, minutos) {
  const [h, m] = hora.split(':').map(Number)
  const total = (h * 60 + m + minutos) % (24 * 60)
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`
}

function formatarDuracao(minutos) {
  const h = Math.floor(minutos / 60)
  const m = minutos % 60
  if (!h) return `${m}min`
  return m ? `${h}h ${m}min` : `${h}h`
}

function ler(chave, padrao) {
  try {
    const salvo = JSON.parse(localStorage.getItem(chave))
    return salvo ?? padrao
  } catch {
    return padrao
  }
}

function gravar(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor))
  } catch {
    /* sem armazenamento disponível */
  }
}

// ---------------------------------------------------------------------------
// Janela de diálogo simples (nova tarefa e editar meta)
// ---------------------------------------------------------------------------
function Modal({ titulo, onFechar, children }) {
  useEffect(() => {
    const aoTeclar = (e) => e.key === 'Escape' && onFechar()
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [onFechar])

  return (
    <div className="modal-fundo" onMouseDown={(e) => e.target === e.currentTarget && onFechar()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={titulo}>
        <div className="modal__topo">
          <h2>{titulo}</h2>
          <button type="button" className="icone-btn" onClick={onFechar} aria-label="Fechar">
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Página
// ---------------------------------------------------------------------------
export default function Planejamento() {
  const navigate = useNavigate()

  const [hojeIso] = useState(() => paraIso(new Date()))
  const [tarefas, setTarefas] = useState(() => ler(CHAVE_TAREFAS, TAREFAS_INICIAIS))
  const [metaHoras, setMetaHoras] = useState(() => ler(CHAVE_META, 6))

  const [visao, setVisao] = useState('mes') // 'mes' | 'semana'
  const [ancora, setAncora] = useState(hojeIso) // define o mês ou a semana exibidos
  const [selecionada, setSelecionada] = useState(hojeIso)

  const [modal, setModal] = useState(null) // null | { tipo: 'tarefa', data } | { tipo: 'meta' }
  const [form, setForm] = useState({})
  const [erro, setErro] = useState('')

  useEffect(() => gravar(CHAVE_TAREFAS, tarefas), [tarefas])
  useEffect(() => gravar(CHAVE_META, metaHoras), [metaHoras])

  // Tarefas agrupadas por dia, em ordem de horário
  const porData = useMemo(() => {
    const mapa = {}
    for (const t of tarefas) (mapa[t.data] ||= []).push(t)
    for (const lista of Object.values(mapa)) {
      lista.sort((a, b) => (a.hora || '99:99').localeCompare(b.hora || '99:99'))
    }
    return mapa
  }, [tarefas])

  // ----- Navegação do calendário -----
  const dataAncora = deIso(ancora)

  const mover = (direcao) => {
    if (visao === 'mes') {
      setAncora(paraIso(new Date(dataAncora.getFullYear(), dataAncora.getMonth() + direcao, 1)))
    } else {
      setAncora(paraIso(somarDias(dataAncora, 7 * direcao)))
    }
  }

  const irParaHoje = () => {
    setAncora(hojeIso)
    setSelecionada(hojeIso)
  }

  const dias = useMemo(() => {
    if (visao === 'semana') {
      const inicio = inicioSemana(dataAncora)
      return Array.from({ length: 7 }, (_, i) => somarDias(inicio, i))
    }
    const inicio = inicioSemana(new Date(dataAncora.getFullYear(), dataAncora.getMonth(), 1))
    return Array.from({ length: 42 }, (_, i) => somarDias(inicio, i))
  }, [visao, ancora]) // eslint-disable-line react-hooks/exhaustive-deps

  const tituloCalendario = (() => {
    if (visao === 'mes') return `${maiuscula(MESES[dataAncora.getMonth()])} ${dataAncora.getFullYear()}`
    const ini = dias[0]
    const fim = dias[6]
    return ini.getMonth() === fim.getMonth()
      ? `${ini.getDate()} a ${fim.getDate()} de ${MESES[fim.getMonth()]}`
      : `${ini.getDate()} de ${MESES[ini.getMonth()]} a ${fim.getDate()} de ${MESES[fim.getMonth()]}`
  })()

  // ----- Meta da semana atual -----
  const hoje = deIso(hojeIso)
  const segunda = inicioSemana(hoje)
  const domingo = somarDias(segunda, 6)
  const domingoIso = paraIso(domingo)

  const minutosEstudados = tarefas
    .filter((t) => t.concluida && t.data >= paraIso(segunda) && t.data <= domingoIso)
    .reduce((soma, t) => soma + t.duracao, 0)
  const metaMinutos = metaHoras * 60
  const porcentagem = Math.min(100, Math.round((minutosEstudados / metaMinutos) * 100))
  const faltam = Math.max(0, metaMinutos - minutosEstudados)
  const domingoTexto = `${pad(domingo.getDate())}/${pad(domingo.getMonth() + 1)}`

  const tituloMeta =
    porcentagem >= 100
      ? 'Meta da semana concluída!'
      : porcentagem >= 50
        ? 'Sua semana está no caminho certo'
        : 'Vamos retomar o ritmo desta semana?'
  const textoMeta =
    faltam === 0
      ? `${formatarDuracao(minutosEstudados)} estudados de ${metaHoras}h • descanse sem culpa`
      : `${formatarDuracao(minutosEstudados)} estudados de ${metaHoras}h • faltam ${formatarDuracao(faltam)} até domingo, ${domingoTexto}`

  // ----- Painel do dia selecionado -----
  const dSel = deIso(selecionada)
  const tarefasDia = porData[selecionada] || []
  const tituloDia =
    selecionada === hojeIso
      ? `Hoje, ${dSel.getDate()} de ${MESES[dSel.getMonth()]}`
      : `${maiuscula(DIAS_EXTENSO[dSel.getDay()])}, ${dSel.getDate()} de ${MESES[dSel.getMonth()]}`

  // ----- Lista "Nesta semana" (pendentes primeiro, depois as concluídas) -----
  const daSemana = tarefas
    .filter((t) => t.data >= paraIso(segunda) && t.data <= domingoIso && t.data !== hojeIso)
    .sort((a, b) => Number(a.concluida) - Number(b.concluida) || a.data.localeCompare(b.data))

  const tarefasDomingo = porData[domingoIso] || []

  // ----- Ações -----
  const alternarConcluida = (id) =>
    setTarefas((lista) => lista.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t)))

  const excluir = (id) => setTarefas((lista) => lista.filter((t) => t.id !== id))

  const abrirNovaTarefa = (data = selecionada, extra = {}) => {
    setForm({ titulo: '', materia: MATERIAS[0], data, hora: '', duracao: 30, ...extra })
    setErro('')
    setModal({ tipo: 'tarefa' })
  }

  const abrirMeta = () => {
    setForm({ metaHoras })
    setErro('')
    setModal({ tipo: 'meta' })
  }

  const mudar = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }))

  const salvarTarefa = (e) => {
    e.preventDefault()
    const duracao = Number(form.duracao)
    if (!form.titulo.trim()) return setErro('Dê um nome para a tarefa.')
    if (!form.data) return setErro('Escolha o dia da tarefa.')
    if (!duracao || duracao < 5 || duracao > 600) return setErro('Informe uma duração entre 5 e 600 minutos.')

    setTarefas((lista) => [
      ...lista,
      {
        id: Date.now(),
        data: form.data,
        titulo: form.titulo.trim(),
        materia: form.materia,
        hora: form.hora || null,
        duracao,
        concluida: false,
      },
    ])
    setSelecionada(form.data)
    setAncora(form.data)
    setModal(null)
  }

  const salvarMeta = (e) => {
    e.preventDefault()
    const horas = Number(form.metaHoras)
    if (!horas || horas < 1 || horas > 40) return setErro('Informe uma meta entre 1 e 40 horas.')
    setMetaHoras(horas)
    setModal(null)
  }

  const planejarRevisao = () =>
    abrirNovaTarefa(domingoIso, { titulo: 'Revisão da semana', duracao: 30 })

  return (
    <div className="plan">
      <Topbar />

      {/* Título */}
      <section className="plan__topo">
        <div>
          <p className="sobretitulo">Seu espaço de aprendizagem</p>
          <h1>Planejador de estudos</h1>
          <p className="subtitulo">Uma rotina possível, com espaço para aprender e descansar.</p>
        </div>
        <button type="button" className="btn-azul" onClick={() => abrirNovaTarefa()}>
          <Plus size={16} />
          Nova tarefa
        </button>
      </section>

      {/* Meta da semana */}
      <section className="plan__meta" aria-label="Meta da semana">
        <CalendarCheck size={28} strokeWidth={1.6} />
        <div className="plan__meta-texto">
          <h2>{tituloMeta}</h2>
          <p>{textoMeta}</p>
        </div>
        <span className="plan__meta-pct">{porcentagem}% da meta</span>
        <button type="button" className="btn-branco" onClick={abrirMeta}>
          Editar meta
        </button>
      </section>

      <div className="plan__grade">
        {/* ------------------------------ Calendário ------------------------------ */}
        <section className="cartao calendario" aria-label="Calendário de estudos">
          <div className="calendario__topo">
            <div className="calendario__nav">
              <button type="button" className="icone-btn" onClick={() => mover(-1)} aria-label="Anterior">
                <ChevronLeft size={18} />
              </button>
              <h2>{tituloCalendario}</h2>
              <button type="button" className="icone-btn" onClick={() => mover(1)} aria-label="Próximo">
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="segmentos">
              <button
                type="button"
                className={visao === 'mes' ? 'ativo' : ''}
                aria-pressed={visao === 'mes'}
                onClick={() => setVisao('mes')}
              >
                Mês
              </button>
              <button
                type="button"
                className={visao === 'semana' ? 'ativo' : ''}
                aria-pressed={visao === 'semana'}
                onClick={() => setVisao('semana')}
              >
                Semana
              </button>
              <button type="button" onClick={irParaHoje}>
                Hoje
              </button>
            </div>
          </div>

          <div className="calendario__cabecalho">
            {DIAS_CURTOS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className={`calendario__grade ${visao === 'semana' ? 'calendario__grade--semana' : ''}`}>
            {dias.map((d) => {
              const iso = paraIso(d)
              const lista = porData[iso] || []
              const limite = visao === 'semana' ? lista.length : 2
              const visiveis = lista.slice(0, limite)
              const extras = lista.length - visiveis.length
              const foraDoMes = visao === 'mes' && d.getMonth() !== dataAncora.getMonth()
              const classes = [
                'plan-dia',
                foraDoMes && 'plan-dia--fora',
                iso === hojeIso && 'plan-dia--hoje',
                iso === selecionada && 'plan-dia--selecionado',
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <button
                  key={iso}
                  type="button"
                  className={classes}
                  aria-pressed={iso === selecionada}
                  aria-label={`${d.getDate()} de ${MESES[d.getMonth()]}, ${lista.length} tarefa(s)`}
                  onClick={() => {
                    setSelecionada(iso)
                    if (foraDoMes) setAncora(iso)
                  }}
                >
                  <span className="plan-dia__num">
                    {d.getDate()}
                    {iso === hojeIso && ' • hoje'}
                  </span>
                  {visiveis.map((t) => (
                    <span
                      key={t.id}
                      className={`chip chip--${COR_MATERIA[t.materia]} ${t.concluida ? 'chip--feita' : ''}`}
                    >
                      {t.hora ? `${formatarHora(t.hora)} • ` : ''}
                      {t.materia}
                    </span>
                  ))}
                  {extras > 0 && <span className="chip chip--mais">+{extras}</span>}
                </button>
              )
            })}
          </div>

          <div className="legenda">
            {MATERIAS.map((m) => (
              <span key={m} className={`tag tag--${COR_MATERIA[m]}`}>
                {m}
              </span>
            ))}
          </div>
        </section>

        {/* ------------------------------ Lateral ------------------------------ */}
        <aside className="plan__lateral">
          <section className="cartao" aria-live="polite">
            <h2 className="lateral__titulo lateral__titulo--grande">{tituloDia}</h2>

            <span className="tag tag--azul tag--margem">
              {tarefasDia.length
                ? `${tarefasDia.length} tarefa${tarefasDia.length > 1 ? 's' : ''} planejada${tarefasDia.length > 1 ? 's' : ''}`
                : 'Nenhuma tarefa'}
            </span>

            {tarefasDia.length === 0 && (
              <>
                <p className="plan__vazio">Dia livre. Que tal adicionar uma tarefa curta?</p>
                <button type="button" className="btn btn--primario" onClick={() => abrirNovaTarefa()}>
                  <Plus size={14} />
                  Adicionar tarefa
                </button>
              </>
            )}

            {tarefasDia.map((t) => (
              <article key={t.id} className="tarefa-dia">
                <h3>{t.titulo}</h3>
                <p>
                  {t.detalhe || t.materia}
                  {t.hora && ` ${formatarHora(t.hora)} às ${formatarHora(somarMinutos(t.hora, t.duracao))}`} •{' '}
                  {t.duracao} min
                </p>

                {t.concluida ? (
                  <p className="tarefa-dia__ok">Concluída</p>
                ) : (
                  <button type="button" className="btn btn--primario" onClick={() => navigate('/exercicios')}>
                    <Play size={14} />
                    Iniciar prática
                  </button>
                )}

                <div className="tarefa-dia__acoes">
                  <button type="button" className="link" onClick={() => alternarConcluida(t.id)}>
                    {t.concluida ? 'Desmarcar' : 'Marcar como concluída'}
                  </button>
                  <button type="button" className="link link--perigo" onClick={() => excluir(t.id)}>
                    <Trash2 size={12} /> Excluir
                  </button>
                </div>
              </article>
            ))}
          </section>

          <section className="cartao">
            <h2 className="lateral__titulo lateral__titulo--grande">Nesta semana</h2>
            {daSemana.length === 0 ? (
              <p className="plan__vazio">Nada mais por aqui. Aproveite o descanso.</p>
            ) : (
              <ul className="semana">
                {daSemana.map((t) => {
                  const d = deIso(t.data)
                  return (
                    <li key={t.id}>
                      <input
                        type="checkbox"
                        id={`tarefa-${t.id}`}
                        checked={t.concluida}
                        onChange={() => alternarConcluida(t.id)}
                      />
                      <label htmlFor={`tarefa-${t.id}`}>
                        <small>
                          {pad(d.getDate())}/{pad(d.getMonth() + 1)}
                          {t.hora && ` • ${formatarHora(t.hora)}`}
                        </small>
                        <strong>{t.titulo}</strong>
                        <small className={t.concluida ? 'semana__ok' : ''}>
                          {t.duracao} min{t.concluida && ' • Concluído'}
                        </small>
                      </label>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        </aside>
      </div>

      {/* Domingo / descanso */}
      <section className="plan__descanso">
        <Coffee size={20} strokeWidth={1.6} />
        <div>
          <h2>
            {tarefasDomingo.length
              ? `Domingo com ${tarefasDomingo.length} tarefa${tarefasDomingo.length > 1 ? 's' : ''}`
              : 'Domingo sem tarefas por enquanto'}
          </h2>
          <p>
            {tarefasDomingo.length
              ? 'Seu descanso também faz parte do plano. Ajuste se precisar de mais folga.'
              : 'Seu descanso também faz parte do plano. Adicione uma revisão só se fizer sentido para você.'}
          </p>
        </div>
        <button type="button" className="btn-contorno" onClick={planejarRevisao}>
          Planejar revisão
        </button>
      </section>

      {/* Janelas */}
      {modal?.tipo === 'tarefa' && (
        <Modal titulo="Nova tarefa" onFechar={() => setModal(null)}>
          <form onSubmit={salvarTarefa} noValidate className="modal__form">
            <label htmlFor="t-titulo">O que você vai estudar?</label>
            <div className="campo">
              <input
                id="t-titulo"
                type="text"
                value={form.titulo}
                onChange={mudar('titulo')}
                placeholder="Ex.: Praticar porcentagem"
                autoFocus
              />
            </div>

            <label htmlFor="t-materia">Matéria</label>
            <div className="campo campo--select">
              <select id="t-materia" value={form.materia} onChange={mudar('materia')}>
                {MATERIAS.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <ChevronDown size={16} />
            </div>

            <div className="duas-colunas">
              <div>
                <label htmlFor="t-data">Dia</label>
                <div className="campo">
                  <input id="t-data" type="date" value={form.data} onChange={mudar('data')} />
                </div>
              </div>
              <div>
                <label htmlFor="t-hora">Horário (opcional)</label>
                <div className="campo">
                  <input id="t-hora" type="time" value={form.hora} onChange={mudar('hora')} />
                </div>
              </div>
            </div>

            <label htmlFor="t-duracao">Duração (minutos)</label>
            <div className="campo">
              <input
                id="t-duracao"
                type="number"
                min="5"
                max="600"
                step="5"
                value={form.duracao}
                onChange={mudar('duracao')}
              />
            </div>

            {erro && <p className="erro-texto">{erro}</p>}

            <button type="submit" className="btn btn--primario">
              Salvar tarefa
            </button>
          </form>
        </Modal>
      )}

      {modal?.tipo === 'meta' && (
        <Modal titulo="Editar meta semanal" onFechar={() => setModal(null)}>
          <form onSubmit={salvarMeta} noValidate className="modal__form">
            <label htmlFor="m-horas">Quantas horas por semana você quer estudar?</label>
            <div className="campo">
              <input
                id="m-horas"
                type="number"
                min="1"
                max="40"
                value={form.metaHoras}
                onChange={mudar('metaHoras')}
                autoFocus
              />
            </div>
            {erro && <p className="erro-texto">{erro}</p>}
            <button type="submit" className="btn btn--primario">
              Salvar meta
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}