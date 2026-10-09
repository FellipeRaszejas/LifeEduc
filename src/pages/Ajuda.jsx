import { useState } from 'react'
import {
  Search,
  ChevronDown,
  UserRound,
  BookOpen,
  Accessibility,
  Inbox,
  Send,
  CheckCircle2,
} from 'lucide-react'
import Topbar from '../components/topbar'

const ATALHOS = [
  { icone: UserRound, titulo: 'Conta e acesso', sub: 'Senha, cadastro e privacidade', cor: 'azul' },
  { icone: BookOpen, titulo: 'Cursos e atividades', sub: 'Aulas, materiais e progresso', cor: 'roxo' },
  { icone: Accessibility, titulo: 'Acessibilidade', sub: 'Legendas, leitura e navegação', cor: 'verde' },
]

const PERGUNTAS = [
  {
    p: 'Como retomo uma aula de onde parei?',
    r: 'No Dashboard, escolha "Continue aula". O curso exibe a próxima aula e o progresso já registrado. Ao concluir uma aula, ela recebe uma marca de verificação.',
  },
  {
    p: 'Como ativo legendas e ajusto a leitura?',
    r: 'No player da aula, abra o menu de configurações e escolha legendas e velocidade. A transcrição fica disponível na aba "Transcrição".',
  },
  {
    p: 'Como redefino minha senha?',
    r: 'Na tela de acesso, clique em "Esqueci a senha" e informe o e-mail cadastrado para receber as instruções.',
  },
  {
    p: 'Os cursos são gratuitos?',
    r: 'Sim. Todos os cursos e materiais da plataforma são gratuitos para estudantes.',
  },
  {
    p: 'Como funciona o tutor virtual?',
    r: 'Na página Tutor virtual, escreva sua dúvida e receba explicações passo a passo. As conversas ficam salvas no histórico.',
  },
]

const ASSUNTOS = [
  'Acessibilidade e materiais',
  'Conta e acesso',
  'Cursos e atividades',
  'Outro assunto',
]

export default function Ajuda() {
  const [busca, setBusca] = useState('')
  const [aberta, setAberta] = useState(0)
  const [enviado, setEnviado] = useState(false)
  const [form, setForm] = useState({
    nome: '',
    email: '',
    assunto: ASSUNTOS[0],
    mensagem: '',
    aceite: false,
  })

  const termo = busca.trim().toLowerCase()
  const perguntas = PERGUNTAS.filter(
    (item) =>
      !termo ||
      item.p.toLowerCase().includes(termo) ||
      item.r.toLowerCase().includes(termo)
  )

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  function enviar(e) {
    e.preventDefault()
    if (!form.nome || !form.email || !form.mensagem || !form.aceite) return
    setEnviado(true)
    setForm((atual) => ({ ...atual, mensagem: '', aceite: false }))
  }

  return (
    <div className="ajuda">
      <Topbar />

      <header className="conta__titulo">
        <span className="sobretitulo">SEU ESPAÇO DE APRENDIZAGEM</span>
        <h1>Central de suporte</h1>
        <p className="subtitulo">Estamos aqui para ajudar você a seguir aprendendo.</p>
      </header>

      <section className="ajuda__hero">
        <h2>Como podemos ajudar?</h2>
        <p>Encontre uma resposta ou conte para nossa equipe o que aconteceu.</p>
        <label className="busca">
          <Search size={16} />
          <input
            type="search"
            placeholder="Busque por acesso, cursos, legendas..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            aria-label="Buscar na central de suporte"
          />
        </label>
      </section>

      <section className="ajuda__atalhos">
        {ATALHOS.map(({ icone: Icone, titulo, sub, cor }) => (
          <button
            key={titulo}
            type="button"
            className="atalho"
            onClick={() => setBusca(titulo.split(' ')[0])}
          >
            <span className={`atalho__icone atalho__icone--${cor}`}>
              <Icone size={18} />
            </span>
            <span className="atalho__texto">
              <strong>{titulo}</strong>
              <small>{sub}</small>
            </span>
          </button>
        ))}
      </section>

      <div className="ajuda__grade">
        <div className="ajuda__coluna">
          <section className="cartao">
            <h2 className="ajuda__titulo-secao">Perguntas frequentes</h2>

            {perguntas.length === 0 ? (
              <p className="ajuda__vazio">
                Nenhuma pergunta encontrada. Tente outra palavra ou envie uma mensagem para a equipe.
              </p>
            ) : (
              <ul className="faq">
                {perguntas.map((item, i) => {
                  const ativa = aberta === i
                  return (
                    <li key={item.p} className={`faq__item${ativa ? ' faq__item--aberto' : ''}`}>
                      <button
                        type="button"
                        className="faq__pergunta"
                        aria-expanded={ativa}
                        onClick={() => setAberta(ativa ? -1 : i)}
                      >
                        {item.p}
                        <ChevronDown size={16} className="faq__seta" />
                      </button>
                      {ativa && <p className="faq__resposta">{item.r}</p>}
                    </li>
                  )
                })}
              </ul>
            )}
          </section>

          <section className="cartao ajuda__solicitacoes">
            <span className="ajuda__icone-vazio">
              <Inbox size={20} />
            </span>
            <div>
              <h2>Nenhuma solicitação aqui</h2>
              <p>
                Quando você enviar um contato, poderá acompanhar o protocolo e as respostas nesse espaço.
              </p>
            </div>
          </section>
        </div>

        <section className="cartao">
          <h2 className="ajuda__titulo-secao">Fale com a gente</h2>
          <p className="cartao__sub">
            Atendimento de segunda a sexta, das 9h às 18h. Previsão de resposta: até 2 dias úteis.
          </p>

          <form onSubmit={enviar}>
            <div className="duas-colunas">
              <div>
                <label htmlFor="aj-nome">Nome *</label>
                <div className="campo">
                  <input
                    id="aj-nome"
                    type="text"
                    placeholder="Seu nome"
                    value={form.nome}
                    onChange={(e) => atualizar('nome', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="aj-email">E-mail *</label>
                <div className="campo">
                  <input
                    id="aj-email"
                    type="email"
                    placeholder="voce@exemplo.com"
                    value={form.email}
                    onChange={(e) => atualizar('email', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <label htmlFor="aj-assunto">Assunto *</label>
            <div className="campo campo--select">
              <select
                id="aj-assunto"
                value={form.assunto}
                onChange={(e) => atualizar('assunto', e.target.value)}
              >
                {ASSUNTOS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
              <ChevronDown size={16} />
            </div>

            <label htmlFor="aj-mensagem">Mensagem *</label>
            <textarea
              id="aj-mensagem"
              className="ajuda__texto"
              rows={5}
              placeholder="Conte o que aconteceu ou o que você precisa."
              value={form.mensagem}
              onChange={(e) => atualizar('mensagem', e.target.value)}
              required
            />

            <label className="check check--termos">
              <input
                type="checkbox"
                checked={form.aceite}
                onChange={(e) => atualizar('aceite', e.target.checked)}
              />
              Autorizo o uso destes dados apenas para responder à minha solicitação, conforme a Política de privacidade.
            </label>

            {enviado && (
              <p className="aviso aviso--verde" role="status">
                <CheckCircle2 size={16} />
                Mensagem enviada. Responderemos em até 2 dias úteis.
              </p>
            )}

            <button
              type="submit"
              className="btn btn--primario"
              disabled={!form.aceite}
            >
              <Send size={16} />
              Enviar mensagem
            </button>
            <p className="ajuda__nota">* Campos obrigatórios. Exemplo ilustrativo: nenhuma mensagem é enviada de verdade.</p>
          </form>
        </section>
      </div>
    </div>
  )
}