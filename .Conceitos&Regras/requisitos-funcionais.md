# LifeEduc — Requisitos Funcionais

| | |
|---|---|
| **Projeto** | LifeEduc |
| **Documento** | Requisitos Funcionais |
| **Versão** | 1.0 |
| **Alinhamento** | ODS 4 — Educação de Qualidade |

Este documento descreve **o que o sistema deve fazer**: as funcionalidades e operações disponibilizadas a alunos e professores. Elas servem de base para as telas, os componentes do front-end, as regras de interação e as futuras integrações com o back-end.

**Documentos relacionados:** [User Stories](./user-stories.md) · [Requisitos Não Funcionais](./requisitos-nao-funcionais.md)

## Sumário

- [Visão geral](#visão-geral)
- [Requisitos por área](#requisitos-por-área)
  - [Cadastro e autenticação](#cadastro-e-autenticação)
  - [Perfil do usuário](#perfil-do-usuário)
  - [Disciplinas e conteúdos](#disciplinas-e-conteúdos)
  - [Avaliação e acompanhamento](#avaliação-e-acompanhamento)
  - [Área do professor](#área-do-professor)
- [Rastreabilidade](#rastreabilidade)
- [Considerações finais](#considerações-finais)

## Visão geral

| ID | Requisito | Perfil | Área |
|---|---|---|---|
| [RF01](#rf01--cadastro-de-usuário) | Realizar cadastro | Usuário | Cadastro e autenticação |
| [RF02](#rf02--login-de-usuário) | Fazer login com e-mail e senha | Usuário | Cadastro e autenticação |
| [RF03](#rf03--edição-de-dados-pessoais) | Editar dados pessoais | Usuário | Perfil do usuário |
| [RF04](#rf04--visualização-de-disciplinas) | Visualizar disciplinas | Aluno | Disciplinas e conteúdos |
| [RF05](#rf05--acesso-às-aulas-e-aos-materiais-didáticos) | Acessar aulas e materiais didáticos | Aluno | Disciplinas e conteúdos |
| [RF06](#rf06--resultados-das-atividades) | Ver o resultado das atividades realizadas | Aluno | Avaliação e acompanhamento |
| [RF07](#rf07--registro-do-progresso-acadêmico) | Registrar o progresso nas disciplinas | Aluno | Avaliação e acompanhamento |
| [RF08](#rf08--histórico-de-atividades) | Consultar o histórico de atividades | Aluno | Avaliação e acompanhamento |
| [RF09](#rf09--pesquisa-de-conteúdos) | Pesquisar conteúdos por palavra-chave | Aluno | Disciplinas e conteúdos |
| [RF10](#rf10--cadastro-de-aulas-e-materiais-pelo-professor) | Cadastrar aulas e materiais | Professor | Área do professor |
| [RF11](#rf11--criação-de-atividades-pelo-professor) | Criar atividades para os alunos | Professor | Área do professor |

## Requisitos por área

### Cadastro e autenticação

#### RF01 — Cadastro de usuário

O sistema deve permitir que o usuário crie uma conta na plataforma.

**Comportamento esperado**

- Disponibilizar um formulário de cadastro.
- Validar os campos obrigatórios.
- Informar quando os dados estiverem incorretos.
- Confirmar a conclusão do cadastro.

#### RF02 — Login de usuário

O sistema deve permitir que o usuário acesse sua conta utilizando e-mail e senha.

**Comportamento esperado**

- Disponibilizar campos para e-mail e senha.
- Validar as credenciais.
- Exibir uma mensagem em caso de falha na autenticação.
- Permitir o acesso às funcionalidades autorizadas após o login.

### Perfil do usuário

#### RF03 — Edição de dados pessoais

O sistema deve permitir que o usuário atualize suas informações pessoais.

**Comportamento esperado**

- Exibir os dados cadastrados.
- Permitir a edição dos campos autorizados.
- Validar as informações alteradas.
- Salvar as alterações e informar o resultado da operação.

### Disciplinas e conteúdos

#### RF04 — Visualização de disciplinas

O sistema deve permitir que o aluno consulte as disciplinas associadas à sua conta.

**Comportamento esperado**

- Apresentar as disciplinas disponíveis.
- Organizar as informações para facilitar a identificação.
- Permitir o acesso aos conteúdos de uma disciplina selecionada.

#### RF05 — Acesso às aulas e aos materiais didáticos

O sistema deve permitir que o aluno acesse as aulas e os materiais disponibilizados nas disciplinas.

**Comportamento esperado**

- Apresentar os conteúdos disponíveis.
- Organizar aulas e materiais por disciplina.
- Permitir a abertura ou visualização dos conteúdos.
- Informar quando um material estiver indisponível.

#### RF09 — Pesquisa de conteúdos

O sistema deve permitir que o aluno encontre conteúdos utilizando palavras-chave.

**Comportamento esperado**

- Disponibilizar um campo de pesquisa.
- Processar o termo informado.
- Exibir conteúdos correspondentes.
- Informar quando nenhum resultado for encontrado.

### Avaliação e acompanhamento

#### RF06 — Resultados das atividades

O sistema deve apresentar os resultados das atividades realizadas pelos alunos.

**Comportamento esperado**

- Recuperar os resultados registrados.
- Associar os resultados às respectivas atividades.
- Apresentar as informações de maneira compreensível.

#### RF07 — Registro do progresso acadêmico

O sistema deve registrar o progresso do aluno nas disciplinas.

**Comportamento esperado**

- Registrar as informações de progresso conforme as regras definidas pela plataforma.
- Associar o progresso à disciplina correspondente.
- Atualizar os indicadores conforme novos registros forem realizados.

#### RF08 — Histórico de atividades

O sistema deve permitir que o aluno consulte seu histórico de atividades.

**Comportamento esperado**

- Apresentar as atividades registradas.
- Exibir informações disponíveis sobre cada atividade.
- Permitir a consulta dos registros anteriores.

### Área do professor

#### RF10 — Cadastro de aulas e materiais pelo professor

O sistema deve permitir que o professor cadastre aulas e disponibilize materiais didáticos.

**Comportamento esperado**

- Disponibilizar uma interface para cadastro de aulas.
- Permitir o preenchimento dos dados do conteúdo.
- Permitir a inclusão ou disponibilização de materiais.
- Associar os conteúdos às disciplinas correspondentes.
- Validar os dados antes de concluir o cadastro.

#### RF11 — Criação de atividades pelo professor

O sistema deve permitir que o professor crie atividades destinadas aos alunos.

**Comportamento esperado**

- Disponibilizar uma interface de criação de atividades.
- Permitir o preenchimento do título e das instruções.
- Permitir a associação da atividade a uma disciplina.
- Validar os dados informados.
- Disponibilizar a atividade conforme as regras de acesso definidas.

## Rastreabilidade

Relação entre cada requisito funcional, a user story que o originou e a tela do protótipo em React onde ele aparece.

| Requisito | User story | Tela do protótipo |
|---|---|---|
| RF01 | [US01](./user-stories.md#us01--cadastro-de-usuário) | `Conta.jsx` |
| RF02 | [US02](./user-stories.md#us02--login) | `Conta.jsx` |
| RF03 | [US03](./user-stories.md#us03--edição-de-dados-pessoais) | `Perfil.jsx` |
| RF04 | [US04](./user-stories.md#us04--visualização-de-disciplinas) | `Curso.jsx` |
| RF05 | [US05](./user-stories.md#us05--acesso-às-aulas-e-aos-materiais-didáticos) | `Aulas.jsx`, `Biblioteca.jsx` |
| RF06 | [US06](./user-stories.md#us06--consulta-dos-resultados-das-atividades) | `Exercicios.jsx` |
| RF07 | [US07](./user-stories.md#us07--acompanhamento-do-progresso-acadêmico) | `Desempenho.jsx` |
| RF08 | [US08](./user-stories.md#us08--histórico-de-atividades) | `Desempenho.jsx` |
| RF09 | [US09](./user-stories.md#us09--pesquisa-de-conteúdos) | `Curso.jsx`, `Biblioteca.jsx` |
| RF10 | [US10](./user-stories.md#us10--cadastro-de-aulas-e-materiais-pelo-professor) | `PainelEducador.jsx` |
| RF11 | [US11](./user-stories.md#us11--criação-de-atividades-pelo-professor) | `PainelEducador.jsx` |

> [!NOTE]
> A coluna "Tela do protótipo" indica onde cada requisito é demonstrado na interface. Os dados exibidos nas telas são fictícios até a integração com o back-end.

## Considerações finais

A implementação deve garantir que as funcionalidades respeitem os perfis de acesso e apresentem informações coerentes para cada usuário. Os critérios de qualidade (acessibilidade, responsividade, segurança) estão nos [Requisitos Não Funcionais](./requisitos-nao-funcionais.md).