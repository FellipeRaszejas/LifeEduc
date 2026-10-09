LifeEduc — User Stories
1. Visão geral do projeto
O LifeEduc é uma plataforma educacional digital desenvolvida para facilitar o acesso ao conhecimento, apoiar o acompanhamento do desempenho acadêmico e promover uma experiência de aprendizagem mais organizada, acessível e intuitiva.

A plataforma permitirá que alunos acessem disciplinas, consultem aulas e materiais didáticos, realizem atividades, acompanhem seu progresso e consultem seu histórico de aprendizagem. Também oferecerá funcionalidades para que professores cadastrem aulas, disponibilizem materiais e criem atividades.

O projeto está alinhado à ODS 4 — Educação de Qualidade, que busca assegurar uma educação inclusiva, equitativa e de qualidade, além de promover oportunidades de aprendizagem ao longo da vida.

2. Objetivo do sistema
Desenvolver uma plataforma educacional que conecte alunos e professores por meio de recursos digitais, facilitando o acesso aos conteúdos, a realização de atividades e o acompanhamento da evolução acadêmica.

O sistema deverá possuir uma interface moderna, intuitiva, responsiva e acessível, permitindo a utilização em computadores, tablets e celulares.

3. Público-alvo
Alunos: usuários que acessam disciplinas, estudam conteúdos, realizam atividades e acompanham seu desempenho.
Professores: usuários responsáveis por cadastrar aulas, disponibilizar materiais didáticos e criar atividades.
Administradores, caso previstos futuramente: responsáveis pela gestão geral da plataforma.
4. User Stories
US01 — Cadastro de usuário
Como usuário,
quero realizar meu cadastro na plataforma,
para criar uma conta e acessar as funcionalidades do LifeEduc.

Critérios de aceitação:

O sistema deve disponibilizar um formulário de cadastro.
Os campos obrigatórios devem ser validados.
O sistema deve apresentar mensagens claras quando houver dados inválidos.
Após o cadastro bem-sucedido, o usuário deve receber uma confirmação.
Requisito relacionado: RF01.

US02 — Login
Como usuário cadastrado,
quero realizar login utilizando meu e-mail e senha,
para acessar minha conta com segurança.

Critérios de aceitação:

O sistema deve apresentar campos para e-mail e senha.
O sistema deve validar as credenciais informadas.
Credenciais inválidas devem gerar uma mensagem de erro compreensível.
Após a autenticação bem-sucedida, o usuário deve acessar a área correspondente ao seu perfil.
Requisito relacionado: RF02.

US03 — Edição de dados pessoais
Como usuário,
quero editar meus dados pessoais,
para manter minhas informações atualizadas.

Critérios de aceitação:

O sistema deve exibir os dados pessoais disponíveis para edição.
O usuário deve conseguir alterar os campos permitidos.
O sistema deve validar os dados antes de salvá-los.
Após a alteração, deve apresentar uma confirmação.
Requisito relacionado: RF03.

US04 — Visualização de disciplinas
Como aluno,
quero visualizar as disciplinas disponíveis para mim,
para identificar os conteúdos que fazem parte da minha jornada de aprendizagem.

Critérios de aceitação:

O sistema deve apresentar a lista de disciplinas do aluno.
Cada disciplina deve possuir identificação visual clara.
O aluno deve conseguir selecionar uma disciplina para acessar seus conteúdos.
Quando não houver disciplinas disponíveis, o sistema deve apresentar uma mensagem informativa.
Requisito relacionado: RF04.

US05 — Acesso às aulas e aos materiais didáticos
Como aluno,
quero acessar aulas e materiais didáticos das minhas disciplinas,
para estudar e aprofundar meus conhecimentos.

Critérios de aceitação:

O sistema deve apresentar as aulas e os materiais disponíveis.
Os conteúdos devem estar organizados por disciplina.
O aluno deve conseguir abrir os materiais disponibilizados.
Conteúdos indisponíveis devem ser identificados adequadamente.
Requisito relacionado: RF05.

US06 — Consulta dos resultados das atividades
Como aluno,
quero visualizar os resultados das atividades que realizei,
para compreender meu desempenho e identificar pontos que preciso melhorar.

Critérios de aceitação:

O sistema deve apresentar os resultados das atividades concluídas.
Os resultados devem estar associados às respectivas atividades.
As informações devem ser exibidas de maneira clara.
Quando não houver resultados registrados, o sistema deve informar essa condição.
Requisito relacionado: RF06.

US07 — Acompanhamento do progresso acadêmico
Como aluno,
quero acompanhar meu progresso nas disciplinas,
para compreender minha evolução e organizar melhor meus estudos.

Critérios de aceitação:

O sistema deve apresentar o progresso registrado em cada disciplina.
As informações devem refletir as atividades e os registros disponíveis.
O progresso deve ser representado de maneira visual e compreensível.
Os dados devem ser atualizados conforme o sistema registrar novas atividades ou conclusões.
Requisito relacionado: RF07.

US08 — Histórico de atividades
Como aluno,
quero consultar meu histórico de atividades,
para revisar minhas ações e acompanhar minha trajetória de aprendizagem.

Critérios de aceitação:

O sistema deve apresentar as atividades registradas para o aluno.
Cada registro deve identificar a atividade correspondente.
Quando disponível, o histórico deve apresentar informações como data, situação e resultado.
O sistema deve informar quando ainda não houver atividades registradas.
Requisito relacionado: RF08.

US09 — Pesquisa de conteúdos
Como aluno,
quero pesquisar conteúdos por palavra-chave,
para encontrar rapidamente aulas, materiais ou assuntos de meu interesse.

Critérios de aceitação:

O sistema deve disponibilizar um campo de pesquisa.
O aluno deve conseguir informar uma palavra-chave.
O sistema deve apresentar os conteúdos correspondentes à pesquisa.
Quando nenhum conteúdo for encontrado, deve exibir uma mensagem informativa.
Requisito relacionado: RF09.

US10 — Cadastro de aulas e materiais pelo professor
Como professor,
quero cadastrar aulas e materiais didáticos,
para disponibilizar conteúdos educacionais aos meus alunos.

Critérios de aceitação:

O sistema deve permitir que o professor cadastre uma aula.
O professor deve conseguir informar os dados necessários do conteúdo.
O sistema deve permitir a inclusão ou disponibilização de materiais didáticos.
Os conteúdos devem ser associados à disciplina correspondente.
O sistema deve validar as informações antes de concluir o cadastro.
Requisito relacionado: RF10.

US11 — Criação de atividades pelo professor
Como professor,
quero criar atividades para meus alunos,
para avaliar a aprendizagem e acompanhar o desenvolvimento da turma.

Critérios de aceitação:

O sistema deve permitir que o professor crie uma atividade.
A atividade deve possuir título e instruções.
O professor deve conseguir definir a disciplina à qual a atividade pertence.
O sistema deve validar os dados necessários para o cadastro.
As atividades cadastradas devem ficar disponíveis conforme as regras de acesso da plataforma.
Requisito relacionado: RF11.

5. Identidade visual e experiência do usuário
O LifeEduc deverá adotar uma identidade visual moderna, jovem e profissional, priorizando a organização das informações e a facilidade de navegação.

Diretrizes visuais
Azul-vivo: associado à confiança, tecnologia e concentração.
Roxo: utilizado para destacar elementos de inovação e criatividade.
Verde-turquesa: aplicado a indicadores de progresso e ações positivas.
Fundo claro: para facilitar a leitura dos conteúdos.
Cards arredondados: para organizar disciplinas, aulas e atividades.
Ícones modernos: para facilitar a identificação das funcionalidades.
Gráficos e indicadores: para representar o progresso acadêmico.
A identidade visual deverá ser consistente em todas as telas e respeitar os critérios de legibilidade, contraste e acessibilidade.

6. Relação com a ODS 4 — Educação de Qualidade
O LifeEduc busca contribuir para a ODS 4 ao facilitar o acesso a conteúdos educacionais, apoiar o acompanhamento da aprendizagem e oferecer recursos digitais para alunos e professores.

As principais contribuições são:

Facilitar o acesso a aulas e materiais didáticos.
Incentivar a autonomia dos estudantes.
Permitir o acompanhamento do progresso acadêmico.
Apoiar a avaliação por meio de atividades.
Facilitar a organização e a distribuição de conteúdos pelos professores.
Promover uma experiência digital com atenção à acessibilidade.
7. Considerações finais
As User Stories apresentadas definem as principais necessidades dos alunos e professores que utilizarão o LifeEduc. Elas servem como referência para o planejamento, o desenvolvimento do Front-end e a validação das funcionalidades da plataforma.

A implementação poderá ocorrer de maneira incremental, começando pelo cadastro, login, disciplinas e acesso aos conteúdos, avançando posteriormente para o acompanhamento do progresso e as ferramentas destinadas aos professores.

LifeEduc — Aprender, evoluir e transformar o futuro por meio da educação.