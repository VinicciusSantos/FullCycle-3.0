[⬅ voltar ao menu](../README.md)

# Fundamentos da arquitetura de software 🏛️

## Tipos de Arquitetura

### Papel do arquiteto tecnológico.

Especialidade em tecnologias específicas de mercado.
Exemplos de arquitetos tecnológicos em diferentes plataformas:

- Arquiteto Elastic.
- Arquiteto Java.
- Arquiteto de Bancos de Dados (DBAs).
- Oracle, SAP e Salesforce.

### Arquitetura Corporativa

- Impacto estratégico na organização.
- Governança e padronização de tecnologias.
- Avaliação de custos e planejamento de implantações.
- Exemplo de implantação do Salesforce e migrações para microsserviços.

### Arquitetura de Soluções

- Posicionamento entre a área de negócios e a área de software.
- Transformar requisitos de negócios em soluções de software.
- Importância da habilidade de desenhar e documentar.
  - Formatos de diagramas utilizados (C4, UML, BPMN).
- Análise dos impactos comerciais das escolhas tecnológicas.
- Considerações do contexto do cliente para as decisões tecnológicas.
- Participação em reuniões de pré-venda e venda.
- Apoio na geração de soluções técnicas para clientes.
- Realização de análises de custos para o negócio.
- Habilidades necessárias: conhecimento técnico, compreensão de negócios, boa comunicação e habilidades de expressão em diagramas e números.

### Arquitetura de Software

- A arquitetura de software é uma disciplina da engenharia de software que abrange todos os processos de desenvolvimento de software no dia a dia, incluindo metodologias e formatos de desenvolvimento.
- Ligação entre a área de negócios e a área de software.
- Impacta diretamente a estrutura organizacional da empresa, definindo a formação de times de software.
- Lei de Conway: os sistemas desenvolvidos refletem a estrutura de comunicação da empresa.
- Arquitetura de software é a relação entre os objetivos de negócios e as restrições, visando a evolução do software.
- Desenvolvimento de software em componentes alinhados aos objetivos de negócio e restrições.
- Definição formal da ISO: "organização fundamental de um sistema e seus componentes, suas relações, seu ambiente, bem como os princípios que guiam seu design e evolução."
- O arquiteto de software pensa no software a longo prazo e busca sua sustentabilidade.
- Arquitetura de software faz parte de um conjunto maior que atende às necessidades do negócio a curto, médio e longo prazo.

## Performance

- É o desempenho de um software em completar um determinado workload.
- Refere-se ao tempo e eficiência em que o software executa suas ações diárias.
- Requer dados para avaliar a performance do software.

### Unidades de Avaliação de Performance

#### Latência ou Response Time

- Tempo de resposta entre uma requisição e a obtenção do resultado.
- Medido em milissegundos (ms).
- Importante para verificar a eficiência da aplicação em responder rapidamente às solicitações do usuário.

#### Throughput

- Mostra a capacidade de um software em lidar com um grande número de requisições.
- Reflete a quantidade de requisições que o software é capaz de suportar simultaneamente.
- Aumentar o throughput é uma forma de melhorar a performance do software.

### Diferença entre Performance e Escalabilidade

- Um software performático não necessariamente é escalável, e vice-versa.
- Performance se refere à eficiência e rapidez na execução de tarefas.
- Escalabilidade está relacionada à capacidade de expansão e adaptação do software para suportar um maior número de usuários ou carga de trabalho.

### Principais Razões para Baixa Performance na Aplicação

- Processamento Ineficiente
- Recursos Computacionais Limitados
- Trabalhar de Forma Bloqueante
- Acesso Serial aos Recursos
- Identificação dos Problemas de Capacidade Computacional:
- Melhorar Algoritmo, Queries e Overhead de Framework
- Concorrência e Paralelismo
- Otimização do Banco de Dados
- Uso de Caching
- Escalabilidade Vertical e Horizontal

### Escala Vertical e Escala Horizontal

#### Escala Vertical

- Aumento da capacidade computacional em uma única máquina.
- Melhoria do hardware existente para lidar com mais requisições.

#### Escala Horizontal

- Aumento da capacidade de máquinas em um ambiente distribuído.
- Utilização de balanceadores de carga para distribuir as requisições entre várias máquinas.

### Diferença entre Concorrência e Paralelismo

- Concorrência: Lidar com várias tarefas ao mesmo tempo.
- Paralelismo: Realizar várias tarefas ao mesmo tempo.

#### Aplicação de Concorrência e Paralelismo

- Utilizar concorrência e paralelismo para lidar com várias requisições de forma simultânea.
- Trabalhar com múltiplas threads ou processos para aumentar a eficiência de processamento.

- Exemplo de Web Servers e Workers:
  - Web servers podem trabalhar com um número limitado de workers, limitando o paralelismo.
  - Utilizar linguagens ou abordagens que permitem lidar com várias requisições simultaneamente é essencial para melhorar o throughput.

### A Importância do Cache na Performance do Sistema

#### Cache na Borda (Edge Computing)

- Cache que funciona antes de atingir a cloud ou servidor principal.
- Utilizado para armazenar dados estáticos, como HTML, CSS, JavaScript, imagens, etc.
- Proporciona baixa latência, melhorando a experiência do usuário.

#### Cache de Páginas Web

- Cache de páginas completas, como home, página de contato, notícias, etc.
- Reduz o processamento de background e o acesso ao banco de dados.
- Permite o retorno rápido de páginas já processadas.

#### Cache de Resultados de Algoritmos Pesados

- Cache de objetos ou resultados de algoritmos com dados que mudam com pouca frequência.
- Evita a necessidade de processar repetidamente dados estáticos.
- Reduz o acesso ao banco de dados e operações custosas.

#### Cache Compartilhado e Exclusivo

##### Cache Exclusivo

- Duplicação do cache em várias máquinas.
- Baixa latência, mas maior custo em duplicação.

##### Cache Compartilhado

- Cache centralizado, compartilhado por várias máquinas.
- Maior latência, mas evita duplicação e é eficiente para dados comuns.

#### Caching com Banco de Dados Externo

- Cache compartilhado é comum quando o banco de dados é externo.
- Utilização de Redis ou Memcached como opções populares de cache.
- Cache de consultas pode reduzir a necessidade de acesso constante ao banco de dados.

## Escalabilidade

- Capacidade de sistemas suportarem aumento ou redução de workloads.
- Incrementar ou reduzir o custo em proporção igual ou menor.

### Escalabilidade vs. Performance

- Performance foca em reduzir latência e aumentar throughput.
- Escalabilidade visa aumentar/diminuir throughput ao adicionar/remover capacidade computacional.

### Escalabilidade Vertical vs. Horizontal

- Escala Vertical: Aumenta recursos computacionais em uma máquina.
- Escala Horizontal: Aumenta quantidade de máquinas, distribuindo a carga.

#### Desafios da Escala Vertical

- Limite de hardware em uma máquina.
- Risco de colocar todos os ovos na mesma cesta (dependência total da máquina).

#### Vantagens da Escala Horizontal

- Maior flexibilidade para adicionar recursos.
- Menor impacto em caso de falhas (alta disponibilidade).

#### Escolhendo a Abordagem Certa

- Escalabilidade vertical geralmente é limitada, mas pode ser útil para pequenos aumentos.
- Escalabilidade horizontal é mais comum para sistemas de grande porte e alta demanda.
- Escalabilidade horizontal requer ajustes no software para distribuir a carga entre máquinas.

### Escalabilidade Horizontal: Pontos de Atenção

#### Disco Efêmero

- Partir do princípio de que tudo no disco pode ser perdido.
- Utilizar discos efêmeros para salvar arquivos temporários ou auxiliares.
- Armazenar dados permanentes em serviços externos, como S3 da AWS.

#### Servidor de Aplicação vs. Servidor de Assets

- Separar servidores de aplicação e servidores de assets (imagens, arquivos estáticos).
- Escalar apenas o servidor de aplicação, mantendo os assets em servidores dedicados.

#### Cache Centralizado

- Utilizar cache compartilhado em servidores externos, evitando cache na máquina local.
- Cache de consultas no banco de dados deve ser centralizado para todas as máquinas.

#### Sessões Centralizadas

- Armazenar sessões em servidores de cache centralizados para acesso em todas as máquinas.

#### Estado Stateless

- Tornar o software Stateless, sem armazenar estado nas máquinas.
- Todo estado deve ser armazenado de forma externa.

#### Upload de Arquivos

- Evitar gravação de arquivos na máquina local.
- Fazer uploads em serviços de armazenamento externo (exemplo: S3).

#### Decentralização e Descentralização

- Escalar horizontalmente requer descentralização de dados, estrutura e arquitetura.
- Máquinas devem ser criadas e removidas facilmente, sem medo de perder informações.

##### Objetivo

- Escalar o software para aumentar o throughput, permitindo mais requisições simultâneas.

##### Resultados

- Maior flexibilidade para aumentar ou diminuir a quantidade de máquinas.
- Maior disponibilidade do sistema, com menor impacto em caso de falhas.
- Escalabilidade horizontal possibilita o crescimento sustentável do software.

### Escalando Banco de Dados: Pontos de Atenção

#### Aumento de Recursos Computacionais

- Aumentar recursos (disco, memória, CPU) para melhorar a capacidade de escalabilidade.
- Limitações ao escalar verticalmente; busca por soluções de escalabilidade horizontal.

#### Distribuição de Responsabilidade

- Separar bancos de dados para leitura e escrita.
- Criar réplicas para leitura, permitindo maior capacidade de leitura.

#### Escolha do Tipo de Banco de Dados

- Selecionar o tipo de banco de dados mais adequado para a aplicação (exemplo: gráficos, documentos, colunas).
- Explorar opções como Cassandra, MongoDB, Neo4j, entre outros.

#### Serverless

- Utilizar serviços gerenciados pelo Cloud Provider para escalar o banco de dados.
- Exemplo: AWS Lambda, Amazon S3, DynamoDB.

#### Otimização do Banco de Dados

- Monitorar o desempenho do banco de dados com APM (Application Performance Monitoring).
- Trabalhar com índices para otimizar consultas.
- Utilizar o padrão CQRS para separar comandos e consultas, otimizando a performance.

#### Explaining Queries

- Utilizar o comando EXPLAIN para analisar o desempenho das consultas.
- Identificar pontos lentos nas queries e otimizar o desempenho.

### Proxy Reverso: Conceito e Funcionamento

#### Proxy Normal

- Redireciona as solicitações do cliente (navegador) para o site desejado.
- Faz filtragem de conteúdo e regras de acesso.

#### Proxy Reverso

- Servidor que fica na frente dos servidores web.
- Encaminha as solicitações do cliente para os servidores web com base em regras pré-definidas.
- Recebe as requisições do cliente, analisa os dados HTTP e decide qual servidor atenderá a requisição.

#### Soluções de Proxy Reverso

- Nginx (Engine X): Muito utilizado, capaz de trabalhar como load balancer também.
- HAProxy: Alta disponibilidade, ideal para cenários de alta carga e distribuição.
- Traefik: Solução moderna e popular, trabalha com Docker e orquestradores.

## Resiliência

- É um conjunto de estratégias adotadas intencionalmente para a adaptação de um sistema quando ocorre uma falha. Em outras palavras, é a capacidade do software de se recuperar e se adaptar de forma autônoma quando algo inesperado acontece.
- Em vez de simplesmente falhar e quebrar, o sistema resiliente busca alternativas para continuar funcionando, mesmo que de forma parcial.

### Estratégias de Resiliência em Software

#### Health Check

- É uma estratégia de resiliência que verifica a saúde de um sistema em intervalos regulares.
- Self Healing (Auto cura) é a capacidade de um sistema de se recuperar automaticamente quando sua saúde é restaurada.
- Ter um health check de qualidade ajuda a tomar decisões mais assertivas sobre quando e como direcionar o tráfego para um sistema.

#### Circuit Breaker (Disjuntor)

- É uma estratégia de resiliência que protege o sistema ao negar requisições e retornar um erro 500 quando o sistema está sobrecarregado ou não está funcionando adequadamente.
- O funcionamento do Circuit Breaker é semelhante ao disjuntor elétrico em uma casa, onde ele abre o circuito para evitar sobrecargas e danos aos equipamentos.
- O Circuit Breaker tem três estados:
  - circuito fechado (sistema operando normalmente),
  - circuito aberto (sistema sobrecarregado ou com falhas, negando todas as requisições)
  - circuito meio aberto (permitindo uma quantidade limitada de requisições para verificar a recuperação do sistema).
- O objetivo do Circuit Breaker é evitar que um sistema sobrecarregado afete outros sistemas e permitir que o sistema se recupere antes de aceitar novas requisições.
- O Circuit Breaker pode ser implementado diretamente no código do sistema utilizando bibliotecas específicas ou pode ser configurado na rede quando se trabalha com service mesh.

#### API Gateway

- É responsável por centralizar todas as requisições em uma aplicação, aplicar regras, políticas e plugins para aceitar ou negar as requisições.
- Ele tem a capacidade de entender as necessidades individuais de cada sistema ou serviço e tomar decisões baseadas nessas informações.
- O API Gateway é útil para evitar ataques, como tentativas de autenticação inválidas ou acesso não autorizado a determinadas URLs.
- Ele pode validar a autenticação e fornecer tokens JWT para garantir que as requisições sejam feitas por usuários autenticados.
- Algumas API Gateways populares incluem o Kong, que pode ser utilizado como stand alone ou como Ingress Controller no Kubernetes.
- A API Gateway pode realizar health checks ativos para verificar a saúde das aplicações e interromper o apontamento para sistemas não saudáveis.
- Ela oferece diversos recursos, como rate limiting, transformações de dados, adição/remoção de headers e logs.

#### Service Mesh e Resiliência

- É uma tecnologia que centraliza o controle do tráfego de rede entre os sistemas e serviços.
- Ele utiliza proxies (sidecars) ao lado de cada sistema para intermediar a comunicação, permitindo controlar e medir todo o tráfego na rede.
- Com o Service Mesh, todas as requisições são efetuadas via proxies, facilitando o controle e a implementação de políticas de resiliência diretamente na rede.
- A service mesh pode atuar como um intermediário de certificados para garantir a segurança das comunicações, utilizando MTLS (Mutual TLS) para autenticação mútua entre os sistemas.
- Service Mesh possibilita automatizar circuit breaker, políticas de retry, timeouts e injeção de falhas, facilitando testes e garantindo maior estabilidade e segurança nas aplicações.
- É uma ferramenta valiosa para melhorar a resiliência em ambientes com múltiplos microsserviços.

#### Timeout (Tempo limite)

Define um tempo limite para a resposta de serviços externos. Se o serviço não responder dentro desse limite, o sistema pode tomar uma ação apropriada.

#### Fallback (Alternativa)

Cria uma estratégia de contingência para quando um serviço não estiver disponível. O sistema pode usar um serviço alternativo, um cache ou dados padrão.

#### Bulkhead (Casco blindado)

Separa os componentes do sistema em grupos isolados com recursos próprios para evitar que uma falha em um componente afete todo o sistema.

#### Retry (Tentar novamente)

- Políticas de retry consistem em reenviar uma mensagem ou requisição se a resposta não for recebida em um determinado tempo.
- A abordagem linear de retry pode ser ineficiente, pois muitas chamadas simultâneas podem sobrecarregar o sistema destino.
- A técnica de exponential backoff consiste em aumentar o intervalo entre os retries de forma exponencial para dar mais tempo ao sistema destino se recuperar.
- Exponential backoff ajuda a evitar retries simultâneos, mas não garante uma melhora drástica na resiliência.
- A estratégia de exponential backoff com jitter adiciona um pequeno ruído aleatório aos tempos de retry, evitando retries simultâneos e aumentando as chances de sucesso.
- O jitter faz com que as chamadas não aconteçam exatamente ao mesmo tempo, tornando mais eficiente a utilização de recursos no sistema destino.
- Utilizar políticas de retry com algoritmos de jitter pode melhorar significativamente a resiliência do sistema.
- As políticas de retry são uma estratégia valiosa para lidar com problemas temporários e instabilidades em sistemas distribuídos.
- Experimentar diferentes intervalos de retry e algoritmos de jitter pode ajudar a otimizar a resiliência do sistema.
- Utilizar a abordagem de garantia de entrega em conjunto com outras práticas, como trabalhar de forma assíncrona, pode aumentar ainda mais a resiliência do sistema.

#### Rate Limiting (Limitação de taxa)

- É uma estratégia de resiliência que protege o sistema baseado na capacidade que ele foi projetado para suportar.
- Antes de aplicar o Rate Limiting, é importante conhecer o limite de requisições que o sistema consegue lidar de forma eficiente.
- O Rate Limiting impõe um limite de requisições por segundo que o sistema pode receber. Se o limite for excedido, o sistema responde com um erro (por exemplo, 500).
- É crucial aplicar Rate Limiting de forma inteligente, considerando a prioridade dos diferentes clientes e sistemas que acessam o seu sistema.
- Diferentes clientes podem ter limites de requisições diferentes com base em sua importância ou prioridade no negócio.
- Ao utilizar Rate Limiting por cliente, sistemas críticos podem ter prioridade de acesso em relação a sistemas menos importantes, evitando problemas para os sistemas que realmente precisam utilizar o serviço de forma prioritária.

#### Fallback Cache (Cache de backup)

Utiliza um cache como fonte alternativa de dados quando o serviço principal está indisponível.

#### Graceful Degradation (Degradação graciosa)

Prioriza funcionalidades críticas e essenciais em momentos de falha ou sobrecarga. Funcionalidades menos críticas podem ser temporariamente desativadas ou simplificadas.

#### Trabalhando de forma assíncrona para aumentar a resiliência

- Trabalhar de forma assíncrona significa não esperar por uma resposta imediata após enviar uma requisição ou mensagem para outro sistema.
- É como entrar em uma fila no banco ou supermercado, aguardando a vez de ser atendido. Quando o sistema não consegue responder imediatamente, a requisição é armazenada para processamento posterior.
- Trabalhar de forma assíncrona evita a perda de dados e permite que o sistema dê vazão a mais requisições do que poderia se trabalhasse de forma síncrona.
- A abordagem assíncrona é especialmente útil quando um sistema está sobrecarregado ou passando por problemas temporários, pois as requisições são armazenadas e processadas quando o sistema estiver disponível.
- Ao trabalhar de forma assíncrona, é essencial usar um "message broker" (como RabbitMQ, Kafka ou SQS) para intermediar as mensagens, garantindo a entrega e recebimento adequado.
- Com o uso correto de message brokers, é possível manter a resiliência entre os sistemas, pois os dados não são perdidos mesmo em situações adversas.
