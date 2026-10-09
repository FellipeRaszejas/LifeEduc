import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Save, Camera, ShieldCheck, Mail, MapPin, ChevronDown, CheckCircle2 } from 'lucide-react'
import Topbar from '../components/topbar'

const CHAVE = 'lifeeduc_perfil'

const PADRAO = {
  nome: 'Ana Souza',
  email: 'ana.souza@exemplo.com',
  cidade: 'Recife / PE',
  escolaridade: '3º ano do ensino médio',
  objetivo: 'Preparação para o ENEM 2026',
  meta: '6 horas por semana',
  horario: 'Noite • a partir das 19h',
  lembretes: 'No aplicativo, sem e-mails',
  legendas: true,
  reduzirMovimento: true,
  altoContraste: false,
  tamanhoTexto: 'padrao',
}

const OPCOES = {
  escolaridade: [
    '1º ano do ensino médio',
    '2º ano do ensino médio',
    '3º ano do ensino médio',
    'Ensino médio concluído',
    'Ensino superior em andamento',
    'Outro',
  ],
  objetivo: [
    'Preparação para o ENEM 2026',
    'Reforçar conteúdos da escola',
    'Aprender uma nova habilidade',
    'Preparar-me para o trabalho',
  ],
  meta: [
    '2 horas por semana',
    '4 horas por semana',
    '6 horas por semana',
    '8 horas por semana',
    '10 horas por semana',
  ],
  horario: ['Manhã • até as 12h', 'Tarde • das 13h às 18h', 'Noite • a partir das 19h', 'Sem horário fixo'],
  lembretes: ['No aplicativo, sem e-mails', 'No aplicativo e por e-mail', 'Desligados'],
}

const TAMANHOS = [
  { id: 'padrao', rotulo: 'Padrão' },
  { id: 'ampliado', rotulo: 'Ampliado' },
  { id: 'grande', rotulo: 'Grande' },
]

function carregar() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CHAVE))
    return { ...PADRAO, ...(guardado || {}) }
  } catch {
    return PADRAO
  }
}

function iniciais(nome) {
  const partes = nome.trim().split(/\s+/).filter(Boolean)
  if (partes.length === 0) return '?'
  const primeira = partes[0][0]
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : ''
  return (primeira + ultima).toUpperCase()
}

function Seletor({ id, rotulo, valor, opcoes, onChange }) {
  return (
    <div>
      <label htmlFor={id}>{rotulo}</label>
      <div className="campo campo--select">
        <select id={id} value={valor} onChange={(e) => onChange(e.target.value)}>
          {opcoes.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={16} />
      </div>
    </div>
  )
}

function Interruptor({ id, titulo, descricao, ligado, onChange }) {
  return (
    <div className="per-opcao">
      <div className="per-opcao__texto">
        <strong id={`${id}-t`}>{titulo}</strong>
        <small id={`${id}-d`}>{descricao}</small>
      </div>
      <span className={`per-opcao__estado${ligado ? ' per-opcao__estado--on' : ''}`}>
        {ligado ? 'Ativado' : 'Desativado'}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={ligado}
        aria-labelledby={`${id}-t`}
        aria-describedby={`${id}-d`}
        className="per-switch"
        onClick={() => onChange(!ligado)}
      >
        <span className="per-switch__bola" />
      </button>
    </div>
  )
}

export default function Perfil() {
  const [salvo, setSalvo] = useState(carregar)
  const [form, setForm] = useState(salvo)
  const [erros, setErros] = useState({})
  const [confirmado, setConfirmado] = useState(false)
  const [foto, setFoto] = useState(null)
  const arquivo = useRef(null)

  const alterado = JSON.stringify(form) !== JSON.stringify(salvo)

  /* Aplica as preferências de acessibilidade salvas (veja perfil.css) */
  useEffect(() => {
    const raiz = document.documentElement
    raiz.dataset.reduzirMovimento = String(salvo.reduzirMovimento)
    raiz.dataset.altoContraste = String(salvo.altoContraste)
    raiz.dataset.tamanhoTexto = salvo.tamanhoTexto
  }, [salvo])

  useEffect(() => {
    return () => {
      if (foto) URL.revokeObjectURL(foto)
    }
  }, [foto])

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
    setConfirmado(false)
    if (erros[campo]) setErros((atual) => ({ ...atual, [campo]: undefined }))
  }

  function salvar(e) {
    e.preventDefault()
    const novos = {}
    if (!form.nome.trim()) novos.nome = 'Informe seu nome completo.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) novos.email = 'Informe um e-mail válido, como nome@exemplo.com.'
    setErros(novos)
    if (Object.keys(novos).length > 0) return

    const limpo = { ...form, nome: form.nome.trim(), email: form.email.trim(), cidade: form.cidade.trim() }
    try {
      localStorage.setItem(CHAVE, JSON.stringify(limpo))
    } catch {
      /* sem armazenamento: as alterações valem só nesta sessão */
    }
    setForm(limpo)
    setSalvo(limpo)
    setConfirmado(true)
  }

  function trocarFoto(e) {
    const arq = e.target.files && e.target.files[0]
    if (!arq || !arq.type.startsWith('image/')) return
    setFoto(URL.createObjectURL(arq))
  }

  return (
    <div className="per">
      <Topbar />

      <header className="per__titulo">
        <div>
          <span className="sobretitulo">SEU ESPAÇO DE APRENDIZAGEM</span>
          <h1>Perfil do estudante</h1>
          <p className="subtitulo">Seu jeito de aprender, suas escolhas e suas preferências.</p>
        </div>
        <button type="submit" form="per-form" className="btn-azul" disabled={!alterado}>
          <Save size={16} />
          Salvar alterações
        </button>
      </header>

      <div className="per__grade">
        <aside className="per__lateral">
          <section className="cartao per-identidade">
            <div className="per-avatar">
              {foto ? <img src={foto} alt="Sua foto de perfil" /> : <span>{iniciais(salvo.nome)}</span>}
            </div>
            <h2>{salvo.nome}</h2>
            <p className="per-identidade__sub">
              Estudante • {salvo.cidade.replace(/\s*\/\s*/, ', ')}
              <br />
              No LifeEduc desde agosto de 2026
            </p>
            <span className="tag tag--roxo">Nível 5 • Exploradora</span>

            <input
              ref={arquivo}
              type="file"
              accept="image/*"
              className="sr-only"
              tabIndex={-1}
              onChange={trocarFoto}
            />
            <button
              type="button"
              className="btn-contorno per__largo"
              onClick={() => arquivo.current && arquivo.current.click()}
            >
              <Camera size={14} />
              Alterar foto
            </button>
            <p className="per-identidade__stats">3 cursos • 8 conquistas • 32h de estudo</p>
          </section>

          <section className="cartao per-controle">
            <span className="per-controle__icone">
              <ShieldCheck size={18} />
            </span>
            <h2>Você no controle</h2>
            <p>
              Seu e-mail não aparece na comunidade. Apenas nome e conquistas que você escolher compartilhar
              ficam visíveis.
            </p>
            <Link to="/ajuda" className="btn-contorno per__largo">
              Solicitar meus dados
            </Link>
            <Link to="/conta" className="link">
              Alterar senha →
            </Link>
          </section>
        </aside>

        <form id="per-form" className="per__principal" onSubmit={salvar} noValidate>
          <section className="cartao">
            <div className="per__cartao-topo">
              <h2>Dados pessoais</h2>
              <span
                role="status"
                className={`per__estado${confirmado && !alterado ? ' per__estado--ok' : ''}`}
              >
                {alterado && 'Alterações não salvas'}
                {!alterado && confirmado && (
                  <>
                    <CheckCircle2 size={13} />
                    Alterações salvas neste dispositivo
                  </>
                )}
              </span>
            </div>

            <div className="duas-colunas">
              <div>
                <label htmlFor="per-nome">Nome completo</label>
                <div className={`campo${erros.nome ? ' campo--erro' : ''}`}>
                  <input
                    id="per-nome"
                    type="text"
                    autoComplete="name"
                    value={form.nome}
                    aria-invalid={!!erros.nome}
                    onChange={(e) => atualizar('nome', e.target.value)}
                  />
                </div>
                {erros.nome && <p className="erro-texto">{erros.nome}</p>}
              </div>
              <div>
                <label htmlFor="per-email">E-mail</label>
                <div className={`campo${erros.email ? ' campo--erro' : ''}`}>
                  <Mail size={15} />
                  <input
                    id="per-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    aria-invalid={!!erros.email}
                    onChange={(e) => atualizar('email', e.target.value)}
                  />
                </div>
                {erros.email && <p className="erro-texto">{erros.email}</p>}
              </div>
              <div>
                <label htmlFor="per-cidade">Cidade / UF</label>
                <div className="campo">
                  <MapPin size={15} />
                  <input
                    id="per-cidade"
                    type="text"
                    value={form.cidade}
                    onChange={(e) => atualizar('cidade', e.target.value)}
                  />
                </div>
              </div>
              <Seletor
                id="per-escolaridade"
                rotulo="Escolaridade"
                valor={form.escolaridade}
                opcoes={OPCOES.escolaridade}
                onChange={(v) => atualizar('escolaridade', v)}
              />
            </div>
          </section>

          <section className="cartao">
            <h2 className="per__h2">Seu plano de aprendizado</h2>
            <div className="duas-colunas">
              <Seletor
                id="per-objetivo"
                rotulo="Objetivo principal"
                valor={form.objetivo}
                opcoes={OPCOES.objetivo}
                onChange={(v) => atualizar('objetivo', v)}
              />
              <Seletor
                id="per-meta"
                rotulo="Meta semanal"
                valor={form.meta}
                opcoes={OPCOES.meta}
                onChange={(v) => atualizar('meta', v)}
              />
              <Seletor
                id="per-horario"
                rotulo="Melhor horário para estudar"
                valor={form.horario}
                opcoes={OPCOES.horario}
                onChange={(v) => atualizar('horario', v)}
              />
              <Seletor
                id="per-lembretes"
                rotulo="Lembretes de estudo"
                valor={form.lembretes}
                opcoes={OPCOES.lembretes}
                onChange={(v) => atualizar('lembretes', v)}
              />
            </div>
          </section>

          <section className="cartao">
            <h2 className="per__h2">Acessibilidade e leitura</h2>

            <Interruptor
              id="per-legendas"
              titulo="Legendas nos vídeos"
              descricao="Mostrar legendas em português automaticamente."
              ligado={form.legendas}
              onChange={(v) => atualizar('legendas', v)}
            />
            <Interruptor
              id="per-movimento"
              titulo="Reduzir movimento"
              descricao="Evitar transições e efeitos que possam causar desconforto."
              ligado={form.reduzirMovimento}
              onChange={(v) => atualizar('reduzirMovimento', v)}
            />
            <Interruptor
              id="per-contraste"
              titulo="Alto contraste"
              descricao="Aumentar a distinção entre textos, controles e superfícies."
              ligado={form.altoContraste}
              onChange={(v) => atualizar('altoContraste', v)}
            />

            <div className="per-opcao per-opcao--texto">
              <strong id="per-tamanho-t">Tamanho do texto</strong>
              <div className="segmentos" role="group" aria-labelledby="per-tamanho-t">
                {TAMANHOS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={form.tamanhoTexto === t.id ? 'ativo' : ''}
                    aria-pressed={form.tamanhoTexto === t.id}
                    onClick={() => atualizar('tamanhoTexto', t.id)}
                  >
                    {t.rotulo}
                  </button>
                ))}
              </div>
            </div>

            <div className="per__previa">
              <p>Prévia: navegação por teclado com foco sempre visível.</p>
              <button type="button" className="btn-contorno per__foco">
                Exemplo de foco
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}