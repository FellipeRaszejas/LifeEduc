import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  BookOpen,
  Users,
  TrendingUp,
  HeartHandshake,
  MessageCircle,
  ChevronDown,
  X,
} from 'lucide-react'
import Topbar from '../components/topbar'

/* Dados fictícios para demonstração */
const CONTEUDOS_INICIAIS = [
  { id: 1, titulo: 'Porcentagem na vida real', detalhe: 'Aula 16 • Módulo 3', formato: 'Vídeo', estado: 'Publicado' },
  { id: 2, titulo: 'Lista de prática — Módulo 3', detalhe: 'Material de apoio', formato: 'PDF', estado: 'Publicado' },
  { id: 3, titulo: 'Juros simples', detalhe: 'Aula 19 • Módulo 3', formato: 'Vídeo', estado: 'Publicado' },
  { id: 4, titulo: 'Simulado extra: porcentagem', detalhe: 'Atividade complementar', formato: 'Quiz', estado: 'Rascunho' },
  { id: 5, titulo: 'Regra de três composta', detalhe: 'Aula 21 • Módulo 4', formato: 'Vídeo', estado: 'Publicado' },
  { id: 6, titulo: 'Revisão de proporção', detalhe: 'Atividade complementar', formato: 'Quiz', estado: 'Rascunho' },
]

const ALUNOS = [
  { nome: 'Ana Souza', iniciais: 'AS', progresso: 68, acertos: 86, acesso: 'Hoje', apoio: false },
  { nome: 'Lucas Oliveira', iniciais: 'LO', progresso: 52, acertos: 71, acesso: 'Hoje', apoio: true },
  { nome: 'Marina Santos', iniciais: 'MS', progresso: 74, acertos: 89, acesso: 'Ontem', apoio: false },
  { nome: 'Pedro Almeida', iniciais: 'PA', progresso: 35, acertos: 62, acesso: 'Há 5 dias', apoio: true },
  { nome: 'Beatriz Lima', iniciais: 'BL', progresso: 76, acertos: 91, acesso: 'Hoje', apoio: false },
  { nome: 'Camila Rocha', iniciais: 'CR', progresso: 58, acertos: 74, acesso: 'Há 2 dias', apoio: false },
  { nome: 'Juliana Costa', iniciais: 'JC', progresso: 44, acertos: 66, acesso: 'Há 4 dias', apoio: true },
  { nome: 'Rafael Santos', iniciais: 'RS', progresso: 81, acertos: 93, acesso: 'Hoje', apoio: false },
  { nome: 'Diego Martins', iniciais: 'DM', progresso: 39, acertos: 64, acesso: 'Há 6 dias', apoio: true },
]

const PRESENCA = [
  { dia: 'Seg', valor: 22 },
  { dia: 'Ter', valor: 26 },
  { dia: 'Qua', valor: 24 },
  { dia: 'Qui', valor: 28 },
]

const TURMA_TOTAL = 36
const CURSOS = ['Matemática para o ENEM', 'Redação nota 1000']
const FORMATOS = ['Vídeo', 'PDF', 'Quiz']
const VAZIO = { titulo: '', detalhe: '', formato: 'Vídeo', estado: 'Rascunho' }

export default function PainelEducador() {
  const [curso, setCurso] = useState(CURSOS[0])
  const [conteudos, setConteudos] = useState(CONTEUDOS_INICIAIS)
  const [todosConteudos, setTodosConteudos] = useState(false)
  const [todosAlunos, setTodosAlunos] = useState(false)
  const [modal, setModal] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState(VAZIO)

  useEffect(() => {
    if (!modal) return undefined
    const fechar = (e) => e.key === 'Escape' && setModal(false)
    window.addEventListener('keydown', fechar)
    return () => window.removeEventListener('keydown', fechar)
  }, [modal])

  const rascunhos = conteudos.filter((c) => c.estado === 'Rascunho').length
  const precisamApoio = ALUNOS.filter((a) => a.apoio).length
  const conteudosVisiveis = todosConteudos ? conteudos : conteudos.slice(0, 4)
  const alunosVisiveis = todosAlunos ? ALUNOS : ALUNOS.slice(0, 5)
  const picoPresenca = TURMA_TOTAL

  function abrirNovo() {
    setEditando(null)
    setForm(VAZIO)
    setModal(true)
  }

  function abrirEdicao(item) {
    setEditando(item.id)
    setForm({ titulo: item.titulo, detalhe: item.detalhe, formato: item.formato, estado: item.estado })
    setModal(true)
  }

  function salvar(e) {
    e.preventDefault()
    const titulo = form.titulo.trim()
    if (!titulo) return
    const dados = { ...form, titulo, detalhe: form.detalhe.trim() || 'Sem detalhe' }
    if (editando === null) {
      setConteudos((atuais) => [{ id: Date.now(), ...dados }, ...atuais])
    } else {
      setConteudos((atuais) => atuais.map((c) => (c.id === editando ? { ...c, ...dados } : c)))
    }
    setModal(false)
  }

  return (
    <div className="edu">
      <Topbar />

      <header className="edu__titulo">
        <div>
          <span className="sobretitulo">SEU ESPAÇO DE APRENDIZAGEM</span>
          <h1>Painel do educador</h1>
          <p className="subtitulo">Olá, Marcos! Seu olhar faz diferença na jornada de cada estudante.</p>
        </div>
        <button type="button" className="btn-azul" onClick={abrirNovo}>
          <Plus size={16} />
          Criar conteúdo
        </button>
      </header>

      <div className="edu__contexto">
        <label className="edu__curso">
          <span className="sr-only">Curso</span>
          <select value={curso} onChange={(e) => setCurso(e.target.value)}>
            {CURSOS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <ChevronDown size={12} />
        </label>
        <span className="edu__turma">Turma ENEM 2026 • {TURMA_TOTAL} alunos</span>
        <span className="edu__atualizado">Última atualização: 08/10/2026, 18h45</span>
      </div>

      <section className="metricas" aria-label="Indicadores da turma">
        <article className="metrica">
          <div className="metrica__topo">
            Cursos publicados
            <BookOpen size={16} className="metrica__icone--azul" />
          </div>
          <strong className="metrica__valor">2</strong>
          <span className="metrica__detalhe metrica__detalhe--azul">43 aulas disponíveis no total</span>
        </article>
        <article className="metrica">
          <div className="metrica__topo">
            Estudantes na turma
            <Users size={16} className="metrica__icone--verde" />
          </div>
          <strong className="metrica__valor">{TURMA_TOTAL}</strong>
          <span className="metrica__detalhe metrica__detalhe--verde">28 ativos nos últimos 7 dias</span>
        </article>
        <article className="metrica">
          <div className="metrica__topo">
            Progresso médio
            <TrendingUp size={16} className="metrica__icone--azul" />
          </div>
          <strong className="metrica__valor">61%</strong>
          <span className="metrica__detalhe metrica__detalhe--azul">{curso}</span>
        </article>
        <article className="metrica">
          <div className="metrica__topo">
            Precisam de apoio
            <HeartHandshake size={16} className="metrica__icone--roxo" />
          </div>
          <strong className="metrica__valor">{precisamApoio}</strong>
          <span className="metrica__detalhe metrica__detalhe--roxo">Sinais para acolher, não rotular</span>
        </article>
      </section>

      <div className="edu__grade">
        <section className="cartao">
          <div className="edu__cartao-topo">
            <h2>Conteúdos do curso</h2>
            <button type="button" className="link" onClick={() => setTodosConteudos((v) => !v)}>
              {todosConteudos ? 'Ver menos' : `Ver todos (25 aulas + ${rascunhos} ${rascunhos === 1 ? 'rascunho' : 'rascunhos'}) →`}
            </button>
          </div>
          <div className="edu__rolagem">
            <table className="edu__tabela">
              <thead>
                <tr>
                  <th scope="col">Conteúdo</th>
                  <th scope="col">Formato</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
                {conteudosVisiveis.map((c) => (
                  <tr key={c.id}>
                    <th scope="row">
                      <strong>{c.titulo}</strong>
                      <small>{c.detalhe}</small>
                    </th>
                    <td>{c.formato}</td>
                    <td>
                      <span className={`tag ${c.estado === 'Publicado' ? 'tag--verde' : 'tag--amarela'}`}>
                        {c.estado}
                      </span>
                    </td>
                    <td>
                      <button type="button" className="link" onClick={() => abrirEdicao(c)}>
                        Editar<span className="sr-only">: {c.titulo}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="cartao">
          <h2 className="edu__h2">Presença na semana</h2>
          <p className="edu__sub">Estudantes ativos por dia • 05 a 08/10</p>
          <div
            className="edu-barras"
            role="img"
            aria-label={`Estudantes ativos por dia: ${PRESENCA.map((p) => `${p.dia} ${p.valor}`).join(', ')}`}
          >
            {PRESENCA.map((p, i) => (
              <div key={p.dia} className="edu-barras__coluna">
                <span className="edu-barras__valor">{p.valor}</span>
                <div className="edu-barras__trilho">
                  <div
                    className={`edu-barras__barra${i === PRESENCA.length - 1 ? ' edu-barras__barra--hoje' : ''}`}
                    style={{ height: `${(p.valor / picoPresenca) * 100}%` }}
                  />
                </div>
                <span className="edu-barras__dia">{p.dia}</span>
              </div>
            ))}
          </div>
          <p className="edu__resumo">28 de {TURMA_TOTAL} estudantes ativos nesta semana.</p>
        </section>
      </div>

      <div className="edu__grade">
        <section className="cartao">
          <div className="edu__cartao-topo">
            <h2>Acompanhamento dos alunos</h2>
            <button type="button" className="link" onClick={() => setTodosAlunos((v) => !v)}>
              {todosAlunos ? 'Ver menos' : 'Ver turma completa →'}
            </button>
          </div>
          <div className="edu__rolagem">
            <table className="edu__tabela edu__tabela--alunos">
              <thead>
                <tr>
                  <th scope="col">Estudante</th>
                  <th scope="col">Progresso</th>
                  <th scope="col">Acertos</th>
                  <th scope="col">Acesso</th>
                  <th scope="col">Acompanhamento</th>
                </tr>
              </thead>
              <tbody>
                {alunosVisiveis.map((a) => (
                  <tr key={a.nome}>
                    <th scope="row">
                      <span className="edu__aluno">
                        <span className="edu__avatar" aria-hidden="true">
                          {a.iniciais}
                        </span>
                        {a.nome}
                      </span>
                    </th>
                    <td className="edu__azul">{a.progresso}%</td>
                    <td className="edu__verde">{a.acertos}%</td>
                    <td>{a.acesso}</td>
                    <td>
                      <span className={`tag ${a.apoio ? 'tag--amarela' : 'tag--verde'}`}>
                        {a.apoio ? 'Precisa de apoio' : 'No ritmo'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="edu__nota">
            Sinais de apoio: dificuldade recorrente ou ausência de 5 dias. Use como convite à conversa,
            nunca como rótulo ou isolada.
          </p>
        </section>

        <section className="edu-cuidado">
          <span className="edu-cuidado__tag">
            {precisamApoio} estudantes para acolher
          </span>
          <h2>Uma conversa pode destravar o aprendizado</h2>
          <p>
            Lucas pediu ajuda sobre porcentagem. Pedro está sem acessar há 5 dias. Envie uma mensagem
            breve e ofereça apoio.
          </p>
          <Link to="/comunidade" className="btn-azul">
            <MessageCircle size={14} />
            Enviar mensagem
          </Link>
          <small>
            {rascunhos} {rascunhos === 1 ? 'rascunho aguarda' : 'rascunhos aguardam'} sua revisão.
            Planejado para 09/10/2026.
          </small>
        </section>
      </div>

      {modal && (
        <div className="modal-fundo" onClick={(e) => e.target === e.currentTarget && setModal(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="edu-modal-titulo">
            <div className="modal__topo">
              <h2 id="edu-modal-titulo">{editando === null ? 'Criar conteúdo' : 'Editar conteúdo'}</h2>
              <button type="button" className="icone-btn" aria-label="Fechar" onClick={() => setModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form className="modal__form" onSubmit={salvar}>
              <label htmlFor="edu-titulo">Título *</label>
              <div className="campo">
                <input
                  id="edu-titulo"
                  type="text"
                  placeholder="Ex.: Porcentagem na vida real"
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                  required
                  autoFocus
                />
              </div>

              <label htmlFor="edu-detalhe">Detalhe</label>
              <div className="campo">
                <input
                  id="edu-detalhe"
                  type="text"
                  placeholder="Ex.: Aula 20 • Módulo 3"
                  value={form.detalhe}
                  onChange={(e) => setForm({ ...form, detalhe: e.target.value })}
                />
              </div>

              <div className="duas-colunas">
                <div>
                  <label htmlFor="edu-formato">Formato</label>
                  <div className="campo campo--select">
                    <select
                      id="edu-formato"
                      value={form.formato}
                      onChange={(e) => setForm({ ...form, formato: e.target.value })}
                    >
                      {FORMATOS.map((f) => (
                        <option key={f}>{f}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} />
                  </div>
                </div>
                <div>
                  <label htmlFor="edu-estado">Estado</label>
                  <div className="campo campo--select">
                    <select
                      id="edu-estado"
                      value={form.estado}
                      onChange={(e) => setForm({ ...form, estado: e.target.value })}
                    >
                      <option>Rascunho</option>
                      <option>Publicado</option>
                    </select>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn--primario">
                Salvar conteúdo
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}