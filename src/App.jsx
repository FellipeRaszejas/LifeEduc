
import { useState } from "react";
import "./App.css";

const technologies = [
  {
    name: "React",
    symbol: "⚛",
    description:
      "Biblioteca JavaScript para construir interfaces de usuário modernas e reutilizáveis.",
    tag: "Interface",
    color: "blue",
  },
  {
    name: "Vite",
    symbol: "ϟ",
    description:
      "Ferramenta de desenvolvimento rápida para criar e compilar aplicações frontend.",
    tag: "Build tool",
    color: "purple",
  },
  {
    name: "Vercel",
    symbol: "▲",
    description:
      "Plataforma de hospedagem para publicar aplicações web e disponibilizá-las online.",
    tag: "Deploy",
    color: "dark",
  },
  {
    name: "Projeto de teste",
    symbol: "✓",
    description:
      "Uma aplicação simples para validar o deploy e testar a renderização do React.",
    tag: "Funcionamento",
    color: "green",
  },
];

function App() {
  const [testCount, setTestCount] = useState(0);

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#inicio">
          <span className="brand-icon">⚛</span>
          <span>React + Vite</span>
        </a>

        <nav>
          <a href="#inicio">Início</a>
          <a href="#sobre">Sobre</a>
          <a href="#tecnologias">Tecnologias</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-content">
            <span className="eyebrow">
              <span className="status-dot" />
              Aplicação online e pronta para testar
            </span>

            <h1>
              Seu projeto no <span>Vercel.</span>
            </h1>

            <p>
              Uma página desenvolvida com React e Vite para verificar
              se sua aplicação foi publicada corretamente.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#tecnologias">
                Explorar tecnologias <span>↗</span>
              </a>

              <button
                className="button button-secondary"
                onClick={() => setTestCount((count) => count + 1)}
              >
                Testar React
              </button>
            </div>

            <div className="test-result" aria-live="polite">
              {testCount === 0
                ? "Clique em “Testar React” para começar."
                : `React funcionando! Você realizou ${testCount} teste${testCount === 1 ? "" : "s"}.`}
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="visual-glow" />
            <div className="code-window">
              <div className="window-header">
                <div className="window-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span>app.jsx</span>
              </div>

              <div className="code-content">
                <p><span className="code-purple">const</span> projeto = {"{"}</p>
                <p className="indent">
                  nome: <span className="code-green">"React + Vite"</span>,
                </p>
                <p className="indent">
                  deploy: <span className="code-green">"Vercel"</span>,
                </p>
                <p className="indent">
                  online: <span className="code-orange">true</span>,
                </p>
                <p>{"}"}</p>
                <div className="code-divider" />
                <p>
                  <span className="code-purple">return</span>{" "}
                  <span className="code-green">"Sucesso!"</span>
                </p>
                <div className="terminal-status">
                  <span className="status-dot" />
                  Build pronto para produção
                </div>
              </div>
            </div>

            <div className="floating-card">
              <span className="floating-check">✓</span>
              <div>
                <strong>Deploy preparado</strong>
                <span>Projeto frontend</span>
              </div>
            </div>
          </div>
        </section>

        <section className="about" id="sobre">
          <span className="section-label">SOBRE O PROJETO</span>
          <h2>Simples por fora. Funcional por dentro.</h2>
          <p>
            O objetivo é validar a publicação na Vercel, verificar
            o carregamento dos arquivos e confirmar que a interface
            React funciona no ambiente de produção.
          </p>

          <div className="stats">
            <div>
              <strong>01</strong>
              <span>Aplicação</span>
            </div>
            <div>
              <strong>04</strong>
              <span>Tecnologias e recursos</span>
            </div>
            <div>
              <strong>{testCount.toString().padStart(2, "0")}</strong>
              <span>Testes realizados</span>
            </div>
          </div>
        </section>

        <section className="technologies" id="tecnologias">
          <div className="section-heading">
            <div>
              <span className="section-label">STACK DO PROJETO</span>
              <h2>Tecnologias utilizadas</h2>
            </div>
            <p>Uma base leve para validar seu primeiro deploy.</p>
          </div>

          <div className="technology-grid">
            {technologies.map((technology, index) => (
              <article className="technology-card" key={technology.name}>
                <div className={`technology-icon ${technology.color}`}>
                  {technology.symbol}
                </div>

                <span className="card-number">
                  0{index + 1}
                </span>

                <h3>{technology.name}</h3>
                <p>{technology.description}</p>

                <span className={`tag ${technology.color}`}>
                  {technology.tag}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="deploy-banner">
          <div className="deploy-icon">↗</div>
          <div>
            <h2>Pronto para publicar?</h2>
            <p>
              Envie o projeto para o GitHub e importe o repositório
              na Vercel para realizar o deploy.
            </p>
          </div>
          <a
            className="button button-light"
            href="https://vercel.com/new"
            target="_blank"
            rel="noreferrer"
          >
            Abrir Vercel ↗
          </a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#inicio">
          <span className="brand-icon">⚛</span>
          <span>React + Vite</span>
        </a>

        <p>Projeto de teste · Desenvolvido para aprender.</p>

        <a href="#inicio">Voltar ao topo ↑</a>
      </footer>
    </div>
  );
}

export default App;