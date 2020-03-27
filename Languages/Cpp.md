# C++
* Principais compiladores: GCC e CLANG. 
* char ocupa 1 byte
* signed int ocupa 2 bytes. 
* signed long ocupa 4 bytes. 
* Podemos usar o identificador `nullptr` para null
* Podemos converter tipos de objetos utilizando: 
1. Type casting. Ex: y = (int) x; 
1. Dynamic casting: Ex: pd = dynamic_cast<Derived*>(pba);
1. Static casting: Ex: Derived * b = static_cast<Derived*>(a);
1. Reinterpreted casting: Ex: B * b = reinterpret_cast<B*>(a);
* Podemos chamar um método da classe base na classe derivada assim:
`ClasseBase::metodo()`
* Variáveis criadas com pointeiros alocam memória heap dinamicamente durante o runtime.
* Variáveis sem pointeiros (ex: MyClass obj) ocupam stack e são verificadas na compilação.
* Exemplo de Array multidimensional: `int x[3][4] = {{0,1,2,3}, {4,5,6,7}, {8,9,10,11}};`
* Exemplo de define: `#define PI 3.14159`



## FORMATOS POSSÍVEIS DE DECLARAÇÃO DE VÁRIAVEL
```cpp
 int a=5;               // initial value: 5
  int b(3);              // initial value: 3
  int c{2};  //initial value 2
```  
 
## ADIÇÃO DE FINAL DE LINHA EM STRING 
```cpp
string mystring;
mystring = "This is the initial string content";
cout << mystring << endl;
```  

## IOSTREAM
* cout
```cpp
#include <iostream>
int main(){
  std::cout << "Hello World!";
}
```
* Ao invés de escrever `std::count` acima, podemos escrever `using namespace std;`

<hr/>

## CONST METHOD
É recomendável usar método `const` sempre que possível. O identificador const ao final do método indica que o método não pode modificar o objeto, ou seja, no caso abaixo, o método não pode alterar o valor da variavel value pq isso alteraria o objeto. 
```cpp
class Test { 
    int value; 
public: 
    Test(int v = 0) {value = v;}       
    // We get compiler error if we add a line like "value = 100;" in this function. 
    int getValue() const {return value;}   
}; 
```
<hr/>

## STL
* Standard Template Library 
* Seguem alguns exemplos de container classes que fazem parte da STL: 
1. vector
1. list
1. deque
1. arrays.
1. map.
1. multimap.

<hr/>

## SDL
* Simple DirectMedia Layer. 
* It is a cross-platform development library designed to provide low level access to audio, keyboard, mouse, joystick, and graphics hardware via OpenGL and Direct3D.It can be used to make animations and video games.

<hr/>

## TEMPLATES E GENERICS
* Mais info [aqui](https://www.geeksforgeeks.org/generics-in-c/)
* Generics is the idea to allow type (Integer, String, … etc and user-defined types) to be a parameter to methods. 
* Generics can be implemented in C++ using Templates.
* A principal vantagem de usar templates é evitar overloading de função. 
```cpp
template <typename T> 
T myMax(T x, T y) { 
   return (x > y)? x: y; 
} 
  
int main() { 
  cout << myMax<int>(3, 7) << endl;  // Call myMax for int 
  cout << myMax<double>(3.0, 7.0) << endl; // call myMax for double 
  cout << myMax<char>('g', 'e') << endl;   // call myMax for char   
  return 0; 
}
```

<hr/>

## DIFERENÇA ENTRE STRUTS E CLASSES
The only difference between a class and a struct in C++ is that **structs have default public members and bases and classes have default private members and bases**. Both classes and structs can have a mixture of public and private members, can use inheritance, and can have member functions.

<hr/>

## OpenMP
OpenMP é uma implementação de multithreading, um método de paralelização no qual o "master thread"(uma série de instruções executadas consecutivamente) forks ("bifurca") um específico número de threads escravos e uma tarefa é dividida entre eles. 
Mais informações [aqui](https://pt.wikipedia.org/wiki/OpenMP)

<hr/>

## Ordem de execução dos contrutores qdo temos herança.
Primeiro é executado o construtor da classe base, depois o construtor da classe child(sub). 
Exemplo de output:
```
Inside base class
Inside sub class
```
<hr/>

## Diferenças entre references e pointers:
* Mais info [aqui](https://www.geeksforgeeks.org/references-in-c/) e [aqui](https://www.geeksforgeeks.org/passing-by-pointer-vs-passing-by-reference-in-c/)
* References cannot be NULL. Pointers are often made NULL.
* References are usually preferred over pointers whenever we don’t need “reseating”.
* A pointer can be declared as void but a reference can never be void. Ex:
```cpp
int a = 10;
void* aa = &a;. //it is valid
void &ar = a; // it is not valid
```
<hr/>

## Virtual Function 
* Mais info [aqui](https://www.geeksforgeeks.org/virtual-function-cpp/)
* Podemos criar um método **pure virtual** adicionado =0 no final, ou seja, não contém implementação.Ex:
  `virtual void show() = 0;` 
* A virtual function is a member function which is declared within a base class and is re-defined(Overriden-Substituida) by a derived class. <br/>
**Important** <br/>
When you refer to a derived class object using a pointer or a reference to the base class, you can call a virtual function for that object and execute the derived class’s version of the function. <br/>
Ex: 
```cpp
class base { 
public: 
    virtual void print () { cout<< "print base class" <<endl; }   
    void show () { cout<< "show base class" <<endl; } 
}; 
  
class derived:public base { 
public: 
    void print () { cout<< "print derived class" <<endl; }   
    void show () { cout<< "show derived class" <<endl; } 
}; 
  
int main() { 
    base *bptr; 
    derived d; 
    bptr = &d;           
    bptr->print();        //virtual function, binded at runtime    
    bptr->show();  // Non-virtual function, binded at compile time 
} 
```
Output do código acima: 
```
print derived class
show base class
```
Lembre-se que mesmo não tendo especificado um método como virtual na classe base e recriando o mesmo método na classe derivada, ao executar o método na classe derivada, NÃO É EXECUTADO O MÉTODO DA CLASSE BASE. 

<hr/>

## Encapsulation em C++

```cpp
class Encapsulation {
    private: 
        // data hidden from outside world 
        int x; 
          
    public: 
        // function to set value of  
        // variable x 
        void set(int a) { x =a; }           
        // function to return value of 
        // variable x 
        int get() { return x; } 
}; 
```
<hr/>

## Inline Functions
The inline functions are a C++ enhancement feature to increase the execution time of a program. Functions can be instructed to compiler to make them inline so that compiler can replace those function definition wherever those are being called. Compiler replaces the definition of inline functions at compile time instead of referring function definition at runtime. <br/>
NOTE- This is just a suggestion to compiler to make the function inline, if function is big (in term of executable instruction etc) then, compiler can ignore the “inline” request and treat the function as normal function. Ex: 
```cpp
inline int add(int a, int b){
    return (a + b);
};
```    
<hr/>

## Inicialização de Data Members no construtor
```cpp
class Test { 
  private:     
    int y; 
    int x;     
  public: 
    Test() : x(10), y(x + 10) {} 
    void print(); 
}; 
```
<hr/>

## Tuple e Pair
* C++ já suporta retornar Tuples e Pairs de funções. Ex:
```cpp
tuple<int, int, char> foo(int n1, int n2) { 
    // Packing values to return a tuple 
    return make_tuple(n2, n1, 'a');              
} 
  
// A Method returns a pair of values using pair 
std::pair<int, int> foo1(int num1, int num2) { 
    // Packing two values to return a pair  
    return std::make_pair(num2, num1);             
} 
```
<hr/>


## Variável Volatile
Uma variável volatile indica ao compilador que a variável pode ser modificada sem o conhecimento do programa principal. Dessa forma, o compilador não pode prever com segurança se pode otimizar trechos de programa onde esta variável se encontra.


# C++ 15
C++ 15 trouxe as funcionalidades abaixo:
1. `auto` : type inference capability, which means that the compiler infers the type of a variable at the point of declaration. 
1. `nullptr`: ao invéz de escrever 0 para ponteiro nulos, utilizamos `nullptr`
## shared_ptr
std::shared_ptr é um ponteiro inteligente que mantém a posse compartilhada de um objeto através de um ponteiro. Vários objetos shared_ptr podem possuir o mesmo objeto; o objeto é destruído quando o último remanescente shared_ptr apontando para ele é destruído ou reiniciado