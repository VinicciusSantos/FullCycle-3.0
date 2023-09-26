[⬅ voltar ao menu](../README.md)

# Apache Kafka 📡

## O que é o Apache Kafka?

- O Apache Kafka é uma plataforma de streaming de eventos distribuída, de código aberto, que permite publicar, assinar e processar fluxos de registros em tempo real.
- Ele foi projetado para lidar com dados de vários tipos e é capaz de processar milhões de eventos por segundo.
- O Kafka pode ser usado para várias finalidades, como monitoramento de atividades, agregação de logs, integração de aplicativos, análise de dados em tempo real e alimentação de pipelines de dados.
- Latência extremamente baixa (2ms) e alta capacidade de processamento de dados.

## Tópicos

- Um tópico é uma canal de comunicação reponsável por receber e disponibilizar os dados enviados para o kafka.

### Anatomia de um registro

- **Headers**: Metadados que podem ser adicionados a uma mensagem.
- **Key**: Chave que pode ser adicionada a uma mensagem.
- **Value**: Dados que serão enviados para o tópico.
- **Timestamp**: Data e hora em que a mensagem foi enviada.

## Partições

Cada tópico pode ter uma ou mais partições, que são responsáveis por armazenar os dados enviados para o tópico e garantir a resiliência do sistema.

## Lideranças de Partições

Cada partição de um tópico pode ter um ou mais brokers, sendo que apenas um deles é o líder da partição, responsável por receber e disponibilizar os dados para os consumidores.
