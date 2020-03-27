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