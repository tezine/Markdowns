# PYTHON
* É uma linguagem de alto nível. 
* Pode-se extender as funcionalidades com bibliotecas em C. 
* O nome veio de “Monty Python’s Flying Circus”. 
* Pode-se criar um aplicativo em Python ou simplesmente executar chamadas através do shell. 
* Por default, o python considera que os arquivos de fonte estão em UTF-8. 
* Para utilizar outro encoding, basta digitar o seguinte na primeira linha: `# -*- coding: cp-1252 -*-`
* Pode-se comentar uma linha com cerquilha assim: `#print(resultado)`
* Por padrão, os métodos e nomes de arquivo em Python são escritos totalmente em minúsculas. 
* Python suporta #region #endregion 
* O construtor de uma classe em python é definido em `def __init__(self):`
* O destrutor é definido em `def __del__(self):`
* Python tem `elif`
* Podemos criar uma lista a partir de um range. Ex: `list(range(4))` Isso gera: `[0, 1, 2, 3]` 
* Os módulos padrão ficam em `import sys` 
* Para identificar as funções que um módulo define, basta digitar no shell: `dir(sys)` 
* REPL é o Prompt de comando do Python. Mais info sobre a sigla [aqui](https://codewith.mu/en/tutorials/1.0/repl)

# SHELL
* Pode-se executar operações como: 2+2, etc. 

* String podem usar single ou double quote. 

* Python não é tipado por padrão. 

* Pode-se instanciar duas variaveis com valores distintos assim: `a,b=0,1`. Neste caso, a=0 e b=1. 

* Pode-se importar um arquivo mymodule.py assim: `import mymodule`

* Para sair do shell, é só digitar `quit()`

* Podemos até criar funções no shell do python assim:

  ```python
  >>> def testFunction():
  ...     print('ola')
  ...
  >>> testFunction()
  ola
  ```

  * Podemos criar funções em um arquivo myModule.py e carregar o arquivo no shell através do comando `import myModule`. Após isso, podemos executar qq função existente no arquivo. 

# FLOW CONTROLS 
## WHILE
```python
a, b = 0, 1
while b < 10:
    print(b)
```

## IF
```python
 if x < 0
     x=0;
     print('Negative changed to zero')
 elif x == 0:
     print('Zero')
 elif x == 1:
     print('Single')
 else:
     print('More')
```

## FOR
```python
 words = ['cat', 'window', 'defenestrate']
 for w in words:
     print(w, len(w))
```

## FOR com RANGE
```python
for i in range(5):
     print(i)
for x in range(1, 11):
    print(x)
```

## FOR com in
```python
def testfor2(self):
    for i in [0,2,4,6,8,10]:
        print('valor de i',i)
```

## VERIFICAÇÃO DE VALOR EM RANGE
```python
if ok in ('y', 'ye', 'yes'):
    print('encontrou')
```

# STRINGS  
* Pode-se quebrar uma string em várias linhas da seguinte maneira: 
```python
text = ('Put several strings within parentheses '
    'to have them joined together.')
```
* Para obter uma substring: 
```python
nome='bruno'
nome= nome[0:2] # 'br'
```

# LISTAS
``` python
cubes = [1, 8, 27, 65, 125]
cubes[0] ->resultado: 1
cubes[0]=12 ->substitui o primeiro item por 12. 
cubes.append(300) ->adiciona 300 no final da lista. 
cubes.pop() ->remove o 300
del cubes[0] -> remove o primeiro item da lista
len(cubes) ->retorna o tamanho da lista cubes
sortedList=sorted(basket) -> faz o sort na lista basket
```

# DICT
```python
def testDict(self):
    tel = {'jack': 4098, 'sape': 4139}
    tel['bruno']=981747880
    print(tel)
```

# TUPLE
* Python suporta tuple da seguinte maneira:
```python
t = 12345, 54321, 'hello!'
```

# MÓDULES E IMPORTS
* Cada arquivo .py é um **módulo**. 
* Pode-se importar uma classe chamada MyClass definida no arquivo myclass.py assim: 
1) from myclass import MyClass
1) from myclass import *
1) from myclass import MyClass as MinhaClasse 
* Pode-se executar o módulo assim: 
`python myclass.py <arguments>`
* O módulo myclass.py deve conter a seguinte instrução no final:
```python
if __name__ == "__main__":
 v=Myclass()
```

# PACKAGES
* Python permite dividir um módulo em submódulo. Para isso, basta criar um subdiretório. Ex:
```
sound/                          Top-level package
      __init__.py               Initialize the sound package
      formats/                  Subpackage for file format conversions
              __init__.py
              wavread.py
```

Assim, podemos importar um submódulo da seguinte maneira: `import sound.formats.wavread`

# CLASSES 
```python
class MinhaClasse(object:Any):
    i:int = 10

    def minhaFuncao(self):
        print('ola')

    def soma(self, a, b):
        return a + b


if __name__ == '__main__':
    minhaClasse = MinhaClasse()
    resultado=minhaClasse.soma(10,5)
    print(resultado)
```
* Para instanciar uma classe definida no arquivo **segundaclasse.py**:
```python
from segundaclasse import SegundaClasse
if __name__ == '__main__':
    segundaClasse=SegundaClasse()
    segundaClasse.testList()
```

# TRATAMENTO DE EXCEÇÃO
```
if i == 9:
    raise ValueError('valor invalido 9')
```


# MÉTODO ESTÁTICO
```python
@staticmethod
def soma(a, b):
    return a + b
```

# FUNCTION ANNOTATIONS
* São informações metadata opcionais. 

* Supondo que temos uma função chamada f, acessamos o annotations assim: `f.__annotations__`

* Outro exemplo: 
  ```python
  print(MinhaClasse.soma.__annotations__)
  ```



# FUNÇÕES INTERESSANTES
* `print()`
* `x = int(input("Please enter an integer: "))`
* `dir(modulo)` -> indica os __names__ que o módulo define. 

# PIP (Python Package Index)

* É utilizado para instalar outros pacotes no projeto.
* Podemos instalar um pacotes da seguinte maneira ` pip install simpleaudio `

# DOC STRING (Comentários)

* Python suporta doc string. Podemos documentar uma função da seguinte maneira:

  ```python
      def testDocString(self):
          """Demonstrate docstrings and does nothing really."""
          bla=4
  ```

  E aí podemos verificar o conteúdo assim: `print(Basics.testDocString.__doc__)`