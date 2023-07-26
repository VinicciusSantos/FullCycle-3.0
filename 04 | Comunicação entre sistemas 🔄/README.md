[⬅ voltar ao menu](../README.md)

# Comunicação entre sistemas 🔄

## REST (Representational state of transfer)

- simplicidade
- stateless
- cacheável

### Níveis de maturidade

#### Nivel 0
- Tudo que se traféga por http é realizado através de uma transação
  
#### Nivel 1: Utilização de resouces
   | Verbo  | URI         | Operação |
   | ------ | ----------- | -------- |
   | GET    | /products/1 | Buscar   |
   | POST   | /products   | Inserir  |
   | PUT    | /products/1 | Alterar  |
   | DELETE | /products/1 | Remover  |

#### Nível 2: Verbos HTTP
   | Verbo  | Utilização           |
   | ------ | -------------------- |
   | GET    | Recuperar informação |
   | POST   | Inserir              |
   | PUT    | Alterar              |
   | DELETE | Remover              |
#### Nível 3: HATEOAS (Hypermedia as the Engine of Application State)
- Sempre vai responder a requisição trazendo as ações permitidas ao usuário
```json
{
    "account": {
        "account_number": 12345,
        "balance": {
            "currency": "usd",
            "value": 100
        },
        "links": {
            "deposit": "/accounts/12345/deposit",
            "withdraw": "/accounts/12345/withdraw",
            "transfer": "/accounts/12345/transfer",
            "close": "/accounts/12345/close",
        }
    }
}
```

### Um boa API REST
- Utiliza URIs únicas para serviços e itens que expostos para esses serviços
- Utiliza todos os verbos HTTP para realizar as operações
- Provê links relacionais para os recursos exemplificando o que pode ser feito

### Principais padrões de API REST
- JSON
- Hal
- Siren

#### JSON
- Não provê um padrão de hipermídia para realizar a linkagem

#### HAL (Hypermedia Application Language)
![Hall Pattern](./assets/hall.png)

### HTTP Method Negotiation 
- O Método options informa quais metodos são permitidos para um recurso

### HTTP Content Negotiation
- Cliente solicita a informação e eo tipo de retorno pelo server baseado no media type informado por ordem de prioridade
  - Erro 406: Not Acceptable 
- Através do content-type no header da request, o servidor consegue verificar se ele irá conseguir processar a informação para retornar a informação desejada
  - Erro 415: Unsupported Media Type 