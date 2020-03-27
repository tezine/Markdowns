# Appium
* http://appium.io/ 
* Ferramenta para automação de testes de apps nativos e híbridos ios/Android. 
* A interação na UI é realizada através de F12/Remote Devices no Google Chrome. 
* Realizado isso, a UI é apresentada no Chrome, apesar do app estar sendo executado no Android, por exemplo. 
* Há uma função parar salvar um screenshot do app em determinado momento.  

## Simulação de eventos de UI
* Para testar o click de um botão, seleciona-se o elemento no Chrome e, com o botão direito clica-se em Copy XPath. 
* Feito isso, o script Appium pode executar o click de acordo com o caminho XPath, ou pode-se executar o click através do id do botão. 
* Como o clique leva algum tempo, usa-se Thread.sleep(1000) para aguardar o clique.     