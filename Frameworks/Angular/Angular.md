# ANGULAR
* https://angular.io/
* A partir do angular 6, é possível atualizar os componentes via ng update. Por exemplo, `ng update @angular/core` atualiza todos os packages do angular, o rxjs e typescript.
* A partir da versao 6, podemos adicionar novas funcionalidades ao projeto via `ng add`. Ex: `ng add @angular/material`.
* A partir da versão 6, é utilizado o angular.json ao invés de .angular-cli.json e há suporte para workspaces. 
* A versão 6 suporta Custom Elements. https://angular.io/guide/elements. "Custom elements bootstrap themselves - they start automatically when they are added to the DOM, and are automatically destroyed when removed from the DOM".
* Agora é possível criar bibliotecas facilmente usando `ng generate library`.


# Passo a passo (App + Lib)
* Segue um passo a passo para criar um workspace Angular contendo um app e uma lib abaixo: 
1. Baixar o Angular CLI [aqui](https://cli.angular.io/)
1. Executar `ng new nomeworkspace --createApplication="false"` . Há informações sobre os parâmetros do ng new [aqui](https://angular.io/cli/new)
1. `cd nomeworkspace`
1. Criar um projeto para a aplicação: `ng generate application nome-app --routing=true --style=scss`
1. Criar um projeto para a lib: `ng generate library nome-lib`
1. Instalar os pacotes npm: `npm install`
1. Executar a aplicação: `ng serve`

# SERVICES
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


# ViewChild
*Podemos acessar um elemento do DOM no typescript através do @ViewChild. 
Seguem um exemplo abaixo:
html:
```html
<input class="col-xs-12 col-md-6" [label]="'Celular'" id="txtCel"></input>
```
component.ts:
```typescript 
@ViewChild('txtCel',{static: false}) txtCel:any;
```


# UPDATES
* Para verificar como fazer update de seu projeto, acesse http://update.angular.io 


# CORS
* Para habilitar CORS no Angular e, com isso permitir com que o Angular faça requests para outros domínios e/ou portas, crie o arquivo proxy.conf.json abaixo:
```json 
{
    "/api/*": {
        "target": "http://localhost:9090",
        "secure": false,
        "logLevel": "debug"
    }
}
```
* Agora adicione a linha proxyConfig no angular.json dentro de `serve` do projeto, conforme abaixo:
```json
"serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "meuprojeto:build",
            "proxyConfig": "src/proxy.conf.json"
          },
```


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

* Segue um exemplo de teste unitário para a tela de login abaixo:

  ```typescript
  //Login.component.ts
  export class LoginComponent implements OnInit {
  
    email?:string;
    password?:string;
    errorMsg?:string;
    @ViewChild('errorDiv') errorDiv?: HTMLDivElement; //div must be like <div #errorDiv></div>
  
    constructor(protected router: Router, private usersService:UsersService) { }
  
    ngOnInit(): void {}
  
    async onBtnLoginClicked():Promise<void>{
      if(!await this.authenticateUser()) return;
      else await this.router.navigate([Defines.routeUsers]);
    }
  
    async authenticateUser():Promise<boolean>{
      this.errorMsg=undefined;
      let ok=await this.usersService.authenticate(this.email,this.password);
      if(ok)return true;;
      this.errorMsg = 'Email ou senha inválidos';
      return false;
    }
  }
  ```

  ```typescript
  //login.component.spec.ts
  describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        imports: [RouterTestingModule, HttpClientModule],
        providers:[UsersService]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      fixture.debugElement.nativeElement.style.visibility = "hidden";//use this to hide the component from karma result
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    // it('Criação do componente', () => {
    //   expect(component).toBeTruthy();
    // });
  
    it('Teste com email/senha inválidos', async () => {
      component.email=undefined;
      component.password=undefined;
      let result=await component.authenticateUser();
      expect(result).toBeFalse();
      //let's wait for dom updates and check if the error div is displayed.
      fixture.detectChanges();
      let errorDiv = fixture.debugElement.query(By.css('#errorDiv')); //div must be like <div id="errorDiv"></div>
      //expect(component.errorDiv).toBeTruthy()
      //ou
      expect(errorDiv).toBeTruthy()
    });
  
    it('Teste com email/senha válidos', async () => {
      component.email='bruno@tezine.com';
      component.password='tata';
      let result=await component.authenticateUser();
      expect(result).toBeTrue()
    });
  });
  ```

  


# Integração com Swagger
* Passo a passo para criar um projeto Angular com integração com Swagger. 
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

* You can also integrate with Open API Generator. More info [here](../OpenAPIGenerator.md).