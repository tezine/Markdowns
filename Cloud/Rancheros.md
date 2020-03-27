# RancherOS
O tutorial está disponível [aqui](http://docs.rancher.com/os/running-rancheros/workstation/docker-machine/)

## Para criar um docker machine:
`docker-machine create -d virtualbox --virtualbox-boot2docker-url https://releases.rancher.com/os/latest/rancheros.iso <MACHINE-NAME>`
* Se utilizar hyper-v:
`docker-machine create --driver hyperv --hyperv-boot2docker-url https://releases.rancher.com/os/latest/rancheros.iso rancher1`

## Para acessar o RancherOS
`docker-machine ssh <MACHINE-NAME>`