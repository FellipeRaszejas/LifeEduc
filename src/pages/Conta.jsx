import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Search,
  CircleUser,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PERFIS = ['Estudante', 'Educador', 'Responsável']

// Regra do cadastro: 8+ caracteres, com letras e números
const senhaForte = (s) => s.length >= 8 && /[A-Za-z]/.test(s) && /\d/.test(s)

function validarLogin({ email, senha }) {
  const erros = {}
  if (!EMAIL_REGEX.test(email)) erros.email = 'Informe um e-mail válido.'
  if (!senha) erros.senha = 'Informe sua senha.'
  return erros
}

function validarCadastro({ nome, email, senha, confirma, perfil, termos }) {
  const erros = {}
  if (nome.trim().split(/\s+/).length < 2) erros.nome = 'Informe nome e sobrenome.'
  if (!EMAIL_REGEX.test(email)) erros.email = 'Informe um e-mail válido.'
  if (!senhaForte(senha)) erros.senha = 'Use 8 ou mais caracteres, com letras e números.'
  if (confirma !== senha) erros.confirma = 'As senhas não são iguais.'
  if (!perfil) erros.perfil = 'Escolha como vai usar o LifeEduc.'
  if (!termos) erros.termos = 'Aceite os Termos de uso e a Política de privacidade.'
  return erros
}

// Sem back-end: guarda a sessão no navegador
function salvarSessao(usuario, manter) {
  const storage = manter ? localStorage : sessionStorage
  storage.setItem('lifeeduc:usuario', JSON.stringify(usuario))
}

function CampoSenha({ id, valor, onChange, placeholder, erro, autoComplete }) {
  const [visivel, setVisivel] = useState(false)
  return (
    <>
      <div className={`campo ${erro ? 'campo--erro' : ''}`}>
        <Lock size={16} />
        <input
          id={id}
          type={visivel ? 'text' : 'password'}
          value={valor}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          className="campo__olho"
          onClick={() => setVisivel((v) => !v)}
          aria-label={visivel ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {visivel ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {erro && <p className="erro-texto">{erro}</p>}
    </>
  )
}

export default function Conta() {
  const navigate = useNavigate()
  const buscaRef = useRef(null)

  const [busca, setBusca] = useState('')

  const [login, setLogin] = useState({ email: '', senha: '', manter: true })
  const [errosLogin, setErrosLogin] = useState({})
  const [avisoLogin, setAvisoLogin] = useState('')

  const [cadastro, setCadastro] = useState({
    nome: '',
    email: '',
    senha: '',
    confirma: '',
    perfil: 'Estudante',
    termos: false,
  })
  const [errosCadastro, setErrosCadastro] = useState({})
  const [sucessoCadastro, setSucessoCadastro] = useState('')

  // Atalho Ctrl/Cmd + K foca na busca
  useEffect(() => {
    const atalho = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        buscaRef.current?.focus()
      }
    }
    window.addEventListener('keydown', atalho)
    return () => window.removeEventListener('keydown', atalho)
  }, [])

  const buscar = (e) => {
    e.preventDefault()
    if (busca.trim()) navigate(`/curso?busca=${encodeURIComponent(busca.trim())}`)
  }

  const mudarLogin = (campo) => (e) =>
    setLogin((f) => ({ ...f, [campo]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const mudarCadastro = (campo) => (e) =>
    setCadastro((f) => ({ ...f, [campo]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const entrar = (e) => {
    e.preventDefault()
    const erros = validarLogin(login)
    setErrosLogin(erros)
    setAvisoLogin('')
    if (Object.keys(erros).length) return

    salvarSessao({ email: login.email }, login.manter)
    navigate('/')
  }

  const criarConta = (e) => {
    e.preventDefault()
    const erros = validarCadastro(cadastro)
    setErrosCadastro(erros)
    setSucessoCadastro('')
    if (Object.keys(erros).length) return

    salvarSessao(
      { nome: cadastro.nome.trim(), email: cadastro.email, perfil: cadastro.perfil },
      true
    )
    setSucessoCadastro(`Conta criada! Bem-vindo(a), ${cadastro.nome.trim().split(' ')[0]}.`)
    setTimeout(() => navigate('/'), 1200)
  }

  return (
    <div className="conta">
      {/* Barra superior */}
      <header className="topbar">
        <div className="logo">
          <span className="logo__icone">
            <BookOpen size={20} />
          </span>
          <span className="logo__nome">LifeEduc</span>
        </div>

        <form className="busca" onSubmit={buscar} role="search">
          <Search size={16} />
          <input
            ref={buscaRef}
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="O que você quer aprender hoje?"
            aria-label="Buscar cursos"
          />
          <kbd>⌘ K</kbd>
        </form>

        <span className="selo-seguro">Acesso seguro • Conta gratuita</span>
      </header>

      {/* Título */}
      <section className="conta__titulo">
        <p className="sobretitulo">Seu espaço de aprendizagem</p>
        <h1>Login e cadastro</h1>
        <p className="subtitulo">Seu próximo capítulo começa com uma oportunidade de aprender.</p>
      </section>

      {/* Banner */}
      <section className="hero">
        <div className="hero__texto">
          <h2>Conhecimento abre caminhos.</h2>
          <p>
            Aprenda no seu ritmo, construa confiança e transforme seu futuro. Cursos, apoio e
            oportunidades em um só lugar.
          </p>
          <small>Inspirado no ODS 4 • Educação de qualidade, inclusiva e acessível</small>
        </div>
        <div className="hero__imagem" role="img" aria-label="Estudantes estudando juntos" />
      </section>

      {/* Formulários */}
      <div className="forms">
        {/* LOGIN */}
        <section className="cartao" aria-labelledby="titulo-login">
          <div className="cartao__cabecalho">
            <h3 id="titulo-login">Que bom ter você de volta!</h3>
            <span className="etiqueta etiqueta--azul">Entrar</span>
          </div>
          <p className="cartao__sub">Retome sua jornada de onde parou.</p>

          <button
            type="button"
            className="btn btn--contorno"
            onClick={() => setAvisoLogin('Login com Google estará disponível em breve.')}
          >
            <CircleUser size={16} />
            Continuar com Google
          </button>

          <div className="divisor">
            <span>ou use seu e-mail</span>
          </div>

          <form onSubmit={entrar} noValidate>
            <label htmlFor="login-email">E-mail</label>
            <div className={`campo ${errosLogin.email ? 'campo--erro' : ''}`}>
              <Mail size={16} />
              <input
                id="login-email"
                type="email"
                value={login.email}
                onChange={mudarLogin('email')}
                placeholder="ana.souza@exemplo.com"
                autoComplete="email"
              />
            </div>
            {errosLogin.email && <p className="erro-texto">{errosLogin.email}</p>}

            <label htmlFor="login-senha">Senha</label>
            <CampoSenha
              id="login-senha"
              valor={login.senha}
              onChange={mudarLogin('senha')}
              placeholder="••••••••••••"
              erro={errosLogin.senha}
              autoComplete="current-password"
            />

            <div className="linha-opcoes">
              <label className="check">
                <input type="checkbox" checked={login.manter} onChange={mudarLogin('manter')} />
                <span>Manter conectado</span>
              </label>
              <button
                type="button"
                className="link"
                onClick={() =>
                  setAvisoLogin(
                    EMAIL_REGEX.test(login.email)
                      ? `Se houver uma conta com ${login.email}, você receberá as instruções.`
                      : 'Digite seu e-mail acima para recuperar a senha.'
                  )
                }
              >
                Esqueci minha senha
              </button>
            </div>

            <button type="submit" className="btn btn--primario">
              <ArrowRight size={16} />
              Entrar na minha conta
            </button>
          </form>

          <div className="aviso aviso--verde" role="status">
            <ShieldCheck size={16} />
            <span>{avisoLogin || 'Seus dados são privados. Seu aprendizado é seu.'}</span>
          </div>
        </section>

        {/* CADASTRO */}
        <section className="cartao" aria-labelledby="titulo-cadastro">
          <div className="cartao__cabecalho">
            <h3 id="titulo-cadastro">Comece sua jornada</h3>
            <span className="etiqueta etiqueta--roxa">Criar conta</span>
          </div>
          <p className="cartao__sub">Uma conta gratuita. Muitas possibilidades.</p>

          <form onSubmit={criarConta} noValidate>
            <label htmlFor="cad-nome">Nome completo</label>
            <div className={`campo ${errosCadastro.nome ? 'campo--erro' : ''}`}>
              <User size={16} />
              <input
                id="cad-nome"
                type="text"
                value={cadastro.nome}
                onChange={mudarCadastro('nome')}
                placeholder="Ana Souza"
                autoComplete="name"
              />
            </div>
            {errosCadastro.nome && <p className="erro-texto">{errosCadastro.nome}</p>}

            <label htmlFor="cad-email">E-mail</label>
            <div className={`campo ${errosCadastro.email ? 'campo--erro' : ''}`}>
              <Mail size={16} />
              <input
                id="cad-email"
                type="email"
                value={cadastro.email}
                onChange={mudarCadastro('email')}
                placeholder="ana.souza@exemplo.com"
                autoComplete="email"
              />
            </div>
            {errosCadastro.email && <p className="erro-texto">{errosCadastro.email}</p>}

            <div className="duas-colunas">
              <div>
                <label htmlFor="cad-senha">Crie uma senha</label>
                <CampoSenha
                  id="cad-senha"
                  valor={cadastro.senha}
                  onChange={mudarCadastro('senha')}
                  placeholder="••••••••••••"
                  erro={errosCadastro.senha}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label htmlFor="cad-confirma">Confirme a senha</label>
                <CampoSenha
                  id="cad-confirma"
                  valor={cadastro.confirma}
                  onChange={mudarCadastro('confirma')}
                  placeholder="••••••••••••"
                  erro={errosCadastro.confirma}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <p className={`dica-senha ${senhaForte(cadastro.senha) ? 'dica-senha--ok' : ''}`}>
              <Check size={12} /> 8 ou mais caracteres, letras e números
            </p>

            <label htmlFor="cad-perfil">Como você vai usar o LifeEduc?</label>
            <div className={`campo campo--select ${errosCadastro.perfil ? 'campo--erro' : ''}`}>
              <select id="cad-perfil" value={cadastro.perfil} onChange={mudarCadastro('perfil')}>
                {PERFIS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} />
            </div>

            <label className="check check--termos">
              <input type="checkbox" checked={cadastro.termos} onChange={mudarCadastro('termos')} />
              <span>
                Li e concordo com os Termos de uso e a Política de privacidade. Não quero receber
                comunicações promocionais.
              </span>
            </label>
            {errosCadastro.termos && <p className="erro-texto">{errosCadastro.termos}</p>}

            <button type="submit" className="btn btn--primario">
              <ArrowRight size={16} />
              Criar minha conta gratuita
            </button>

            {sucessoCadastro && (
              <div className="aviso aviso--verde" role="status">
                <ShieldCheck size={16} />
                <span>{sucessoCadastro}</span>
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  )
}