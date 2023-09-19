[⬅ voltar ao menu](../README.md)

# RabbitMQ 🐇

- É um software de mensageria open-source.
- Atua como um intermediário entre aplicativos para permitir a comunicação assíncrona.

## Principais Conceitos

- **Produtores (Producers)**: Aplicativos que enviam mensagens para o RabbitMQ.
- **Fila (Queue)**: Onde as mensagens são armazenadas antes de serem consumidas.
- **Consumidores (Consumers)**: Aplicativos que recebem e processam mensagens da fila.

![Funcionamento básico do RabbitMQ](./assets/funcionament_basico.png)

## Benefícios

- **Escalabilidade**: Permite distribuir tarefas em vários consumidores.
- **Flexibilidade**: Suporta diversos padrões de mensageria.
- **Confiabilidade**: Garante a entrega de mensagens, mesmo em caso de falhas.

## Protocolos

- Usa o protocolo AMQP (Advanced Message Queuing Protocol) por padrão.
- Suporta outros protocolos como MQTT e STOMP.

## Exchanges

- Define as regras para roteamento de mensagens para filas.
- Tipos comuns de exchanges incluem `direct`, `topic`, e `fanout`.

### Direct Exchange
![Direct exchange](./assets/direct_exchange.png)

## Fanout Exchange
![Fanout Exchange](./assets/fanout_exchange.png)

## Topic Exchange
![Topic Exchange](./assets/topic_exchange.png)

## Casos de Uso

- Processamento de tarefas em segundo plano.
- Comunicação entre microserviços.
- Integração de sistemas heterogêneos.
