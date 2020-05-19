# CSS
* Cascade Style Sheet
* Podemos criar e utilizar styles de várias maneiras:
* Pode-se aplicar várias classes css separando por espaço. Ex: `<div class="box a"></div>`

## VIA CLASS 
```css
<div class='mystyle'></div>
.mystyle{
    background-color:blue
}
```
## VIA ID
* Element IDs should be unique within the entire document.
```css
<div id='myDiv'></div>
#myDiv{
    background-color:blue
}
```
## VIA TIPO DE ELEMENTO
```css
<div id="parent">
    <img src="image.png" alt="" />
</div>
#parent {
    line-height: 200px;
}
#parent img {
    vertical-align: middle;
}
```

## VIA ATTRIBUTE SELECTOR

```html
<div contenteditable="true"></div>
<style>
	[contenteditable] {
		padding: 0.5em;
	}
</style>
```



# ORDEM 

* A ordem é top, right, bottom, left. Ex:
`padding:10px 5px 15px 20px;`

# POSICIONAMENTO

## HORIZONTAL ALIGNMENT 

### HORIZONTAL ALIGN DIV
```css
.center {
    margin: auto; /*BASTA ISSO*/
    width: 50%;
    border: 3px solid green;
}
```

### HORIZONTAL ALIGN TEXT
```css
.center {
    text-align: center;
    border: 3px solid green;
}
```

## VERTICAL ALIGNMENT 

### VERTICAL ALIGN TEXT (UMA LINHA)
* Mais info sobre vertical align [aqui] (https://vanseodesign.com/css/vertical-centering/)
* vertical-align só serve para table-cell. 
* Para centralizar verticalmente um text, pode-se usar `line-height`.Ex:
```css
<div id="parent">
    <div style='line-height:200px'>Text here</div>
</div>
```

*O texto ficará centralizado no div acima. Esse método só é valido quando o texto ocupa apenas uma linha. Caso o texto faça wrap, esse método não funcionará. 

### VERTICAL ALIGN IMAGE
* Podemos utilizar  o line-height para realizar o vertical align de uma imagem conforme abaixo: 
```css
<div id="parent">
    <img src="image.png" alt="" />
</div>
#parent {
    line-height: 200px;
}
#parent img {
    vertical-align: middle;
}
```

### VERTICAL ALIGN COM TABLE-CELL
```css
<div id="parent">
    <div id="child">Content here</div>
</div>

#parent {display: table;}
#child {
    display: table-cell;
    vertical-align: middle;
}
```

### VERTICAL ALIGN COM NEGATIVE MARGIN
* Requer que vc saiba o height do elemento a ser centralizado. O child abaixo é centralizado horizontalmente e verticalmente. Ex:
```css
<div id="parent">
    <div id="child">Content here</div>
</div>

#parent {position: relative;}
#child {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 30%;
    width: 50%;
    margin: -15% 0 0 -25%;
}
```

### VERTICAL ALIGN COM ABSOLUTE POSITIONING E STRETCHING
```css
<div id="parent">
    <div id="child">Content here</div>
</div>
#parent {position: relative;}
#child {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 50%;
    height: 30%;
    margin: auto;
}
```

### VERTICAL ALIGN COM FLEXBOX
Basta isso para centralizar nos dois eixos:
```css
.parent {
  display: flex;
  height: 300px; /* Or whatever */
}

.child {
  width: 100px;  /* Or whatever */
  height: 100px; /* Or whatever */
  margin: auto;  /* Magic! */
}
```
ou 
```html 
    <div style="display: flex;width: 400px;height: 400px ;flex-direction: column;">
      <div style="flex-grow: 1;background-color: red"></div>
      <div style="flex-grow:1;background-color: blue">segundo</div>
      <div style="flex-grow:1;background-color: green"></div>
    </div>
```
* Segue outra maneira de fazer vertica-align com flexbox: 
```css
<div class="Aligner">
  <div class="Aligner-item Aligner-item--top">…</div>
  <div class="Aligner-item">…</div>
  <div class="Aligner-item Aligner-item--bottom">…</div>
</div>

.Aligner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.Aligner-item {
  max-width: 50%;
}

.Aligner-item--top {
  align-self: flex-start;
}

.Aligner-item--bottom {
  align-self: flex-end;
}
```
## BOTTOM ALIGNMENT
```html 
<div style="position: relative;width:300px;height:500px">
    <div style="position: absolute;bottom:0"></div>
</div>
```

# IMAGENS

* Para adicionar um background que ocupa toda a tela: 
```css
.slide1 {
  background-image:  url(../img/Onboarding1.png);
  background-size: cover;
}
```
* background-size: cover não faz shrink da imagem. Caso a imagem fique não caiba na tela de fundo, utilizar `background-size: contain`

# Horizontal Layout

* Podemos criar um horizontal layout de 2 maneiras:

  Utilizando Flex layout:

  ```jsx
  <div style={{display:"flex",flexDirection:"row",width:'500px'}}>
      <div style={{backgroundColor: 'green',height:'50px',flexGrow:1}}/>
      <div style={{backgroundColor:'blue',height:'50px',flexGrow:1}}/>
  </div>
  ```

* Via float:

  ```jsx
  <div style={{width:500}}>
      <div style={{float:'left',backgroundColor:'green',width:'50%',height:50}}/>
      <div style={{float:'right',backgroundColor:'blue',width:'50%',height:50}}/>
  </div>
  ```

# CLIQUES
* Hack para ampliar a área clicável de um div ou a: 
```css
.btn-search{
     position:relative;
}
.btn-search:after {
  content:'';
  position:absolute;
  top:-10px; bottom:-10px;
  left:-20px; right:-10px;
  /*background-color: green;*/
}
```

# HOVER
* Para alternar a cor de fundo ao realizar hover sobre o elemento: 
```css
.btn-search:hover {
  background-color: #EEEEEE;
}
```

# FLEXBOX
* Mais info [aqui](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* Flexbox permite criar layouts "flexíveis". 
* É ideal para criação de layouts na mesma linha (row) ou na mesma coluna (column). Para construção de grids, é recomendável utilizar o css grid layout indicado abaixo. 
* Para utilizar flex, basta especificar `display: flex` no div container.
* Lembre-se que para centralizar horizontalmente e verticalmente um item em um container flex, basta setar no item `margin:auto`

## CONTAINER
* `flex-direction: row | row-reverse | column | column-reverse;`. Indica a direção em que os itens são posicionados no container:
1) row (padrão): left to right 
1) row-reverse: right to left 
1) column: top to bottom
1) column-reverse: bottom to top

* Caso seja `flex-direction:row`, por padrão os itens dentro do container vão ocupar apenas uma linha. Você pode mudar isso através de: 
`flex-wrap: nowrap | wrap | wrap-reverse;`
* No caso de `flex-direction:row`, lembre-se que os itens vão ocupar a altura do container, caso a altura não seja especificada nos itens.
* No caso de `flex-direction:column`, os itens vão ocupar a largura do container caso o width não seja especificado nos itens.  
* `flex-flow: <‘flex-direction’> || <‘flex-wrap’>`. Usado caso queira especificar o `flex-direction` e `flex-wrap` de uma vez. 
* `justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;` indica o alinhamento dos itens no eixo principal. `flex-start` é o default. 
* `align-items`. Define o alinhamento dos itens no oposto do eixo principal (cross axis) 
* `align-content`: Usado para quando há mais de uma linha

## CHILDREN
* `order`: Por padrão, os itens são apresentados na ordem em que sao inseridos. O padrão é 0. Para apresentar em uma posição diferente, especifique um valor inteiro acima de 0 para cada item.
* `flex-grow` indica como o item expande (o remaining space apenas). Por padrão é 0 (não expande). Caso todos os itens utilizem `flex-grow:1`, ao expandir, todos expandirão e terão o mesmo tamanho. Caso apenas um item tenha flex-grow:2, ele utilizará 2x mais o remaining space que os outros itens.
* `flex-shrink` define como o item reduz seu tamanho, caso necessário. Por padrão é 1;
* `flex-basis` define o tamanho padrão do item no eixo principal (largura no caso de row) antes do remaning space ser distribuido. Valores válidos são: `20%, 5rem, auto`. Auto é o padrão e  indica para utilizar a largura (caso seja row) ou altura (caso seja column);
* `flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`.  Utilizado para  utilizar `flex-grow, flex-shrink e flex-basis` em apenas uma linha, basta utilizar a propriedade 
* `align-self: auto | flex-start | flex-end | center | baseline | stretch;`. Indica o alinhamento do item no container no OPOSTO do eixo principal (cross-axis) definido no `flex-direction` do container. Por exemplo, se o `flex-direction` do container for row e o `align-self=center` no item, o item será centralizado verticalmente no container.  

# CSS GRID
O Flexbox não é adequado para criar grids. Neste caso, é recomendável utilizar o CSS Grid Layout. Por exemplo, para criar um grid com 4 colunas, o grid pode ser escrito assim: 
```css
 <style>
    .container-box {
      display: grid;
      grid-template-columns: 50px 100px 150px 200px;
      grid-template-rows: 50px 100px 150px;
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      background-color: palegreen;
    }
  </style>

  <div class="container-box">
    <div style="background-color: blue">line1/col1</div>
    <div style="background-color: red">line1/col2</div>
    <div style="background-color:orchid">line1/col3</div>
    <div style="background-color: orange">line1/col4</div>
    <div style="background-color:peachpuff">line2/col1</div>
  </div>
```
* Repare que no exemplo acima a primeira coluna tem 50px de largura, a segunda tem 100px... 
* O tamanho das linhas também é definido. A primeira linha tem 50px de altura, a segunda 100px....
* Para setarmos o mesmo valor de `grid-column-gap` e `grid-row-gap`, podemos usar `grid-gap`. 
* No CSS Grid Layout, as colunas e linhas começam em 1. 
* Segue um outro exemplo abaixo onde especificamos explicitamente o tamanho de cada grid item: 
```css
<style>
    .container-box {
      display: grid;
      grid-template-columns: 50px 100px 150px 200px;
      grid-template-rows: 50px 100px 150px;
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      background-color: palegreen;
    }
    .box1 {/*ocupa a col 1,2,3 e row 1*/
      grid-column-start: 1;
      grid-row-start: 1;
      grid-column-end: 4;
      grid-row-end: 2;
      background-color: olive;
    }
    .box2{/*ocupa a col 4 e row 1*/
      grid-column-start: 4;
      grid-row-start: 1;
      grid-column-end: 5;
      grid-row-end: 2;
      background-color:mediumslateblue;
    }
    .box3{/*ocupa a col 1,2 e row 2,3*/
      grid-column-start: 1;
      grid-row-start: 2;
      grid-column-end: 3;
      grid-row-end: 4;
      background-color:orange;
    }
  </style>
</head>

<body style="margin: 0">
  <div class="container-box">
    <div class="box1">box1</div>
    <div class="box2">box2</div>
    <div class="box3">box3</div>
  </div>
</body>
```
* Podemos escrever o exemplo acima de maneira mais simples: 
```css
<style>
    .container-box {
      display: grid;
      grid-template-columns: 50px 100px 150px 200px;
      grid-template-rows: 50px 100px 150px;
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      background-color: palegreen;
    }
    .box1 {/*ocupa a col 1,2,3 e row 1*/
      grid-column: 1/4;
      grid-row: 1/2;
      background-color: olive;
    }
    .box2{/*ocupa a col 4 e row 1*/
      grid-column: 4/5;
      grid-row: 1/2;
      background-color:mediumslateblue;
    }
    .box3{/*ocupa a col 1,2 e row 2,3*/
      grid-column: 1/3;
      grid-row: 2/4;
      background-color:orange;
    }
  </style>
</head>

<body style="margin: 0">
  <div class="container-box">
    <div class="box1">box1</div>
    <div class="box2">box2</div>
    <div class="box3">box3</div>
  </div>
</body>
```
* Podemos escrever o exemplo acima de maneira mais simples ainda: 
```css
 <style>
    .container-box {
      display: grid;
      grid-template-columns: 50px 100px 150px 200px;
      grid-template-rows: 50px 100px 150px;
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      background-color: palegreen;
    }
    .box1 {
      grid-area: 1/1 / 2/4;/*row-start/col-start / row-end/col-end*/
      background-color: olive;
    }
    .box2{
      grid-area: 1/4 / 2/5;/*row-start(1)/col-start(4) / row-end(2)/col-end(5)*/
      background-color:mediumslateblue;
    }
    .box3{/*ocupa a col 1,2 e row 2,3*/
      grid-area: 2/1 / 4/3;
      background-color:orange;
    }
  </style>
</head>

<body style="margin: 0">
  <div class="container-box">
    <div class="box1">box1</div>
    <div class="box2">box2</div>
    <div class="box3">box3</div>
  </div>
</body>
```

# Query Selector

* Mais informações [aqui](https://www.w3schools.com/cssref/css_selectors.asp).

* Query selector é um método do Element. Ele permite encontrar o primeiro elemento, descendente do parent element que é invocado, em que encontra o css selector ou grupo de css selectors. Ex:

  ```javascript
  let firstHeading = document.querySelector('h1');//encontra o primeiro elemento h1 no document
  let heading2 = document.querySelectorAll('h2');//encontra todos os h2 no document
  let elWithIDMyID=document.querySelector('#MyID');//encontra o primeiro elemento com id MyID
  ```

| [.*class*](https://www.w3schools.com/cssref/sel_class.asp)   | .intro        | Selects all elements with class="intro"                      |
| ------------------------------------------------------------ | ------------- | ------------------------------------------------------------ |
| *.class1.class2*                                             | .name1.name2  | Selects all elements with both *name1* and *name2* set within its class attribute |
| *.class1 .class2*                                            | .name1 .name2 | Selects all elements with *name2* that is a descendant of an element with *name1* |
| [#*id*](https://www.w3schools.com/cssref/sel_id.asp)         | #firstname    | Selects the element with id="firstname"                      |
| [*](https://www.w3schools.com/cssref/sel_all.asp)            | *             | Selects all elements                                         |
| *[element](https://www.w3schools.com/cssref/sel_element.asp)* | p             | Selects all <p> elements                                     |
| *[element.class](https://www.w3schools.com/cssref/sel_element_class.asp)* | p.intro       | Selects all <p> elements with class="intro"                  |
| *[element,element](https://www.w3schools.com/cssref/sel_element_comma.asp)* | div, p        | Selects all <div> elements and all <p> elements              |

# MEDIA QUERIES