# NPM

## Para instalar um pacote "globalmente" no computador:
* `npm install -g` packagename

## Para baixar todos os pacotes especificados em package.json
* `npm install` 

## Instalação de pacotes
* Por default os pacotes são instalados dentro da pasta node_modules do projeto 
* A diretiva `save` inclui a dependencia do pacote em `dependencies` no arquivo package.json do projeto
* A diretiva `--save-dev` inclui a dependencia do pacote em `devDependencies` no arquivo package.json do projeto
* A diretiva `--save-optional` inclui a dependencia do pacote em `optionalDependencies` no arquivo package.json do projeto


## Desinstalação
* `npm uninstall --save nomepacote` 


