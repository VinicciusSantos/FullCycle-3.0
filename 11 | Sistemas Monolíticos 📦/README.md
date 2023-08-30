[⬅ voltar ao menu](../README.md)

# Sistemas Monolíticos 📦

Um tipo de arquitetura de software com todos os componentes integrados em um único bloco de código.

## Vantagens

- **Simplicidade**: Fácil desenvolvimento, teste e implantação.
- **Desempenho**: Menos sobrecarga de comunicação entre componentes.
- **Depuração**: Depuração simplificada devido ao ambiente único.

## Desvantagens

- **Escala**: Dificuldade em escalar partes específicas.
- **Manutenção**: Mudanças afetam múltiplos componentes.
- **Inovação**: Menos flexibilidade para adotar novas tecnologias.

## Tipos de sistemas monolíticos

### 1. Single Process (Processo Único)

- **Descrição**: Em um sistema monolítico com single process, todas as partes do sistema são executadas em um único processo.
- **Características**:
  - Alto acoplamento
  - Modular
  - Modular com bancos de dados segregados

### 2. Monolitos Distribuídos

- **Descrição**: Refere-se a uma abordagem em que partes de um sistema monolítico são distribuídas em diferentes máquinas, mas ainda são integradas como um monolito.
- **Características**:
  - Componentes podem estar em servidores separados.
  - Pode melhorar o desempenho de partes específicas.
  - Ainda enfrenta desafios de escalabilidade e manutenção.

### 3. Black Box (Caixa-Preta)

- **Descrição**: O sistema monolítico é tratado como uma "caixa-preta" em que as funcionalidades internas não são visíveis ou acessíveis externamente.
- **Características**:
  - Componentes internos não são expostos diretamente.
  - Abstração da complexidade interna.
  - Pode limitar a flexibilidade e personalização.

