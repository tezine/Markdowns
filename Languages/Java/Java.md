# JAVA
* Criamos uma lista da seguinte forma: `List<MyType> myList = new ArrayList<MyType>();`
* Java também tem suporte a `var`, mas a partir do java 10. 
* Java não suporta string interpolation. 
* Há várias classes que estendem a interface Collection. Entre elas está o List. 
* Java não tem suporte a string interpolation. O máximo que podemos fazer é o seguinte: `System.out.println(String.format("I have %s apples and %s bananas", apples, bananas));`
* A Oracle cobra pelo runtime do java. Por conta disso as empresas estão migrando para o OpenJDK. 
* Java suporta multicatch de exception. Ex: `catch (JsonPatchException | JsonProcessingException ex){...}`
* Quando implementamos um método definido em uma interface, é recomendável utilizar o @Override também. 
* Podemos retornar o nome de uma classe java assim: `Employee.class.getName()`