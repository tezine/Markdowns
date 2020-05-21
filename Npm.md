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

# Proxy Config

* Proxy configuration can be done by two ways:

  1. Create a file .npmrc in your users folder (C:/Users/<ntuserName>)

  ```bash
  proxy=http://ntUser:password@yourcompany.com:<port>
  registry=https://registry.npmjs.org/
  @dummy:registry=http://yourcompany.com/escopednpmpath/api/npm/npm-release-local
  ```

  2. Execute a proxy.bat file like below:

  ```bash
  set HTTP_PROXY=http://ntUser:password@yourcompany.com:<port>
  set HTTPS_PROXY=%HTTP_PROXY%
  set NO_PROXY=localhost,127.0.0.1
  C:/Users/ntuser/Desktop/Arquivos/Apps/Nuget/nuget.exe config -set http_proxy=%HTTP_PROXY%
  npm config set proxy %HTTP_PROXY%
  npm config set https.proxy %HTTPS_PROXY%
  npm config set https-proxy %HTTPS_PROXY%
  git config --global http.proxy %HTTP_PROXY%
  git config --global https.proxy %HTTPS_PROXY%
  http_proxy=%HTTP_PROXY%
  https_proxy=%HTTP_PROXY%
  GLOBAL_AGENT_HTTP_PROXY=%HTTP_PROXY%
  ```

  




