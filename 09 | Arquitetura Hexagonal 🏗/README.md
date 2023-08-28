[⬅ voltar ao menu](../README.md)

# Arquitetura Hexagonal 🏗

A Arquitetura Hexagonal, também conhecida como Arquitetura Ports and Adapters, é um padrão de arquitetura de software que visa separar as preocupações e tornar o sistema mais modular e testável. Ela foi introduzida por Alistair Cockburn.

## Princípios

- **Domínio Central:** O núcleo da aplicação, que contém a lógica de negócios e regras, é isolado em um domínio central.
- **Separação de Camadas:** A arquitetura é dividida em três camadas principais: Domínio, Aplicação e Infraestrutura, cada uma com responsabilidades específicas.
- **Portas e Adaptadores:** As "portas" representam as interfaces através das quais a aplicação interage com o mundo exterior, enquanto os "adaptadores" implementam essas interfaces e lidam com detalhes técnicos.

## Componentes

1. **Domínio:** Contém as regras de negócios, entidades, objetos de valor e serviços relacionados.
2. **Camada de Aplicação:** Orquestra a interação entre os componentes do domínio e as interfaces do mundo exterior.
3. **Adaptadores Primários:** São responsáveis por expor os casos de uso da aplicação por meio de interfaces como APIs, GUIs, etc.
4. **Adaptadores Secundários:** Lidam com detalhes técnicos, como conexões com bancos de dados, envio de e-mails, integrações externas, etc.

## Benefícios

- **Testabilidade:** A separação de camadas e a clara definição de portas tornam os testes mais fáceis, permitindo testar os componentes independentemente.
- **Flexibilidade:** A arquitetura permite a substituição de adaptadores sem afetar o núcleo da aplicação, facilitando mudanças tecnológicas.
- **Manutenção Simplificada:** As responsabilidades bem definidas de cada camada tornam a manutenção e evolução do sistema mais gerenciáveis.
