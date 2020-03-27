# Java no  VSCode
* Segue a linha de comando para executar o DXT abaixo: 
 `mvn spring-boot:run -Dspring.profiles.active=emea-quality -Dlog.root=C:\Users\teb8ca\Desktop\Testes\Logs`

# Plugins necessários no VSCode para Spring Boot
* Lembre-se que o spring boot no vscode não aponta as linhas com erro qdo falha a compilação. Para isso, abra no netbeans, sts ou intellij. 
1. Java Extension Pack
1. Spring Boot Tools
1. Spring Boot Extension Pack
1. Spring Boot Dashboard
1. Maven for Java


# CRIAÇÃO DE UM PROJETO (VSCODE)
* Podemos criar um projeto Spring Boot rapidamente no VSCode. Basta executar o comando no VSCode `Spring Initialzr: Generate a Maven Project`
* Usar os templates do wizard: Spring Dev Tools, Lombok, Spring Configuration Processor. 
* Segue um passo a passo para criar o controller e o bean Greeting [aqui](https://spring.io/guides/gs/rest-service/). Por padrão, salva-se os controllers dentro da pasta controllers, enquanto salva-se ao beans dentro da pasta model. Lembre-se que tudo isso depende do modelo de arquitetura que é utilizado. 

# COMPILAÇÃO DE UM PROJETO
* Primeiro instalamos todas as dependencias através do comando `mvn install`.
* Depois, podemos compilar um projeto spring boot com maven através da linha de comando: `mvn compile -f "c:\Users\teb8ca\Desktop\Testes\TesteSpringBoot\demo\pom.xml"`

# EXECUÇÃO DE UM PROJETO
* Podemos executar um projeto spring boot maven através da linha de comando: `mvn spring-boot:run -f "c:\Users\teb8ca\Desktop\Testes\TesteSpringBoot\demo\pom.xml"`
* Podemos executar o projeto carregando outro arquivo de configuração assim: `mvn spring-boot:run -f "c:\Users\teb8ca\Desktop\Arquivos\ProjetosBitbucket\rb.dxf.deliveryapp-java\deliveryapp-blueprint\pom.xml" -D spring.config.additional-location=C:\Users\teb8ca\Desktop\Arquivos\ProjetosBitbucket\rb.dxf.deliveryapp-java\deliveryapp-blueprint\src\main\resources\application-local.yml`

# DEPLOY DO PROJETO
* Podemos gerar o jar do projeto através do comando: ` mvn jar:jar -f "c:\Users\teb8ca\Desktop\Testes\TesteSpringBoot\demo\pom.xml"`