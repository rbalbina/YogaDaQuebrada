APP Yoga da Quebrada
===

## Objetivo

Aplicação destinada a promover aulas audio/visual de Yoga. Cadastrando professores, alunos e salas.

### Instalando

Apenas instale as dependencias
```sh
$ npm i
```

### Configurando

Apenas configure o banco de dados corretamente e garanta que a tabela foi criada corretamente:


Edite as configurações do banco no arquivo `./src/config/database.js`.

Para criar um banco de dados:
```sh
$ sequelize db:create
```

Crie a tabela pela migration:
```sh
$ sequelize db:migrate
```

### Rodando a aplicação

Para iniciar a aplicação execute o comando:
```sh
$ npm run dev
```

Depois acesse [http://localhost:3015](http://localhost:3015)