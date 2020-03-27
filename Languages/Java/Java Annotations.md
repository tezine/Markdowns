# Java Annotations
* Mais informações sobre Annotations [aqui](https://en.wikipedia.org/wiki/Java_annotation)
* É um metadado que pode ser adicionado ao código Java. Classes, métodos, variáveis, parâmetros e Java packages podem ser "annotated". 
* Java "annotations" podem ser lidos a partir de um class file compilado através de reflection. 
* Também é  possível criar os próprios "annotations" além dos existentes no java. 
* Seguem alguns exemplos de "annotations" abaixo: 
    - @Override. Serve para verificar se o método em questão é overriden. É gerado um erro de compilador caso o método não seja encontrado na classe parent. 
    - @Deprecated
    - @SuppressWarning
    - @Retention
    - @Documented
    - @Target: Indica onde o Annotation pode ser utilizado. 
    - @Inherited
    - @SafeVarargs
    - @FunctionalInterface
    - @Repeatable

* Podemos criar um custom Annotation assim: 
```java 
 @Twizzle
  public void toggle() {
  }

  // Declares the annotation Twizzle.
  public @interface Twizzle {
  }
  ```

## Annotation Target
* @Target indica onde o annotation pode ser utilizado. Ex: 
```java 
  @Target({ElementType.METHOD})       // This annotation can only be applied to class methods.
  public @interface Tweezable {
  }
  ```
  * O annotation é criado no exemplo acima, bastando colocar @interface. 
  * No exemplo acima, o custom annotation Tweezable só pode ser utilizado em métodos. 

  ## Annotation Retention
  * @Retention indica onde o annotation pode ser acessado. Seguem os possíveis valores abaixo: 
  1. RetentionPolicy.SOURCE: Indica que a anotação é descartada durante a compilação.
  1. RetentionPolicy.CLASS: Indica que a anotação é mantida durante a compilação, mas descartada durante a execução. 
  1. RetentionPolicy.RUNTIME: Indica que a anotação é mantida durante o tempo de execução. 


## Annotation Documented 
* @Documented é utilizado quando definindo um annotation. Indica que o que utilizar o annotation em questão será apresentado no Javadoc. 
* Veja uma exemplificação [aqui](https://www.developer.com/java/other/article.php/10936_3556176_3/An-Introduction-to-Java-Annotations.htm)

## Annotation Configuration (Spring)
* @Configuration indica que a classe declara um ou mais @Bean methods. 

## Annotation PropertySource (Spring)
* @PropertySource is a convenient annotation for including PropertySource to Spring's Environment and allowing to inject properties via @Value into class attributes. (PropertySource is an object representing a set of property pairs from a particular source.)
* Há um exemplo demonstrando o uso [aqui](http://zetcode.com/spring/propertysource/)
* @PropertySource is used together with @Configuration
* Resumidamente falando, isso faz um inject de propriedades lidas a partir de um arquivo no environment do Spring que pode então ser lida como o exemplo abaixo: 
```java
  @Value("${app.name}")
    private String appName;
```    
* No exemplo acima, a propriedade appName é lida a partir do valor app.name que estava no arquivo...

## ConditionalOnProperty (Spring)
* Permite carregar uma classe caso seja encontrada a propriedade. Ex:
```java
@Configuration
@ConditionalOnProperty(name = "dxf.content.active", havingValue = "true")
public class DxfContentAutoConfiguration implements WebMvcConfigurer {
}
```
* O código acima é carregado se houver a propriedade dxf.content.active=true dentro do application.yml. Ex:
```yaml
dxf:
  content:
    active: true
```
* Aparentemente, também podemos setar um property via runtime da seguinte maneira: 
```java
System.setProperty("archaius.dynamicProperty.disableSystemConfig", "true");`
```