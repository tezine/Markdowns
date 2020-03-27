# NestJS
* Nest é um framework que possibilita criar aplicações server-side Nodejs com ORM e Typescript. 
* Nest utiliza [Express](https://expressjs.com/) por baixo.
* Pode se conectar a vários bancos de dados, incluindo o MongoDB. 


# INSTALAÇÃO
* CLI do nestjs: `npm i -g @nestjs/cli`
* Criação de projeto: `nest new project` . O nome do projeto deve ser lowercase
* Para utilizar o MongoDB, instale no projeto: 
```powershell  
npm install mongodb --save
npm install typeorm --save
npm install --save @nestjs/typeorm mongodb
```


# CLI
* CLI do nest suporta as criações abaixo:
```
nest g ... 
class (alias: cl)
controller (alias: co)
decorator (alias: d)
exception (alias: e)
filter (alias: f)
gateway (alias: ga)
guard (alias: gu)
interceptor (alias: i)
middleware (alias: mi)
module (alias: mo)
pipe (alias: pi)
provider (alias: pr)
service (alias: s)
```
