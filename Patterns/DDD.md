# DDD - Domain-driven design
* Tem um projeto de exemplo onde o DDD está aplicado [aqui](https://github.com/zkavtaskin/Domain-Driven-Design-Example)
* Mais informações sobre DDD no site da microsoft [aqui](https://docs.microsoft.com/pt-br/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/ddd-oriented-microservice)
* DTO - Data Transfer Objects 

## CQRS 
* CQRS - Command Query Responsibility Segregation
* Separar a responsabilidade de escrita e leitura de seus dados

![Exemplo](Images/ddd.png)


# Divisões

## UI Layer
The easiest to understand, this layer is the responsible of displaying information to the user, and accept new data. It could be implemented for web, desktop, or any presentation technology, present or future. For example, it could be a voice application, that interacts with the user via a phone. The acid test for our design is that a radical change in user interface should have minimal (or controled, at least) impact in the rest of the system.

## Application Layer
It’s in charge of coordinating the actions to be performed on the domain. There are no business rules or domain knowledge here. No business state resides in this layer. It delegates all domain actions to the domain. It could coordinate many actions (possibly in many domains). It could prepare the infrastructure to be ready to work with the domain for an specific action (for example, preparing transaction scopes).

## Domain Layer
In this layer resides the heart of software, according to Evans. Business rules and logic lives inside this layer. Business entity state and behavior is defined and used here. Communication with other systems, persistence details, are forwarded to the infrastruture layer. Evans discuss the patterns he uses in this layer, as Entities, Value Objects, Services, Repositories and Factories. We would explore the patterns and implementations in future posts.

## Infraestructure Layer
God and devil are in the details, and in the infrastructure layer. Its main responsability is the persistence of the business state, most frequently, using a relational database.