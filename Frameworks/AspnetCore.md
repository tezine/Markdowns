# Aspnet core

* Mais info [aqui](https://docs.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/razor-pages-start)
* _Layout.cshtml contem elementos comuns html, compartilhados entre todas as páginas. 
* _ViewStart.cshtml especifica para usar o _Layout.cshtml
* _ViewImports indica os imports que sao importados em todas as páginas razor.
* Todo razor page começa com @page. Isso indica a nao usar MVC view. 
* A funçao OnGet do PageModel é sempre chamada ao abrir uma página razor
* Especificamos quem é o PageModel associado ao cshtml utilizando: `@model AboutModel`
* Após isso, podemos acessar qualquer variável do PageModel via `@Model.Message`
* Ao invés de usar um arquivo de PageModel, também podemos declarar inline no cshtml usando `@functions{ ...}`
* O diretório/página é utilizado para acessar a página. Ex: <br>
**  /Pages/Contact.cshtml ==> /Contact<br>
** /Pages/Store/Index.cshtml ==> /Store or /Store/Index<br>
    
