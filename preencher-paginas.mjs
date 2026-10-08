import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, basename } from 'node:path'

const pasta = 'src/pages'

for (const arquivo of readdirSync(pasta).filter((f) => f.endsWith('.jsx'))) {
  const caminho = join(pasta, arquivo)
  const nome = basename(arquivo, '.jsx')

  if (readFileSync(caminho, 'utf8').trim() === '') {
    writeFileSync(
      caminho,
      `export default function ${nome}() {
  return (
    <div>
      <h1>${nome}</h1>
    </div>
  )
}
`
    )
    console.log(`Preenchido: ${arquivo}`)
  }
}