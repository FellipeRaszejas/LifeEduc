import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Target, Clock, ListChecks, Flame, ArrowRight } from 'lucide-react'
import Topbar from '../components/topbar'

/* Dados fictícios para demonstração */
const PONTOS = [
  { rotulo: 'Ago 1', valor: 40 },
  { rotulo: 'Ago 15', valor: 52 },
  { rotulo: 'Set 1', valor: 49 },
  { rotulo: 'Set 15', valor: 66 },
  { rotulo: 'Set 30', valor: 74 },
  { rotulo: 'Out 8', valor: 82 },
]

const MESES = { Ago: 'agosto', Set: 'setembro', Out: 'outubro' }

const PERIODOS = [
  { id: 'mes', rotulo: 'Este mês', inicio: 0 },
  { id: 'dias30', rotulo: 'Últimos 30 dias', inicio: 2 },
  { id: 'tudo', rotulo: 'Todo o período', inicio: 0 },
]

const CURSOS = [
  { nome: 'Matemática para o ENEM', progresso: 68, acertos: 86, horas: 18 },
  { nome: 'Redação nota 1000', progresso: 42, acertos: 78, horas: 10 },
  { nome: 'Introdução à programação', progresso: 15, acertos: 80, horas: 4 },
]

const META = { feitoMin: 270, metaMin: 360 }

function formatarMinutos(total) {
  const h = Math.floor(total / 60)
  const m = total % 60
  if (h === 0) return `${m}min`
  return m === 0 ? `${h}h` : `${h}h ${String(m).padStart(2, '0')}min`
}

/* ---------- Gráfico de linha em SVG ---------- */
const L = { largura: 600, altura: 230, esq: 38, dir: 24, topo: 28, base: 32 }
const Y_MIN = 40
const Y_MAX = 100

function Grafico({ pontos }) {
  const areaW = L.largura - L.esq - L.dir
  const areaH = L.altura - L.topo - L.base
  const x = (i) => L.esq + (pontos.length === 1 ? areaW / 2 : (i / (pontos.length - 1)) * areaW)
  const y = (v) => L.topo + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * areaH
  const linha = pontos.map((p, i) => `${x(i)},${y(p.valor)}`).join(' ')
  const ultimo = pontos[pontos.length - 1]
  const ux = x(pontos.length - 1)
  const uy = y(ultimo.valor)

  return (
    <svg
      className="des-grafico"
      viewBox={`0 0 ${L.largura} ${L.altura}`}
      role="img"
      aria-label={`Gráfico de linha da taxa de acerto, de ${pontos[0].valor}% a ${ultimo.valor}%`}
    >
      {[40, 60, 80, 100].map((v) => (
        <g key={v}>
          <line x1={L.esq} x2={L.largura - L.dir} y1={y(v)} y2={y(v)} className="des-grafico__grade" />
          <text x={L.esq - 8} y={y(v) + 3} textAnchor="end" className="des-grafico__eixo">
            {v}
          </text>
        </g>
      ))}
      {pontos.map((p, i) => (
        <text key={p.rotulo} x={x(i)} y={L.altura - 10} textAnchor="middle" className="des-grafico__eixo">
          {p.rotulo}
        </text>
      ))}
      <polyline points={linha} className="des-grafico__linha" />
      <circle cx={ux} cy={uy} r="4" className="des-grafico__ponto" />
      <g transform={`translate(${ux - 20}, ${uy - 32})`}>
        <rect width="40" height="20" rx="6" className="des-grafico__balao" />
        <text x="20" y="14" textAnchor="middle" className="des-grafico__balao-texto">
          {ultimo.valor}%
        </text>
      </g>
    </svg>
  )
}

/* ---------- Anel da meta semanal ---------- */
function Anel({ pct, rotulo }) {
  const raio = 52
  const circ = 2 * Math.PI * raio
  return (
    <div className="des-anel">
      <svg viewBox="0 0 140 140" role="img" aria-label={`Meta semanal: ${pct}% concluída`}>
        <circle cx="70" cy="70" r={raio} className="des-anel__fundo" />
        <circle
          cx="70"
          cy="70"
          r={raio}
          className="des-anel__valor"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct / 100)}
          transform="rotate(-90 70 70)"
        />
      </svg>
      <div className="des-anel__texto">
        <strong>{pct}%</strong>
        <small>{rotulo}</small>
      </div>
    </div>
  )
}

export default function Desempenho() {
  const [periodo, setPeriodo] = useState('mes')

  const inicio = PERIODOS.find((p) => p.id === periodo).inicio
  const pontos = PONTOS.slice(inicio)
  const primeiro = pontos[0]
  const ultimo = pontos[pontos.length - 1]
  const mesDe = (rotulo) => MESES[rotulo.split(' ')[0]]

  const pctMeta = Math.round((META.feitoMin / META.metaMin) * 100)
  const faltam = META.metaMin - META.feitoMin

  function exportar() {
    const linhas = [
      ['Curso', 'Progresso (%)', 'Acertos (%)', 'Estudo (h)'],
      ...CURSOS.map((c) => [c.nome, c.progresso, c.acertos, c.horas]),
    ]
    const csv = '\uFEFF' + linhas.map((l) => l.join(';')).join('\r\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'desempenho-2026-10-08.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="des">
      <Topbar />

      <header className="des__topo">
        <div>
          <span className="sobretitulo">SEU ESPAÇO DE APRENDIZAGEM</span>
          <h1>Seu desempenho</h1>
          <p className="subtitulo">Cada pequeno avanço conta. Acompanhe o que você já conquistou.</p>
        </div>
        <button type="button" className="btn-contorno" onClick={exportar}>
          <Download size={14} />
          Exportar relatório
        </button>
      </header>

      <div className="des__filtros">
        <div className="segmentos">
          {PERIODOS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={periodo === p.id ? 'ativo' : ''}
              onClick={() => setPeriodo(p.id)}
            >
              {p.rotulo}
            </button>
          ))}
        </div>
        <span className="des__atualizado">Outubro de 2026 • Atualizado em 08/10</span>
      </div>

      <section className="metricas" aria-label="Indicadores">
        <article className="metrica">
          <div className="metrica__topo">
            Taxa de acerto geral
            <Target size={16} className="metrica__icone--azul" />
          </div>
          <strong className="metrica__valor">82%</strong>
          <span className="metrica__detalhe metrica__detalhe--azul">+8 pontos vs. setembro</span>
        </article>
        <article className="metrica">
          <div className="metrica__topo">
            Tempo total de estudo
            <Clock size={16} className="metrica__icone--verde" />
          </div>
          <strong className="metrica__valor">32h</strong>
          <span className="metrica__detalhe metrica__detalhe--verde">Desde sua chegada em agosto</span>
        </article>
        <article className="metrica">
          <div className="metrica__topo">
            Atividades concluídas
            <ListChecks size={16} className="metrica__icone--azul" />
          </div>
          <strong className="metrica__valor">48</strong>
          <span className="metrica__detalhe metrica__detalhe--azul">120 questões respondidas</span>
        </article>
        <article className="metrica">
          <div className="metrica__topo">
            Sequência atual
            <Flame size={16} className="metrica__icone--roxo" />
          </div>
          <strong className="metrica__valor">7 dias</strong>
          <span className="metrica__detalhe metrica__detalhe--roxo">Seu recorde é de 12 dias</span>
        </article>
      </section>

      <div className="des__grade">
        <section className="cartao">
          <div className="des__cartao-topo">
            <h2>Você está evoluindo</h2>
            <span className="des__legenda">Taxa de acerto (%)</span>
          </div>
          <Grafico pontos={pontos} />
          <ul className="sr-only">
            {pontos.map((p) => (
              <li key={p.rotulo}>
                {p.rotulo}: {p.valor}%
              </li>
            ))}
          </ul>
          <p className="des__resumo">
            De {primeiro.valor}% em {mesDe(primeiro.rotulo)} para {ultimo.valor}% em{' '}
            {mesDe(ultimo.rotulo)}. Continue praticando!
          </p>
        </section>

        <section className="cartao">
          <h2 className="des__titulo-lateral">Sua meta semanal</h2>
          <Anel pct={pctMeta} rotulo={`${formatarMinutos(META.feitoMin)} de ${formatarMinutos(META.metaMin)}`} />
          <p className="des__meta-texto">
            Faltam {formatarMinutos(faltam)} para sua meta. Você tem até domingo, 11/10.
          </p>
        </section>
      </div>

      <div className="des__grade">
        <section className="cartao">
          <h2 className="des__titulo-tabela">Desempenho por curso</h2>
          <div className="des__tabela-rolagem">
            <table className="des__tabela">
              <thead>
                <tr>
                  <th scope="col">Curso</th>
                  <th scope="col">Progresso</th>
                  <th scope="col">Acertos</th>
                  <th scope="col">Estudo</th>
                </tr>
              </thead>
              <tbody>
                {CURSOS.map((c) => (
                  <tr key={c.nome}>
                    <th scope="row">{c.nome}</th>
                    <td className="des__azul">{c.progresso}%</td>
                    <td className="des__verde">{c.acertos}%</td>
                    <td>{c.horas}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="des__nota">
            A taxa geral de 82% considera as 120 questões respondidas, ponderadas por curso.
          </p>
        </section>

        <section className="des-passo">
          <span className="des-passo__tag">Seu próximo passo</span>
          <h2>Fortaleça porcentagem</h2>
          <p>
            Você está indo bem em regra de três. Reserve 30 minutos para aplicar esse raciocínio aos
            descontos.
          </p>
          <Link to="/exercicios" className="btn-azul">
            <ArrowRight size={14} />
            Praticar porcentagem
          </Link>
        </section>
      </div>
    </div>
  )
}