# HPCC (High Performance Computing Cluster)
* Mais de 15 anos de desenvolvimento da solução. Começaram em 1999. 
* [Link github](https://github.com/hpcc-systems)
* Tem dois tipos de cluster: THOR(processa todos os dados em todos arquivos), ROXIE(é usado para procurar um registro ou grupo de registros específicos)
* Processa BORPS( Billions of records per second).
* Data Factory é onde o THOR reside. É onde os dados são transformados em formatos mais úteis. Também é onde as queries são testadas e desenvolvidas. 
* Ao inserir dados, são tratados pelo THOR, depois são enviados ao ROXIE via parallel copy pipeline (Por volta de 1Gbyte por segundo) 
* HPCC pode ler vários formatos, incluindo arquivos convencionais, XML, CSV, JSON.... Até o Cassandra pode ser configurado como DALI Store. 
* "Idealmente" todos os nodes devem usar o mesmo hardware. 
* Os dados são "divididos" entre os nodes, diferente de um MariaDB Galera cluster onde os dados são "espelhados" entre os nodes. 
* Foi criado originalmente para criar índices (de dados) a partir de grandes quantidades de dados. Criado para ser um "massive paralell sorting machine". 
* O primeiro THOR criado tinha 400 nodes e reduziu o tempo de criação de index de 110 horas para 6~8 horas. 
* É um "Brute force" cluster. 
* Normalmente usam arquivos ISAM para armazenamento de dados. 
* Usam indexes comprimidos com LZW (7zip). 
* ETL: Extraction Transformation and Loading
* Licença Apache 2.0

É dividido em: 
* **Clusters** \
THOR \
HTHOR (ECL Agent) \
ROXIE
* **System Servers** \
Dali \
Sasha \
DFU Server \
ECL Server \
ECL Agent \
ESP Server \
ECL Repository \
LDAP \
Genesis 
* **Client Interfaces** \
ECL IDE \
ECL Watch \
Command line tools 

# Diferenças com relação ao Hadoop. 
* O Hadoop tem muitos add-ons desenvolvidos por terceiros. Não fazem parte do produto "Hadoop". 
* Por isso entre outros fatores, para colocar o hadoop em produção leva mais tempo. 
* O HPCC possui tudo integrado, incluindo virtual machines prontas. 
* O HPCC não requer que trabalhe com key/value, como faz o Hadoop.
* No Haddop um record pode se espalhar por mais de um node. No HPCC isso não acontece.

## Vantagens
* Suporta real time processing
* Todas as ferramentas necessárias estão integradas ao HPCC. 
* Para comparação, executaram um benchmark 25% mais rápido em um cluster com 4 máquinas com apenas 3 linhas ECL, enquanto que o original em Java 
utilizou 700 linhas de código java e 20 nodes. 

# THOR (Data Refinery Engine)
* Trabalha com grandes quantidades de dados. Não é incomum fazer um inner join entre um recordset de 10 bilhoes de registros e outro recordset com também 10 bilhoes de registros.
* É quem faz o processamento "pesado". 
* É capaz de fazer um sort de 1 terabyte em 1 minuto e 42 segundos. 
* É capaz de processar 6 trilhoes de registros por mes. 
* O maior database file usado até hoje tem 7 bilhoes de registros. 
* O primeiro THOR e também mencioado como tamanho típico tem por volta de 400 nodes, Petabytes de storage e Terabytes de memória. Cada node tendo 1/400 dos dados.
* O tamanho máximo usado hoje, segundo o vídeo é de 400 porque os hardwares de hoje são mais rápidos. Apesar disso, poderia chegar a 10.000 nodes. 
* Um THOR cluster faz um job por vez com grandes quantidades de dados, enquanto que o ROXIE é projetado para executar milhares de consultas em paralelo. 


# ROXIE (Rapid Data Delivery Engine)
* É capaz de processar 12 milhoes de queries por dia. 
* Executa milhares de consultas em paralelo.
* Consegue ter uma média de 2500 conexoes simultaneas de pico. 
* Um uso típico do ROXIE tem 100 nodes, algumas centenas de Terabytes de storage e algumas centenas de gigabytes de memória. 
* Uma consulta costuma ser retornada em menos de 1/4 segundo. 
* É projetado para missão crítica, com alta disponibilidade. 
* A proporção (acho) é de 1/4, ou seja, para 400 nodes THOR, precisamos de 100 nodes ROXIE. 
* Na média, cada node executa pelo menos 32~40 threads.
* Escalável como o THOR. 
* Share nothing. Facilmente substituível. 
* Pela especificação [aqui](https://wiki.hpccsystems.com/display/hpcc/System+Requirements), o Roxie precisa de discos mais rápidos

# ECL Agent
Também é conhecido como HTHOR. É um processo single node para executar queries ECL. \
O ECL Agent é utilizado quando:
1)  você sabe que a query é simples o suficiente para rodar em um single node. 
1)  Se o THOR não está disponível. Mesmo assim, a query deve ser simples para rodar num ECL Agent. 

A query é enviada ao ECL Agent automaticamente quando: 
1) o compilador verifica que a query é simples o suficiente para rodar em um ECL Agent. 

Queries que não são simples o suficiente são enviadas ao Cluster THOR.  \
Todas as queries non-ROXIE utilizam o ECL Agent primeiro, mesmo que sejam executadas no THOR. 

# HPCC Midleware
Age como gateway entre os clusters e o outside world. \
É composto por: 
1) System Data Store (Dali Server)
1) Archiving Server (Sasha Server)
1) Distributed File Utility (DFU Server)
1) ECL Compiler, executable code generator e job server (ECL Server)
1) Inter-component communication server (ESP Server)

## DALI (System Data Store)
Gerencia:
1) Workunit records (são jobs que são executados após os dados.)
1) Logical file directory (onde os dados estão)
1) Shared object services (bibliotecas e outros componentes)
* Também é usado para: 
1) Configurar o ambiente. 
1) Manter as filas de mensagens que dirigem o agendamento e execução de jobs. 
1) Também impoe as restrições de segurança LDAP.

## SASHA (Sasha Server)
* Trabalha junto com o DALI. 
* Trabalha independente dos outros componentes, assim permite reiniciar sem interferir com os jobs em execução.
* A função principal do SASHA é diminuir o stress no DALI server, quando possível. 
* SASHA também arquiva workunits (incluindo DFU workunits) e remove workunits e arquivos de recovery DFU cacheados.

## DFU Server (Distributed File Utility)
* O DFU Server controla as operações para mover dados de/para o THOR. 
* DFU Services estão disponíveis a partir de:
1) ECL IDE, usando bibliotecas de serviço no código ECL. 
1) ECL Watch.
1) DFU Command line interface (DFU Plus)

## ECL Server (ECL Compiler, executable code generator e job server)
* É o code generator e compilador que traduz código ECL. 
* Quando workunits são submetidos para execução no THOR, são convertidos para código executável pelo ECL Server primeiro. 
* Para o Roxie, isso é efetuado no momento do deploy. Assim, uma query é compilada apenas uma vez.
* O ECL Server também é usado quando o ECL IDE requisita uma verificação de sintaxe. 
* O ECL Server é responsável por iniciar o processo ECL Agent para executar workunits que são executados no THOR ou no próprio ECL Agent.

## ESP (Enterprise Services Platform)
* É um framework que permite que múltiplos serviços sejam "plugados" para fornecer funcionalidades à aplicações client através de
 múltiplos protocolos. 
 * Exemplos de serviços "plugados" ao ESP: 
 1) WS_Attribute - Fornece uma interface SOAP para consulta e manipulação do repositório ECL. 
 1) ECL Watch - Uma **interface web** para consulta gerenciamento e monitoração. Pode ser acessado via ECL IDE ou browser. 
 1) WsECL

 ### ECL Watch
 * Permite verificar informações sobre workunits ativas. 
 * Monitorar a atividade do cluster. 
 * Navegar por workunits previamente submetidas. 
 * Navegar por arquivos ECL e visualizar informações como: Record count, layouts, sample records, status dos system servers, ver arquivos de log...
 * Tem um portal web na porta 8010 onde temos acesso ao ECL Watch. Podemos enviar arquivos para a landing zone, efetuar spreads dos arquivos, abrir 
 o conteúdo do arquivo num editor Hex, etc. Aparentemente, cada arquivo contem apenas um tipo de record. 
 * Podemos verificar o ECL Watch de cada workunit através do ECL IDE. É mostrado todo o detalhamento do workunit.

 ### WsECL
 * Fornece uma **interface web** para submeter parâmetros ao ROXIE ou ECL Agent. 
 * A apresentação dos dados retornados é definida por meta-tags inseridas junto com a consulta ECL. 
 * É muito usada por desenvolvedores para testes de query. 

# Client Interfaces
* Fornecem um modo mais conveniente para acessar as funcionalidades fornecidas pelas páginas do ECL Watch e RoxieConfig.
* Funcionam se comunicando com o ESP Service via SOAP.
* Clientes podem criar suas próprias ferramentas client utilizando SOAP. 

## DFU Plus

## ECL Plus

## RoxieConfig command line

## ECL IDE
* É uma GUI completa para desenvolvedor disponível para Windows que fornece acesso ao repositório ECL e muito do ECL Watch. 
* Utiliza vários ESP Services via SOAP. 
* Também disponibiliza todas as funções built-in do ECL como ToUpperCase ( do strlib), etc. 
* Segue o fluxo das queries abaixo:
1) O programador escreve as queries em ECL e submete. 
1) O workunit é submetido ao Midleware via SOAP. 
1) DALI cria um workunit contendo a informação da query.
1) O ECL Server compila a query em binário nativo e envia o workunit e o binário para o ECL Agent. 
1) O ECL Agent executa a query, submete parte ao THOR. THOR e ECL Agent atualizam o workunit para refletir o resultado da query.
1) A interface client é notificada de que a workunit foi completada e que o resultado pode ser apresentado ao usuário. <br>
A comunicação entre a interface client e o resto do sistema é através de SOAP pelo ESP. Comunicação dentro do sistema é 
realizada "atualizando" o workunit e mensagens internas e queues. 


# ECL (Enterprise Control Language)
* Quick start [aqui](https://wiki.hpccsystems.com/display/hpcc/Quick+Start)
* É Declarative e case insensitive. Não é imperative
* As linhas nem sempre são executadas sequencialmente.
* Todo código ECL gera código C++ para depois ser compilado. 
* No ECL você define o que você quer, não como quer. 
* É extensível através de C++. 
* É de responsabilidade do compilador do ECL se preocupar como tamanho do cluster. 
* Diferente de Pig e Hive usados no Haddop, ECL fornece um paradigma completo de programação.
* Suporta Search Patterns semelhante ao QRegExp. Ex: PATTERN('[\' 0-9....
* Comentários com // ou /* */
* É uma linguagem não procedural
* Não existe assignment, nem variável. Ex: i=1;. 
* Há apenas definitions. Ex: i :=1; Não pode ser redefinido. 
* Action, ex: output(i+j+k); executa um job (workunit). Definition, ex: i :=1; não pode executar um job. 
* Mas é possível escrever a seguinte sintaxe: a := output(i+j+k);
* Action mais comum: OUTPUT
* Qualquer função que retorne um escalar pode agir como um Action
* := Definition Operator (read as “is defined as”) 
* Diferente de SQL, onde precisamos definir o schema antes de inserirmos dados, ECL é "schema less"

## Comparação com SQL
* Select de colunas específicas
```sql
select productCode, productName from products;
OUTPUT(products, {productCode, productName});
```

* Filtering
```sql
select * from products where productCode='S32_1374';
OUTPUT(products(productCode='S32_1374'));
```

* Sorting
```sql
select * from products order by productName;
OUTPUT(SORT(products, productName));
```

* Counting
```sql
select COUNT(*) from products where UPPER(productLine)='VINTAGE CARS';
OUTPUT(COUNT(products(Std.Str.ToUpperCase(productLine)='VINTAGE CARS')));
```

* Grouping
```sql 
select * from products group by productLine;//isso é um perigo no mysql (deixa super lento)
OUTPUT(GROUP(SORT(products, productLine),productLine));
```

* Crosstab
```sql
Select productLine, COUNT(*) from products group by productLine;
OUTPUT(
  TABLE(products,
  {
     productLine;
     productLineCount:= COUNT(GROUP);
  }, productLine)
);
```

## Basic Definition Types
**Boolean Definition** \
Pelo naming convention, a definição deve começar com `Is` Ex:
```
IsTrue := TRUE;  
IsFloridian := People.state = 'FL'; 
IsSeniorCitizen := People.Age >= 65;
```

**Value Definition** \
É um definition que resulta um único valor. Ex:  
```
One :=1 
FloridianCount := COUNT(People(IsFloridian));
```

**Recordset Definition** \
É um definition de um dataset ou recordset. Por convenção, o definition termina com o nome do base dataset (People abaixo). Ex: 
```
FloridaPeople :=People(IsFloridian); 
```

**Set Definition** \
Define um array de valores constantes. Todos os elementos devem ser do mesmo tipo e o definition deve começar com `Set`. Ex: 
```
SetSouthestStates :=['FL','GA','AL', 'SC'];
```            

## Functions
* Em ECL, Função é qualquer definition que recebe parâmetros. 
* Paramêtros podem conter default value.
* Se o tipo do parâmetro não for definido, o default é INTEGER. Ex: 
```
AddNums(INTEGER A, B=5) := A+B; \
NumResult := AddNums(5,20); //Resulta em 25 \
Numresult2 := AddNums(5); //Resulta 10 
```

## Definition Visibility (Scope)
**EXPORT** \
Cria um Definition disponível em todo lugar. É semelhante a `public` em C++

**SHARED** \
Cria um Definition disponível somente dentro do módulo. É semelhante a `protected` em C++

**LOCAL** \
Criaum Definition disponível até o próximo EXPORT ou SHARED encontrado no código. É semelhante a `private` em C++

Se o `EXPORT` Definition estiver em outro módulo, precisamos utilizar `IMPORT` para importar o módulo. Ex: 
```
IMPORT Companies;
FloridaCompanies := Companies.File_Company(state='FL');
```

## Bitwise Operators
Operam somente em integer data types. 
* AND     	`&` 
* OR          `|` 
* ExclusiveOR `^` 
* NOT         `BNOT` 
* Right Shift `>>` 
* Left Shift  `<<` 
* Divisão por zero resulta em 0. 

## Comparison Operators
* Equivalence     `=` 
* Not Equal       `<>` 
* Not Equal       `!=` 
* Less Than       `<` 
* Greater Than    `>` 
* Less Than o equal `<=` 
* Greater than or equal `>=` 
* Equivalence Comparison `<=>` . Retorna -1, 0 ou 1. 

## Logical Operators
* Boolean not     `NOT` 
* Boolean not     `~(tilde)` 
* And             `AND` 
* Or              `OR` 

## IN Operator
* É altamente otimizado. Deve-se usa-lo ao invés de OR. Ex: 
```
SetSouthestStates:=['FL','GA','AL', 'SC']; 
BOOLEAN IsSouthestState(STRING2 state) := state IN SetSouthestStates; 
```

## BETWEEN Operator
* Procura por um valor **entre** . Ex: 
```
IsOne2Ten(val):= val BETWEEN 1 AND 10;
```

## INTEGERS 
* Suportam **BIG_ENDIAN** e **LITTLE_ENDIAN** porque suportam Intel e ARM. 
* O tamanho default do integer é 8 bytes! <br>
* Por isso, utilizam-se outros tipos. 
```
UNSIGNED1 ctr=0 //0-255
INTEGER1 ictr=-100 //-128 até 127
INTEGER BigNum :=9233294302932730;
```
## REAL
* Tem por default 8 bytes!  
* Suporta ponto flutuante.  
* Há dois tipos (REAL4 e REAL8).  
* REAL4 tem até 7 dígitos significativos. 
* REAL8 tem até 15 dígitos significativos. 
```
REAL4 PI := 3.14159;
REAL8 TotalBudget := 153347820.75;
```

## DECIMAL 
* Suporta até 32 dígitos de precisão. 

## STRING[n]
* Not null terminated. 
* Space padded. 
* Utiliza ASCII. 
* Pode-se predeterminar o tamanho. Ex: `STRING1 Gender :='M';` 
* Ou a string terá um tamanho variável de acordo com o tamanho necessário. 

## VARSTRING[n]
* É Null terminated. 
* Se n é omitido, o tamanho é dinamicamente definido de acordo com o conteúdo. 
```
VARSTRING10 city := 'BOCA RATON';
```

## UNICODE[n] 
* UTF-16 encoded character string. 
* Space padded. 
* Se n é omitido, o tamanho é dinamicamente definido de acordo com o conteúdo. 
* VARUNICODE é a versão **null terminated**. 
```
UNICODE20 CompanyName := U' LEXISNEXIS';
```

## DATA[n]
* Usado para armazenar binário. 

## Indexing a Set
* Não tem função substring
```
SetNums :=[5,4,3,2,1];
LastNumInSet :=SetNums[5]; //retorna o quinto elemento (1)

MyString :='ABCDE';
MySubString1 := MyString[2..4]; //'BCD'
```

# Record Structure
* É também chamado de Layout. 
```
AttributeName := RECORD
    fields;
END;    
``` 
Exemplo: 
```
rec := RECORD
 string5 name;//tipo definido explicitamente
 ds_places.addr1;//tipo definido implicitamente
END; 
```

# Datasets e RecordSets. 
* Datasets podem ser criados a partir de arquivos de disco ou memória. 
* Recordsets são subsets de Datasets ou outros Recordsets. 

## JOINS
* Por default, um join é **inner join** no ecl 





