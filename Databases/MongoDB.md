# MongoDB
* Banco de dados NoSQL. 

# MongoDB Atlas
* É o serviço de banco de dados gerenciado fornecido pela Mongo em parceria com a Azure, AWS e GCP. Cobrarm por gigabyte transferido. 
* Mais info [aqui](https://www.mongodb.com/cloud/atlas) e os preços estão [aqui](https://www.mongodb.com/cloud/atlas/pricing)
* O serviço fornece snapshots, backup continuo, etc. 
* Há um serviço semalhante fornecido pela ScaleGrid que funciona na Digital Ocean também. Mais info [aqui](https://scalegrid.io/pricing.html)

# KUBERNETES
* Podemos instalar o mongodb via Operator. Mais info [aqui](https://operatorhub.io/operator/mongodb-enterprise)
* Há um bom tutorial explicando como criar um cluster kubernetes no GCP [aqui](https://medium.com/devgorilla/how-to-deploy-mongodb-on-google-kubernetes-engine-gke-b099862fadbd)
* Há também um Helm chart definido [aqui](https://hub.helm.sh/charts/kanister/kanister-mongodb-replicaset)


# DETALHES

* O field _id é reservado para primary key no mongodb. É um ObjectID 
  1. Verificar o id do mongo: `docker ps`
  2. Executar o bash no container: `docker exec -it b07599e429fb bash`
  3. Executar o shell do mongo no container: `mongo`
  4. 1) Especificar o banco de dados: `use ucount`
  5. Criar um usuário admin: 
```javascript
db.createUser({
    user: 'tezine',
    pwd: 'BozoSaiuComMafalda',
    roles: [{ role: 'readWrite', db:'ucount'}]
})
```
1) Sair do mongo shell e do bash. 
1) Desligar e remover o container. 
1) Executar o container com auth: `docker run --name meumongo -p 27017:27017 -v "/users/tezine/mongo/data:/data/db -d mongo mongod --auth`

# UPDATE
* Para fazer o update de um registro: 
```typescript
db.getCollection('users').findOneAndUpdate(
    {_id:ObjectId("5b0579c83c81f51968cc03df")},
        { $set:
            {email:'bruno@tezine.com',password:'senha'}
        }
    )
```

# CLIENTS
* Compass: Client oficial do mongodb. Agora conta com uma versão community também. 
* Robo 3T: https://robomongo.org/
* NoSQLBooster (aparentemente o melhor): https://nosqlbooster.com/home
* MongoDBManager: https://www.mongodbmanager.com/
* Mongo Management Studio: http://www.litixsoft.de/

# BACKUP

* Para fazer o backup da base na máquina local: 
`mongodump`

# RESTORE
* Para restaurar os dados na máquina local: 
`mongorestore` 

# Docker

* Podemos executar um container mongodb assim (bash): 

  ```powershell 
  docker run --name mongodb \
   -d \
   -p 27017:27017 \
   --restart=always \
   -e MONGO_INITDB_ROOT_USERNAME=tezine \
   -e MONGO_INITDB_ROOT_PASSWORD=suaSenha \
   mongo:4.2.1-bionic
  ```

  * Pode-se adicionar o volume através da linha de comando no docker `-v C:/Users/tezine/Documents/MongoDB:/data/db (não funciona com ntfs) `