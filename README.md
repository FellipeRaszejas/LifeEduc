# DOCUMENTAÇÃO DO PROJETO LIFEEDUC

## 1. Apresentação do projeto

O LifeEduc é uma aplicação web educacional desenvolvida com o objetivo de facilitar o acesso à educação, incentivar a organização dos estudos e proporcionar uma experiência de aprendizagem mais acessível, intuitiva e interativa.

O projeto está alinhado ao **ODS 4 — Educação de Qualidade**, estabelecido pela Organização das Nações Unidas (ONU), que busca assegurar uma educação inclusiva, equitativa e de qualidade, além de promover oportunidades de aprendizagem ao longo da vida.

## 2. Objetivo geral

Desenvolver uma plataforma educacional com interface moderna e responsiva, reunindo recursos que auxiliem estudantes na organização dos estudos, no acompanhamento do desempenho e no acesso a conteúdos e oportunidades educacionais.

## 3. Tecnologias utilizadas

- **React:** desenvolvimento da interface por meio de componentes reutilizáveis.
- **Vite:** ferramenta utilizada para iniciar o ambiente de desenvolvimento e gerar a versão de produção.
- **HTML e CSS:** estruturação e estilização das páginas.
- **JavaScript:** implementação das interações e regras da interface.
- **LocalStorage:** armazenamento local de dados de demonstração, quando utilizado na autenticação implementada.

O LocalStorage é um recurso do navegador e não substitui um banco de dados ou um serviço seguro de autenticação.

## 4. Funcionalidades e telas desenvolvidas

A aplicação foi planejada com 15 áreas principais:

1. **Login e cadastro:** entrada de usuários e formulário para criação de conta.
2. **Dashboard:** visão geral das atividades e atalhos para as funcionalidades.
3. **Cursos:** catálogo de cursos com pesquisa e filtros.
4. **Aulas:** apresentação de conteúdos e materiais de aprendizagem.
5. **Exercícios:** questionários e atividades interativas.
6. **Desempenho:** indicadores de progresso e acompanhamento dos estudos.
7. **Planejador:** organização de tarefas e planejamento da rotina de estudos.
8. **Comunidade:** espaço para perguntas e discussões.
9. **Conquistas:** apresentação de metas, medalhas e resultados.
10. **Perfil:** informações do estudante e preferências.
11. **Oportunidades:** divulgação de bolsas, cursos e estágios.
12. **Tutor virtual:** interface de conversa para apoio ao aprendizado.
13. **Biblioteca:** organização de materiais e recursos educacionais.
14. **Painel do educador:** interface destinada ao gerenciamento de conteúdos e acompanhamento de estudantes.
15. **Suporte:** perguntas frequentes e formulário de contato.

A disponibilidade e o funcionamento de cada recurso devem ser conferidos na versão final do código. Algumas áreas podem utilizar dados fictícios ou interações demonstrativas.

## 5. Sistema de login e cadastro

Foi prevista uma página inicial de autenticação para que o usuário possa entrar na plataforma ou criar uma conta.

O fluxo de utilização é composto por:

1. Abertura da página de login.
2. Preenchimento do e-mail e da senha.
3. Alternativa para acessar o formulário de cadastro.
4. Preenchimento do nome, e-mail, senha e confirmação da senha.
5. Validação dos campos preenchidos.
6. Acesso ao Dashboard após a autenticação demonstrativa.

Quando o armazenamento local é utilizado, os dados ficam restritos ao navegador e ao dispositivo em que foram registrados. Essa abordagem é adequada apenas para demonstrações e não oferece a segurança necessária para contas reais.

## 6. Encerramento da sessão

Para permitir que o estudante retorne à tela de login, a aplicação deve oferecer a opção **Sair da conta**.

Ao selecionar essa opção, o sistema deve encerrar a sessão armazenada, atualizar o estado de autenticação e apresentar novamente a página de login.

Essa funcionalidade deve ser validada na versão final para garantir que o usuário não permaneça acessando as páginas privadas após sair.

## 7. Navegação e experiência do usuário

A interface utiliza uma identidade visual consistente, com cores modernas, cartões, ícones e organização visual voltada à facilidade de uso.

O menu lateral permite acessar as diferentes áreas da plataforma. Os efeitos de destaque ao passar o mouse ajudam a identificar os itens interativos, enquanto o comportamento responsivo permite adaptar a interface a diferentes tamanhos de tela.

A organização em componentes React favorece a reutilização de elementos visuais e facilita futuras alterações.

## 8. Requisitos funcionais

- RF01: permitir o acesso à página de login.
- RF02: disponibilizar formulário de cadastro.
- RF03: validar os campos obrigatórios dos formulários.
- RF04: permitir o acesso ao Dashboard após a autenticação.
- RF05: disponibilizar navegação entre as áreas do sistema.
- RF06: apresentar um catálogo de cursos.
- RF07: disponibilizar interfaces para aulas e exercícios.
- RF08: apresentar indicadores de desempenho.
- RF09: oferecer ferramentas de organização dos estudos.
- RF10: permitir o encerramento da sessão e o retorno ao login.

## 9. Requisitos não funcionais

- RNF01: apresentar uma interface intuitiva.
- RNF02: adaptar o layout a computadores, tablets e celulares.
- RNF03: manter consistência visual entre as páginas.
- RNF04: organizar o código em componentes reutilizáveis.
- RNF05: utilizar nomenclaturas claras no código.
- RNF06: apresentar feedback para ações e erros de preenchimento.
- RNF07: garantir legibilidade e contraste adequados.
- RNF08: evitar navegação confusa entre as telas.
- RNF09: permitir manutenção e evolução do projeto.
- RNF10: considerar boas práticas de segurança caso a aplicação seja integrada a serviços reais.

## 10. Como executar o projeto

Com Node.js e npm instalados, abrir a pasta do projeto no Visual Studio Code e executar no terminal:

```bash
npm.cmd install
npm.cmd run dev
```

Em seguida, acessar o endereço local apresentado pelo Vite, normalmente `http://localhost:5173`.

Para gerar a versão de produção, executar:

```bash
npm.cmd run build
```

## 11. Testes recomendados

Antes da apresentação, verificar:

- A página de login é exibida inicialmente.
- O cadastro aceita dados válidos e rejeita campos inválidos.
- As senhas são comparadas corretamente na confirmação.
- O acesso ao Dashboard funciona conforme o fluxo implementado.
- Os itens do menu direcionam às telas correspondentes.
- O botão de sair retorna à tela de login.
- O layout funciona em diferentes resoluções.
- A compilação de produção termina sem erros.

Os testes devem ser executados e seus resultados registrados pela equipe. Não se deve declarar que todos foram aprovados antes da verificação.

## 12. Limitações e melhorias futuras

Como evolução do projeto, recomenda-se integrar um serviço de autenticação real, como Firebase Authentication, implementar um banco de dados, proteger as páginas que exigem login e armazenar o progresso dos estudantes de forma persistente.

Também podem ser desenvolvidos recursos completos para gerenciamento de cursos, atividades, comunidade, relatórios e painel do educador.

## 13. Conclusão

O LifeEduc propõe uma experiência educacional digital que reúne organização dos estudos, conteúdos de aprendizagem e recursos de acompanhamento em uma única interface.

A aplicação busca demonstrar como o desenvolvimento front-end pode contribuir para uma plataforma alinhada ao ODS 4. A continuidade do projeto deve priorizar a validação das funcionalidades, a acessibilidade, a segurança e a integração com serviços reais.

## 14. Uso de inteligência artificial

A inteligência artificial foi utilizada como apoio ao planejamento, à organização das funcionalidades, à elaboração de interfaces, à produção de código e à documentação do projeto.

A equipe deve revisar, compreender e testar os resultados gerados, registrando de forma transparente quais partes tiveram auxílio de IA e quais foram modificadas ou implementadas pelos integrantes.
