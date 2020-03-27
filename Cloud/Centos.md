# CentOS
`vagrant init centos/atomic-host && vagrant up --provider virtualbox`
* Instalar o cockpit em só um server. É possível adicionar outros servers pela interface web
* Para atualizar o docker para 1.12 e ter suporte a swarm com isso, veja [aqui](http://www.projectatomic.io/blog/2016/10/new-centos-atomic-host-with-optional-docker-1-12/)

## Para alterar o hostname
* hostnamectl set-hostname R2-D2

## Vagrant 
* Trabalhar somente com o Git Bash
* Para fazer o centos vagrant funcionar. Editar o arquivo: C:\Users\tezine\.vagrant.d\boxes\centos-VAGRANTSLASH-atomic-host\7.20161006\virtualbox\Vagrantfile
- Adicionar a linha: config.vm.synced_folder ".", "/home/vagrant/sync", disabled: true
* Se conecte ao vm usando `vagrant ssh` a partir da pasta onde foi executando o `vagrant init...`
* usuario vagrant, senha vagrant

## Cockpit  
* Para instalar o cockpit: 
`sudo atomic run cockpit/ws`
* O acesso ao docker é só via sudo. Ex: `sudo docker ps`

## Para instalar o docker-compose
`sudo curl -L "https://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`
`sudo chmod +x /usr/local/bin/docker-compose`
`docker-compose --version`
