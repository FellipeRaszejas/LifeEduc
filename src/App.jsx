import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/sidebar'

import Ajuda from './pages/Ajuda'
import Aulas from './pages/Aulas'
import Comunidade from './pages/Comunidade'
import Conquistas from './pages/Conquistas'
import Conta from './pages/Conta'
import Curso from './pages/Curso'
import Desempenho from './pages/Desempenho'
import Exercicios from './pages/Exercicios'
import Home from './pages/Home'
import Oportunidade from './pages/Oportunidade'
import PainelEducador from './pages/PainelEducador'
import Perfil from './pages/Perfil'
import Planejamento from './pages/Planejamento'
import TutorVirtual from './pages/TutorVirtual'

// Páginas ainda sem arquivo (ex.: Biblioteca) e rotas inexistentes
function EmConstrucao() {
  return (
    <div className="em-construcao">
      <h1>Em construção</h1>
      <p>Esta página ainda não foi criada.</p>
    </div>
  )
}

export default function App() {
  return (
    <div className="app-shell">
      {/* A Sidebar fica fora das rotas: aparece em todas as páginas */}
      <Sidebar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conta" element={<Conta />} />
          <Route path="/curso" element={<Curso />} />
          <Route path="/aulas" element={<Aulas />} />
          <Route path="/exercicios" element={<Exercicios />} />
          <Route path="/desempenho" element={<Desempenho />} />
          <Route path="/planejamento" element={<Planejamento />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/conquistas" element={<Conquistas />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/oportunidade" element={<Oportunidade />} />
          <Route path="/tutor-virtual" element={<TutorVirtual />} />
          <Route path="/painel-educador" element={<PainelEducador />} />
          <Route path="/ajuda" element={<Ajuda />} />
          <Route path="*" element={<EmConstrucao />} />
        </Routes>
      </main>
    </div>
  )
}