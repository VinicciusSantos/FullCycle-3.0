[⬅ voltar ao menu](../README.md)

# Autenticação e Keycloak 🔐

## OAuth 2.0
- OAuth 2.0 é um protocolo de autorização amplamente usado para permitir que aplicativos acessem recursos protegidos em nome de um usuário.
- Ele fornece uma maneira segura e padronizada para delegar permissões de acesso a aplicativos de terceiros sem compartilhar senhas.

### Componentes Principais
- **Cliente**: A aplicação que solicita acesso aos recursos protegidos em nome do usuário.
- **Servidor de Autorização**: Responsável por autenticar o usuário e conceder autorizações.
- **Proprietário dos Recursos**: O usuário que possui os recursos protegidos.
- **Servidor de Recursos**: O servidor que hospeda os recursos protegidos.
- **Token de Acesso**: Um token que o cliente usa para acessar recursos protegidos.

### Fluxo de Autenticação Padrão
1. O cliente solicita autorização ao servidor de autorização.
2. O servidor de autorização autentica o usuário e solicita a autorização.
3. O usuário autoriza o cliente.
4. O servidor de autorização emite um token de acesso para o cliente.
5. O cliente usa o token de acesso para acessar recursos protegidos no servidor de recursos.

### Tipos de Fluxo
- **Fluxo de Autorização de Código**: Usado para aplicativos web e móveis.
- **Fluxo de Senha de Proprietário**: Menos seguro, apenas para aplicativos confiáveis.
- **Fluxo Implícito**: Usado em aplicativos JavaScript em navegadores.
- **Fluxo de Credenciais de Cliente**: Usado para aplicativos confiáveis ​​com acesso direto ao servidor de recursos.

### Escopo
- O OAuth 2.0 permite a definição de escopos para controlar o acesso a recursos específicos.
- Os escopos limitam o que um token de acesso pode fazer.

### Exemplos de Uso
- Autorização de acesso a contas de mídia social em aplicativos de terceiros.
- Acesso a recursos protegidos, como APIs, com permissões limitadas.
- Implementação de SSO (Single Sign-On) em aplicativos.

### Segurança
- OAuth 2.0 é projetado para ser seguro, mas sua implementação deve seguir as melhores práticas para evitar vulnerabilidades.

Para obter mais informações e detalhes técnicos, consulte a [Especificação OAuth 2.0](https://oauth.net/2/).

## OpenID Connect
- O OpenID Connect (OIDC) é um protocolo de autenticação e autorização baseado em OAuth 2.0 que fornece autenticação segura para aplicações web e móveis.
- Ele permite que um aplicativo cliente verifique a identidade de um usuário, obtendo informações de identificação de um provedor de identidade.

### Componentes Principais
- **Cliente**: A aplicação que solicita autenticação e autorização do usuário.
- **Provedor de Identidade (IdP)**: Responsável por autenticar o usuário e fornecer informações de identificação.
- **Usuário**: O indivíduo que está tentando acessar o aplicativo.
- **Token de ID**: Um token emitido pelo IdP que contém informações de identificação do usuário.
- **Token de Acesso**: Um token usado para acessar recursos protegidos no servidor de recursos.

### Fluxo Básico
1. O cliente redireciona o usuário para o IdP para autenticação.
2. O IdP autentica o usuário e obtém seu consentimento.
3. O IdP emite um token de ID e, opcionalmente, um token de acesso para o cliente.
4. O cliente usa o token de ID para verificar a identidade do usuário.
5. O cliente pode usar o token de acesso para acessar recursos protegidos no servidor de recursos.

### Benefícios
- Fornece autenticação federada, permitindo que os usuários usem uma única conta em várias aplicações.
- Simplifica o processo de autenticação para os desenvolvedores, pois fornece informações de identificação verificadas.
- Baseado em padrões abertos e amplamente adotado.

### Uso Comum
- Autenticação de usuário único (SSO) em várias aplicações.
- Integração com provedores de identidade populares, como Google, Facebook e Microsoft.
- Implementação de autenticação segura em aplicações web e móveis.

### Tokens de ID e Claims
- Tokens de ID podem conter informações como nome, email, ID do usuário, etc., na forma de "claims".
- Claims são afirmações sobre o usuário.
- Os clientes podem confiar nos claims para obter informações sobre o usuário autenticado.

### Segurança
- O OpenID Connect é projetado com foco na segurança e implementa recursos como verificação de assinatura de tokens.
- A implementação adequada é essencial para evitar vulnerabilidades.

Para obter informações técnicas detalhadas e especificações, consulte o [site oficial do OpenID Connect](https://openid.net/connect/).

## Keycloak
- Keycloak é uma plataforma de gerenciamento de identidade e acesso (IAM) de código aberto.
- Desenvolvido pela Red Hat, oferece recursos robustos para autenticação, autorização e segurança.

### Recursos Principais
- Autenticação de Usuário: Suporta várias formas de autenticação, incluindo login social, LDAP e SAML.
- Autorização: Gerencia permissões e políticas de acesso.
- SSO (Single Sign-On): Permite que os usuários façam login uma vez e acessem várias aplicações sem precisar fazer login novamente.
- Federated Identity: Integração com provedores de identidade externos.
- Administração de Usuário: Facilita a gestão de usuários, grupos e papéis.
- Segurança: Oferece recursos de segurança, como autenticação multifactorial (MFA) e proteção contra-ataques.

### Integração com Aplicações
- Keycloak pode ser integrado com aplicativos web, móveis e APIs.
- Oferece suporte para OpenID Connect e OAuth 2.0 para integração segura.

### Implementação
- Pode ser implantado em contêineres Docker, Kubernetes e servidores de aplicativos Java.
- Facilita a implementação de autenticação e autorização em aplicativos.

### Casos de Uso
- É amplamente utilizado em aplicações que exigem autenticação segura e gerenciamento de acesso.
- Usado em empresas, organizações governamentais e projetos de código aberto.

### Vantagens
- Código aberto e gratuito.
- Comunidade ativa de desenvolvedores.
- Reduz a complexidade de implementar recursos de IAM em aplicativos.

## Exemplos de Uso
- Implementação de login único em uma aplicação web.
- Proteção de APIs com autenticação.
- Gerenciamento centralizado de usuários e permissões.

Para obter mais informações e documentação detalhada, visite o [site oficial do Keycloak](https://www.keycloak.org/).
