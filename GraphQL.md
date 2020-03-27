# GraphQL
* Apollo-Server é um GraphQL server para o Express. https://www.apollographql.com/docs/apollo-server/
* Apollo Client um cliente graphql com suporte a cache com integração em React, Angular, entre outros. 
* Comentário começa com #
* Podemos colocar um nome para o query assim:
```graphql
query HeroNameAndFriends {
  hero {
    name
    friends {
      name
    }
  }
}
```
* O graphql permite reduzir o número de consultas ao servidor 
* Ao invés de usar a mesma consulta em vários lugares, usamos fragments. 
* Por padrão, as queries são readonly. Quando queremos alterar os dados, enviamos um mutation ao invés de query. 
* Existe um tipo de field ID. Ex:
```
type Mutation {
  # The id of the object.
  id: ID!
}
```
* @connection é usado para fazer paginação no graphql,  mas há outras maneiras [aqui](https://graphql.org/learn/pagination/)
* a connection is a collection of objects with metadata such as edges, pageInfo...
* Mais info [aqui](https://developer.github.com/v4/guides/intro-to-graphql/)

## ATUALIZAÇÃO DO SCHEMA
* Normalmente o schema.graphql é definido no server. O Client precisa baixar o schema.graphql com o npm get-graphql-schema e compilar com relay-compiler. Após a compilação, serão gerados os arquivos *.graphql.js dentro da pasta __generated__. 
* Segue um exemplo de download do schema do server: `get-graphql-schema __RELAY_API_ENDPOINT__ > ./schema.graphql`

## XAMARIN
* Seguem um link de exemplo de uso do graphql no xamarin [aqui](https://gregshackles.com/building-flexible-xamarin-apps-with-graphql/)

## APOLLO SERVER
* É um GraphQL server em JavaScript.
* O Express é iniciado através de app.listen
* O Apollo Server fornece um GraphQL Playground explorer (Web API para graphql)
* O schema é gerado dinamicamente através dos resolvers. //// Resolvers define the technique for fetching the types in the schema
* Veja um exemplo [aqui](https://www.apollographql.com/docs/apollo-server/whats-new.html)
* Suporta a criação de mocks. 
* Por padrao, os erros são retornados ao client no json de retorno em errors.extensions.code.

## APOLLO CLIENT
* É um graphql client. Suporta caching. 
* Ao invés dele, usam o Relay na Natura. O Apollo Client é mais simples e eficiente. 


## APOLLO ENGINE
* O Apollo Engine é um serviço cloud de monitoramento do apollo server. Também funciona com outros graphql servers além do Apollo Server. 
* É um serviço pago mensalmente. Mais informações [aqui](https://www.apollographql.com/engine)

# RELAY
* O Relay é responsável por fazer o request ao graphql server. 
* Normalmente a configuração do relay no client side fica no arquivo createRelayEnvironment.js. Neste arquivo fica a configuraçãom com o redux e store também. 
* As queries graphql constumam ficar no mesmo arquivo da view onde o dado é utilizado. No React, é inserido o componente QueryRenderer e LikeQuery com o graphql dentro da view. Ambos componentes pertencem ao relay. A documentação do QueryRenderer está [aqui](https://facebook.github.io/relay/docs/en/query-renderer.html)
* Um dos parâmetros do QueryRenderer é o environment. 
* Os dados obtidos com o QueryRenderer são armazenados como 'props'. 
* A execuçao da query  no client side é requisitada através da função `fetchQuery` usando o import `import {fetchQuery, graphql} from 'relay-runtime';`
* Segue um exemplo de utilização de graphql+relay+redux [aqui](https://medium.com/scripbox-engineering/boost-your-graphql-relay-react-app-with-redux-f83a33faf871)
