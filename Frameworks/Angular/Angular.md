# ANGULAR CRASH COURSE

<!--toc generated automatically by running markdown-toc -i Angular.md-->

<!-- toc -->

- [ANGULAR](#angular)
- [POC](#poc)
- [Project Structure](#project-structure)
- [Modules](#modules)
- [Components](#components)
  * [File structrure](#file-structrure)
  * [Lifecycle](#lifecycle)
  * [Input properties/parameters](#input-propertiesparameters)
  * [Output events](#output-events)
  * [ViewChild](#viewchild)
  * [ContentChild](#contentchild)
  * [Hooks](#hooks)
  * [Animations](#animations)
- [Forms](#forms)
  * [Template-driven forms](#template-driven-forms)
  * [Reactive forms](#reactive-forms)
- [Services](#services)
- [Pipes](#pipes)
- [Directives](#directives)
  * [Attribute Directives](#attribute-directives)
  * [Structural Directives](#structural-directives)
- [HttpClient](#httpclient)
- [Router](#router)
- [Angular Elements](#angular-elements)
- [Internationalization](#internationalization)
- [Server Side Rendering](#server-side-rendering)
- [PWA](#pwa)
- [Angular Workspace (App + one Lib)](#angular-workspace-app--one-lib)
- [Tests](#tests)
- [Deployment](#deployment)
- [Open API Integration](#open-api-integration)
- [CORS](#cors)

<!-- tocstop -->

* [Angular](https://angular.io/) is progressive, reactive typescript web framework that allows the creation of Single Page applications. The project is sponsored by Google and mostly used by enterprise level websites with complex and lots of pages and code files. It provides Behavior Driven Testing (BDD) out of the box, Router, Internationalization, Ahead of Time compiling, Server Side Rendering, Dependency injection, Animations, ...., and its own http client. 
* Angular provides its own [Command Line Interface (CLI)](https://cli.angular.io/) from where you can easily create applications, libraries and others. Angular also has support for centralized workspaces, where each [workspace](https://angular.io/guide/file-structure) may contain several Angular projects. "The top level of the workspace contains workspace-wide configuration files, configuration files for the root-level application, and subfolders for the root-level application source and test files."
* Applications can be easily updated to the newest version by following the procedure described [here](https://update.angular.io/) and there's an official material design components built in Angular. More info [here](https://material.angular.io/). 
* Angular has a built-in support for [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) standard. By using a web component, it's possible to export Angular Components to be used outside Angular projects, so you may use them in a React, Vuejs, or any other Web framework. "Custom elements bootstrap themselves - they start automatically when they are added to the DOM, and are automatically destroyed when removed from the DOM". A more detailed information on how to create Web Components [here](https://angular.io/guide/elements).
* There are many enterprise level websites running Angular. You can check its showcase [here](https://www.madewithangular.com/)

# POC

* There's a Proof of Concept project following this material. You can find the code [here](./POC). The purpose of the POC is to exemplify all subjects mentioned in this document. It's composed by an Angular workspace with 1 application (core-project), 1 Angular library (users-lib)... 
* It uses Material Design components, bootstrap css, internationalization, animations, services, template and reactive forms and many other features. 

# Project Structure

* 

# Modules and Libraries

In Angular, sometimes we get confused on when to create a library and when to create a Angular Module. Here are the basic differences between them: 

* [Module](https://angular.io/guide/architecture-modules): A Module resides inside the project and it's only used within it. We can add components and others into the module and load the module at runtime when needed. A common scenario is to do Lazy Loading triggered by a specific route in your website. Ex: /users load the Users module, containing all users components, services... . Unfortunately, this approach requires you to download the module source code in order to accomplish the lazy load, and that's why it's called as "mono repository" approach. 
* [Library](https://angular.io/guide/libraries): A library is more appropriate when you wish to share it with several projects. This way, the application that uses the library doesn't have to access the library code, only the compiled bundle. It's even possible to do lazy loading of a library without having its source code, but it requires you to define a module wrapper into the consumer application. 

## Libraries

Angular libraries can only be used within Angular projects. If you intend to create a library to be used outside Angular, create a [Angular Element](https://angular.io/guide/elements). We can create a Angular library by executing the following command: 

```bash
ng new my-workspace --create-application=false # creates the an empty Angular workspace
cd my-workspace
ng generate library my-lib # creates the library project. 
```

Remember to define which components are exported by your library in your "my-lib.module.ts". Components not explicitly exported cannot be imported and used in an Angular app. 

After finalizing the library code, you can build it like this:

```bash
ng build my-lib --prod
cd dist/my-lib
npm publish # This published into NPM repository. Please notice that Angular do not recommend to publish Ivy libraries to npm. 
```

You can consume your library, by executing the following command in your app:

```bash
npm install my-lib --save
# now you can import its components, services... in your app module. 
```

### Lazy Loading Libraries

It's possible to do lazy loading of Angular libraries. To do so, follow the steps below

There's a detailed description about lazy loading libraries [here](https://medium.com/@tomastrajan/why-and-how-to-lazy-load-angular-libraries-a3bf1489fe24). 

# Components

In Angular, every page or every widget is a considered a component. There's no difference between them. 

## File structrure

Different from [Vuejs](https://vuejs.org/) or [Svelte](https://svelte.dev/), Angular Components are usually splitted into 3 files: 

1. Html template file (.html)
2. Typescript file (.ts), where the component's logic resides. 
3. Stylesheet file (scss, css, stylus, less...). Stylesheets are scoped/isolated by default in Angular, so whatever you define in your component stylesheet is not spread over other components. 
4. Spec file. Spec files are [Jasmine](https://jasmine.github.io/) test files that are executed by [Karma](https://karma-runner.github.io/latest/index.html). 

It's also possible to have html/typescript/css into the same file, but it's not a common usage and discouraged by the community. 

## Lifecycle

* ngOnChanges()
* ngOnInit()
* ngDoCheck()
* ngAfterContentInit()
* ngAfterContentChecked()
* ngAfterViewInit()
* ngAfterViewChecked()
* ngOnDestroy()

## Input properties/parameters

* Podemos passar parâmetros para o componente através do @Input(). Ex:

```typescript 
@Input() count: number = 0;
```

## Output events

* Podemos ouvir os html events que acontecem dentro de um componente da seguinte maneira:

```typescript 
@HostListener('mouseenter') onMouseEnter() {
  this.highlight('yellow');
}
```

* Mais info [aqui](https://angular.io/guide/attribute-directives)


## ViewChild

* Podemos acessar um elemento do DOM no typescript através do @ViewChild. 
  Seguem um exemplo abaixo:
  html:

```html
<input class="col-xs-12 col-md-6" [label]="'Celular'" id="txtCel"></input>
```

component.ts:

```typescript 
@ViewChild('txtCel',{static: false}) txtCel:any;
```

## ContentChild

* dkdhd

## Hooks

* More about lifecycle hooks [here](https://angular.io/guide/lifecycle-hooks)

## Animations

* 

# Forms

* dkdhd

## Template-driven forms

* dhdh

## Reactive forms

* 

# Services

* A partir da versão 6 não se coloca mais os services como providers. Agora é assim:

```typescript 
@Injectable({
  providedIn: 'root',
})
export class MyService {
  constructor() { }
}
```

# Pipes

* ddkdh

# Directives

* dkdhd

## Attribute Directives

* sddd

## Structural Directives

* 

# Router

* Avoid using named router-outlet. Instead, prefer using several \<router-outlet> with child routes. Ex: 

1. Let's suppose you have a main angular project. 

2. There's a \<router-outlet> in the app.component.html

3. Than, after the user login, you display a Home.component. 

4. In this HomeComponent, you have another \<router-outlet> 

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

# HttpClient

* ddff

# Angular Elements

* dkdhd

# Internationalization

* More info about translations [here](https://angular.io/guide/i18n)
* There's also a great tool for translations called NGX-Translate. More info [here](http://www.ngx-translate.com/).

# Server Side Rendering

* 

# PWA

* 

# Angular Workspace (App + one Lib)

* Segue um passo a passo para criar um workspace Angular contendo um app e uma lib abaixo: 
1. Baixar o Angular CLI [aqui](https://cli.angular.io/)
1. Executar `ng new nomeworkspace --createApplication="false"` . Há informações sobre os parâmetros do ng new [aqui](https://angular.io/cli/new)
1. `cd nomeworkspace`
1. Criar um projeto para a aplicação: `ng generate application nome-app --routing=true --style=scss`
1. Criar um projeto para a lib: `ng generate library nome-lib`
1. Instalar os pacotes npm: `npm install`
1. Executar a aplicação: `ng serve`

* 


# Tests
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



# Deployment

* dd


# Open API Integration

* In order to generate the REST APIs automatically for  your Angular project using [Open API Generator](https://openapi-generator.tech/), take a look at the Open API Genrator [here](../../OpenAPIGenerator.md).

12. 

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

# Security

# Typescript properties

Every Angular workspace has a `tsconfig.json` file. All typescript configurations used by the projects in the workspace are written in it. There are a few [compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html) that are very important and are described below:

1. strict: Strict is an important option that is disabled by default, but it's highly recommended to enable it. Basically, when disabled, you can write typescript as pure javascript (non typed). If you enable it, the compiler will display an error whenever you try to create a property that should never be null (without `?` at the end. Ex: `title:string` ). It'll display an error when you don't specify function parameter types, and many other options. There's a good explanation about `strict` [here](https://medium.com/webhint/going-strict-with-typescript-be3f3f7e3295).
2. removeComments: I have no idea why, but this flag is disabled by default, so it's important to enable it in order to remove your code comments for the production build. 

# Advanced Scenarios

## Component Lazy Loading

* One of the cool features that Ivy brougth to Angular in version 9, was the ability to do Lazy Loading for Angular Components. 

* There are several tutorials explaining on how to make it work in several ways. Check it out [here](https://indepth.dev/lazy-loading-angular-modules-with-ivy/) and [here](https://netbasal.com/welcome-to-the-ivy-league-lazy-loading-components-in-angular-v9-e76f0ee2854a). 

  

## Webassembly

* 