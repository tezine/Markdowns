# IONIC 1
* Instalar o node via homebrew. Não instalar o node através do instalador oficial no mac. Não instalar como root no mac.
* Caso tenha problema de CORS no ios, adicionar a linha a seguir no config.xml `<preference name="CordovaWebViewEngine" value="CDVUIWebViewEngine" />`
* Não adicionar a pasta platforms no git.
* Gerar todos os ícones para android e ios em http://appiconmaker.co e renomear o nome dos ícones em config.xml
* Para mostrar o app apenas em modo portrait, especificar no root do config.xml: `<preference name="android-minSdkVersion" value="19" />`
* Apenas setar o entitlement no XCode, mas testar no device via `ionic cordova run ios`. Isso pq o XCode não recompila caso tenha algum arquivo html, css ou javascript alterado.
* Para importar um namespace, basta adicionar `@using Newtonsoft.Json;` no cabeçalho do arquivo .cshtml.
* Podemos usar um stilo para ios e outro para Android. Para isso, siga o exemplo abaixo:
```css
.platform-android h2, .platform-android p{
  font-family: Roboto !important;
}

.platform-ios h2, .platform-ios p{
  font-family: "Helvetica Neue" !important;
}
```

# ESTRUTURA DE DIRETÓRIOS

* seuApp/platforms
seuApp/platforms/android -> onde ficam as configurações nativas do projeto android
* seuApp/platforms/ios -> onde ficam as configurações nativas do projeto ios.
* seuApp/plugins -> onde ficam os plugins do cordova. São instalados assim: cordova plugin add cordova-plugin-x-socialsharing, cordova prepare
* seuApp/resources -> onde ficam os resources (ícones, splash). As configurações sobre a utilização deles está em config.xml.
* seuApp/www -> onde ficam todos os códigos javascript, css, services, etc do app em angular1/ionic1.
* Segue a estrutura de diretórios da pasta seuApp/wwww:
```
css -> onde fica o arquivo style.css (global)
fonts -> onde ficam os arquivos ttf adicionais usados no app.
img -> onde ficam as imagens
js -> onde ficam os arquivos javascript.
lib
templates -> onde ficam os arquivos html
```


* O css fica em www/css/style.css. Segue exemplo:
```css
@font-face {
  font-family: "Roboto";
  src: url("../fonts/Roboto-Regular.ttf");
  font-weight: normal;
  font-style: normal;
}

.background {
  background-image: linear-gradient(151deg, #005ec0, #66f5b6);
}

.licitacao-detalhe.header {
  height: 10px;
  font-family: Roboto;
  font-size: 7px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.43;
  letter-spacing: 0.1px;
  text-align: left;
  color: #2b2826;
}
```

# FONTS
* As fontes ficam em www/fonts
* Para cada controller adicionado no projeto, deve-se adciona-lo também no index.html. Ex:
```html 
<!--licitacao-detalhe-->
<script src="js/licitacao-detalhe/licitacao-detalhe.controller.js"></script>
<script src="js/licitacao-detalhe/licitacao-detalhe.service.js"></script>
```     

# ROUTES
* Para cada controller, também adiciona-se a rota em www/js/app.routes.js
Ex:
```javascript 
    .state('home.licitacao-detalhe', {
    url: '/licitacao-detalhe',
    views: {
        'licitacao-detalhe': {
            templateUrl: 'templates/licitacao-detalhe/licitacao-detalhe.html',
            controller: 'LicitacaoDetalheController',
            controllerAs: 'vm'
        }
    }
})
```     
# TEMPLATES       
* O html fica em wwww/templates. Ex (licitacao-detalhe.html):
```html 
<ion-view view-title="Licitação">

  <ion-header>
  </ion-header>

  <ion-content class="background">
    <div class="card">
      <div class="item item-text-wrap">
        <p class="licitacao-detalhe header">
          7001988280
        </p>
        <p class="licitacao-detalhe titulo">
          Manutenção em microturbinas CAPSTONE
        </p>
        <p class="licitacao-detalhe descricao">Licitação publicada no Diário Oficial da União em 27/03/2018</p>
        <p class="licitacao-detalhe subtitulo">Petróleo Brasileiro S. A.</p>
        <div class="licitacao-detalhe datas">Data início:
          27/03/2018 às 14:00:00 Horas

          Data fim:
          23/04/2018 às 14:00:00 Horas</div>
        <hr class="line-divider">
        <p class="licitacao-detalhe itens">
          Itens
        </p>
      </div>

    </div>
  </ion-content>

</ion-view>
```
* O carregamento desse template a partir de outra página é assim:
```html 
    <ion-tab title="Licitação" href="#/licitacao-detalhe"
        icon-off="ion-clipboard" icon-on="ion-clipboard">
        <!--<ion-nav-view name="licitacao"></ion-nav-view>-->
      <ion-nav-view name="licitacao-detalhe"></ion-nav-view>
    </ion-tab>
```
# CONSTANTS
* As constantes ficam definidas em wwww/js/contants.js. Ex:
```javascript 

(function() {
    'use strict';

	angular
		.module('starter')

		.constant('api', {
			URL_API: 'http://localhost:8100/api/',
            // URL_API: 'https://www.petronect.com.br/sap/',

			URL_LICITACAO_LIST: "http://localhost:8100/api/opu/odata/SAP/YPCON_GET_XML_SRV/getXMLSet('01')?$format=json"
		})

		.constant('constants', {

		});

})();
```
# CONTROLLER
* Segue o exemplo do controller `licitacao-detalhe.controller.js`:
```javascript 

(function () {
  'use strict';

  angular
    .module('starter.controllers')
    .controller('LicitacaoDetalheController', LicitacaoDetalheController);

  LicitacaoDetalheController.$inject = ['LicitacaoDetalheService'];

  function LicitacaoDetalheController(LicitacaoDetalheService) {
    var vm = this;
    vm.getLicitacaoDetalhe = getLicitacaoDetalhe;
    console.log('(LicitacaoDetalheController)');
    var licitacaoID='7001988280';

    ////////////////

    carregar();

    function carregar() {
      getLicitacaoDetalhe(licitacaoID);
    }

    function getLicitacaoDetalhe(licitacaoID) {
      LicitacaoDetalheService.getLicitacaoDetalhe(licitacaoID).then(
        function (response) {
          vm.licitacaoDetalhe = response;
          console.log(vm.licitacaoDetalhe);
        }
      );
    }
  }

})();
```    
# SERVICE
* Segue um exemplo de service:
```javascript 

(function() {
  'use strict';

  angular
    .module('starter.services')
    .factory('LicitacaoDetalheService', LicitacaoDetalheService);

  LicitacaoDetalheService.$inject = ['$http', '$q', 'api', 'Logger'];

  function LicitacaoDetalheService($http, $q, api, Logger) {
    let service = {
      getLicitacaoDetalhe   : getLicitacaoDetalhe
    };
    return service;

    ////////////////

    function getLicitacaoDetalhe(licitacaoID) {
      return $http.get(api.URL_API+'opu/odata/SAP/YPCON_GET_HEADER_INFO_SRV/headerInfoSet(\''+licitacaoID+'\')?$format=json').then(
        function(response) {
          var obj = JSON.parse(response.data.d.Data);
          console.log('(getLicitacaoDetalhe)recebeu resposta',obj.TAB);
          return obj.TAB;
        },

        function(error) {
          Logger.error(error.data);
          return $q.reject(error);
        }
      );
    }
  }

})();
```
#TABS
* Se há 4 views que são percorridos em um único tab, todos eles devem ter o mesmo view name em app.routes.js

# HEADER
* Para colocar um header que seja usado em todas as páginas, deve-se colocar o seguinte código no final do aquivo index.html:
```html 
<body ng-app="starter">
	<ion-nav-bar class="bar-stable">
		<ion-nav-back-button>
		</ion-nav-back-button>
	</ion-nav-bar>
	<ion-header-bar align-title="center">
		<!--<h1 class="title">Petronect</h1>-->
		<img src="img/petronect.png" style="height: 28px;">
	</ion-header-bar>
	<ion-nav-view></ion-nav-view>
</body>
```

#ÍCONES E SPLASH
* As configuraçõe de ícones e splash utilizados estão no arquivo config.xml. Geralmente, os ícones ficam na pasta seuapp/resources/android/icon, seuapp/resources/android/splash e também em seuapp/resources/ios/icon....
* Podemos gerar os ícones e splash pela linha de comando `ionic cordova resources --splash`. Neste caso, o ionic usará a imagem splash.png que está na pasta resources.
* No caso do ios, abrir o projeto no XCode e usar MainViewController.xib, senão não vai abrir o splash.  

# PLUGINS COMUNS
* Para social sharing, clique [aqui](https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin)
*

# PARÂMETROS ENTRE TELAS
* Para enviar parâmetros entre telas, faça o seguinte:
```
function goLicitacaoDetalhe(licitacao) {
    $state.go('home.licitacao-detalhe', { licitacaoID: licitacao.OPPORT_NUM, dataFim: licitacao.END_DATE, horaFim: licitacao.END_HOUR });
}

Na página de detalhe em alguma função:
vm.licitacaoDetalhe.END_DATE = $stateParams.dataFim;
```

# TESTE UNITÁRIO
* Segue um tutorial sobre testes unitários em ionic1 [aqui](https://gonehybrid.com/how-to-write-automated-tests-for-your-ionic-app-part-1/)
* Para executar os testes: karma start unit-tests.conf.js
