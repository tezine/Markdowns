# MariaDB
* Para dar acesso a um usário em uma base: `grant all privileges on wordpressuttili.* to wordpressuser@'%';`

## Configuração do MariaDB Cluster
**Importante:** Cuidado para especificar o endereço ip e interface de rede corretas, senão o mariadb trava.
* Este tutorial está disponível [aqui](http://withblue.ink/2016/03/09/galera-cluster-mariadb-coreos-and-docker-part-1.html) 
* Para copiar tables:
```sql
CREATE TABLE copagaz.log_logradouro LIKE movedb.log_logradouro;
INSERT INTO copagaz.log_logradouro SELECT * FROM movedb.log_logradouro;
```
2) Editar o arquivo /opt/local/etc/mysql.conf.d/mysql_server.cnf em todos os nodes. 

```
[server] 
bind-address=0.0.0.0 
binlog_format=row 
default_storage_engine=InnoDB 
innodb_autoinc_lock_mode=2 
innodb_locks_unsafe_for_binlog=1 
query_cache_size=0 
query_cache_type=0 

[galera] 
wsrep_on=ON 
wsrep_provider="/usr/lib/galera/libgalera_smm.so" 
wsrep_cluster_address="gcomm://192.168.56.101,192.168.56.102,192.168.56.103" 
wsrep-sst-method=rsync
```
4) Executar no **core-01**: `mkdir -p /mnt/data'
5) Lembre-se de remover o conteudo do /mnt/data se algo der errado no mariadb-once
3) Executar o comando abaixo UMA ÚNICA VEZ no host **core-01**: (verifique se roda no eth0 ou outro)
```
  docker run \
  --name mariadb-once \
  -d \
  -v /opt/local/etc/mysql.conf.d:/etc/mysql/conf.d \
  -v /mnt/data:/var/lib/mysql \
  -e MYSQL_INITDB_SKIP_TZINFO=yes \
  -e MYSQL_ROOT_PASSWORD=my-secret-pw \
  -p 3306:3306 \
  -p 4567:4567/udp \
  -p 4567-4568:4567-4568 \
  -p 4444:4444 \
  mariadb:10.1 \
  --wsrep-new-cluster \
  --wsrep_node_address=$(ip -4 addr ls eth1 | awk '/inet / {print $2}' | cut -d"/" -f1)
  ```

4) Executar o comando `mkdir -p /mnt/data/mysql` nos outros hosts (Ex **core-02** e **core-03** ):
5) Executar o comando nos todos os hosts 
```
docker run \
  --name mariadb-2 \ <--alterar mariadb-2 de acordo com o nome do container
  -d \
  -v /opt/local/etc/mysql.conf.d:/etc/mysql/conf.d \
  -v /mnt/data:/var/lib/mysql \
  -p 3306:3306 \
  -p 4567:4567/udp \
  -p 4567-4568:4567-4568 \
  -p 4444:4444 \
  mariadb:10.1 \
  --wsrep_node_address=$(ip -4 addr ls eth1 | awk '/inet / {print $2}' | cut -d"/" -f1)
  ```  

# Gerenciamento

## Para verificar o tamanho do cluster mariadb
`SHOW STATUS LIKE 'wsrep_%';`