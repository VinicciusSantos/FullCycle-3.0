FROM node

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

ENV DOCKERIZE_VERSION v0.7.0

RUN apt update && \
    apt install -y wget netcat-traditional && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

