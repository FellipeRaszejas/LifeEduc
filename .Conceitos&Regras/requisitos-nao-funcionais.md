LifeEduc — Requisitos Não Funcionais
1. Introdução
Este documento apresenta os requisitos não funcionais do LifeEduc, estabelecendo critérios de qualidade relacionados à usabilidade, responsividade, legibilidade, acessibilidade, segurança, disponibilidade e consistência visual da plataforma.

Esses requisitos definem como o sistema deverá se comportar e quais características deverão ser consideradas durante o desenvolvimento.

2. Lista de requisitos não funcionais
ID	Requisito não funcional
RNF01	O sistema deve possuir uma interface simples e intuitiva.
RNF02	O sistema deve ser responsivo e funcionar em celulares, tablets e computadores.
RNF03	O sistema deve apresentar boa legibilidade dos textos.
RNF05	O sistema deve utilizar contraste adequado entre texto e fundo.
RNF06	O sistema deve permitir navegação utilizando teclado.
RNF07	As senhas dos usuários devem ser armazenadas de forma segura e criptografada.
RNF08	O sistema deve estar disponível durante a maior parte do tempo.
RNF09	O sistema deve possuir mensagens de erro claras e compreensíveis.
RNF10	O sistema deve manter uma identidade visual consistente em todas as telas.
RNF11	O sistema deve seguir boas práticas de usabilidade e acessibilidade digital.
Observação: a numeração acima foi mantida conforme os requisitos enviados. O identificador RNF04 não foi informado.

3. Detalhamento dos requisitos não funcionais
RNF01 — Usabilidade
Descrição: O sistema deve possuir uma interface simples e intuitiva.

Critérios de verificação:

As funcionalidades devem ser organizadas de maneira clara.
Os menus e botões devem possuir identificação compreensível.
As ações mais comuns devem ser fáceis de localizar.
A navegação deve apresentar um comportamento consistente.
RNF02 — Responsividade
Descrição: O sistema deve funcionar adequadamente em celulares, tablets e computadores.

Critérios de verificação:

O layout deve se adaptar a diferentes resoluções.
Os componentes não devem causar rolagem horizontal desnecessária.
Textos, botões, formulários e cards devem permanecer utilizáveis em telas menores.
A navegação deve funcionar nos diferentes dispositivos suportados.
RNF03 — Legibilidade dos textos
Descrição: O sistema deve apresentar textos fáceis de ler e compreender.

Critérios de verificação:

Utilizar tamanhos de fonte adequados.
Manter espaçamento suficiente entre linhas e elementos.
Evitar combinações visuais que prejudiquem a leitura.
Utilizar linguagem clara nas instruções e mensagens.
RNF05 — Contraste visual
Descrição: O sistema deve utilizar contraste adequado entre texto e fundo.

Critérios de verificação:

As cores de texto e fundo devem permitir leitura confortável.
Os elementos importantes devem ser visualmente distinguíveis.
As combinações de cores devem considerar as recomendações de acessibilidade digital.
O significado das informações não deve depender exclusivamente das cores.
RNF06 — Navegação por teclado
Descrição: O sistema deve permitir que o usuário navegue utilizando o teclado.

Critérios de verificação:

Os elementos interativos devem ser acessíveis por teclado.
A ordem de navegação deve ser lógica.
O foco atual deve possuir identificação visual.
Os controles devem permitir a execução de suas ações sem depender exclusivamente do mouse.
RNF07 — Segurança das senhas
Descrição: As senhas dos usuários devem ser armazenadas de forma segura.

Critérios de verificação:

As senhas não devem ser armazenadas em texto puro.
O armazenamento deve utilizar uma função de hash apropriada para senhas, com salt e parâmetros de custo adequados.
A autenticação deve seguir boas práticas de segurança.
As credenciais não devem ser expostas em mensagens de erro ou registros desnecessários.
Observação técnica: para armazenamento de senhas, deve-se utilizar hash seguro específico para senhas, como Argon2id, bcrypt ou scrypt, em vez de criptografia reversível ou hash simples.

RNF08 — Disponibilidade
Descrição: O sistema deve permanecer disponível durante a maior parte do tempo.

Critérios de verificação:

A plataforma deve estar acessível durante os períodos previstos de utilização.
Falhas devem ser identificadas e tratadas adequadamente.
A infraestrutura deve considerar estratégias de recuperação e manutenção.
A disponibilidade poderá ser acompanhada por indicadores definidos para o projeto.
RNF09 — Mensagens de erro
Descrição: O sistema deve apresentar mensagens de erro claras e compreensíveis.

Critérios de verificação:

As mensagens devem explicar o problema em linguagem simples.
Quando possível, devem orientar o usuário sobre como corrigir a situação.
Os erros não devem expor informações sensíveis ou detalhes internos do sistema.
As mensagens devem ser visualmente identificáveis.
RNF10 — Consistência visual
Descrição: O sistema deve manter uma identidade visual consistente em todas as telas.

Critérios de verificação:

As telas devem seguir uma paleta de cores padronizada.
Botões, formulários, cards e ícones devem manter padrões visuais.
Os títulos e elementos de navegação devem seguir uma hierarquia consistente.
As páginas devem utilizar os mesmos princípios de organização visual.
RNF11 — Usabilidade e acessibilidade digital
Descrição: O sistema deve seguir boas práticas de usabilidade e acessibilidade digital.

Critérios de verificação:

Os elementos interativos devem possuir identificação adequada.
Os formulários devem apresentar rótulos claros.
As imagens informativas devem possuir descrições alternativas quando necessário.
Os componentes devem considerar leitores de tela e navegação por teclado.
A interface deve priorizar uma experiência inclusiva para diferentes usuários.
O desenvolvimento deve considerar as recomendações das diretrizes WCAG.
4. Diretrizes visuais do LifeEduc
Para manter uma experiência visual coerente, o LifeEduc deverá adotar as seguintes diretrizes:

Azul-vivo: cor principal da plataforma.
Roxo: cor complementar para destaques e elementos secundários.
Verde-turquesa: cor de apoio para progresso e confirmações.
Fundo claro: utilizado para facilitar a leitura.
Cards arredondados: para organizar disciplinas, materiais e atividades.
Ícones modernos: para facilitar o reconhecimento das funcionalidades.
Gráficos de progresso: para representar visualmente o desempenho acadêmico.
As escolhas visuais deverão respeitar os requisitos de legibilidade, contraste e acessibilidade.

5. Considerações finais
Os requisitos não funcionais orientam a construção de uma plataforma que, além de disponibilizar as funcionalidades necessárias, ofereça uma experiência confiável, consistente, acessível e adequada aos diferentes dispositivos.

Esses critérios deverão ser considerados desde o início do desenvolvimento e verificados durante os testes do LifeEduc.

Projeto: LifeEduc
Documento: Requisitos Não Funcionais
Versão: 1.0