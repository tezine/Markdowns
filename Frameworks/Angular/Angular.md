# ANGULAR
* https://angular.io/
* A partir do angular 6, é possível atualizar os componentes via ng update. Por exemplo, `ng update @angular/core` atualiza todos os packages do angular, o rxjs e typescript.
* A partir da versao 6, podemos adicionar novas funcionalidades ao projeto via `ng add`. Ex: `ng add @angular/material`.
* A partir da versão 6, é utilizado o angular.json ao invés de .angular-cli.json e há suporte para workspaces. 
* A versão 6 suporta Custom Elements. https://angular.io/guide/elements. "Custom elements bootstrap themselves - they start automatically when they are added to the DOM, and are automatically destroyed when removed from the DOM".
* Agora é possível criar bibliotecas facilmente usando `ng generate library`.


# Angular Workspace (App + one Lib)
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

# Events
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


# Unit Testing
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


# Open API Generator

* In order to generate the REST APIs automatically for  your Angular project using [Open API Generator](https://openapi-generator.tech/), take a look at the Open API Genrator [here](../../OpenAPIGenerator.md).

# Router-outlet

* Avoid using named router-outlet. Instead, prefer using several <router-outlet> with child routes. Ex: 

1. Let's suppose you have a main angular project. 

2. There's a <router-outlet> in the app.component.html

3. Than, after the user login, you display a Home.component. 

4. In this HomeComponent, you have another <router-outlet> 

5. When user clicks on a button, you want to load another module into the router-outlet inside the HomeComponent. 

6. To do so, create the following routes in your main project: 

```typescript
const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, children:[
        //this is a child route, because we have a <router-outlet> inside HomeComponent
        {path: 'cadastros', loadChildren: () => 	 import('../../cadastros/src/lib/cadastros.module').then(m => m.CadastrosModule)},
    ]
    },
    // {path: '**', component:LoginComponent},
];
```
8. Now, under Cadastros module, add the followint routes:

```typescript
const routes: Routes = [
    {path: '', component: CadastrosComponent, children: [//route: /cadastros
    {path: 'clients', component: ClientsComponent,},
    {path: 'clients/edit', component: ClientsEditComponent},//this cannot be a child route of clients, since we don't have a router-outlet inside clients
]}];
```

10. Now, you can load the Cadastros module from HomeComponent, by adding the code: 

```typescript
await this.router.navigate(['home/cadastros/clientes']);
```

12. This will do the lazy loading of the Cadastros module and display the ClientsComponent inside the router-outlet in HomeComponent.