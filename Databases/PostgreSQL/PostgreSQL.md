# PostgreSQL
usuario padrao: postgres

```powershell 
  docker run \
  -d \
  --name postgresql \
  -p 5432:5432 \
  --restart=always \
  -v /mnt/data/postgresql:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=senha \
  postgres:latest 
```

# Kubernetes

* Há um exemplo de criação de um banco de dados único Postgresql no arquivo [PostgreSQL.yaml](PostgreSQL.yaml) e um tutorial explicativo [aqui](https://severalnines.com/database-blog/using-kubernetes-deploy-postgresql)

  