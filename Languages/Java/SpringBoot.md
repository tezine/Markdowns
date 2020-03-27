# Spring Boot
* Podemos usar o Maven ou Gradle como build tool. Aqui usam mais o Maven. Também é possível usar o Java ou Kotlin como linguagem. 
* Para agilizar a criação de projetos Spring Boot, podemos criar um projeto rapidamente através do [Spring Initialzr](https://start.spring.io/)
* Se o proxy estiver com problema (no vscode ou no maven), vão aparecer muitas mensagens indicando que não foi possível baixar o artifact... assim que abrir o projeto no vscode. 
* Lembre-se de Não utilizar o maven wrapper no vscode. Baixar o maven do site e lembrar de configurar o proxy no arquivo de configuração dele. 
* Não é necessário fazer deploy de arquivo JAR. O Spring Boot já conta com o Tomcat embarcado.
* A aplicação carrega as configurações definidas em `application.yml` e depois as definições de `application-local.yml`. 
* Por padrão, ao gerar o package, é gerado um jar, mas podemos configurar o spring boot para gerar um war ao invés de jar. O Jar é um subset do war. 
* Projetos Maven definem toda a dependência de outras libs em um arquivo `pom.xml`. 
* O SpringBoot suporta hotrelad, assim, ao editar um arquivo .java, é realizada a compilaçao automaticamente. Leva um tempinho, mas funciona no netbeans pelo menos. Para isso, é utilizada a dependencia `spring-boot-devtools`.
* Há vários padrões de arquitetura que são adotados para camadas. Um deles é o seguinte: 
1. `@RestController` em controllers, 
1. `@Service` nas classes que acessam as classes de Repository.
1. `@Repository` nas classes JPA que acessam os dados. 
1. Utilizamos `@Data` nas classes de bean para que os getters/setters sejam criados automaticamente.  A classe Repository é responsável pela persistência, enquanto que a classe Service é responsável pelo business logic.  Há uma explicação detalhada [aqui](https://www.baeldung.com/spring-component-repository-service)

* Arquivos de properties costumam ficar dentro da pasta `resources` no projeto.  
* Segue um exemplo de controller em Spring Boot abaixo:
```java
@RestController
@RequestMapping("/greetings")
public class GreetingController {
	private static final String template = "Hello, %s!";
	private final AtomicLong counter = new AtomicLong();
	@GetMapping({"v1.0/greeting","v1.1/greeting"})
	public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
		return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }    
    @PostMapping("/setGreeting")
    public Boolean postMethodName(@RequestBody Greeting entity) {
        System.out.println("chegou greeting:"+entity.getContent());
        return true;
    }    
}
```

* Segue o exemplo do bean(model ou domain) Greeting abaixo:
* Caso utilize lombok, não é preciso escrever o getter/setter. Basta adicionar o annotation @Data na classe
```java
public class Greeting {
	private final long id;
	private final String content;
	public Greeting(long id, String content) {
		this.id = id;
		this.content = content;
	}
	public long getId() {
		return id;
	}
	public String getContent() {
		return content;
	}
}
```

* Por padrão, não há error handling no Spring Boot. Assim, se tentar acessar uma url que não tem resposta, vai aparecer um erro 404 browser. Para adicionar um error handling, adicione o controller abaixo: 
```java
@RestController
public class MyErrorController implements ErrorController {

    @RequestMapping("/error")
    @ResponseBody
    public String handleError(HttpServletRequest request, HttpServletResponse httpServletResponse) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        Exception exception = (Exception) request.getAttribute("javax.servlet.error.exception");
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        if (status instanceof Integer) {//alternativa ao statusCode acima. 
                System.out.println(status.toString());
        }
        return String.format("<html><body><h2>Error Page</h2><div>Status code: <b>%s</b></div>"
                + "<div>Exception Message: <b>%s</b></div><body></html>",
                statusCode, exception == null ? "N/A" : exception.getMessage());
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
}
```

# DIVISOES DE CAMADAS
* CONFIGURATION: ficam os arquivos de configuração do swagger, hazel, websecurity, etc. 
* DOMAIN: Ficam os entities. 
* CONTROLLERS: ficam as classes de exposição REST. As classes controllers acessam os services. 
* SERVICES: é onde fica a lógica. As classes services acessam as classes repository. 
* REPOSITORIES: é onde fica o acesso ao banco de dados. 

## DOMAIN
* exemplo de entity abaixo. Lembre-se que no java, é necessário ter o get e set
```java
public class User implements Serializable, Comparable<User> {
    @Id
    private String userName;
    public String getUserName() {
        return userName;
    }    
    @Override
    public int compareTo(User o) {
        return this.userName.compareTo(o.getUserName());
    }    
}
```

## CONTROLLER
* exemplo de controller abaixo: 
```java
@CrossOrigin("http://localhost:8081")
@RestController
@RequestMapping("/api")
@Api(value = "Private note microservice", description = "")
public class ApiController {
    private final Logger logger = LoggerFactory.getLogger(ApiController.class);
    private final UsersService usersService;

    @Autowired
    public ApiController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PutMapping(value = "/addnote")
    @ResponseBody
    @ApiOperation(value = "Add new note to cache for logged user.", response = String.class)
    public ResponseEntity writeDataToHazelcast(@RequestBody Map<String, NewNoteDTO> payload, Principal principal) {
        NewNoteDTO newNoteDto = payload.get("newNote");
        if(!newNoteDto.getName().isEmpty()) {
            usersService.updateUser(payload.get("newNote").getName(), payload.get("newNote").getText(), principal.getName());
            return ResponseEntity.ok("Data is stored.");
        }else {
            return ResponseEntity.badRequest().body("Name can't be empty! ");
        }
    }    
}
```


## SERVICE
* exemplo de service abaixo: 
```java
@Service
public class UsersService {
    private static final Logger log = LoggerFactory.getLogger(UsersService.class);
    private final UsersRepository usersRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public User findByUserName(String userName){
        User user;
        try {
            user = usersRepository.findByUserName(userName);
        }catch (Exception ex){
            throw new RuntimeException(ex);
        }
        return user;
    }    
```

## EXEMPLO DE MÉTODO DE CONTROLLER
* Segue um exemplo de método de controller mais completo abaixo
* O exemplo abaixo vem do arquivo C:\Users\teb8ca\Desktop\Arquivos\ProjetosBitbucket\aa.dxt-java\src\main\java\com\bosch\aa\dxt\module\dealer\locator\controller\DealerLocatorController.java
```java
	/**
	 * @param request       The pure request object.
	 * @param model         The model being later on passed to the template for rendering the html.
	 * @param requestEntity The dealer locator search request.
	 * @param stylingOption Whether we need to serve our own CSS file
	 * @param filters       Whether filters should be shown at all in the final rendered html.
	 * @param filterOptions The filter options to be shown in the html.
	 * @return The view name (template path and template name)
	 */
	@RequestMapping(value = "/{defaultMapCenter:.+}/{zoomFactor}/{zoomFactorDetail}/{userRadiusInKm}/"
			+ "{includeStores}/{minDealers}/{maxDealers}", method = GET)
	public String index(HttpServletRequest request, Model model, @Valid IndexRequestEntity requestEntity,
			@RequestParam(name = "styling", required = false) String stylingOption,
			@RequestParam(required = false) String filters,
			@RequestParam(required = false) LinkedHashMap<String, String> filterOptions) {

		final String language = requestEntity.getLanguage();
		final String country = requestEntity.getCountry();

		model.addAttribute("strLanguage", language);
		model.addAttribute("strCountry", country);
		model.addAttribute("strZoomFactor", requestEntity.getZoomFactor());
		model.addAttribute("strDetailZoomLevel", requestEntity.getZoomFactorDetail());
		model.addAttribute("strUserRadiusInKm", requestEntity.getUserRadiusInKm());
		model.addAttribute("strIncludeStores", requestEntity.getIncludeStores());
		model.addAttribute("strAddressTemplateFormat", dealerLocatorService.getAddressTemplateFormat(country));
		model.addAttribute("strMinDealers", requestEntity.getMinDealers());
		model.addAttribute("strMaxDealers", requestEntity.getMaxDealers());
		model.addAttribute("strRootDomain", dealerLocatorService.getRootDomain());
		model.addAttribute("isShowFilter", filters != null ? Arrays.asList("on", "true").contains(filters.toLowerCase()) : false);
		model.addAttribute("mapFilterOptions", dealerLocatorService.getFilterOptions(filterOptions));
		model.addAttribute("strLat", requestEntity.getDefaultMapCenter()[0]);
		model.addAttribute("strLng", requestEntity.getDefaultMapCenter()[1]);
		model.addAttribute("styling", dealerLocatorService.getStylingOptionEnabled(stylingOption));
		request.setAttribute(UrlLocaleResolver.URL_LOCALE_ATTRIBUTE_NAME, new Locale(language, country));
		return "dealer/locator/view";
	}
```

# Spring boot properties
* Propriedades de execução do spring boot podem ser definidas no arquivo application.properties ou no application.yml. Veja mais info sobre isso [aqui](https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-application-properties.html) e [aqui](https://www.baeldung.com/spring-yaml). Aparentemente, o ideal é só especificar o profile active que é utilizado em `application.properties` e carregar todo o resto a partir de `application.yml`. 
* Repare que o tutorial indica para criar uma classe java para manipulação do arquivo Yaml. Repare também que essa classe é preenchida automaticamente com as propriedades definidas no yaml pq é adicionado o annotation @EnableConfigurationProperties e @ConfigurationProperties. Uma recomendação é utilizar o annotation @Data do lombok na classe de gerenciamento do yaml. Dessa forma, não é necessário escrever os getters/setters java. 
Segue um exemplo de yaml e de classe de gerenciamento do yaml abaixo:
```yaml
spring:
    profiles: test
name: test-YAML
environment: test
servers: 
    - www.abc.test.com
    - www.xyz.test.com
datasource:
    driverClassName: com.mysql.jdbc.Driver
    url: jdbc:mysql://localhost:3306/teste
    username: root
    password: senha    
```
* Classe YMLConfig.java abaixo:
```java
@Configuration
@EnableConfigurationProperties
@ConfigurationProperties
@Data
public class YAMLConfig {
    private String name;
    private String environment;
    private List<String> servers = new ArrayList<String>();
    private EDatasource datasource = new EDatasource();//classe entity com as propriedades driverClassName, url, ... 
}
```
