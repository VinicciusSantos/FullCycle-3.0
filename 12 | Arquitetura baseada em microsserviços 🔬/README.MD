[⬅ voltar ao menu](../README.md)

# Arquitetura baseada em microsserviços 🔬

## Caracteristicas

- Aplicações comuns
- Objetivos bem definidos
- faz parte de um ecossistema
- são independentes ou autônomos
- se comunicam o tempo todo

## Principais diferenças entre microsserviços e monotilicos

- microsserviços tem dominios mais definidos
- em sistemas com microsserviços, é possivel ter muitas linguagens de programação
- o deploy é menos arriscado em microsserviços

## 9 caracteristicas sobre microsserviçis por Martin Folwer

1. Componentização
2. Capacidade de negócio
3. Produtos e não projetos
4. Smart endpoints e Dumb Pipes
5. Governança descentralizada
6. Descentralização do gerenciamento de dados
7. Automação da infraestrutura
8. Desenhado para falhar
9. Design evolutivo

## Resiliência

- É um conjunto de estrategias adotadas para a adaptação de um sistema quando uma falha ocorre

### Estratégias

- **Proteger e ser protegido**
  - Adotar mecanismos de autropreservação para grarantir ao máximo sua operação com qualidade
  - Não fazer requisições para um sistema que está falhando
- **Health check**
  - Verificação da saúde do sistema
  - Um sistema que não está saudável pode se recuperar caso o tráfego pare de ser redirecionado para ele temporariamente
- **Rate Limiting**
  - Protege o sistema baseado no que ele foi projetado para suportar
  - Preferência programada por tipo de client
- **Circuit breaker**
  - Protege o sistema fazendo que as requisições feitas para ele sejam negadas
  - Circuito fechado: requisições chegam normalmente
  - Circuito aberto: requisições não chegam ao sistema. Erro instantâneo
  - Circuito meio aberto: quantidade limitada de requisições
- **API Gateway**
  - Garante que requisições inapropriadas cheguem até o sistema
- **Service Mesh**
  - Controla o tráfego de rede
  - mTLS
- **Trabalhar de forma assíncrona**
  - Não mandar as requisições diretamente para o servidor
  - Evita perda de dados
  - Os dados podem ser processados depois
- **Retry**
  - Políticas de retry consistem em reenviar uma mensagem ou requisição se a resposta não for recebida em um determinado tempo.
- **Garantias de entrega**
  - ![garantia de entrega](./assets/garantia-de-entrega.png)
- **Situações complexas**
  - O que acontece se o message broker cair?
  - Haverá perda de mensagens?
  - Seu sistema ficará fora do ar?
  - Como garantir resiliência?
- **Transactional outbox**
  - Armazenar a mensagem que iria para o kafka em uma tabela do banco de dados
  - Após o kafka confirmar o recebimento da mensagem, o registro da tabela pode ser apagado
  - | messageID | key | Topic | Payload |
- **Garantias de recebimento**
  - Ferramentas de message broker podem apagar mensagem somente após confirmação de recebimento de menssagem
- **Idempotência**
  - O ato de conseguir lidar com mensagem duplicadas
- **Observabilidade**
  - Métricas de performance do sistema
  - APM
  - Tracing distribuído
  - Métricas personalizadas
  - Spans personalizados

## Coreografia e Orquestração de Microsserviços

### Coreografia de Microsserviços

#### Comunicação Assíncrona

- A comunicação entre microsserviços ocorre por meio de mensagens assíncronas.
- Padrões de mensagens, como Kafka, RabbitMQ ou MQTT, são frequentemente utilizados.

#### Coreografia de Eventos

- Os microsserviços reagem a eventos que ocorrem no sistema.
- Os eventos desencadeiam ações nos microsserviços relevantes.
- O Event Sourcing é uma técnica comum para rastrear eventos e estados.

#### Vantagens da Coreografia

- Maior flexibilidade e escalabilidade, pois os microsserviços podem ser adicionados ou removidos facilmente.
- Cada serviço é independente e mantém seu próprio estado.

### Orquestração de Microsserviços

#### Workflow e Fluxos de Trabalho

- Definição de fluxos de trabalho e sequências de tarefas que os microsserviços devem seguir.
- O orquestrador coordena a execução de cada etapa.

#### Vantagens da Orquestração

- Maior controle e visibilidade sobre o processo de negócios.
- Facilita o monitoramento, o rastreamento e a auditoria.

#### Ferramentas de Orquestração

- Kubernetes é uma plataforma popular para orquestração de contêineres.
- Ferramentas como Apache Airflow ou Camunda são usadas para orquestração de processos.

## Padrões comuns de microsserviços

- **API composition:** combinar funcionalidades de várias APIs em uma única interface para simplificar o acesso a diferentes recursos de programação.
- **Decompose by business capability:** é uma abordagem para organizar a arquitetura de um sistema de software com base em funções ou capacidades de negócios específicas. Envolve dividir o sistema em componentes modulares, cada um responsável por uma capacidade de negócios distinta, melhorando a flexibilidade e alinhando-se com os objetivos da empresa.
- **Strangler application:** é um padrão de migração de software que envolve substituir gradualmente partes de uma aplicação legada por novos componentes até que a aplicação antiga seja completamente desativada. Isso minimiza os riscos e as interrupções nos negócios durante a modernização do sistema.
- **ACL:** é um padrão de design de software que protege um sistema de influências externas indesejadas, como sistemas legados ou APIs, garantindo que os dados e as interações sejam traduzidos ou adaptados de forma segura, mantendo a integridade do sistema principal.
- **API-Gateway:** é um componente de software que funciona como um ponto de entrada único para várias APIs, gerenciando o roteamento, segurança e controle de tráfego, simplificando o acesso aos serviços subjacentes. É amplamente utilizado em arquiteturas de microsserviços.
- **BFF(Backend for fronted):** para cada tipo de cliente, é possível ter um retorno de API diferente
- **Banco de dados:** cada microsserviço pode ter um banco de dados
- **Relatórios e consolidação de informações:** é possível criar um microsserviço para gerar relatórios ou os microsserviços atualizarem uma tabela em comum para gerar o relatório´
- **Transactional Outbox:** é um padrão de design em sistemas distribuídos que envolve o armazenamento de informações sobre eventos ou transações em um local específico antes de enviá-los para outros sistemas ou serviços. Isso garante que as ações sejam executadas de forma consistente e confiável, mesmo em cenários de falha. Esse padrão é valioso para manter a integridade de dados em sistemas distribuídos.
- **Secret manager:** serviço para rotatividade e armazenamento de senhas
- **Padronização de logs**
- **Open telemetry:** é um projeto de código aberto que fornece uma estrutura para instrumentação e observabilidade em aplicativos e sistemas distribuídos. Ele permite a coleta de métricas, rastreamento e registros para monitorar e solucionar problemas em ambientes complexos. O OpenTelemetry é amplamente adotado para melhorar a visibilidade e o desempenho em sistemas modernos baseados em microsserviços e contêineres.

