# ANGULAR
* A partir do angular 6, é possível atualizar os componentes via ng update. Por exemplo, `ng update @angular/core` atualiza todos os packages do angular, o rxjs e typescript.
* A partir da versao 6, podemos adicionar novas funcionalidades ao projeto via `ng add`. Ex: `ng add @angular/material`.
* A partir da versão 6, há 3 templates prontos do material para adicionar ao projeto: dashboard, sidebar e datatable. Ex: `ng generate @angular/material:material-nav --name=my-nav`  .
* A partir da versão 6, é utilizado o angular.json ao invés de .angular-cli.json e há suporte para workspaces. 
* A versão 6 suporta Custom Elements. https://angular.io/guide/elements. "Custom elements bootstrap themselves - they start automatically when they are added to the DOM, and are automatically destroyed when removed from the DOM".
* Agora é possível criar bibliotecas facilmente usando `ng generate library`.
* A partir da versão 6 não se coloca mais os services como providers. Agora é assim:
```typescript 
@Injectable({
  providedIn: 'root',
})
export class MyService {
  constructor() { }
}
```

# LIFECYCLE
* ngOnChanges()
* ngOnInit()
* ngDoCheck()
* ngAfterContentInit()
* ngAfterContentChecked()
* ngAfterViewInit()
* ngAfterViewChecked()
* ngOnDestroy()

# INPUT
* Podemos passar parâmetros para o componente através do @Input(). Ex:
```typescript 
@Input() count: number = 0;
```  

# EVENTOS
* Podemos ouvir os html events que acontecem dentro de um componente da seguinte maneira:
```typescript 
@HostListener('mouseenter') onMouseEnter() {
  this.highlight('yellow');
}
```
* Mais info [aqui](https://angular.io/guide/attribute-directives)


# UPDATES
* Para verificar como fazer update de seu projeto, acesse http://update.angular.io 

# TESTE UNITÁRIO
* Mais informações [aqui](https://angular.io/guide/testing)
* Os testes unitários são realizados através de Karma e Jasmine. 
* Jasmine é o framework mais popular para testes no Angular. 
* Karma é uma ferramenta criada pelo time de Angular para rodar testes unitários. Ele carrega o browser, lê os testes a partir de um arquivo config, executa e apresenta o resultado em um terminal. 
* Protractor (opcional) é um framework de teste end-to-end. Ele executa o teste no browser da mesma maneira que um usuário executaria. Assim, ele faz o teste de UI. O Protractor se baseia no WebdriverJS e Selenium, assim, deve-se estar familiarizado com essas ferramentas para usa-lo.
* O formato dos testes é especificado pelo [Jasmine](https://jasmine.github.io/)
* Os testes de cada componente são escritos no arquivo .spec.ts. 
* Para iniciar os testes, basta digitar `ng test`. Será aberto o Chrome e vai ser apresentado o resultado de todos os testes executados. O resultado também é apresentado no console. 
* Ao modificar um componente e salvar, será executado o teste novamente. 
* As configurações dos testes ficam em karma.conf.js e test.ts na pasta src. 
* Services também podem ser testados. 


# Passo a passo para criar um projeto Angular com integração com Swagger. 
1. Criar um workspace Angular: `ng new my-workspace --createApplication="false"`
1. Criar o projeto Angular: `cd my-workspace, ng generate application my-first-app`
1. Utilizar Angular Routing e SCSS ao ser questionado pelo `ng`. 
1. O projeto `my-first-app` é criado dentro da pasta projects. 
1. Criar uma lib para o Swagger: `ng generate library swagger`
1. Remover todo conteúdo da pasta src do projeto swagger.
1. Gerar o código para Angular fazendo o upload da especificação openapi de seu projeto através do `https://app.swaggerhub.com/`> . Lembre-se de especificar a versão do Angular antes de gerar (em CodeGen Options). 
1. Descomprimir o download gerado pelo site e colocar na pasta swagger/src. 
1. Importar o módulo da lib swagger no seu projeto -my-first-app. Para isso, edite o arquivo app.module.ts da seguinte maneira: 
```typescript
import { ConfigurationParameters, Configuration } from './../../../swagger/src/configuration';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule } from 'projects/swagger/src';
import { HttpClientModule } from '@angular/common/http';

function apiConfigFactory() : Configuration {
  const params: ConfigurationParameters = {
    // set configuration parameters here.    
  }
  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot(apiConfigFactory)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
``` 
1. Repare que é possível especificar as credenciais JWT, entre outros na função apiConfigFactory. 
1. Agora já é possível acessar as apis. Segue um exemplo abaixo:
```typescript
import { DefaultService } from './../../../swagger/src/api/default.service';
import { APIS } from './../../../swagger/src/api/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-first-app';

  constructor(private apiGateway: DefaultService){
  }

  async ngOnInit(){
    let result= await this.apiGateway.getProducts().toPromise();
  }
}
```

# Passo a passo para criar um projeto Angular com integração com OpenAPI Generator (alternativa ao Swagger Code Gen)
> Alternativa ao Swagger. Mais info sobre o OpenAPI Generator [aqui](https://openapi-generator.tech/docs/generators/typescript-angular)
> A configuração no projeto Angular é praticamente a mesma da utilizada com o Swagger. Exemplo [aqui](https://github.com/OpenAPITools/openapi-generator/tree/master/samples/client/petstore/typescript-angular-v4/npm)
1. Instalar a linha de comando do Open API Generator: `npm install @openapitools/openapi-generator-cli -g`
1. Criar um workspace Angular: `ng new my-workspace --createApplication="false"`
1. Criar o projeto Angular: `cd my-workspace, ng generate application my-first-app`
1. Utilizar Angular Routing e SCSS ao ser questionado pelo `ng`. 
1. O projeto `my-first-app` é criado dentro da pasta projects. 
1. Criar uma lib para o Open API Generator: `ng generate library openapigenerator`
1. Remover todo conteúdo da pasta src do projeto openapigenerator.
1. Executar o openapi para gerar o código a partir do openapi. Ex: `openapi-generator generate -i api.yaml -g typescript-angular -o ./openapigenerator --additional-properties="ngVersion=8.2.14"`
1. Copiar o conteúdo gerado DENTRO da pasta openapigenerator para DENTRO da pasta src do projeto Angular openapigenerator.
1. Importar o módulo da lib openapigenerator no seu projeto -my-first-app. Para isso, edite o arquivo app.module.ts da seguinte maneira: 
```typescript
import { Configuration, ConfigurationParameters } from './../../../swagger/src/configuration';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule, BASE_PATH } from 'projects/openapigenerator/src';

function apiConfigFactory (): Configuration  {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
  }
  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot(apiConfigFactory)
  ],
  providers: [{provide: BASE_PATH, useValue: 'https://your-web-service.com'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
1. Repare que é possível especificar as credenciais JWT, entre outros na função apiConfigFactory. 
1. Agora já é possível acessar as apis. Segue um exemplo abaixo:
```typescript
import { Component, OnInit } from '@angular/core';
import { DefaultService } from 'projects/openapigenerator/src';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-first-app';

  constructor(private apiGateway: DefaultService){
  }

  async ngOnInit(){
    let result= await this.apiGateway.getProducts().toPromise();
  }
}
```