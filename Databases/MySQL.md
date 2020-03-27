# MySQL

## DUMP
* Para fazer o dump  da tabela podall<br>
 `mysqldump --max_allowed_packet=3G -u root -h 188.138.41.18 -p tezinelog podall > podall.sql`

* Para restaurar o backup:
`mysql -u root -h 188.138.41.18 -p tezinelog < podall.sql`
