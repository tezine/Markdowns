# Java no Netbeans
* Sempre que adicionar um novo dependency no pom.xml, a porcaria do Netbeans trava. Clicar em build with dependencies para que o netbeans faça o mvn install da dependencia. 
* Podemos depurar com o netbeans. Para isso, Adiconar no Action/Debug project:
* Volta e meia o netbeans apresenta uns exceptions loucos ao executar um projeto. Qdo aparentemente não há nada de errado, basta fazer um clean and build e executar novamente! rs. 


## DEBUG
Properties:
```
spring-boot.run.jvmArguments=-Xdebug -Xrunjdwp:transport=dt_socket,server=n,address=${jpda.address} -noverify -XX:TieredStopAtLevel=1
Env.SPRING_OUTPUT_ANSI_ENABLED=always
jpda.listen=true
Env.spring.config.additional-location=C:\Users\teb8ca\Desktop\Arquivos\ProjetosBitbucket\rb.dxf.deliveryapp-java\deliveryapp-blueprint\src\main\resources\application-local.yml
```

Execute Goals:
```
spring-boot:run 
```

## RUN
Properties
```
spring-boot.run.jvmArguments=-noverify -XX:TieredStopAtLevel=1
spring-boot.run.mainClass=com.example.demo.DemoApplication
Env.SPRING_OUTPUT_ANSI_ENABLED=always
Env.spring.config.additional-location=C:\Users\teb8ca\Desktop\Arquivos\ProjetosBitbucket\rb.dxf.deliveryapp-java\deliveryapp-blueprint\src\main\resources\application-local.yml
```

Execute Goals
```
spring-boot:run
```