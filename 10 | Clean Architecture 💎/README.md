[⬅ voltar ao menu](../README.md)

# Clean Architecture 💎

- Clean Architecture é uma abordagem de design de software criada por Robert C. Martin (Uncle Bob).
- A ideia central é proteger o "coração" da aplicação e promover a evolução sustentável do código.
- Clean Architecture não se resume a um conjunto fixo de pastas e arquivos, mas a compreender os princípios subjacentes.
- Existem outras arquiteturas relacionadas, como Arquitetura Hexagonal e Onion Architecture.

## Clean Architecture x Arquitetura Hexagonal

- Ambas visam proteger o "coração" da aplicação.
- Clean Architecture possui mais detalhes e oferece mais flexibilidade na implementação.
- Arquitetura Hexagonal é mais prescritiva, definindo limites claros.

## Estrutura e Camadas

- Clean Architecture envolve várias camadas que definem limites arquiteturais.
- O conhecimento das camadas e seus limites ajuda a evitar interferências indesejadas.
- Comunicação entre camadas é realizada por meio de contratos (interfaces), mantendo baixo acoplamento.

## Orientada a Casos de Uso

- Clean Architecture é orientada a casos de uso (intenções).
- Casos de uso representam ações que geram transformações no código.
- Casos de uso são documentados de forma explícita, tornando a intenção do sistema clara.

## Pontos importantes da Arquitetura Limpa

- **Formatar o Software:** Assim como um prédio tem um projeto de arquitetura, o software precisa ter uma estrutura bem definida.

- **Divisão de Componentes:** A arquitetura clara divide o software em componentes distintos, cada um com um propósito claro.

- **Componentes se Comunicam:** Os componentes precisam se comunicar para funcionar juntos.

- **Formas de Comunicação:** A comunicação entre componentes é estabelecida por meio de diversas formas, como escadas e elevadores em um prédio.

- **Ajudar no Desenvolvimento:** Uma arquitetura bem pensada facilita o desenvolvimento, pois cada componente tem um propósito claro e limites definidos.

- **Facilitar o Deploy:** Pensar no processo de deploy desde o início ajuda a tornar o software mais preparado para a operação.

- **Observabilidade:** A operação do software requer observabilidade, como logs e monitoramento, que devem ser considerados na arquitetura.

- **Processos Abertos:** Uma boa arquitetura mantém opções abertas para acomodar mudanças e evolução no desenvolvimento, deploy e operação.

## Objetivos de uma boa arquitetura:

- Dar suporte ao ciclo de vida do sistema.
- Facilitar desenvolvimento, testes, deploy, operação e manutenção.
- Tornar o sistema fácil de entender, desenvolver, manter e implantar.
- Minimizar o custo de vida útil do sistema e maximizar a produtividade do programador.
- Uma boa arquitetura previne o surgimento de débitos técnicos e prolonga a vida útil do software.
- A regra fundamental é "Keep options open" (Mantenha opções abertas).

## Regras vs. Detalhes

- Detalhes (como frameworks e tecnologias) não devem impactar as regras de negócio do software.
- Regras de negócio são o coração do software e o que realmente entrega valor.

## Domain Driven Design (DDD)

- DDD significa atacar a complexidade no coração do software, ou seja, focar nas regras de negócio.
- Detalhes técnicos (frameworks, bancos de dados, APIs) são plugáveis e podem ser substituídos.
- A atenção principal deve estar nas regras de negócio, enquanto detalhes são suportes para essas regras.

## Uso de Casos (Use Cases) na Clean Architecture

- Use Cases representam intenções no software, cada intenção é um caso de uso.
- A arquitetura deve gritar na sua cara o que o software faz.
- Use Cases proporcionam clareza sobre o comportamento do software.
- Detalhes não devem impactar nas regras de negócio.
- A arte da Clean Architecture é postergar decisões ao máximo.

## SRP - Princípio da Responsabilidade Única

- SRP (Single Responsibility Principle) diz que um componente deve ter apenas uma razão para mudar.
- Use Cases muitas vezes parecem parecidos e a tentação de reutilização é grande.
- Reutilizar código entre Use Cases é arriscado porque eles mudarão por razões diferentes.
- Cada Use Case deve ser independente para cumprir o SRP.
- Evite a duplicação que viola o SRP, mas nem toda duplicação é ruim.

## Duplicação de Código

- Duplicação real: Copiar e colar código igual em várias partes do software.
- Ruim porque uma mudança requer atualizações em várias cópias.
- Duplicação acidental: Códigos parecidos que parecem duplicados, mas podem se divergir no futuro.
- Às vezes, é melhor manter essas duplicações para evitar complexidade excessiva.

## Usecases como Automação de Intenções

- Use Cases representam intenções no software, que muitas vezes são operações automatizadas.
- Use Cases concretizam fluxos de operação, orquestrando a ordem das ações.
- Fluxos de operação muitas vezes envolvem várias regras de negócio e passos.
- Use Cases são os orquestradores dos fluxos lógicos da aplicação.
- Use Cases acessam as regras de negócio para validar e operar.
- As regras de negócio estão nas entidades, enquanto os Use Cases representam os fluxos de operação.
- Use Cases podem ser comparados a uma camada de aplicação no contexto do Domain Driven Design.

## Limites Arquiteturais na Clean Architecture

- Tudo que não impacta diretamente nas regras de negócio deve estar em limites arquiteturais diferentes.
- Componentes que não afetam as regras de negócio devem estar isolados em limites arquiteturais distintos.
- Exemplo: O tipo de banco de dados ou o frontend não afetam as regras de negócio diretamente.
- A camada de regras de negócio não deve depender diretamente de implementações concretas de componentes externos.
- Abstrações devem ser criadas para que as regras de negócio dependam de interfaces, não de implementações.
- Inversão de controle: Componentes externos chamam interfaces da camada de regras de negócio.
- A imagem da Clean Architecture representa limites arquiteturais bem definidos entre entidades, Use Cases, controllers, presenters e gateways.
- A definição clara de limites arquiteturais evita vazamentos e assegura a manutenção da estrutura da aplicação.

# Input vs Output

- Tudo na aplicação se resume a um ciclo de input e output.
- Input é a entrada de dados, output é o resultado da operação.
- A aplicação recebe dados de entrada e os processa para gerar saídas.
- O input pode vir de diferentes fontes, como APIs, GraphQL, GRPC, command line interface, etc.
- A Clean Architecture enfatiza o fluxo de dados de input para output através das camadas.
- O ciclo envolve receber o input, passá-lo pelas camadas da aplicação e gerar o output correspondente.
- O input trafega entre as camadas, sendo processado e orquestrado pelos Use Cases.
- Os Use Cases determinam as intenções da aplicação e acessam as regras de negócio.
- Os dados de output são formatados e apresentados de acordo com o formato da solicitação (Presenter).
- O fluxo de dados é representado de forma clara na Clean Architecture, indo do input para o output.
- Pensar em termos de input e output ajuda a compreender e seguir os princípios da Clean Architecture.

## DTO (Data Transfer Object)

- É utilizado para trafegar dados entre os limites arquiteturais.
- Serve para encapsular dados e transmiti-los entre diferentes componentes da aplicação.
- Um DTO é um objeto anêmico, não possui comportamento, apenas dados.
- DTOs são usados para formatar e organizar os dados de input e output.
- Na Clean Architecture, DTOs ajudam a passar dados entre as camadas da aplicação.
- O input da aplicação pode ser encapsulado em um DTO de entrada (input DTO).
- O output da aplicação pode ser encapsulado em um DTO de saída (output DTO).
- Cada Use Case geralmente possui seus próprios DTOs de input e output.
- DTOs ajudam a separar e organizar os dados que são transferidos entre as camadas.
- O ciclo de entrada e saída envolve a conversão dos dados em DTOs e vice-versa.
- Controller cria um input DTO a partir dos dados da requisição da API.
- Use Case recebe o input DTO, executa a lógica e gera um output DTO.
- Controller recebe o output DTO, formata e retorna a resposta para a API.

# Presenters

- São objetos de transformação utilizados na Clean Architecture.
- Sua função principal é formatar e adequar os dados para diferentes formatos de saída.
- Presenters recebem um DTO de output do Use Case e transformam os dados conforme necessário.
- Permitem entregar os resultados em formatos variados, como JSON, XML, entre outros.
- Presenters são responsáveis por serializar os dados no formato de saída desejado.
- Ajudam a separar a lógica de apresentação/formato dos dados da lógica de negócios.
- São usados para garantir que os dados sejam entregues de acordo com o formato esperado.
- Cada saída (JSON, XML, etc.) pode ter seu próprio método no Presenter.
- Os Presenters transformam os DTOs de output do Use Case em dados prontos para resposta.
- Após a formatação, os dados são retornados ao Controller para enviar a resposta.
- Os Presenters ajudam a lidar com diferentes formatos de resposta sem afetar a lógica do Use Case.

## Entities na Clean Architecture

- Entidades na Clean Architecture se referem a uma camada que contém as regras de negócio.
- Diferente das entidades no Domain Driven Design, que representam objetos únicos.
- Entities na Clean Architecture são a base sólida das regras de negócio da aplicação.
- Elas encapsulam as regras críticas e invariáveis da aplicação.
- As entities são parte fundamental da camada de regras de negócio, conhecida como "enterprise business rules".
- Pode-se considerar que as entities na Clean Architecture são a junção dos agregados e domain services do DDD.
- Domain Driven Design pode ser uma abordagem útil para criar e organizar as entities na Clean Architecture.
- A camada de entities pode conter agregados, domain services, contratos com repositórios e eventos.
- A separação entre entities e Use Cases é clara, pois as entities têm regras sólidas e invariáveis, enquanto os Use Cases podem variar conforme o fluxo.
- Os dados vindos de diferentes fontes (Web, Devices, DB, External Interfaces, UI) podem ser processados pelas entities para gerar valor para o negócio.
