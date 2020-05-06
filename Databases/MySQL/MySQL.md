# MySQL



# DUMP

* Para fazer o dump  da tabela podall<br>
 `mysqldump --max_allowed_packet=3G -u root -h 188.138.41.18 -p tezinelog podall > podall.sql`

* Para restaurar o backup:
`mysql -u root -h 188.138.41.18 -p tezinelog < podall.sql`

# Kubernetes - Single Instance

* Há um tutorial indicando como executar uma instancia única do MySQL [aqui](https://kubernetes.io/docs/tasks/run-application/run-single-instance-stateful-application/).
* Podemos aplicar um Single Instance Mysql com esse [MySQL.yaml](MySQL.yaml).