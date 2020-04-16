# Fission
* https://fission.io/
* Fission é um framework opensource de Serverless Functions semelhante ao AWS Lambda criado com participação do Brendan Burns. 
* O propósito do Fission é fornecer uma solução de FaaS (Function as a Service) para o Kubernetes. 
* Suporta várias linguagens de programação como: Python, Javascript, Go, C#, PHP, ... 
* Fission oferece suporte para integração com [Istio](https://istio.io/pt-br/), que é uma plataforma opensource para conectar, gerenciar e protejer microserviços. Istio também permite monitorar a utilização das funções e verificar a latência através de dashboards. 
* Fornece autoscaling das funções baseado na utilização da CPU. Pode-se especificar o início e máximo de utilização de CPU em que o autoscaling será invocado. 
* Segue um exemplo abaixo de como criar uma função: 
```shell
./fission function create --name=hello --code=hello.js --env=nodejs 
```
* Agora criamos a rota para especificar a url que receberá requests para a função:
```shell 
./fission route create --function=hello --url=/hello
```
* Basta digitar as duas linhas acima e já podemos acessar a função `hello` digitando o `[EndereçoIPDoCluster]/hello` no browser. Fácil né! 
* Para atualizar a função criada no kubernetes, basta editar a função e executar a linha de comando abaixo: 
```shell  
./fission function update --name=hello --code=hello.js
```
* Poderíamos obter o mesmo resultado fazendo um push de um container contendo uma função semelhante, mas o deploy do container pelo kubernetes não seria imediato como uma função Fission. 
* Para listar as rotas existentes, digite:
```shell 
./fission route list
```
* Para remover uma rota:
```shell
./fission route delete [id da rota]
```