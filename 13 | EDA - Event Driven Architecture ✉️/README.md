[⬅ voltar ao menu](../README.md)

# EDA - Event Driven Architecture ✉️

- Eventos são situações que ocorreram no passado
- Eventos deixam efeitos colaterais
- Trabalhar de forma internalizada no software ou externalizada

## Tipos de eventos

1. **Event Notification:** forma curta de comunicação
   - exemplo:
   ```json
   { "pedido": 1, "status": "aprovado" }
   ```
2. **Event Carried State Transfer:** formato completo para trafegar as informações
   - exemplo:
   ```json
   {
     "pedido": 1,
     "produtos": [{}, {}],
     "status": "aprovado",
     "valor": 10.0,
     "tax": "1%",
     "comprador": "Wesley"
   }
   ```
3. **Event sourcing:** os eventos podem ser armazenados em um banco de dados para depois o replay ser feito para realizar calculos

## Event Colaboration

Toda mudança em um estado de um agregado gera eventos para todos os miscrosserviços

## CQRS (Command Query Responsibility Segregation)

- Separação dos comandos e das consultas
- Um comando é uma intenção de mudança

## Event sourcing vs Command sourcing

- event sourcing armazena todos os eventos
- command sourcing armazena todos os comandos
