# COREOS
* Trabalhar somente com o Git Bash. 

## Instalação
* Documentação para instalação no disco disponível no site do [coreos](https://coreos.com/os/docs/latest/installing-to-disk.html)
* Vídeo explicando a instalação no [youtube](https://www.youtube.com/watch?v=yiWa0KFJDfI&t=190s)
* Fazer todo o procedimento utilizando o **git bash**. Nao usar o prompt nem o ubuntu bash. 
* O CoreOS não vem com outro editor além do VI. 
* Para habilitar modo insert no vi: `ctrl+i`
* Para instalar no disco, precisamos gerar um ssh-rsa através do comando `sudo openssl passwd -1 > cloud-config.yaml`
* Isso irá gerar o ssh-rsa key dentro do arquivo `cloud-config.yaml`. '`
* Cuidado porque o espaçamento é muito importante dentro do arquivo cloud-config.yaml. Se o espaçamento estiver incorreto, o coreos não vai deixar instalar
* Comando para instalação: `sudo coreos-install -d /dev/sda -C stable -c ~/cloud-config.yaml`
* Cada vez que o CoreOS inicializa, ele verifica o arquivo `cloud-config.yaml`
* Para gerar o ssh: eval `ssh-agent -s`
* Para acessar o coreos via vagrant: `vagrant ssh core-01 -- -A`

## Instalação do Nano
* Crie o diretório `sudo mkdir -p /opt/bin`
* Execute o script: `docker run -d --name nano base/archlinux:latest sleep && sudo docker cp nano:/usr/bin/nano /opt/bin && docker rm nano`
* Pronto! O nano está instalado no CoreOS. 

## Gerenciamento
# Para verificar as máquinas que estão configuradas com o fleet:
`fleetctl list-machines`



 



