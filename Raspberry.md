# Instalação do Raspian lite
1) Baixar o raspian lite via torrent [aqui](https://www.raspberrypi.org/downloads/raspbian/)
1) Baixar o sdformat [aqui](https://www.sdcard.org/downloads/formatter_4/)
1) Baixar o guiformat [aqui](http://www.ridgecrop.demon.co.uk/guiformat.htm)
1) Executar o sdformat e selecionar o drive. Especificar "FORMAT SIZE ADJUSTMENT" set to "ON"
1) Executar o guiformat, selecionar o drive e manter os valores default
1) Extrair o raspain lite. 
1) Baixar e executar o Win32DiskImager [aqui](http://sourceforge.net/projects/win32diskimager/)
1) Gravar o arquivo .img no sd. 

# Instalação do Docker 
1) Seguir o tutorial apresentado em [aqui](https://docs.docker.com/engine/installation/linux/raspbian/)

# Instalação do noip duc
1) Seguir o tutorial [aqui](http://www.noip.com/support/knowledgebase/install-ip-duc-onto-raspberry-pi/)
1) Para verificar se o noip está rodando: sudo noip2 ­-S
1) Para funcionar, o DMZ deve estar habilitado no netgear em Advanced/Wan setup. 
1) O endereço ip externo de acesso ao raspberry é o endereço do netgear
1) Para testar, execute o mysql server no raspberry e tente se conectar pelo android via rede de dados usando o app SQLTool Pro. 

# Instalação do mysql no raspberry pi
1) docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=senha -d hypriot/rpi-mysql:latest


# Instalação do Docker Registry no raspberry
1) sudo docker run -p 5000:5000 -i -t nimblestratus/rpi-docker-registry