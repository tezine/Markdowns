# DART 
* Pode-se brincar com o Dart [aqui](https://dartpad.dartlang.org/)
* variaveis final pode receber valor apenas uma vez. 
* Uma variável const recebe o valor em compile time. Toda variável const é implicitamente final. 
* Dart suporta var e pode-se criar usar tipo dinamico usando o keyword `dynamic`.
* Impressão no console é através de `print(....)`
* Pod-se sair da aplicação usando `assert(...)`
* Todo objeto é null por default no Dart. 
* Lista constante: `var constantList = const [1, 2, 3];`
* Escreve-se string mutiline assim:
```dart
var s1 = '''
You can create
multi-line strings like this one.
''';
```
* Cria-se um Map(objeto) assim:
```dart
var nobleGases = {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
```
* ou assim:
```dart
var nobleGases = new Map();
nobleGases[2] = 'helium';
nobleGases[10] = 'neon';
nobleGases[18] = 'argon';
```
* String em dart são em utf-16

## CASCADE 
* O Dart suporta cascade através de 2 pontos, diferente de 1 ponto do C#. Só não pode ser usado em funçòes que retornam um objeto real. 
ex:
```dart
void main() {
  querySelector('#sample_text_id')
    ..text = 'Click me!'
    ..onClick.listen(reverseText);
}
```

# Constructor 
* Podemos preencher as variáveis de uma classe em dart da seguinte maneira: 
```dart
class Point {

  // Final variables cannot be changed once they are assigned.
  // Create two instance variables.
  final num x, y;

  // A constructor, with syntactic sugar for setting instance variables.
  Point(this.x, this.y);

  // A named constructor with an initializer list.
  Point.origin()
      : x = 0,
        y = 0;

// A method.
  num distanceTo(Point other) {
    var dx = x - other.x;
    var dy = y - other.y;
    return math.sqrt(dx * dx + dy * dy);
  }

  // Example of Operator Overloading
  Point operator +(Point other) => new Point(x + other.x, y + other.y);
}

// All Dart programs start with main().
void main() {
  // Instantiate point objects.
  var p1 = new Point(10, 10);
  var p2 = new Point.origin();
  var distance = p1.distanceTo(p2);
  print(distance);
}        
```        

# Full snapshots
* The Dart core libraries can be compiled into a snapshot file which allows fast loading of the libraries. Most standard distributions of the main Dart VM have a prebuilt snapshot for the core libraries which is loaded at runtime.  

# Linq
* Dart suporta uma "espécie" de linq. Por exemplo: 
```dart
var collection = [0, 1, 2];
candidates
    .where((c) => c.yearsExperience >= 5)
    .forEach((c) => c.interview());
```

# EXCEPTIONS
Pode-se emitir um exception assim: <br>
```dart
throw new FormatException('Expected at least 1 section');
```
ou 
```dart
throw 'Out of llamas!';
```

## HANDLING:
```dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  // A specific exception
  buyMoreLlamas();
} on Exception catch (e) {
  // Anything else that is an exception
  print('Unknown exception: $e');
} catch (e) {
  // No specified type, handles all
  print('Something really unknown: $e');
}
```

# FAT ARROW
Dart suporta fat arrow assim como typescript e c#. Ex:
```dart
void distanceTo(Point other) => throw new UnimplementedError();
```

# STREAMS
* Há um bom documento sobre `Streams`, `StreamController`, entre outros [aqui](https://medium.com/flutter-community/reactive-programming-streams-bloc-6f0d2bd2d248)
* `Stream` é como um "tubo". Você coloca algo de um lado para sair do outro. 
* `BehaviorSubject` é a implementação do `StreamController` criada pelo RxDart. 

## BehaviorSubject<T>
É um tipo especial de `StreamController` que captura o **ÚLTIMO** item adicionado ao controller. Mais informações sobre a classe BehaviourSubject [aqui](https://pub.dartlang.org/documentation/rxdart/latest/rx/BehaviorSubject-class.html)<br><br>
Exemplo:
```dart
final subject = new BehaviorSubject<int>();

subject.add(1);
subject.add(2);
subject.add(3);

subject.stream.listen(print); // prints 3
subject.stream.listen(print); // prints 3
subject.stream.listen(print); // prints 3
```
Exemplo com seedValue:
```dart
final subject = new BehaviorSubject<int>(seedValue: 1);

subject.stream.listen(print); // prints 1
subject.stream.listen(print); // prints 1
subject.stream.listen(print); // prints 1
```
Podemos verificar o último valor emitido pelo `BehaviorSubject` assim: `subject.value`. Mas há um detalhe: Quando fazemos o hot reload do flutter, é executada a função **build** novamente. Assim, não podemos criar o bloc dentro do build, porque será recriado, ou seja, `subject.value`retornará nulo. Para que retorne algo, precisamos digitar alguma coisa no controle que utiliza o `BehaviorSubject` ou simplesmente instanciar o bloc em outro lugar. 