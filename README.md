# 🚀 Getting started

#### Requisito:

- aws budget s3 (env)
- Sendgrid (env)
- Mysql 5.7

### `develop`

yarn install
docker-compose up (Cria um container com o mysql)
yarn develop

#### Atenção:

- É necessario criar o database antes de subir a primera vez.
- Após subir o sistema local, criar um usuário e senha de acesso ao dashboard e dentro do dashboard:
- Criar Rule admin
- Criar tenant (empresa) base
- Criar um usuário com perfil admin, e associa-lo com o tenant
- Configurar as permissões de acesso aos endpoints por perfil (rules)
- Configurar envio de emails de convite de usuário, após o cadastro, para ativação

Entidades

- Post => Relatos
- PostHistory => Histórico relato
- PostAction => Ações do relato
- PostActionDetail => Detalhes das ações do relato
- PostClosed => Relatos fechados
- Area => área de atuação do usuário
- Tenant => empresa
- User => usuário de acesso a plataforma
- Rules => admin (Administrador), authenticated (Usuário comum), Guest(não autenticado)
