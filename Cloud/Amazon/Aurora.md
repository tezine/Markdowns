# Amazon Aurora (RDS)
* É um banco de dados relacional compatível com MySQL e PostgreSQL.<br>
* Segundo a Amazon, é até 5 vezes mais rápido que o MySQL.<br>
* Segundo a Amazon, o serviço é oferecido por 1/10 do custo.
* O armazenamento é distribuído, tolerante a falhas e com recuperação automática que escala automaticamente para até 64 TB por instância de banco de dados. <br>
* O serviço chama-se **RDS(Relational Database Service)**. A console de acesso pela web está [aqui](https://console.aws.amazon.com/rds/home)
* Pode-se importar uma base do MySQL ou PostgreSQL. Para isso, basta enviar a base para o S3 e depois importar no RDS. 
* Pode-se criar um DB criptografado no RDS. 
* Pode-se criar uma base no RDS em MariadDB, Oracle e SQL Server também. 


## Importação do MySQL
* Para importar uma base do MySQL, deve-se utilizar o Percona XtraBackup. 
* Não é possível restaurar um db de um S3 que está em uma zona diferente do RDS. 


