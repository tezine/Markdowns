# JASMINE 
* Jasmine é um framework para testes unitários usado no Angular e no IONIC. 
* Podemos testar componentes e serviços. 
* Karma é uma ferramenta criada pelo time de Angular
* Jasmine é o framework mais popular para testes no Angular. 
* Resumidamente, o funcionamento é o seguinte:
1) beforeEach() : é uma função do jasmine que é executada antes de cada teste.  
1) describe() : Indica o que será testado. 
1) it() : O que esperamos que aconteça. 
1) expect(): Como testamos se o resultado foi sucesso ou erro.
* Segue um exemplo de teste Jasmine abaixo: 
```
describe("LoginController", function() {  
  it("should call login on dinnerService", function () {
      loginController.doLogin();
      expect(dinnerService.login).toHaveBeenCalled();
  });
});
```
* 