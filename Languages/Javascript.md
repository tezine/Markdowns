# Javascript
* Há um artigo muito legal sobre as perguntas mais frequentes [aqui](https://www.guru99.com/javascript-interview-questions-answers.html) - Ler antes de fazer testes. 
* Há também [esse](https://www.toptal.com/javascript/interview-questions) site
* Diferença entre window e document [aqui](http://eligeske.com/jquery/what-is-the-difference-between-document-and-window-objects-2/#targetText=WINDOW%20object%20and%20DOCUMENT%20object,THE%20SAME!!!!!&targetText=The%20document%20object%20is%20your,%2C%20URL%2C%20cookie%2C%20etc.)
* `null===null` retorna true
* `[]==[]` returna false
* `[]===[]` returna false também
* `typeof undefined == typeof NULL` retorna true. Isso porque `typeof NULL` retorna `undefined`, visto que não existe NULL. Já `typeof null`retorna object 
* Javascript sempre passa variáveis **primitivas** por valor, não por referência. Assim, alterar o valor dentro da funçao nao altera o valor passado.
* Arrays e objetos são passados por referência. Assim, ao alterar o valor, altera o objeto. 
* **Javascript is single threaded and synchronous**. Para contornar esse problema, atualmente é possível a criação de web workers. 
* Asynchronous code with Javascript is handled in the background by engines like V8. 
* Webpack is a module bundler primarily for JavaScript, but it can transform front-end assets like HTML, CSS, and images if the corresponding plugins are included. 
* Babel is mainly used to convert ECMAScript 2015+ (ES6+) code into a backwards compatible version of JavaScript that can be run by older JavaScript engines.
* Javascript data types: `number, string, boolean, undefined, object`.
* Incluimos um arquivo javascript num código html assim: `<script src="xxx.js">`
* Podemos incluir um arquivo javascript no html no `<head>` ou no `<body>`
* O arquivo javascript incluso não contém o tag `<script>`
* Podemos verificar o nome do browser do client assim: `navigator.appName`
* Há também a função `parseFloat` em javascript
* === is called as strict equality operator which returns true when the two operands are having the same value without any type conversion.
* Diferença entre == e === 
  * "==" checks only for equality in value whereas "===" is a stricter equality test and returns false if either the value or the type of the two variables are different.
* Podemos submeter um formulário em javascript assim: `document.form[0].submit();`
* Javascript suporta  automatic type conversion.
* Podemos setar um estilo de um elemento em javascript assim: `document.getElementById("myText").style.fontSize = "20";`
* Podemos detectar o sistema operacional do cliente usando `navigator.platform`
* Podemos verificar se um checkbox está "checado" assim: `document.getElementById('checkbox1').checked`
* DOM = Document Object Model 
* Numbers in JavaScript are all treated with floating point precision
* Podemos clonar um objeto da seguinte forma: `var objclone = Object.assign({},obj); `
* Veja sobre o this em javascript [aqui](https://www.w3schools.com/js/js_this.asp)
* Executar `reverse` em um array inverte o array, mas a referencia continua sendo para o próprio array. 


# Hoisting
Em JavaScript, funções e variáveis são hoisted (ou "levados ao topo"). Hoisting é um comportamento do JavaScript de mover declarações para o topo de um escopo (o escopo global ou da função em que se encontra).

Isso significa que você é capaz de usar uma função ou variável antes mesmo de tê-las declaradas, ou em outras palavras: uma função ou variável podem ser declaradas depois de já terem sido utilizadas.
EX:
```javascript 
foo = 2
var foo;
// é implicitamente entendido como:
var foo;
foo = 2;
```
exemplo com função
```javascript 
hoisted(); // logs "foo"
function hoisted() {
  console.log("foo");
}
```

# var e let

* Mais informações [aqui](https://www.geeksforgeeks.org/difference-between-var-and-let-in-javascript/)
* `var` is function scoped and `let` is block scoped
* Graças ao `hoisting`, variáveis declaradas com a palavra-chave `var` podem ser utilizadas mesmo antes de sua declaração.
* Por outro lado, as variáveis criadas com `let` só podem ser utilizadas após sua declaração, pois, apesar de serem elevadas, elas não são inicializadas. Se você tentar usar uma variável declarada com let antes de declara-la, vai ter um erro de execução do javascript indicando `error: Uncaught ReferenceError: Cannot access 'x' before initialization`. 
* A melhor explicação sobre hoisting de var é explicado no último exemplo [aqui](https://www.toptal.com/javascript/interview-questions)

# escape
* Javascript tem uma função chamada `escape` utilizado para transferir informação de um computador para outro. Ex:
```
escape("Hello? How are you!") 
resultado: 
Hello%3F%20How%20are%20you%21
```

# encodeURI
* Também há a função `encodeURI` para converter a url em hex coding. Ex:
```html 
<script>
	var uri="my test.asp?name=ståle&car=saab";
	document.write(encodeURI(uri)+ "<br>");
	document.write(decodeURI(uri));
</script>
```

# Para verificar o tipo de uma variavel: 
```javascript 
function isBoolean(arg) {
  return typeof arg === 'boolean';
}
```
* Para verificar objetos, utilizamos  `arg instanceof MinhaClasse`
* Um grande problema em verificar se é um objeto é que null é considerado um objeto em javascript. Assim typeof arg=='object' retorna true se passamos null. 

# Problema interessante
What would be the result of 3+2+"7"?
Since 3 and 2 are integers, they will be added numerically. And since 7 is a string, its concatenation will be done. So the result would be 57.

# Delete operator
The delete keyword is used to delete the property as well as its value.
```javascript 
var student= {age:20, batch:"ABC"};
delete student.age;
```

# Undefined
Undefined value means the
1. Variable used in the code doesn't exist
1. Variable is not assigned to any value
1. Property doesn't exist

# Diferença entre Alert Box e Confirmation box
* An alert box displays only one button which is the OK button.
* But a Confirmation box displays two buttons namely OK and cancel.

# Unshift operator
* Unshift method is like push method which works at the beginning of the array. This method is used to prepend one or more elements to the beginning of the array.


# Strict mode
* Faz parte desde ES5. 
* Mais informações sobre strict [aqui](https://www.w3schools.com/js/js_strict.asp)
* use strict is a way to voluntarily enforce stricter parsing and error handling on your JavaScript code at runtime. Code errors that would otherwise have been ignored or would have failed silently will now generate errors or throw exceptions. In general, it is a good practice.

Strict mode can be enabled by adding the string literal `"use strict"` above the file.Ex:
```javascript 
function myfunction() {
    "use strict";
    var v = "This is a strict mode function";
}
```
* Um detalhe interessante: podemos criar uma variavel global usando `b = 3;`, mesmo qdo definida dentro de uma função, mas quando habilitamos o strict mode, aparecerá um erro pq não tem o keyword `var`. 

# Closures
* closures {} definem um novo contexto léxico no javascript. Utilizando closure{}, a função inner tem acesso as variaveis da função outer. 
* closure is an inner function that has access to the variables in the outer (enclosing) function’s scope chain. The closure has access to variables in three scopes; specifically: 
1. variable in its own scope, 
1. variables in the enclosing function’s scope, and 
1. global variables.

# Append em Array
* Podemos adicionar um novo elemento de duas maneiras:
1. `arr[arr.length] = value;`
1. `arr.push(value);`

# Verificação das propriedades de um objeto
* Podemos verificar todas as propriedades de um objeto assim: 
```javascript 
for (var name in object){
	//statement or block to execute
}
```

Ou então assim:

```javascript
Object.keys(obj)
```

# Anonymous function

A function that is declared without any named identifier is known as an anonymous function. In general, an anonymous function is inaccessible after its declaration.

Anonymous function declaration -
```javascript 
var anon = function() {
	alert('I am anonymous');
};
anon();
```

# Self executing functions

In JavaScript, the functions wrapped with parenthesis are called “Immediately Invoked Function Expressions" or "Self Executing Functions.

The purpose of wrapping is to namespace and control the visibility of member functions. It wraps code inside a function scope and decrease clashing with other libraries. This is what we call Immediately Invoked Function Expression (IIFE) or Self Executing Anonymous Function.

Here’s the syntax:

```javascript 
(
  function(name){
    console.log('My name is',name);//prints My name is bruno
  }
)('bruno')
```

As you can see above, the following pair of parentheses converts the code inside the parentheses into an expression:

function(){...}
In addition, the next pair, i.e. the second pair of parentheses continues the operation. It calls the function, which resulted from the expression above.

# Semicolon

* semicolons are technically optional in JavaScript. Assim, o código abaixo retorna undefined pq o conteúdo retornado está na linha debaixo do return e não na mesma linha. O `{` deveria estar na mesma linha do return.
```javascript 
function foo2()
{
  return
  {
      bar: "hello"
  };
}
```

# isNaN
* Dado interessante: <br>
`console.log(typeof NaN === "number"); //logs true` <br>
`console.log(NaN === NaN);  // logs "false"`

# Inteiros
* Essas são maneiras de verificar se uma variável é um inteiro
1. `function isInteger(x) { return (x ^ 0) === x; } `
1. `function isInteger(x) { return Math.round(x) === x; }`

# Timeouts
* call `setTimeout()` with a time of 0 ms, the function you specify is **not** invoked right away. Instead, it is placed on a queue to be invoked “as soon as possible” after any currently pending event handlers finish running. 
* Interessante: 
```javascript 
(function() {
    console.log(1); 
    setTimeout(function(){console.log(2)}, 1000); 
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
})();
```
Isso retorna:
```
1
4
3
2
```

# Função para verificar se uma string é palíndrome:
```javascript 
function isPalindrome(str) {
  str = str.replace(/\W/g, '').toLowerCase();
  return (str == str.split('').reverse().join(''));
}
```

# Função com resultados iguais. 
* Para ter o mesmo resultado nas duas opções abaixo: 
```javascript 
console.log(sum(2,3));   // Outputs 5
console.log(sum(2)(3));  // Outputs 5
```
Devemos fazer o seguinte: 
```javascript 
function sum(x) {
  if (arguments.length == 2) {
    return arguments[0] + arguments[1];
  } else {
    return function(y) { return x + y; };
  }
}
```

# Exemplo interessante
```javascript 
var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl ();
```
Resultado: undefined. 
```
Neither 21, nor 20, the result is undefined

It’s because JavaScript initialization is not hoisted.

(Why doesn’t it show the global value of 21? The reason is that when the function is executed, it checks that there’s a local x variable present but doesn’t yet declare it, so it won’t look for global one.)
```

# Leitura de arquivos
* Podemos ler um arquivo da seguinte maneira usando Javascript Extensions:<br>
`fh = fopen(getScriptPath(), 0);`

# Event Bubling
* JavaScript allows DOM elements to be nested inside each other. In such a case, if the handler of the child is clicked, the handler of parent will also work as if it were clicked too.

# Diferença entre window.onload e onDocumentReady
O evento ready é disparado depois que o documento HTML foi carregado.
O onload só é disparado quando todo o conteúdo é carregado (incluindo imagens, vídeos, etc)

# Porque não devemos usar innerHTML pelo javascript
* innerHTML content is refreshed every time and thus is slower. There is no scope for validation in innerHTML and, therefore, it is easier to insert rouge code in the document and, thus, make the web page unstable.

# Arrays
* Podemos criar arrays somente nas formas abaixo:
```javascript 
var a=new Array;
var a=new Array(5);//cria um array com 5 elementos.
var a=Array(0,1,2);//é permitido no javascript
var a=new Array('a','b','c');
var a=[];
var a=['a','b','c'];
```
NÃO é permitido criar assim: `var a=new Array[];`

## slice

Retorna o subarray a partir da posição indicada. Ex: slice(2), indica para começar a partir do 3 elemento

```javascript
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2));//retorna Array ["camel", "duck", "elephant"]
```



## Criação de um array de 3 dimensões
`var myArray = [[[]]];`

# Garbage Collector
Garbage collector basically looks out for unreachable objects which are removed from the memory. There are two garbage collection algorithms that I would like to explain which are as follows:
1. Reference-counting garbage collection
1. Mark-and-sweep algorithm

# RxJS
* Reactive Extensions Library for JavaScript with observables

# Adição de elementos dinamicamente no DOM

```javascript
<script type="text/javascript"> 
	function addNode() { 
	    var element = document.createElement("p"); 
		var textNode = document.createTextNode("This is a new text node"); 
		element.appendChild(textNode); 
    	document.appendChild(element); 
	} 
</script>
```



# JAVASCRIPT ES6

* A partir dessa versão, javascript suporta classes, arrow functions, let, ... 

*  ... : Suporta os 3 pontos. Mais info [aqui](https://dmitripavlutin.com/how-three-dots-changed-javascript/  ).

## Arrow functions

```javascript
// hello() returns Hello World!
hello = () => {
  return "Hello World!";
}

//hello() returns Hello World!
hello = () => "Hello World!"; 

// hello('World') returns Hello World
hello = (val) => "Hello " + val; 

//se a função tiver somente um parâmetro, podemos escrever assim:
//hello('World') returns Hello World
hello = val => "Hello " + val; 
```

