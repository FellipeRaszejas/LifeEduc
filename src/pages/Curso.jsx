import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronDown, ArrowRight } from 'lucide-react'
import Topbar from '../components/topbar'

/* Coloque as fotos em public/cursos/ (ex.: public/cursos/matematica.jpg).
   Enquanto elas não existem, o cartão mostra a cor de fundo da área. */
const CURSOS = [
  {
    id: 1,
    titulo: 'Matemática para o ENEM',
    prof: 'Prof. Marcos Lima',
    area: 'Matemática',
    nivel: 'Iniciante',
    aulas: 25,
    horas: 12,
    progresso: 68,
    imagem: '/cursos/matematica.jpg',
    relevancia: 1,
  },
  {
    id: 2,
    titulo: 'Redação nota 1000',
    prof: 'Profa. Juliana Costa',
    area: 'Linguagens',
    nivel: 'Iniciante',
    aulas: 24,
    horas: 10,
    progresso: 42,
    imagem: '/cursos/redacao.jpg',
    relevancia: 2,
  },
  {
    id: 3,
    titulo: 'Introdução à programação',
    prof: 'Prof. Rafael Santos',
    area: 'Tecnologia',
    nivel: 'Iniciante',
    aulas: 20,
    horas: 16,
    progresso: 15,
    imagem: '/cursos/programacao.jpg',
    relevancia: 3,
  },
  {
    id: 4,
    titulo: 'Ciências e sustentabilidade',
    prof: 'Profa. Camila Rocha',
    area: 'Ciências',
    nivel: 'Iniciante',
    aulas: 18,
    horas: 8,
    progresso: null,
    imagem: '/cursos/ciencias.jpg',
    relevancia: 4,
  },
  {
    id: 5,
    titulo: 'Inglês para novos caminhos',
    prof: 'Profa. Beatriz Alves',
    area: 'Idiomas',
    nivel: 'Iniciante',
    aulas: 30,
    horas: 15,
    progresso: null,
    imagem: '/cursos/ingles.jpg',
    relevancia: 5,
  },
  {
    id: 6,
    titulo: 'Educação financeira',
    prof: 'Prof. Diego Martins',
    area: 'Vida e carreira',
    nivel: 'Iniciante',
    aulas: 16,
    horas: 8,
    progresso: null,
    imagem: '/cursos/financas.jpg',
    relevancia: 6,
  },
]

const AREAS = ['Todas as áreas', 'Matemática', 'Linguagens', 'Tecnologia', 'Ciências', 'Idiomas', 'Vida e carreira']
const NIVEIS = ['Iniciante', 'Intermediário', 'Avançado']

const ORDENS = {
  relevancia: { rotulo: 'Mais relevantes', fn: (a, b) => a.relevancia - b.relevancia },
  curtos: { rotulo: 'Menor duração', fn: (a, b) => a.horas - b.horas },
  aulas: { rotulo: 'Mais aulas', fn: (a, b) => b.aulas - a.aulas },
  nome: { rotulo: 'Ordem alfabética', fn: (a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR') },
}

const COR_TAG = {
  Linguagens: 'roxo',
  Tecnologia: 'verde',
}

const IMAGEM_CLASSE = {
  Matemática: 'matematica',
  Linguagens: 'linguagens',
  Tecnologia: 'tecnologia',
  Ciências: 'ciencias',
  Idiomas: 'idiomas',
  'Vida e carreira': 'carreira',
}

function normalizar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export default function Curso() {
  const [busca, setBusca] = useState('')
  const [area, setArea] = useState('Todas as áreas')
  const [niveis, setNiveis] = useState([])
  const [ordem, setOrdem] = useState('relevancia')
  const [aba, setAba] = useState('todos')

  const meusCursos = CURSOS.filter((c) => c.progresso !== null).length

  const lista = useMemo(() => {
    const termo = normalizar(busca.trim())
    return CURSOS.filter((c) => {
      if (aba === 'meus' && c.progresso === null) return false
      if (area !== 'Todas as áreas' && c.area !== area) return false
      if (niveis.length > 0 && !niveis.includes(c.nivel)) return false
      if (termo) {
        const alvo = normalizar(`${c.titulo} ${c.prof} ${c.area}`)
        if (!alvo.includes(termo)) return false
      }
      return true
    }).sort(ORDENS[ordem].fn)
  }, [busca, area, niveis, ordem, aba])

  const filtrosAtivos = busca || area !== 'Todas as áreas' || niveis.length > 0

  function alternarNivel(nivel) {
    setNiveis((atual) =>
      atual.includes(nivel) ? atual.filter((n) => n !== nivel) : [...atual, nivel]
    )
  }

  function limpar() {
    setBusca('')
    setArea('Todas as áreas')
    setNiveis([])
  }

  return (
    <div className="cat">
      <Topbar />

      <header className="cat__titulo">
        <span className="sobretitulo">SEU ESPAÇO DE APRENDIZAGEM</span>
        <h1>Catálogo de cursos</h1>
        <p className="subtitulo">Aprender algo novo é abrir uma porta. Encontre a sua.</p>
      </header>

      <div className="cat__busca">
        <div>
          <label htmlFor="cat-busca">Buscar cursos</label>
          <div className="campo">
            <Search size={16} />
            <input
              id="cat-busca"
              type="search"
              placeholder="Busque por tema, habilidade ou professor"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="cat-ordem">Ordenar por</label>
          <div className="campo campo--select">
            <select id="cat-ordem" value={ordem} onChange={(e) => setOrdem(e.target.value)}>
              {Object.entries(ORDENS).map(([chave, { rotulo }]) => (
                <option key={chave} value={chave}>
                  {rotulo}
                </option>
              ))}
            </select>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      <div className="cat__grade">
        <aside className="cartao cat__filtros" aria-label="Filtros">
          <div className="cat__filtros-topo">
            <h2>Filtros</h2>
            <button type="button" className="link" onClick={limpar} disabled={!filtrosAtivos}>
              Limpar
            </button>
          </div>

          <fieldset className="cat__grupo">
            <legend>Área de conhecimento</legend>
            {AREAS.map((nome) => (
              <label key={nome} className="check">
                <input
                  type="radio"
                  name="area"
                  checked={area === nome}
                  onChange={() => setArea(nome)}
                />
                {nome}
              </label>
            ))}
          </fieldset>

          <fieldset className="cat__grupo">
            <legend>Nível</legend>
            {NIVEIS.map((nome) => (
              <label key={nome} className="check">
                <input
                  type="checkbox"
                  checked={niveis.includes(nome)}
                  onChange={() => alternarNivel(nome)}
                />
                {nome}
              </label>
            ))}
          </fieldset>

          <div className="cat__grupo">
            <span className="cat__legenda">Acesso</span>
            <span className="tag tag--verde">Todos gratuitos</span>
            <p className="cat__acesso">Vídeos com legendas e materiais em formatos acessíveis.</p>
          </div>
        </aside>

        <section className="cat__resultado">
          <div className="cat__lista-topo">
            <p role="status">
              {lista.length} {lista.length === 1 ? 'curso' : 'cursos'} para explorar
            </p>
            <div className="segmentos">
              <button
                type="button"
                className={aba === 'todos' ? 'ativo' : ''}
                onClick={() => setAba('todos')}
              >
                Todos os cursos
              </button>
              <button
                type="button"
                className={aba === 'meus' ? 'ativo' : ''}
                onClick={() => setAba('meus')}
              >
                Meus cursos ({meusCursos})
              </button>
            </div>
          </div>

          {lista.length === 0 ? (
            <div className="cartao cat__vazio">
              <p>Nenhum curso encontrado com esses filtros. Tente outra palavra ou limpe a seleção.</p>
              <button type="button" className="btn-contorno" onClick={limpar}>
                Limpar filtros
              </button>
            </div>
          ) : (
            <>
              <div className="cursos">
                {lista.map((c) => {
                  const emAndamento = c.progresso !== null
                  return (
                    <article key={c.id} className="curso">
                      <div
                        className={`curso__imagem cat__imagem cat__imagem--${IMAGEM_CLASSE[c.area]}`}
                        style={{ backgroundImage: `url(${c.imagem})` }}
                        role="img"
                        aria-label={`Imagem do curso ${c.titulo}`}
                      />
                      <div className="curso__corpo">
                        <span className={`tag tag--${COR_TAG[c.area] || 'azul'}`}>{c.area}</span>
                        <h3>{c.titulo}</h3>
                        <p className="curso__prof">{c.prof}</p>
                        <p className="curso__meta">
                          {c.aulas} aulas • {c.horas} h • {c.nivel}
                        </p>

                        {emAndamento ? (
                          <div className="progresso">
                            <div className="progresso__rotulos">
                              <span>Concluído</span>
                              <strong>{c.progresso}%</strong>
                            </div>
                            <div className="progresso__barra">
                              <div
                                className="progresso__preenchido"
                                style={{ width: `${c.progresso}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <p className="cat__gratis">Gratuito • Com atividades práticas</p>
                        )}

                        <Link to="/aulas" className="btn btn--contorno cat__botao">
                          <ArrowRight size={14} />
                          {emAndamento ? 'Continuar curso' : 'Conhecer curso'}
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>
              <p className="cat__fim">
                Você viu todos os cursos desta seleção. Novos conteúdos em breve.
              </p>
            </>
          )}
        </section>
      </div>
    </div>
  )
}