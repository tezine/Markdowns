# Spring Data JPA
* É o framework de acesso a dados do Spring. 
* Há um tutorial de exemplo [aqui](https://mkyong.com/spring-boot/spring-boot-spring-data-jpa/)
* O acesso a dados pelo spring boot é realizado através do JPA. 
* O projeto [Lombok](https://projectlombok.org/) cria automaticamente os getters e setters de um entity, basta usar o annotation @Data na classe do entity ou então adicionar as propriedades assim: ` @Getter @Setter private int age = 10;`
* Podemos adicionar suporte ao H2(banco de dados em memória), adicionando as linhas no pom.xml:
```xml
<dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-rest</artifactId>
</dependency>    
  <dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```        
* Após isso, criamos uma interface para manipulação dentro da pasta repositories:
//PersonRepository.java
```java
package com.example.demo.repositories;
import com.example.demo.models.Person;
import java.util.List;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "people", path = "people")
public interface PersonRepository extends PagingAndSortingRepository<Person, Long> {//além de PagingAndSortingRepository, pode ser CrudRepository, entre outros. 
  List<Person> findByLastName(@Param("name") String name);
}
```
* Agora editamos a classe DemoApplication para ficar da seguinte forma: 
```java
@SpringBootApplication
public class DemoApplication implements CommandLineRunner{

    @Autowired
    private PersonRepository repository;   //repare que é usado o annotation @Autowired para fazer o inject automático do repository PersonRepository. 
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
    
    
    @Override
    public void run(String... args) {
        try{
        repository.save(new Person("Java"));//adiciona uma entity no h2. 
        repository.save(new Person("Node"));
        repository.save(new Person("Python"));

        System.out.println("\nfindAll()");
        repository.findAll().forEach(x -> System.out.println(x));

        System.out.println("\nfindById(1L)");
        repository.findById(1l).ifPresent(x -> System.out.println(x));

        System.out.println("\nfindByName('Node')");
        repository.findByLastName("Node").forEach(x -> System.out.println(x.getLastName()));
        }catch(Exception ex){
            System.out.println(ex);
        }

    }
}
```

* O Spring já faz o dependency injection do repository automaticamente no construtor de um controller. Outra alternativa é utilizaro @Autowired em uma variável. Veja o exemplo abaixo:
```java
@RestController
@RequestMapping({"/contacts"})
public class ContactController {
   private ContactRepository repository;
   ContactController(ContactRepository contactRepository) {
       this.repository = contactRepository;
   }
   // métodos do CRUD aqui
} 
```

# REPOSITORIES 


* Ao invés de criar uma classe que utiliza uma interface Repository via @AutoWired ou injection no contructor, podemos colocar os queries direto na interface da sequinte maneira:
```java
public interface PersonRepository extends PagingAndSortingRepository<Person, Long> {
    @Query(value = "SELECT * FROM person WHERE id = 1", nativeQuery = true)//repare que o nome da tabela é person, pq o entity é da classe Person
    public List<Person> testaQuery();

    @Query("SELECT e FROM Employee e WHERE e.dept = :dept AND "
          + "(SELECT COUNT(DISTINCT e2.salary) FROM Employee e2 "
          + "WHERE e.salary < e2.salary AND e2.dept = :dept) < :topSalNum "
          + "ORDER BY e.salary DESC")
    List<Employee> findByDeptTopNSalaries(@Param("topSalNum") long topSalaryNum, @Param("dept") String dept);    
}
```
* Veja um exemplo [aqui](https://docs.spring.io/spring-data/jpa/docs/1.6.0.RELEASE/reference/html/jpa.repositories.html)
* Para utilizarmos o @AutoWired (tipo o AutoFAC do .Net), precisamos adicionar o Annotation @Component na classe que será realizada o @AutoWired. 
