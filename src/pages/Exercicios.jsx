import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Sparkles,
  Heart,
  RotateCcw,
} from 'lucide-react'
import Topbar from '../components/topbar'

const QUESTOES = [
  {
    enunciado: 'Uma mochila custa R$ 150 e está com 20% de desconto. Qual é o preço final?',
    instrucao: 'Calcule primeiro o valor do desconto e depois subtraia do preço original. Escolha uma alternativa.',
    opcoes: ['R$ 30,00', 'R$ 130,00', 'R$ 120,00', 'R$ 145,00'],
    correta: 2,
    explicacao:
      '20% de 150 = 0,20 × 150 = R$ 30 de desconto. Assim, R$ 150 − R$ 30 = R$ 120. A alternativa A mostra apenas o desconto, não o preço final.',
    dica: '20% é o mesmo que 20 a cada 100. Para calcular, transforme a taxa em 0,20.',
  },
  {
    enunciado: 'Quanto é 25% de 80?',
    instrucao: 'Lembre que 25% é o mesmo que a quarta parte. Escolha uma alternativa.',
    opcoes: ['15', '20', '25', '40'],
    correta: 1,
    explicacao: '25% = 1/4. Dividindo 80 por 4, o resultado é 20.',
    dica: '25% é a quarta parte de um valor: divida por 4.',
  },
  {
    enunciado: 'Um produto de R$ 200 teve aumento de 10%. Qual é o novo preço?',
    instrucao: 'Calcule o aumento e some ao preço original. Escolha uma alternativa.',
    opcoes: ['R$ 210,00', 'R$ 220,00', 'R$ 230,00', 'R$ 202,00'],
    correta: 1,
    explicacao: '10% de 200 = R$ 20 de aumento. Assim, R$ 200 + R$ 20 = R$ 220.',
    dica: '10% de um valor é o mesmo que dividir por 10.',
  },
  {
    enunciado: 'Em uma prova com 40 questões, Marina acertou 75%. Quantas questões ela acertou?',
    instrucao: 'Transforme a porcentagem em fração ou decimal. Escolha uma alternativa.',
    opcoes: ['25', '28', '30', '32'],
    correta: 2,
    explicacao: '75% de 40 = 0,75 × 40 = 30. Marina acertou 30 questões.',
    dica: '75% é igual a 3/4. Divida 40 por 4 e multiplique por 3.',
  },
  {
    enunciado: 'O preço de um caderno subiu de R$ 50 para R$ 60. De quantos por cento foi o aumento?',
    instrucao: 'Compare o aumento com o preço original. Escolha uma alternativa.',
    opcoes: ['10%', '12%', '20%', '25%'],
    correta: 2,
    explicacao: 'O aumento foi de R$ 10. Como 10 ÷ 50 = 0,20, o aumento foi de 20%.',
    dica: 'Divida o valor do aumento pelo preço original, não pelo novo.',
  },
]

const LETRAS = ['A', 'B', 'C', 'D']

function formatarTempo(segundos) {
  const m = String(Math.floor(segundos / 60)).padStart(2, '0')
  const s = String(segundos % 60).padStart(2, '0')
  return `${m}:${s}`
}

export default function Exercicios() {
  const [indice, setIndice] = useState(0)
  const [escolha, setEscolha] = useState(null)
  const [enviadas, setEnviadas] = useState(0)
  const [acertos, setAcertos] = useState(0)
  const [dicaVisivel, setDicaVisivel] = useState(false)
  const [finalizado, setFinalizado] = useState(false)
  const [segundos, setSegundos] = useState(0)

  useEffect(() => {
    if (finalizado) return undefined
    const id = setInterval(() => setSegundos((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [finalizado])

  const questao = QUESTOES[indice]
  const respondida = escolha !== null
  const acertou = respondida && escolha === questao.correta
  const ultima = indice === QUESTOES.length - 1

  function responder(i) {
    if (respondida) return
    setEscolha(i)
    setEnviadas((n) => n + 1)
    if (i === questao.correta) setAcertos((n) => n + 1)
  }

  function avancar() {
    if (ultima) {
      setFinalizado(true)
      return
    }
    setIndice((n) => n + 1)
    setEscolha(null)
    setDicaVisivel(false)
  }

  function recomecar() {
    setIndice(0)
    setEscolha(null)
    setEnviadas(0)
    setAcertos(0)
    setDicaVisivel(false)
    setFinalizado(false)
    setSegundos(0)
  }

  function classeOpcao(i) {
    let classe = 'ex-opcao'
    if (!respondida) return classe
    if (i === questao.correta) classe += ' ex-opcao--correta'
    else if (i === escolha) classe += ' ex-opcao--errada'
    else classe += ' ex-opcao--apagada'
    return classe
  }

  function rotuloOpcao(i) {
    if (!respondida) return null
    if (i === escolha && i === questao.correta) return 'Selecionada • Correta'
    if (i === escolha) return 'Selecionada • Incorreta'
    if (i === questao.correta) return 'Resposta correta'
    return null
  }

  return (
    <div className="ex">
      <Topbar />

      <header className="ex__titulo">
        <div>
          <span className="sobretitulo">SEU ESPAÇO DE APRENDIZAGEM</span>
          <h1>Exercícios e questionários</h1>
          <p className="subtitulo">Matemática para o ENEM · Módulo 3 · Prática de porcentagem</p>
        </div>
        <Link to="/aulas" className="btn-contorno">
          <ArrowLeft size={14} />
          Voltar à aula
        </Link>
      </header>

      <div className="ex__grade">
        <section className="cartao ex__principal">
          {finalizado ? (
            <div className="ex-resultado">
              <span className="ex-resultado__icone">
                <CheckCircle2 size={26} />
              </span>
              <h2>Prática concluída</h2>
              <p>
                Você acertou <strong>{acertos}</strong> de {QUESTOES.length} questões em{' '}
                {formatarTempo(segundos)}.
              </p>
              <div className="ex-resultado__acoes">
                <button type="button" className="btn-contorno" onClick={recomecar}>
                  <RotateCcw size={14} />
                  Refazer prática
                </button>
                <Link to="/aulas" className="btn-azul">
                  Voltar à aula
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="ex__topo">
                <strong>
                  Questão {indice + 1} de {QUESTOES.length}
                </strong>
                <span className="tag tag--roxo">Aplicação no cotidiano</span>
              </div>

              <div
                className="ex__segmentos"
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={QUESTOES.length}
                aria-valuenow={indice + 1}
              >
                {QUESTOES.map((_, i) => (
                  <span
                    key={i}
                    className={`ex__segmento${i <= indice ? ' ex__segmento--feito' : ''}`}
                  />
                ))}
              </div>

              <h2 className="ex__enunciado">{questao.enunciado}</h2>
              <p className="ex__instrucao">{questao.instrucao}</p>

              <div className="ex__opcoes" role="radiogroup" aria-label="Alternativas">
                {questao.opcoes.map((texto, i) => (
                  <button
                    key={texto}
                    type="button"
                    role="radio"
                    aria-checked={escolha === i}
                    disabled={respondida}
                    className={classeOpcao(i)}
                    onClick={() => responder(i)}
                  >
                    <span className="ex-opcao__marca">
                      {respondida && i === questao.correta && <CheckCircle2 size={16} />}
                      {respondida && i === escolha && i !== questao.correta && <XCircle size={16} />}
                    </span>
                    <span className="ex-opcao__letra">{LETRAS[i]}</span>
                    <span className="ex-opcao__texto">{texto}</span>
                    {rotuloOpcao(i) && <small className="ex-opcao__rotulo">{rotuloOpcao(i)}</small>}
                  </button>
                ))}
              </div>

              {respondida && (
                <div
                  className={`ex__feedback ${acertou ? 'ex__feedback--ok' : 'ex__feedback--erro'}`}
                  role="status"
                >
                  <h3>
                    {acertou ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    {acertou ? 'Muito bem! Você acertou.' : 'Quase lá. Vamos revisar.'}
                  </h3>
                  <p>{questao.explicacao}</p>
                </div>
              )}

              <div className="ex__rodape">
                <Link to="/aulas" className="btn-contorno">
                  <BookOpen size={14} />
                  Revisar aula
                </Link>
                <button type="button" className="btn-azul" disabled={!respondida} onClick={avancar}>
                  {ultima ? 'Ver resultado' : 'Próxima questão'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}
        </section>

        <aside className="ex__lateral">
          <section className="cartao">
            <h2 className="ex__lateral-titulo">Sua prática</h2>
            <p className="ex__tempo" aria-live="off">
              {formatarTempo(segundos)}
            </p>
            <p className="ex__tempo-sub">Tempo de estudo · sem limite</p>
            <div className="ex__placar">
              <span>
                {enviadas} {enviadas === 1 ? 'resposta enviada' : 'respostas enviadas'}
              </span>
              <strong>
                {acertos} {acertos === 1 ? 'acerto' : 'acertos'}
              </strong>
            </div>
            <p className="ex__tempo-sub">Errar faz parte. Revise as explicações e tente de novo ao terminar.</p>
          </section>

          {!finalizado && (
            <section className="duvida">
              <Lightbulb size={18} className="ex__dica-icone" />
              <h3>Pense em partes de 100</h3>
              <p>{dicaVisivel ? questao.dica : 'Travou? Peça uma pista antes de ver a resposta.'}</p>
              <button
                type="button"
                className="btn-branco btn-branco--borda"
                disabled={respondida}
                onClick={() => setDicaVisivel(true)}
              >
                <Sparkles size={14} />
                Pedir uma pista
              </button>
            </section>
          )}

          <p className="ex__nota">
            <Heart size={14} />
            Esta atividade é para aprender, não para competir. Seu ritmo importa.
          </p>
        </aside>
      </div>
    </div>
  )
}