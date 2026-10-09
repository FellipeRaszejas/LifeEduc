# LifeEduc — Requisitos Não Funcionais

| | |
|---|---|
| **Projeto** | LifeEduc |
| **Documento** | Requisitos Não Funcionais |
| **Versão** | 1.0 |
| **Alinhamento** | ODS 4 — Educação de Qualidade |

Este documento apresenta os requisitos não funcionais do LifeEduc, estabelecendo critérios de qualidade relacionados à usabilidade, responsividade, legibilidade, acessibilidade, segurança, disponibilidade e consistência visual da plataforma.

Esses requisitos definem como o sistema deverá se comportar e quais características deverão ser consideradas durante o desenvolvimento.

**Documentos relacionados:** [Requisitos Funcionais](./requisitos-funcionais.md) · [User Stories](./user-stories.md)

---

## Sumário

- [Visão geral](#visão-geral)
- [Requisitos por área](#requisitos-por-área)
  - [Usabilidade e experiência do usuário](#usabilidade-e-experiência-do-usuário)
  - [Responsividade e legibilidade](#responsividade-e-legibilidade)
  - [Acessibilidade digital](#acessibilidade-digital)
  - [Segurança](#segurança)
  - [Disponibilidade e tratamento de erros](#disponibilidade-e-tratamento-de-erros)
  - [Consistência visual](#consistência-visual)
- [Diretrizes visuais do LifeEduc](#diretrizes-visuais-do-lifeeduc)
- [Rastreabilidade](#rastreabilidade)
- [Considerações finais](#considerações-finais)

---

## Visão geral

| ID | Requisito | Área |
|:--:|-----------|------|
| [**RNF01**](#rnf01--usabilidade) | Possuir uma interface simples e intuitiva | Usabilidade e experiência do usuário |
| [**RNF02**](#rnf02--responsividade) | Funcionar em celulares, tablets e computadores | Responsividade e legibilidade |
| [**RNF03**](#rnf03--legibilidade-dos-textos) | Apresentar boa legibilidade dos textos | Responsividade e legibilidade |
| [**RNF05**](#rnf05--contraste-visual) | Utilizar contraste adequado entre texto e fundo | Acessibilidade digital |
| [**RNF06**](#rnf06--navegação-por-teclado) | Permitir navegação utilizando teclado | Acessibilidade digital |
| [**RNF07**](#rnf07--segurança-das-senhas) | Armazenar senhas de forma segura | Segurança |
| [**RNF08**](#rnf08--disponibilidade) | Estar disponível durante a maior parte do tempo | Disponibilidade e tratamento de erros |
| [**RNF09**](#rnf09--mensagens-de-erro) | Apresentar mensagens de erro claras e compreensíveis | Disponibilidade e tratamento de erros |
| [**RNF10**](#rnf10--consistência-visual) | Manter uma identidade visual consistente | Consistência visual |
| [**RNF11**](#rnf11--usabilidade-e-acessibilidade-digital) | Seguir boas práticas de usabilidade e acessibilidade digital | Acessibilidade digital |

> [!NOTE]
> A numeração acima foi mantida conforme os requisitos enviados. O identificador RNF04 não foi informado.

---

## Requisitos por área

### Usabilidade e experiência do usuário

#### RNF01 — Usabilidade

> **Descrição:** O sistema deve possuir uma interface simples e intuitiva.

<details open>
<summary><strong>Critérios de verificação</strong></summary>

<br>

- [ ] As funcionalidades devem ser organizadas de maneira clara.
- [ ] Os menus e botões devem possuir identificação compreensível.
- [ ] As ações mais comuns devem ser fáceis de localizar.
- [ ] A navegação deve apresentar um comportamento consistente.

</details>

### Responsividade e legibilidade

#### RNF02 — Responsividade

> **Descrição:** O sistema deve funcionar adequadamente em celulares, tablets e computadores.

<details open>
<summary><strong>Critérios de verificação</strong></summary>

<br>

- [ ] O layout deve se adaptar a diferentes resoluções.
- [ ] Os componentes não devem causar rolagem horizontal desnecessária.
- [ ] Textos, botões, formulários e cards devem permanecer utilizáveis em telas menores.
- [ ] A navegação deve funcionar nos diferentes dispositivos suportados.

</details>

#### RNF03 — Legibilidade dos textos

> **Descrição:** O sistema deve apresentar textos fáceis de ler e compreender.

<details open>
<summary><strong>Critérios de verificação</strong></summary>

<br>

- [ ] Utilizar tamanhos de fonte adequados.
- [ ] Manter espaçamento suficiente entre linhas e elementos.
- [ ] Evitar combinações visuais que prejudiquem a leitura.
- [ ] Utilizar linguagem clara nas instruções e mensagens.

</details>

### Acessibilidade digital

#### RNF05 — Contraste visual

> **Descrição:** O sistema deve utilizar contraste adequado entre texto e fundo.

<details open>
<summary><strong>Critérios de verificação</strong></summary>

<br>

- [ ] As cores de texto e fundo devem permitir leitura confortável.
- [ ] Os elementos importantes devem ser visualmente distinguíveis.
- [ ] As combinações de cores devem considerar as recomendações de acessibilidade digital.
- [ ] O significado das informações não deve depender exclusivamente das cores.

</details>

#### RNF06 — Navegação por teclado

> **Descrição:** O sistema deve permitir que o usuário navegue utilizando o teclado.

<details open>
<summary><strong>Critérios de verificação</strong></summary>

<br>

- [ ] Os elementos interativos devem ser acessíveis por teclado.
- [ ] A ordem de navegação deve ser lógica.
- [ ] O foco atual deve possuir identificação visual.
- [ ] Os controles devem permitir a execução de suas ações sem depender exclusivamente do mouse.

</details>

#### RNF11 — Usabilidade e acessibilidade digital

> **Descrição:** O sistema deve seguir boas práticas de usabilidade e acessibilidade digital.

<details open>
<summary><strong>Critérios de verificação</strong></summary>

<br>

- [ ] Os elementos interativos devem possuir identificação adequada.
- [ ] Os formulários devem apresentar rótulos claros.
- [ ] As imagens informativas devem possuir descrições alternativas quando necessário.
- [ ] Os componentes devem considerar leitores de tela e navegação por teclado.
- [ ] A interface deve priorizar uma experiência inclusiva para diferentes usuários.
- [ ] O desenvolvimento deve considerar as recomendações das diretrizes WCAG.

</details>

### Segurança

#### RNF07 — Segurança das senhas

> **Descrição:** As senhas dos usuários devem ser armazenadas de forma segura.

<details open>
<summary><strong>Critérios de verificação</strong></summary>

<br>

- [ ] As senhas não devem ser armazenadas em texto puro.
- [ ] O armazenamento deve utilizar uma função de hash apropriada para senhas, com salt e parâmetros de custo adequados.
- [ ] A autenticação deve seguir boas práticas de segurança.
- [ ] As credenciais não devem ser expostas em mensagens de erro ou registros desnecessários.

</details>

> [!IMPORTANT]
> **Observação técnica:** para armazenamento de senhas, deve-se utilizar hash seguro específico para senhas, como Argon2id, bcrypt ou scrypt, em vez de criptografia reversível ou hash simples.

### Disponibilidade e tratamento de erros

#### RNF08 — Disponibilidade

> **Descrição:** O sistema deve permanecer disponível durante a maior parte do tempo.

<details open>
<summary><strong>Critérios de verificação</strong></summary>

<br>

- [ ] A plataforma deve estar acessível durante os períodos previstos de utilização.
- [ ] Falhas devem ser identificadas e tratadas adequadamente.
- [ ] A infraestrutura deve considerar estratégias de recuperação e manutenção.
- [ ] A disponibilidade poderá ser acompanhada por indicadores definidos para o projeto.

</details>

#### RNF09 — Mensagens de erro

> **Descrição:** O sistema deve apresentar mensagens de erro claras e compreensíveis.

<details open>
<summary><strong>Critérios de verificação</strong></summary>

<br>

- [ ] As mensagens devem explicar o problema em linguagem simples.
- [ ] Quando possível, devem orientar o usuário sobre como corrigir a situação.
- [ ] Os erros não devem expor informações sensíveis ou detalhes internos do sistema.
- [ ] As mensagens devem ser visualmente identificáveis.

</details>

### Consistência visual

#### RNF10 — Consistência visual

> **Descrição:** O sistema deve manter uma identidade visual consistente em todas as telas.

<details open>
<summary><strong>Critérios de verificação</strong></summary>

<br>

- [ ] As telas devem seguir uma paleta de cores padronizada.
- [ ] Botões, formulários, cards e ícones devem manter padrões visuais.
- [ ] Os títulos e elementos de navegação devem seguir uma hierarquia consistente.
- [ ] As páginas devem utilizar os mesmos princípios de organização visual.

</details>

---

## Diretrizes visuais do LifeEduc

Para manter uma experiência visual coerente, o LifeEduc deverá adotar as seguintes diretrizes:

| Diretriz | Finalidade |
|----------|------------|
| **Azul-vivo** | Cor principal da plataforma. |
| **Roxo** | Cor complementar para destaques e elementos secundários. |
| **Verde-turquesa** | Cor de apoio para progresso e confirmações. |
| **Fundo claro** | Utilizado para facilitar a leitura. |
| **Cards arredondados** | Para organizar disciplinas, materiais e atividades. |
| **Ícones modernos** | Para facilitar o reconhecimento das funcionalidades. |
| **Gráficos de progresso** | Para representar visualmente o desempenho acadêmico. |

As escolhas visuais deverão respeitar os requisitos de legibilidade, contraste e acessibilidade.

---

## Rastreabilidade

Relação entre os requisitos não funcionais, suas identificações e as áreas de qualidade às quais estão associados.

| Requisito | Área relacionada |
|:---------:|------------------|
| **RNF01** | Usabilidade e experiência do usuário |
| **RNF02** | Responsividade e legibilidade |
| **RNF03** | Responsividade e legibilidade |
| **RNF05** | Acessibilidade digital |
| **RNF06** | Acessibilidade digital |
| **RNF07** | Segurança |
| **RNF08** | Disponibilidade e tratamento de erros |
| **RNF09** | Disponibilidade e tratamento de erros |
| **RNF10** | Consistência visual |
| **RNF11** | Acessibilidade digital |

---

## Considerações finais

Os requisitos não funcionais orientam a construção de uma plataforma que, além de disponibilizar as funcionalidades necessárias, ofereça uma experiência confiável, consistente, acessível e adequada aos diferentes dispositivos.

Esses critérios deverão ser considerados desde o início do desenvolvimento e verificados durante os testes do LifeEduc.
