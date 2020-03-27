# Thymeleaf 
* É o Asp.net do Spring. Mais info [aqui](https://www.thymeleaf.org/)
* Há um exemplo de apicação [aqui](https://github.com/thymeleaf/thymeleafexamples-gtvg)


# DIVISÃO DE PASTAS
* Aparentemente, fazem a seguinte divisão de código: 

>CÓDIGO EM JAVA NAS PASTAS ABAIXO: 
* main/java/packagename/business/entities: 
* main/java/packagename/business/services
* main/java/packagename/web/application: Aqui só fica a classe de entrada da aplicação.
* main/java/packagename/web/controller


>HTML/CSS NAS PASTAS ABAIXO:
* main/webapp/css
* main/webapp/images
* main/webapp/web-inf/templates/

* Para incluir um arquivo css, faz-se assim: 
```html 
<link rel="stylesheet" type="text/css" media="all" href="../../css/gtvg.css" th:href="@{/css/gtvg.css}" />
```

Segue um passo a passo abaixo:
1. Criar uma página home.html dentro de main/webapp/web-inf/templates/
1. Criar os arquivos contendo traduções também em main/webapp/web-inf/templates/. Ex: home_en.properties, home_pt.properties, ... 
1. Adicionar strings no arquivo de tradução da seguinte maneira:
```
home.welcome=Welcome to our grocery store, {0} (from default messages)!
logo=Good Thymes Virtual Grocery logo
date.format=MMMM dd'','' yyyy
```
1. Aí podemos inserir o texto no html da seguinte maneira: 
```html 
<p th:utext="#{home.welcome(${session.user.name})}">Welcome to our grocery store, Sebastian!</p>
Today is: <span th:with="df=#{date.format}" th:text="${#calendars.format(today,df)}">13 February 2011</span>
```
1. O código java responsável pelo home.html é o HomeController.java que está em `src\main\java\thymeleafexamples\gtvg\web\controller\HomeController.java`. Segue o código abaixo: 
```java
public class HomeController implements IGTVGController {    
    public HomeController() {
        super();
    }
    
    public void process(final HttpServletRequest request, final HttpServletResponse response,final ServletContext servletContext, final ITemplateEngine templateEngine)throws Exception {        
        WebContext ctx = new WebContext(request, response, servletContext, request.getLocale());
        ctx.setVariable("today", Calendar.getInstance());        
        templateEngine.process("home", ctx, response.getWriter());        
    }
}
```
1. Repare que a variável `today` especficada no código java é acessada no template html. 


# TAGS
* Acessamos a tradução de um texto usando a sintaxe: `#{logo}`
* Acessamos uma webcontext variable definida em um controller java assim: `${prods}`
* Apontamos o link para um arquivo assim: `@{/css/gtvg.css}`