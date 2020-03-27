# Cordova
* Utiliza dois arquivos para configuração: `config.xml e package.json`
* No arquivo config.xml são especificados os plugins que são utilizados, as configurações especificas de cada plataforma como ícones, orientation, etc. 
* A versão do aplicativo é especificada no arquivo `config.xml`

## CLI
* Para compilar o projeto para android: `cordova build android`
* Ao executar o comando acima, é executado o arquivo build.js que está dentro do arquivo scripts. 
* Instalação: `npm install -g cordova` 
* Para verificar as plataformas disponíveis: `cordova platform`
* Para adicionar uma nova plataforma: `cordova platform add` ... 
* Para executar o app na plataforma: `cordova run <platform name>`

## Plugins
* Pode-se adicionar plugins para acessar as funcionalidades nativas do celular. Para procurar por um plugin a ser instalado, digite: `cordova plugin search nomedoplugin` 
* Para adicionar um plugin: `cordova plugin add cordova-plugin-camera` 
* Os plugins especificados no config.xml são baixados na pasta cordova/plugins.

## PLATAFORMAS
* Para cada plataforma utilizada no projeto, é criada uma pasta dentro de cordova/platforms. 

## ANDROID
* A configuração do cordova para android é indicada [aqui](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html)
* Para gerar uma versão de release: `cordova run android --release -- --keystore=../my-release-key.keystore --storePassword=password --alias=alias_name --password=password`
* Também pode-se especificar as configurações do build em build.json. 
* Para abrir o projeto cordova no Android Studio, basta importar projeto gradle a partir da pasta cordova/platforms/android. 
* O MainActivity java deve ser assim: `MainActivity extends CordovaActivity` 
* Para emular a aplicação: `cordova emulate android`

