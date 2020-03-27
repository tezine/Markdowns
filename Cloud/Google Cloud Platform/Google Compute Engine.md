# Google Compute Engine
- São máquinas virtuais(VMs) do Google Cloud. 
- São iniciadas rapidamente. 
- Tem opção de disco local ou disco permanente externo

# INSTALAÇÃO DO DOCKER
1. sudo apt update
1. sudo apt upgrade
1. sudo apt install apt-transport-https ca-certificates curl software-properties-common
1. curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
1. sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
1. sudo apt updatesudo 
1. apt install docker-ce

# INSTALAÇÃO DO MYSQL
* Instalação do mysql abaixo
```
sudo docker run -d \
    --name mysql \
    --restart=always \
    -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD=suasenha \
    -v /home/btezine/data/mysql:/var/lib/mysql \
    mysql:5.7
```
* Para habilitar group by: <br>
`set global sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';`
* Para testar se o group by está funcionando, execute:
```
SELECT COUNT(id), name
FROM drivers
GROUP BY name;
```


# REGRAS DE FIREWALL
1. Adicionar a entrada mysql
Entrada
Aplicar a todas	
Intervalos de IP: 0.0.0.0/0
tcp:3306
Permitir
1000
default


# POD.BDCHAIN.NET
```
sudo docker run -it --name tlog \
 -d \
 -p 8000:5000 \
 --restart=always \
 -e ConnectionStrings:SampleConnection='server=35.205.155.139;userid=root;pwd=suasenha;port=3306;database=tezinelog;sslmode=none;CharSet=utf8;' \
 -e OSRMWebAddress='http://bdchain.net:10000' \
 tezine/tlog:1.6.1
```

# NGINX
* Configuração do arquivo /home/btezine/conf/nginx/nginxdefault.conf
```
worker_processes  1;
events {
   worker_connections  1024;
}
http {
   include       mime.types;
   default_type  application/octet-stream;
   sendfile        on;
   keepalive_timeout  65;
   client_max_body_size 32m;
  server { # POD.BDCHAIN
    listen 80;
    server_name pod.bdchain.net pod.bdchain.io www.pod.bdchain.net www.pod.bdchain.io;
    location / {
      proxy_pass http://35.205.155.139:8000;
      proxy_set_header Host $host;
      proxy_connect_timeout       600;
      proxy_send_timeout          600;
      proxy_read_timeout          600;
      send_timeout                600;
    }
  }
}
```

* Executar 
```
sudo docker run --name nginx-default \
    -v /home/btezine/conf/nginx/nginxdefault.conf:/etc/nginx/nginx.conf:ro \
    -p 80:80 \
    --restart=always \
    -d nginx
```