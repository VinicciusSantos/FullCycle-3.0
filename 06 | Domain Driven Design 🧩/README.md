[⬅ voltar ao menu](../README.md)

# Domain Driven Design 🧩

- É uma abordagem de design de software que enfatiza a compreensão profunda e a modelagem do domínio de negócios.
- Busca criar sistemas complexos e bem estruturados, onde o foco está na linguagem do negócio e na colaboração entre desenvolvedores e especialistas do domínio.

## Vantagens do DDD

- Modelo Rico: Cria um modelo de domínio mais expressivo e compreensível.
- Comunicação Efetiva: Melhora a comunicação entre desenvolvedores e especialistas do domínio.
- Design Orientado ao Negócio: Foca na solução de problemas reais de negócio.
- Manutenibilidade: Facilita a manutenção e a evolução do software.
- Escalabilidade: Permite a escalabilidade ao dividir o sistema em contextos delimitados.

## Conceitos-Chave do DDD

### Domínio

- Representa o problema que o software deve resolver
- É a esfera de conhecimento sobre a qual o sistema é construído.

#### Core Domain
- O coração do negócio.
- Diferencial competitivona empresa

### Modelo

- É uma representação abstrata do conhecimento do domínio.
- Ele captura as regras de negócios, os conceitos, os processos e as relações entre eles.

### Aggregates

- São grupos de entidades e objetos de valor relacionados que são tratados como uma unidade coesa.
- Eles garantem a consistência das operações.

### Bounded Contexts

- Delimitam áreas dentro do domínio onde um modelo é definido e entendido de maneira consistente.
- Diferentes contextos podem ter terminologia e regras diferentes.

### Entidades

- São objetos com identidade que possuem um ciclo de vida e podem mudar ao longo do tempo.

### Objetos de Valor

- São objetos que têm apenas um valor, sem identidade.
- São imutáveis e representam conceitos que são usados para cálculos e validações.

### Serviços

- São operações ou ações que não pertencem naturalmente a uma única entidade ou objeto de valor.
- Eles realizam tarefas dentro do domínio.

### Agregação

- É uma forma de compor objetos em um agrupamento lógico para tratá-los como uma única unidade.

## Processo do DDD

1. Compreensão do Domínio: Envolve colaborar com especialistas do domínio para compreender profundamente as regras, processos e problemas do negócio.

2. Modelagem do Domínio: Criar um modelo do domínio que reflete a linguagem e as regras do negócio, usando entidades, objetos de valor, agregados, etc.

3. Bounded Contexts: Definir limites claros entre diferentes contextos e criar modelos específicos para cada um.

4. Desenho da Arquitetura: Definir como os diferentes componentes do sistema interagem para suportar o modelo do domínio.

5. Implementação: Traduzir o modelo do domínio em código, mantendo a coesão e a clareza.
