[⬅ voltar ao menu](../README.md)

# Docker 🐳

## Principais comandos

- `ps`: lista todos os containers
    - `-a`: mostra containers que já foram encerrados
- `run :nome_do_container`: executa algum container
  - `-i`: modo interativo
  - `-t `: permite digitar no terminal
  - `--rm`: apaga o container automaticamente
  - `-p :porta_maquina:porta_container`: publica a porta do container
  - `-d`: faz o terminal não ficar preso ao container
  - `--name :nome`: dá um nome a um container
  - `-v :pasta_maquina:pasta_container`: cria um volume no container
  - `--mount type=:type,source=:source,target=:target`
    - type: bind ou volume
    - source: caminho na maquina
    - target: caminho no container 
- `stop`: para a execução de um container
- `start`: inicia a execução de um container parado
- `rm :id_ou_nome`: apaga um container parado
  - `-f`: força a remoção de um container (usado para apagar um container quando ele ainda está em execução) 
- `exec :id_ou_nome :comando`: executa algum comando dentro do container
  - `-i`: modo interativo
  - `-t `: permite digitar no terminal
- `volume ls`: lista todos os volumes
- `volume create :nome`: cria um volumes
- `volume inspect :nome`: mostra detalhes de um volumes
- `pull :nome_da_imagem`: baixa uma imagem
- `images`: lista todas as imagens
- `rmi :nome_da_imagem`: apaga uma imagem
- `build :pasta`: cria uma imagem a partir de um dockerfile
  - `-t :usuario/:nome_imagem:latest`: dá uma tag para uma imagem
- `login`: faz login no dockerhub

## Dockerfile
Uma receita para construir um container, permitindo definir um ambiente personalizado e próprio para um projeto

### Principais comandos

- `FROM :nome_da_imagem`: busca a imagem para criar o container
- `WORKDIR`: define o diretório de trabalho no container
- `COPY :pasta_maquina :pasta_container`: copia arquivos de uma pasta
- `RUN :comando`: executa um comando na criação do container
- `USER :nome`: define qual usuario será utlizado para executar os comandos no container
- `CMD :comando`: executa um comando variavel ao final da criação do container
- `ENTRYPOINT :comando`: executa um comando fixo
- `ENV :nome :valor`: define uma variável de ambiente
- `EXPOSE :porta`: expõe uma porta do container