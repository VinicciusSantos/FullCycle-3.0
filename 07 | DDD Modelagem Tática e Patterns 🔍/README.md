[⬅ voltar ao menu](../README.md)

# DDD: Modelagem Tática e Patterns 🔍

O Domain-Driven Design (DDD) é uma abordagem de design de software que se concentra na modelagem do domínio do problema para criar sistemas mais robustos e flexíveis. Ele se baseia em vários conceitos essenciais para criar um design de software coeso e orientado ao negócio.

## Entidades

- São objetos que possuem uma identidade única e são definidas não apenas por seus atributos, mas também pelo seu ciclo de vida e histórico.
- Elas encapsulam comportamentos e representam conceitos importantes no domínio do problema.

## Value Objects

- São objetos imutáveis que representam características ou aspectos do domínio.
- Eles não possuem uma identidade própria, mas são definidos apenas pelos seus atributos.
- São usados para modelar conceitos que não possuem ciclo de vida independente.

## Agregados

- São grupos de Entidades e Value Objects relacionados que são tratados como uma única unidade coesa.
- Uma Entidade dentro de um Agregado é a raiz do Agregado e é a única porta de entrada para modificar o estado interno do Agregado. Isso ajuda a manter a consistência e a integridade do domínio.

## Domain Service

- São componentes que encapsulam lógicas ou operações que não se encaixam naturalmente em Entidades ou Agregados.
- Eles fornecem operações de alto nível que atuam no domínio do problema e podem ser reutilizados em várias partes do sistema.

## Repositórios

- São responsáveis por fornecer uma interface para persistir e recuperar Entidades e Agregados.
- Eles abstraem o acesso aos dados subjacentes e permitem que o domínio trabalhe com seus objetos sem se preocupar com os detalhes de armazenamento.

## Domain Events

- São eventos significativos que ocorrem no domínio e são usados para comunicar mudanças ou ocorrências importantes para outras partes do sistema.
- Eles permitem o desacoplamento entre diferentes partes do domínio e possibilitam a reação a eventos relevantes.

## Módulos

- São formas de organizar e agrupar diferentes partes do domínio relacionadas.
- Cada módulo contém Entidades, Agregados, Value Objects, Domain Services e outros componentes que se relacionam para resolver um aspecto específico do problema.

## Factories

- São responsáveis por criar instâncias complexas de Entidades ou Agregados.
- Elas encapsulam a lógica de criação e inicialização desses objetos, garantindo que as regras de criação sejam seguidas de forma consistente.
