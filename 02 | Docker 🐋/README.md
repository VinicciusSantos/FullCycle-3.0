[⬅ voltar ao menu](../README.md)

# Docker 🐳

## Principais comandos

- `docker ps`: lista todos os containers
    - `-a`: mostra containers que já foram encerrados
- `docker run :nome_do_container`: executa algum container
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
  - `--network :nome_da_rede`: associa o container a uma rede
- `docker stop`: para a execução de um container
- `docker start`: inicia a execução de um container parado
- `docker rm :id_ou_nome`: apaga um container parado
  - `-f`: força a remoção de um container (usado para apagar um container quando ele ainda está em execução) 
- `docker exec :id_ou_nome :comando`: executa algum comando dentro do container
  - `-i`: modo interativo
  - `-t `: permite digitar no terminal
- `docker login`: faz login no dockerhub
- `docker attach :id_ou_nome`: entra no terminal de um container

## Volumes
- `docker volume ls`: lista todos os volumes
- `docker volume create :nome`: cria um volume
- `docker volume inspect :nome`: mostra detalhes de um volume

## Imagens
- `docker images`: lista todas as imagens
- `docker pull :nome_da_imagem`: baixa uma imagem
- `docker rmi :nome_da_imagem`: apaga uma imagem
- `docker build :pasta`: cria uma imagem a partir de um dockerfile
  - `-t :usuario/:nome_imagem:latest`: dá uma tag para uma imagem

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

## Networks 

As redes no Docker permitem a comunicação entre contêineres e com o host ou outras redes externas. Aqui estão algumas informações úteis sobre as redes do Docker:

### Comandos
- `docker network connect`: conecta um container a uma network existente.
- `docker network create :nome`: cria uma nova network com o nome especificado.
  - `--driver :tipo`: permite especificar o driver da rede. Os tipos disponíveis são: Bridge, Host, Overlay, maclan ou none.
- `docker network disconnect`: desconecta um container de uma network específica.
- `docker network inspect`: fornece informações detalhadas sobre uma network específica.
- `docker network ls`: lista todas as networks disponíveis.
- `docker network prune`: remove todas as networks que não estão sendo usadas por nenhum container.
- `docker network rm`: remove uma ou mais networks específicas.

### Tipos de redes
### Bridge
A rede Bridge é o driver de rede padrão no Docker. Ela permite que os contêineres se comuniquem entre si usando um endereço IP próprio dentro da rede do Docker. Os contêineres conectados à mesma rede Bridge podem se comunicar uns com os outros usando esses endereços IP.

### Host
Quando um container é executado na rede Host, ele compartilha o mesmo namespace de rede do host do Docker. Isso significa que o container não terá um endereço IP próprio; em vez disso, ele usará o endereço IP da máquina host.

### Overlay
A rede Overlay é usada principalmente em cenários distribuídos e em cluster, como o Docker Swarm. Ela permite que contêineres em diferentes hosts se comuniquem entre si como se estivessem na mesma rede virtual, independentemente da infraestrutura subjacente.

### maclan
A rede maclan é um driver de rede especial que permite que contêineres se comuniquem usando seus endereços MAC (Media Access Control). Isso é útil em alguns cenários específicos em que você deseja controlar a camada de link de comunicação.

### none
Ao atribuir a rede "none" a um container, você está basicamente desabilitando a interface de rede para esse container. Isso significa que o container não terá conectividade de rede.

Essas são algumas das principais informações sobre as redes do Docker e seus comandos associados. Ao utilizar as redes Docker de forma eficiente, você pode facilitar a comunicação entre contêineres e criar soluções mais robustas e escaláveis para suas aplicações.
