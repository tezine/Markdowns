# C# 
* Quando passamos uma lista como parâmetro para uma função, a lista é enviada como referência, assim, quando alteramos os dados da lista, alteramos a lista enviada. 
* Podemos chamar um método da classe base usando base.NomeFuncao();
* Podemos adicionar um ifdef em C# assim: `#if DEBUG ... #endif `

## Classe Abstrata
* Para criarmos um método `abstract`, a classe deve ser `abstract`. 
* A classe que herdar a classe abstract, deve implementar todos os métodos definidos como abstract. E quando implementar, deve utilizar o keyword `override`. 
* Mais info [aqui](https://docs.microsoft.com/pt-br/dotnet/csharp/language-reference/keywords/override)
* Ver explicação detalhada na tabela [aqui](https://www.geeksforgeeks.org/difference-between-abstract-class-and-interface-in-c-sharp/)
* Uma classe abstrata pode conter implementação de métodos não abstratos, enquanto que uma interface somente pode especificar quais os métodos ou propriedades (no caso de .NET) uma classe que implementa a interface deve definir. Entretanto nenhuma das duas pode ser usada para construir um objeto, para isso é necessário definir uma classe que derive da abstrata (mas que não seja abstrata) ou que implemente a interface.
* Uma classe abstrata em dotnet deve conter ao menos 1 método `abstract`.<br>
* Segue um exemplo de classe abstrata:
```c#
abstract class MaquinaDeLavar
{
   public MaquinaDeLavar()
   {
      // Codigo para iniciar o objeto.
   }

   abstract public void Lavar();
   abstract public void Enxaguar(int tamanhoCarga);
   abstract public long Secar(int velocidade);
}
```

# XUnit
* XUnit é melhor do que o NUnit por vários motivos. Veja [aqui](https://dev.to/hatsrumandcode/net-core-2-why-xunit-and-not-nunit-or-mstest--aei)
* The [Fact] attribute indicates a test method that is run by the test runner
* Para executar os testes, basta digitar `dotnet test` a partir do diretorio do projeto de testes. 
* Criei um projeto de Testes chamado BackendTest dentro do Saberlab
* Repare que é muito importante separar as classes com exposição REST das classes de acesso a dados como fiz no projeto SaberLab. Assim, o XUnit não acessa as chamadas REST. 
* Há um exemplo de teste XUnit [aqui](https://docs.microsoft.com/pt-br/dotnet/core/testing/unit-testing-with-dotnet-test)
Ex: 
```c#
[Fact]
public void IsPrime_InputIs1_ReturnFalse(){
    var result = _primeService.IsPrime(1);
    Assert.False(result, "1 should not be prime");
}
```        


# Modifiers

## override
An override method provides a new implementation of a member that is inherited from a base class. The method that is overridden by an override declaration is known as the overridden base method. The overridden base method must have the same signature as the override method.

## abstract
The abstract modifier indicates that the thing being modified has a missing or incomplete implementation. The abstract modifier can be used with classes, methods, properties, indexers, and events. Use the abstract modifier in a class declaration to indicate that a class is intended only to be a base class of other classes, not instantiated on its own. Members marked as abstract must be implemented by non-abstract classes that derive from the abstract class.

## const
You use the const keyword to declare a constant field or a constant local. Constant fields and locals aren't variables and may not be modified. Constants can be numbers, Boolean values, strings, or a null reference. 

## virtual
* Mais informações [aqui](https://docs.microsoft.com/pt-br/dotnet/csharp/language-reference/keywords/virtual)
* You cannot use the virtual modifier with the static, abstract, private, or override modifiers.
* By default, methods are non-virtual. You cannot override a non-virtual method.
* A virtual inherited property can be overridden in a derived class by including a property declaration that uses the override modifier.

## sealed
* Mais informações [aqui](https://docs.microsoft.com/pt-br/dotnet/csharp/language-reference/keywords/sealed)
* When applied to a class, the sealed modifier prevents other classes from inheriting from it. In the following example, class B inherits from class A, but no class can inherit from class B.
```c#
class A {}
sealed class B : A {}
```
* You can also use the sealed modifier on a method or property that overrides a virtual method or property in a base class. This enables you to allow classes to derive from your class and prevent them from overriding specific virtual methods or properties.
```c#
class X{
    protected virtual void F() { Console.WriteLine("X.F"); }
    protected virtual void F2() { Console.WriteLine("X.F2"); }
}

class Y : X{
    sealed protected override void F() { Console.WriteLine("Y.F"); }
    protected override void F2() { Console.WriteLine("Y.F2"); }
}

class Z : Y{
    // Attempting to override F causes compiler error CS0239.
    // protected override void F() { Console.WriteLine("Z.F"); }

    // Overriding F2 is allowed.
    protected override void F2() { Console.WriteLine("Z.F2"); }
}
```

# Parâmetros de métodos
Mais informações [aqui](https://docs.microsoft.com/pt-br/dotnet/csharp/language-reference/keywords/params)
```c#
 public static void UseParams(params int[] list){
        for (int i = 0; i < list.Length; i++){
            Console.Write(list[i] + " ");
        }
        Console.WriteLine();
    }
Podemos invocar assim:  UseParams(1, 2, 3, 4);    
```    
