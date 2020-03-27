# IONIC
* Pode-se utilizar a versão opensource ou utilizar a versão paga do IONIC. 
* A versão paga fornece vários recursos como: UI Designer, Testing, etc. 
* Mais informações sobre o CLI [aqui](https://ionicframework.com/docs/cli/)

# VERSÃO FREE
* Tem licença MIT.  
* `npm install -g ionic@latest`
* `ionic start myNewProject`
* `cd ./myNewProject`
* `ionic serve`
* A integração com o cordova é opcional: 
* `npm install -g cordova`
* `ionic cordova run ios`
* `ionic cordova run android --livereload`
* Para abrir a tela de smartphone na web: `ionic serve -l`. Se nao abrir a url correta no browser, digitar: `http://localhost:8100/ionic-lab`
* Para gerar a versão de produção contendo os assets( sem apk ou ipa)
* `ionic build --prod`
* O conteúdo vai ser gerado em www. 
* Para gerar a versão contendo o apk é necessário o cordova:
`ionic cordova build --release android`
* O apk vai ser gerado em platforms\android\build\outputs\apk
* Para inspecionar pelo chrome. chrome://inspect/#devices. Isso peremite inspecionar o tráfego entre o emulador e o server através do chrome. 

# COMANDOS
```
$ ionic generate 
$ ionic generate component
$ ionic generate directive
$ ionic generate page
$ ionic generate pipe
$ ionic generate provider
$ ionic generate tabs
$ ionic generate component foo
$ ionic generate page Login
$ ionic generate page Detail --no-module
$ ionic generate page About --constants
$ ionic generate pipe MyFilterPipe
```
* Note que para gerar um service no ionic é `ionic generate provider`

# VERSÃO PAGA (IONIC PRO)
* Quando utilizamos a versao paga, é criado um git remote automaticamente.
* Tem suporte a app delivering e monitoring.
* Possui as seguintes ferramentas: 

## CREATOR 
* Para criar telas rapidamente com componentes drag and drop. O Creator tem até editor de código integrado e suporte a Addons, como Google Maps e Analytics.  
* Com o Creator é possível fazer um preview do app no próprio aparelho. Basta baixar o app Creator para Android ou iOS. 
* Pode-se fazer todo o desenvolvimento através dele, inclusive publicar nas lojas e gerar apk e ipa. 
* Atualmente o Creator não suporta muito bem o IONIC 3. Temas não funcionam, entre outros. 
* Não sei se é possível criar componentes além dos disponíveis (textbox, checkbox, etc).
* Há  tutoriais em vídeo [aqui](https://docs.usecreator.com/page/tutorial-videos)

## IONIC DEVAPP
* Permite testar o app diretamente no ios ou android. 
* Para executar o app no IONIC Dev App no android, execute o comando: `ionic serve -c`

## IONIC VIEW
* App para Android e iOS para live app testing. Com ele, é possível testers testarem o app criado. É uma espécie de testflight. Pode-se convidar testers por email, criar grupos, etc. O View app tem suporte a funcionalidades e plugins nativos. Através dele, testers enviam feedbacks. 
* Pode-se compilar o app no cloud deles e publicar automaticamente na Apple Store ou Google Play.

## LIVE DEPLOY
* Permite publicar hotfixes diretamente para os usuários fazendo bypass nas App Stores. Também permite enviar atualizações para testers. Modificações no Javascript, HTML, e CSS são permitidos. Há um serviço que é executado em background no celular do usuário para verificar se há uma versão mais recente disponível fora da loja. É possível criar deployment channels e enviar updates somente para grupos específicos, executar testes no celular do usuário, ou enviar somente para usuários de uma determinada audiência, grupo de teste ou região. 

## IONIC PACKAGE
* Cria binários nativos na nuvem. Faz a geração de apk ou ipa e também permite distribuir o app em uma solução MDM. 

## IONIC MONITOR
* Verifica falhas no app antes da publicação nas lojas. 
* Indica a linha exata onde ocorrem exceções no typescript. 
* Pode ser configurado para enviar notificações ao desenvolvedor caso ocorra uma exception. 
* Pode ser utilizado em conjunto com o LIVE DEPLOY. Desta maneira, quando ocorre um bug, pode-se enviar um hotfix imediatamente e verificar se o problema foi resolvido. 


# VISÃO GERAL
* Há vários componentes próprios do ionic. Ex:
* <ion-list> ->lista
* <ion-item> ->item da lista
* Há uma lista completa [aqui](https://ionicframework.com/docs/components/#overview)
* Por padrão, as páginas não implementam AfterViewInit como no Angular, mas é só implementar o AfterViewInit que funciona normalmente. 
* Ao invés de usar subscribe(), pode-se usar toPromise com await. 
* O NavController é semelhante ao router do Angular ou ao StackView do QML(mais parecido com esse até).
* Faz-se um push no NavController da seguinte maneira: this.navCtrl.push('LoginPage'); 'LoginPage' é o nome do componente. 

# INTEGRAÇÃO COM CORDOVA
* Quando integrado com cordova, utiliza  o arquivo config.xml


# GERAÇÃO DE ÍCONES E SPLASH
* Para redimensionar as imagens de splash, basta colocar a imagem splash.png dentro da pasta resources e executar `ionic cordova resources --splash`. Após executar esse comando serão criados vários arquivos de splash para ios e android e será atualizado o config.xml. 


# TESTES
* Os testes são realizados Karma e Jasmine. 
* Segue o link para Jasmine [aqui](https://jasmine.github.io/).
* Segue o link para Karma [aqui](https://karma-runner.github.io/2.0/index.html)
* Os testes para cada componente são escritos nos arquivos .spec.ts