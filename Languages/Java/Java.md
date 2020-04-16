# JAVA
* Criamos uma lista da seguinte forma: `List<MyType> myList = new ArrayList<MyType>();`
* Java também tem suporte a `var`, mas a partir do java 10. 
* Java também não tem suporte a async/await out of the box. 
* Java não suporta multiple inheritance de classes.
* Há várias classes que estendem a interface Collection. Entre elas está o List. 
* Java não tem suporte a string interpolation. O máximo que podemos fazer é o seguinte: 
```java
System.out.println(String.format("I have %s apples and %s bananas", apples, bananas));
```
* A Oracle cobra pelo runtime do java. Por conta disso as empresas estão migrando para o OpenJDK. 
* Java suporta multicatch de exception. Ex: 
```java
catch (JsonPatchException | JsonProcessingException ex){...}
```
* Quando implementamos um método definido em uma interface, é recomendável utilizar o `@Override` também. 
* Podemos retornar o nome de uma classe java assim: `Employee.class.getName()`

#  Java 8
* Seguem as principais novidades do Java 8 abaixo

## forEach
* Semelhante ao foreach do .Net. 
```java
//com listas
 List<Integer> itens = Arrays.asList( 11, 10, 16, 5, 85 );
 itens.forEach(item->System.out.println(item));
 //com map
 Map<Integer, String> hmap = new HashMap<Integer, String>();
 hmap.forEach((key,value)->System.out.println(key+" - "+value));  
```

## métodos default e static em Interfaces
* Segue um exemplo abaixo:
```java

```

## Lambda Expressions
```java
Button b=new Button("Click Here"); 
b.addActionListener(e -> System.out.println("Hello World!")); //o -> é um lambda expression
```