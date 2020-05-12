# Docker
* Os comandos estão disponíveis via powershell.
* A diferença com VM é que o kernel do sistema operacional é compartilhado entre containers no docker. 
* Todos os bins e libs não são compartilhados e são exclusivos do container.

# Para criar uma imagem a partir de um arquivo Dockerfile
Executar a partir do diretório do Dockerfile: `docker build -t tezine/myimagename:latest .` O parâmetro -t significa tag

## Para verificar os logs do deamon
sudo journalctl -fu docker.service
## Pra inspecionar um container
`docker inspect <container-name>`
## Para habilitar o restart automático de um container
`docker run -d --name testing_restarts --restart alway ...`
## Para montar uma pasta do OS dentro de um container
`docker run -p 80:80 -v /user/tezine/:/var/www/html hello-world`
Isso torna a pasta /user/tezine acessível de dentro do containar a partir da pasta /var/www/html
## Para instalar o mysql e habilitar acesso via porta 3306: 
`docker run -p 3306:3306 --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest` \
Formato: localport:containerport
## Para salvar uma imagem do docker em um arquivo tar:
`docker save -o <nomedestino.tar> image <imageid>`
## Para carregar uma imagem a partir de um arquivo tar:
`docker load -i <path to image tar file>`
## Para parar todos os containers
`docker stop $(docker ps -a -q)`
## Para copiar um arquivo de um container para o host:
`docker cp <containerId>:/file/path/within/container /host/path/target`
## Para mostrar os logs de um container
`docker logs -f <container>`
## Para verificar a configuração de rede:
`sudo docker network ls`
## Para verificar o tamanho dos containers
`docker ps -s`
## Para verificar as redes 
`docker network ls`

## Instalação do Wordpress
`docker run -p 9090:80 --name wordpressbancadigitalcont -e WORDPRESS_DB_HOST=tezine.com:3306 -e WORDPRESS_DB_NAME=wordpressbancadigital -e WORDPRESS_DB_USER=root -e WORDPRESS_DB_PASSWORD=senha -d wordpress`

## Para alterar a porta de um container
1) stop running container
`docker stop test01`
2) commit the container `docker commit test01 test02` \
NOTE: The above, test02 is a new image that I'm constructing from the test01 container.
3) re-run from the commited image
`docker run -p 8080:8080 -td test02`

# Procedimentos para envio ao Docker Hub
1) Criar a imagem docker
3) Abrir o powershell
2) Autenticar no Docker Hub: `docker login`
3) Criar um tag para a imagem criada. Ex: `docker tag 7d9495d03763 tezine/copagazfrontend:latest`
4) Enviar a imagem ao Docker Hub: `docker push tezine/copagazfrontend:latest`
5) copagazfrontend acima é o nome do **repository** no Docker hub
* Em caso de dúvida, clique [aqui](https://docs.docker.com/engine/getstarted/step_six/)

# Fedora dentro do docker no windows
* Para rodar o fedora dentro do docker `sudo docker run -i -t fedora /bin/bash`
* Instalar o docker dentro do fedora: https://fedoraproject.org/wiki/Docker


# Swarm
* Há um ótimo tutorial de configuração do galera cluster no swarm [aqui](http://severalnines.com/blog/mysql-docker-introduction-docker-swarm-mode-and-multi-host-networking)
* É composto por nodes. começo no docker 1.12
* Um node é uma máquina rodando docker >1.12. 
* Há nodes que fazem o gerenciamento/scheduling(managers) e nodes que fazem o trabalho(workers). 
* Normalmente há até uns 3 nodes managers e centenas de nodes workers. 
* Quando há mais de um node manager, um node manager fica como leader. \ 
* Por default, manager nodes também são worker nodes
Some of the noteworthy parts that you should know before entering the swarm world: 

The following ports must be opened: \
2377 (TCP) - Cluster management \
7946 (TCP and UDP) - Nodes communication \
4789 (TCP and UDP) - Overlay network traffic \
There are 2 types of nodes: \
Manager - Manager nodes perform the orchestration and cluster management functions required to maintain the desired state of the swarm. Manager nodes elect a single leader to conduct orchestration tasks. \
Worker - Worker nodes receive and execute tasks dispatched from manager nodes. By default, manager nodes are also worker nodes, but you can configure managers to be manager-only nodes. 

## Para tornar um servidor como swarm master:
`docker swarm init --advertise-addr 10.10.171.201`. Não é o ip do overlay network. É o ip da máquina atual mesmo aqui
## Para verificar os nodes conectados no swarm:
`docker node ls`
## Para promover um node como master:
`docker node promote <node-hostname>`. Lembre-se de que dev-se ter números ímpares de nodes masters
## Para gerar um token novo de adição de novo node master
`docker swarm join-token manager`. Executar isso no node master. Depois, executar o resultado no node que deseja ser master
## Para listar os serviços que estão rodando no swarm
`sudo docker service ls`
## Para remover um serviço
`sudo docker service rm <service-name>`

# Overlay Network
The only way to let containers running on different hosts connect to each other is by using an overlay network. It can be thought of as a container network that is built on top of another network (in this case, the physical hosts network).Docker Swarm mode comes with a default overlay network which implements a VxLAN-based solution with the help of libnetwork and libkv. You can however choose another overlay network driver like Flannel, Calico or Weave, where extra installation steps are necessary. \
In Docker Engine Swarm mode, you can create an overlay network only from a manager node and it doesn’t need an external key-value store like etcd, consul or Zookeeper
# To create a new overlay network
`docker network create --driver overlay mynet`. mynet is the name of the overlay network. \  
If the overlay network was created, you'll see it by executing the command `docker network ls` \
The ingress overlay network comes by default. The swarm manager uses ingress load balancing to expose the services you want externally to the swarm.
