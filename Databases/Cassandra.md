# Cassandra

* Cassandra é extremamente poderoso. A Apple utiliza mais de 10 Petabytes de dados em 75.000 nodes cassandra. 


# Para Criar keyspace/schema

CREATE KEYSPACE saberlab
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  };

# Docker

* Podemos executar o cassandra no docker através do comando abaixo

```bash
docker run --name cassandra1 -d \
-v C:/Users/tezine/Documents/Cassandra:/var/lib/cassandra \
-p 9042:9042 \
-p 9160:9160 cassandra
```

# Kubernetes

* Podemos criar um cluster cassandra rapidamente através do Helm. Para isso, digite o comando: 
```bash
sudo microk8s.helm install bitnami/cassandra --name my-cassandra-cluster --set dbUser.user=tezine,dbUser.password=suaSenha  cluster.replicaCount=3 
```

**Nota** Instalar o repositório do chart primeiro: `helm repo add bitnami https://charts.bitnami.com`