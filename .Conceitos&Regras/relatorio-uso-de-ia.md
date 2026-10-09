# Relatório de Uso de Inteligência Artificial

**Projeto:** Plataforma web para o ODS 4 (Educação de Qualidade)
**Framework:** React

Este relatório registra de forma transparente onde ferramentas de IA foram usadas no projeto, em quais atividades e com quais limites. As decisões finais, a revisão e a responsabilidade pelo conteúdo entregue são do grupo.

---

## 1. Ferramentas utilizadas

| Ferramenta | Tipo | Finalidade geral |
|---|---|---|
| ChatGPT | IA | Organização de funcionalidades, backlog e documentação |
| Claude | IA | Padronização de commits, proposta de valor e apoio à estilização |
| Figma | Design (não é IA) | Prototipagem das telas |

---

## 2. ChatGPT

**Utilização:**

- Apoio na organização e no detalhamento das funcionalidades descritas no README, como login, cadastro, dashboard, cursos, aulas, exercícios e painel do educador.
- Desdobramento dos requisitos fornecidos em atividades para o backlog.
- Elaboração e reformulação dos cards para refletir o escopo sem API, com dados locais e interações demonstrativas.
- Consulta ao código e à documentação para distinguir funcionalidades previstas das que precisam ser verificadas na versão final.
- Apoio à redação sobre as limitações da autenticação demonstrativa e do armazenamento local, que não devem ser considerados seguros para contas reais.

---

## 3. Claude

**Utilização:**

- **Padronização de commits:** a partir do escopo do projeto, gerou uma proposta de convenção baseada em Conventional Commits, com tipos, escopos alinhados aos módulos da aplicação (relatos, monitoramento, estudos, atividades, auth, ui, layout, api, config, docs), exemplos, padronização de branches, boas práticas e uma configuração opcional de commitlint e husky. O material foi entregue em `.txt` e `.md`.
- **Proposta de valor:** a partir do escopo e do funcionamento da plataforma descritos pelo grupo, redigiu um rascunho respondendo às quatro perguntas da atividade (qual problema resolvemos, para quem, como a solução ajuda e qual valor entrega), com uma frase-síntese. O rascunho foi revisado e adaptado pelo grupo.
- **Estilização:** apoio em decisões de estilização da interface. *(Item informado pelo grupo. Detalhar abaixo quais telas, componentes ou decisões foram apoiados.)*
- **Relatório de uso de IA:** apoio na redação e na organização deste documento.

**Limites:**

- Nesta conversa, a IA não criou nem alterou os componentes React da aplicação. O único trecho de código fornecido foi o arquivo de configuração opcional do commitlint e os comandos de instalação do husky.

---

## 4. Figma (prototipagem)

O Figma foi usado pelo grupo para a prototipagem das telas e do fluxo de navegação. Por ser uma ferramenta de design, e não de IA, está listado aqui apenas para deixar claro o que serviu de base para a interface e a estilização.

---

## 5. O que foi feito pelo grupo, sem atribuição à IA

- Definição do tema, do ODS relacionado e do público-alvo.
- Discussão e escolha das ideias, dos comentários e da direção da proposta de valor.
- Prototipagem das telas no Figma.
- Desenvolvimento e revisão do código da aplicação.
- Validação final de tudo o que foi sugerido pelas ferramentas de IA.

---

## 6. Limitações e cuidados

- A autenticação é demonstrativa e o armazenamento é local (sem API). Esses recursos **não devem ser considerados seguros** para contas reais.
- Conteúdos gerados por IA foram tratados como rascunho e revisados pelo grupo antes do uso.
- Funcionalidades previstas na documentação devem ser conferidas contra a versão final do código, pois nem tudo o que está descrito pode estar implementado.
