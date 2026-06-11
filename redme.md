# the-movie-api
Esta api tem como objetivo inicial trazer uma lista de filmes com nome, ano de lançamento e classificação.
O projeto será desenvolvido em javascript usando API REST

## Entendimento dos arquivos
`server.js`: arquivo principal da API, onde irão ficar os endpoints, middlewares e a inicialização do servidor Express.
`db.js`: responsável exclusivamente pela conexão com o MySQL, usando pool de conexões.
`.env`: armazena variáveis de ambiente como porta da API e credenciais do banco de dados.
`dev_db.txt`: script SQL para criar o banco, a tabela e inserir dados de teste.
`package.json`: define as dependências do projeto, scripts e configurações do NODE.js.
`package-lockk.json`: garante que todas as dependências sejam instaladas nas mesmas versões exatas, mantendo o projeto consistente entre diferentes máquinas e ambientes.