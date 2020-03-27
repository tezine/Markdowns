# TDD - Test Driven Development 
* Mais informações [aqui](https://pt.wikipedia.org/wiki/Test-driven_development)
* Normalmente, cria-se um projeto a parte somente para realizar testes. 
* Há muitos tipos de testes de software disponíveis. [Aqui](https://en.wikipedia.org/wiki/Software_testing) está uma lista de tipos possíveis.
* Dentre as técnicas disponíveis, a que mais me atrai é `Continuous Testing`: <br>
Continuous testing is the process of executing automated tests as part of the software delivery pipeline to obtain immediate feedback on the business risks associated with a software release candidate.


Desenvolvimento dirigido por testes requer dos desenvolvedores criar testes automatizados que definam requisitos em código antes de escrever o código da aplicação. Os testes contém asserções que podem ser verdadeiras ou falsas. Após as mesmas serem consideradas verdadeiras após sua execução, os testes confirmam o comportamento correto, permitindo os desenvolvedores evoluir e refatorar o código. Normalmente todos os testes são efetuados de forma continua de acordo com o desenvolvimento cada funcionalidade criada deve ser acompanhada de um teste bem descrito e projetado, então deve-se escolher a área do projeto ou requisitos da tarefa para melhor orientar o desenvolvimento destes testes.

Desenvolvedores normalmente usam Frameworks de testes, como xUnit, para criar e executar automaticamente uma série de casos de teste.

Em um estudo por George e Willians (2003), com programadores constatou-se que: (87,5%) acreditavam que TDD facilita uma melhor abordagem e compreensão dos requisitos; 95,8% acreditavam que o tempo de depuração foi reduzido; 78% acreditavam que a produtividade do time aumentou; 92% acreditavam que melhorou a qualidade do código; 79% acreditavam que o design ficou mais simples; e no total 71% acreditavam que a abordagem foi eficaz.

Quando utlizamos TDD, primeiro criamos o teste para depois escrevermos o código em sí. Esta é a diferenciação entre desenvolvimento dirigido a testes entre escrever testes de unidade depois do código desenvolvido. Ele torna o desenvolvedor focado nos requisitos antes do código, que é uma sutil porem importante diferença. Por isso, o TDD sugere o princípio "Fake it, till you make it".

Outra vantagem é que TDD quando usado apropriadamente, garante que todo o código desenvolvido seja coberto por um teste. Isto fornece a equipe de desenvolvimento, e ao usuários, subsequentemente, um grande nível de confiança ao código.

# Ciclo de Desenvolvimento
1. Adicione um teste
2. Execute todos os testes e veja se algum deles falha
3. Escrever código
4. Execute os testes automatizados e veja-os executarem com sucesso
5. Refatorar código
6. Repita tudo

# Limitações
Desenvolvimento dirigido com testes é difícil de usar em situações onde testes totalmente funcionais são requeridos para determinar o sucesso ou falha.Exemplos disso são interfaces de usuários, programas que trabalham com base de dados, e muitos outros que dependem de configurações específicas de rede. TDD encoraja os desenvolvedores a incluir o mínimo de código funcional em módulos e maximizar a lógica, que é extraída em código de teste, usando Fakes mocks para representar o mundo externo.

Os próprios testes se tornam parte da manutenção do projeto. 

Uma alternativa para testes com dados provenientes da rede é de criar testes que são acessados através de interfaces (dotnet). Assim, podemos utilizar uma interface que acessa dados mock e outra que acessa dados reais, para efetuarmos testes de integração.


# Unit Test
Unit testing refers to tests that verify the functionality of a specific section of code, usually at the function level. In an object-oriented environment, this is usually at the class level, and the minimal unit tests include the constructors and destructors