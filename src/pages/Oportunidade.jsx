import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Info,
  Search,
  ChevronDown,
  Bookmark,
  ArrowRight,
  GraduationCap,
  Briefcase,
  BookOpen,
  ClipboardCheck,
} from 'lucide-react'
import Topbar from '../components/topbar'

// ---------------------------------------------------------------------------
// Dados fixos. TODOS os exemplos são fictícios (instituições, vagas e prazos).
// ---------------------------------------------------------------------------
const CHAVE_SALVAS = 'lifeeduc:oportunidades-salvas'
const CHAVE_PREPARO = 'lifeeduc:oportunidades-preparo'

const TIPOS = ['Bolsa de estudos', 'Estágio', 'Curso gratuito']
const MODALIDADES = ['Online', 'Presencial', 'Híbrido']

const VISUAL_TIPO = {
  'Bolsa de estudos': { Icone: GraduationCap, cor: 'azul' },
  Estágio: { Icone: Briefcase, cor: 'roxo' },
  'Curso gratuito': { Icone: BookOpen, cor: 'verde' },
}

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

const OPORTUNIDADES = [
  {
    id: 'bolsa-caminhos',
    titulo: 'Bolsa Caminhos do Futuro',
    instituicao: 'Instituto Horizonte Aberto',
    tipo: 'Bolsa de estudos',
    modalidade: 'Online',
    local: 'Todo o Brasil',
    beneficio: '100% de mensalidade',
    prazo: '2026-10-15',
    descricao:
      'Bolsa integral para preparação ao ENEM. Prioridade para estudantes da rede pública e de baixa renda.',
    requisitos: [
      'Estar cursando o ensino médio ou ter concluído há até 2 anos.',
      'Ter renda familiar dentro do limite informado no edital.',
    ],
    passos: ['Reúna seus documentos pessoais.', 'Leia os critérios completos.', 'Confirme o prazo antes de enviar.'],
  },
  {
    id: 'estagio-inclusiva',
    titulo: 'Estágio em tecnologia inclusiva',
    instituicao: 'Vértice Digital',
    tipo: 'Estágio',
    modalidade: 'Híbrido',
    local: 'Recife, PE',
    beneficio: 'Bolsa de R$ 900/mês',
    prazo: '2026-10-20',
    descricao:
      'Primeira experiência em suporte e desenvolvimento. Para estudantes a partir de 18 anos, com disponibilidade de 4h por dia.',
    requisitos: [
      'Ter 18 anos ou mais.',
      'Disponibilidade de 4 horas por dia.',
      'Interesse em tecnologia e acessibilidade.',
    ],
    passos: ['Atualize seu currículo.', 'Liste suas habilidades e interesses.', 'Confirme o prazo antes de enviar.'],
  },
  {
    id: 'curso-dados',
    titulo: 'Introdução à análise de dados',
    instituicao: 'Núcleo Saber Aberto',
    tipo: 'Curso gratuito',
    modalidade: 'Online',
    local: 'Todo o Brasil',
    beneficio: 'Certificado gratuito',
    prazo: '2026-10-30',
    descricao:
      'Curso para quem quer começar com planilhas e gráficos. Sem pré-requisito de programação e com horários flexíveis.',
    requisitos: ['Ter acesso a um computador ou celular com internet.', 'Dedicar cerca de 3 horas por semana.'],
    passos: ['Crie sua conta na plataforma.', 'Escolha a turma de sua preferência.', 'Confirme o prazo antes de enviar.'],
  },
]

const PREPARO = [
  'Revise seus dados de contato.',
  'Liste habilidades e interesses.',
  'Confira os critérios e o prazo.',
]

// ---------------------------------------------------------------------------
// Utilitários
// ---------------------------------------------------------------------------
function ler(chave, padrao) {
  try {
    return JSON.parse(localStorage.getItem(chave)) ?? padrao
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

const deIso = (iso) => {
  const [a, m, d] = iso.split('-').map(Number)
  return new Date(a, m - 1, d)
}
const dataCurta = (iso) => deIso(iso).toLocaleDateString('pt-BR')
const dataLonga = (iso) => {
  const d = deIso(iso)
  return `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`
}
const normalizar = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

// ---------------------------------------------------------------------------
// Página
// ---------------------------------------------------------------------------
export default function Oportunidade() {
  const navigate = useNavigate()

  const [busca, setBusca] = useState('')
  const [tipo, setTipo] = useState('Todos os tipos')
  const [modalidade, setModalidade] = useState('Todas')
  const [ordem, setOrdem] = useState('prazo')

  const [salvas, setSalvas] = useState(() => ler(CHAVE_SALVAS, ['bolsa-caminhos']))
  const [preparo, setPreparo] = useState(() => ler(CHAVE_PREPARO, []))
  const [abertas, setAbertas] = useState([]) // cartões com os detalhes expandidos

  useEffect(() => gravar(CHAVE_SALVAS, salvas), [salvas])
  useEffect(() => gravar(CHAVE_PREPARO, preparo), [preparo])

  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)

  const lista = useMemo(() => {
    const termo = normalizar(busca.trim())
    return OPORTUNIDADES.filter((o) => {
      const texto = normalizar(`${o.titulo} ${o.instituicao} ${o.local} ${o.tipo} ${o.descricao}`)
      return (
        (!termo || texto.includes(termo)) &&
        (tipo === 'Todos os tipos' || o.tipo === tipo) &&
        (modalidade === 'Todas' || o.modalidade === modalidade)
      )
    }).sort((a, b) => {
      if (ordem === 'nome') return a.titulo.localeCompare(b.titulo, 'pt-BR')
      const dif = a.prazo.localeCompare(b.prazo)
      return ordem === 'prazo' ? dif : -dif
    })
  }, [busca, tipo, modalidade, ordem])

  const itensSalvos = OPORTUNIDADES.filter((o) => salvas.includes(o.id))
  const filtrando = busca.trim() !== '' || tipo !== 'Todos os tipos' || modalidade !== 'Todas'

  // ----- Ações -----
  const alternarSalva = (id) =>
    setSalvas((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]))

  const alternarAberta = (id) =>
    setAbertas((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]))

  const alternarPreparo = (item) =>
    setPreparo((l) => (l.includes(item) ? l.filter((x) => x !== item) : [...l, item]))

  const limparFiltros = () => {
    setBusca('')
    setTipo('Todos os tipos')
    setModalidade('Todas')
  }

  const verSalva = (id) => {
    limparFiltros()
    setAbertas((l) => (l.includes(id) ? l : [...l, id]))
    setTimeout(() => {
      const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document.getElementById(`op-${id}`)?.scrollIntoView({
        behavior: reduzir ? 'auto' : 'smooth',
        block: 'center',
      })
    }, 50)
  }

  return (
    <div className="op">
      <Topbar />

      {/* Título */}
      <section className="op__titulo">
        <p className="sobretitulo">Seu espaço de aprendizagem</p>
        <h1>Oportunidades</h1>
        <p className="subtitulo">Novos caminhos para colocar seu aprendizado em movimento.</p>
      </section>

      {/* Aviso: tudo aqui é exemplo */}
      <div className="op__aviso" role="note">
        <Info size={16} />
        <p>
          Exemplos explicitamente fictícios: instituições, benefícios, vagas e prazos abaixo foram criados
          apenas para demonstrar a interface. Não representam ofertas reais.
        </p>
      </div>

      {/* Filtros */}
      <form className="op__filtros" onSubmit={(e) => e.preventDefault()} role="search">
        <div>
          <label htmlFor="op-busca">Buscar oportunidades</label>
          <div className="campo">
            <Search size={16} />
            <input
              id="op-busca"
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Tema, instituição ou cidade"
            />
          </div>
        </div>

        <div>
          <label htmlFor="op-tipo">Tipo de oportunidade</label>
          <div className="campo campo--select">
            <select id="op-tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option>Todos os tipos</option>
              {TIPOS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <ChevronDown size={14} />
          </div>
        </div>

        <div>
          <label htmlFor="op-modalidade">Modalidade</label>
          <div className="campo campo--select">
            <select id="op-modalidade" value={modalidade} onChange={(e) => setModalidade(e.target.value)}>
              <option>Todas</option>
              {MODALIDADES.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <ChevronDown size={14} />
          </div>
        </div>
      </form>

      <div className="op__grade">
        {/* ------------------------------- Lista ------------------------------- */}
        <section aria-labelledby="op-contagem">
          <div className="op__lista-topo">
            <h2 id="op-contagem">
              {lista.length} {lista.length === 1 ? 'caminho' : 'caminhos'} para explorar
            </h2>

            <div className="op__ordem">
              <label htmlFor="op-ordem" className="sr-only">
                Ordenar por
              </label>
              <select id="op-ordem" value={ordem} onChange={(e) => setOrdem(e.target.value)}>
                <option value="prazo">Prazo mais próximo</option>
                <option value="prazo-longe">Prazo mais distante</option>
                <option value="nome">Nome (A–Z)</option>
              </select>
              <ChevronDown size={12} />
            </div>
          </div>

          {lista.length === 0 && (
            <div className="cartao op__vazio">
              <p>Nenhuma oportunidade encontrada com esses filtros.</p>
              <button type="button" className="btn-contorno" onClick={limparFiltros}>
                Limpar filtros
              </button>
            </div>
          )}

          <div className="op__cartoes">
            {lista.map((o) => {
              const { Icone, cor } = VISUAL_TIPO[o.tipo]
              const salva = salvas.includes(o.id)
              const aberta = abertas.includes(o.id)
              const encerrada = deIso(o.prazo) < hoje

              return (
                <article key={o.id} id={`op-${o.id}`} className="cartao op-cartao">
                  <header className="op-cartao__topo">
                    <span className={`op-cartao__icone op-cartao__icone--${cor}`}>
                      <Icone size={22} />
                    </span>
                    <div className="op-cartao__titulo">
                      <h3>{o.titulo}</h3>
                      <p>
                        {o.instituicao} • Instituição fictícia
                      </p>
                    </div>
                    <button
                      type="button"
                      className={`icone-btn op-cartao__salvar ${salva ? 'ativo' : ''}`}
                      onClick={() => alternarSalva(o.id)}
                      aria-pressed={salva}
                      aria-label={salva ? `Remover ${o.titulo} das salvas` : `Salvar ${o.titulo}`}
                    >
                      <Bookmark size={18} fill={salva ? 'currentColor' : 'none'} />
                    </button>
                  </header>

                  <div className="op-cartao__tags">
                    <span className={`tag tag--${cor}`}>{o.tipo}</span>
                    <span className="tag tag--amarela">Exemplo fictício</span>
                  </div>

                  <p className="op-cartao__descricao">{o.descricao}</p>

                  <p className="op-cartao__meta">
                    <span>
                      {o.modalidade} • {o.local}
                    </span>
                    <strong>{o.beneficio}</strong>
                  </p>

                  {aberta && (
                    <div className="op-cartao__detalhes">
                      <h4>Quem pode participar</h4>
                      <ul>
                        {o.requisitos.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                      <h4>Antes de se candidatar</h4>
                      <ul>
                        {o.passos.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                      <p className="op-cartao__nota">
                        Exemplo fictício: não existe inscrição real para esta oportunidade.
                      </p>
                    </div>
                  )}

                  <footer className="op-cartao__rodape">
                    <span className={`op-cartao__prazo ${encerrada ? 'op-cartao__prazo--fim' : ''}`}>
                      {encerrada ? 'Inscrições encerradas' : `Inscrições até ${dataCurta(o.prazo)}`}
                    </span>
                    <button
                      type="button"
                      className="btn-contorno"
                      onClick={() => alternarAberta(o.id)}
                      aria-expanded={aberta}
                    >
                      <ArrowRight size={14} />
                      {aberta ? 'Ocultar detalhes' : 'Ver detalhes'}
                    </button>
                  </footer>
                </article>
              )
            })}
          </div>
        </section>

        {/* ------------------------------ Lateral ------------------------------ */}
        <aside className="op__lateral">
          <section className="op-salvas" aria-labelledby="op-salvas-titulo">
            <div className="op-salvas__topo">
              <h2 id="op-salvas-titulo">Salvas por você</h2>
              <span>
                {itensSalvos.length} {itensSalvos.length === 1 ? 'salva' : 'salvas'}
              </span>
            </div>

            {itensSalvos.length === 0 && (
              <p className="op-salvas__vazio">
                Você ainda não salvou nada. Use o marcador de cada cartão para guardar o que chamar sua
                atenção.
              </p>
            )}

            {itensSalvos.map((o) => (
              <div key={o.id} className="op-salvas__item">
                <span className="tag tag--amarela">Exemplo fictício</span>
                <h3>{o.titulo}</h3>
                <p className="op-salvas__prazo">Prazo: {dataLonga(o.prazo)}</p>
                <p className="op-salvas__dica">
                  Organize seus documentos e leia os critérios antes de se candidatar.
                </p>
                <button type="button" className="btn-azul" onClick={() => verSalva(o.id)}>
                  Ver oportunidade
                </button>
              </div>
            ))}
          </section>

          <section className="cartao">
            <span className="op-prep__icone">
              <ClipboardCheck size={18} />
            </span>
            <h2 className="op-prep__titulo">Prepare seu próximo passo</h2>
            <ul className="op-prep__lista">
              {PREPARO.map((item) => (
                <li key={item}>
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={preparo.includes(item)}
                      onChange={() => alternarPreparo(item)}
                    />
                    <span className={preparo.includes(item) ? 'op-prep__feito' : ''}>{item}</span>
                  </label>
                </li>
              ))}
            </ul>
            <button type="button" className="btn btn--contorno op-prep__botao" onClick={() => navigate('/perfil')}>
              Preparar meu perfil
            </button>
          </section>
        </aside>
      </div>
    </div>
  )
}