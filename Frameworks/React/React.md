# REACTJS
* Site oficial [aqui](https://pt-br.reactjs.org/)
* Utiliza JSX. JSX é uma extensão de sintaxe ao Javascript.
* React utiliza Virtual DOM . It follows **uni-directional data flow** or data binding.
* Using React, writing UI test cases become extremely easy
* O React não obriga a utilização do JSX, mas torna dificil a não utilização do mesmo. JSX is a shorthand for JavaScript XML. Browsers can only read JavaScript objects but JSX in not a regular JavaScript object. Thus to enable a browser to read JSX, first, we need to transform JSX file into a JavaScript object using JSX transformers like Babel and then pass it to the browser.
* Para inserir um código Javascript no JSX, basta adicionar entre `{} `
* Depois da compilação, o JSX é transformado em Javascript. 
* Como o JSX está mais próximo de Javascript do que do HTML em si, utiliza-se nomenclatura camelCase. Por exemplo, `class` é `className` em JSX, `tabindex` é `tabIndex` em JSX. 
* Pode-se adicionar o código JSX direto ou dentro de `()`. 
Exemplo: 
```jsx 
const element = <img src={user.avatarUrl} />;
//ou 
const element = (
    <img src={user.avatarUrl} />;
)
```

# Criação de projeto

* Para criar um projeto React, baixe a versão mais atualizada do NPM e Yarn e execute:

  ```bash
  yarn create react-app my-app
  cd my-app
  yarn start
  ```

* Para desabilitar os warnings de lint, basta desabilitar o ESLint no IntelliJ. 

* Segue um exemplo de arquivo App.jsx abaixo:

  ```jsx
  import React from 'react';
  import './App.scss';
  import {Home} from "./pages/Home";
  import ReactDOM from 'react-dom';
  
  export class App extends React.Component{
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
          <Home/>
      );
    }
  }
  
  export default App;
  ReactDOM.render(<App />, document.getElementById('root'));
  ```

* Para gerar o build do projeto, basta executar:

  ```bash
  yarn build
  ```

* A maneira mais fácil de utilizar o React ou adiciona-lo em outro projeto é através deste exemplo de [index.html](index.html). Repare que ele conta com um `babel transformer in browser`

* Para facilitar a depuração de uma aplicação React, instale o React DevTools disponível [aqui](https://reactjs.org/blog/2015/09/02/new-react-developer-tools.html#installation).

# Styles

O React suporta inline style assim:

```jsx
<div style={{width:'100%'}}>
```

Também podemos fazer assim: 

```jsx
const divStyle = {
    height: '50px',
    backgroundColor: 'lightblue',
    width: '100%'
};

class ToolBar extends Component {
    render() {
        return (
            <div style={divStyle}>
            </div>
        );
    }
}
```

E também podemos instalar o [Styled Components](https://github.com/styled-components/styled-components) e fazer assim:

```jsx
import React, {Component} from 'react';
import styled from "styled-components";

const Paragraph = styled.p`
  font-size: 15px;
  text-align: center;
`;

class VStyleSample extends Component {
    render() {
        return (
            <Paragraph>hello world!</Paragraph>
        );
    }
}
```

Para instalar o Styled Components, execute:

```bash
yarn add styled-components
yarn add @types/styled-components --dev //no caso se usar typescript
```

## SaSS

Por padrão, o projeto não vem com suporte a SaSS. Para utiliza-lo no projeto, siga os passos abaixo:

1. Executar `yarn add node-sass`
2. Criar um arquivo terminando com `module.scss` e importa-lo no componente, conforme abaixo:

`Home.module.scss` file below: 

```scss
@import '../styles/shared';
$primaryColor:red

.corpo{
  background-color: gray;
}

.myParagraph{
  color:$primaryColor;
  font-size: 20px;
  margin-left: 50px;
}

.myDiv{
  width: 400px;
  height: 400px;
  background-color: #61dafb;
}
```
`Home.jsx` below:

```jsx
import React, {Component} from 'react';
import styles from './Home.module.scss'

export class Home extends React.Component {
    render() {
        return (
            <div className={styles.corpo}>
                <p className={styles.myParagraph}>
                    {this.state.name} ok
                </p>
                <div className={styles.myDiv}></div>
            </div>
        );
    }
}
```


# Virtual DOM vs Real DOM

## Real DOM

1. It updates slow.
2. Can directly update HTML.
3. Creates a new DOM if element updates.
4. DOM manipulation is very expensive.
5. Too much of memory wastage.

## Virtual DOM

* A virtual DOM is a lightweight JavaScript object which originally is just the copy of the real DOM. It is a node tree that lists the elements, their attributes and content as Objects and their properties

1. It updates faster.
2. Can’t directly update HTML.
3. Updates the JSX if element updates.
4. DOM manipulation is very easy.
5. No memory wastage.

# Limitações do React

1. React is just a library, not a full-blown framework.
2. Its library is very large and takes time to understand
3. Coding gets complex as it uses inline templating and JSX

# ELEMENTS

* Elements são os menors blocos de uma aplicação React. 
* Diferente de DOM Elements, React Elements são objetos. React DOM se responsabiliza por atualizar o DOM de acordo com as atualizações no React Element. 
* Para renderizar um React Element na árvore DOM, basta executar `ReactDOM.render()`. Ex: 
```jsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```
* Geralmente, aplicações React executam a função render apenas uma vez por componente.  
* React Elements são imutable. Uma vez criado o elemento, não é possível alterar os children ou os atributos. **Assim, `props` é readonly sempre**. 
* Toda aplicação React tem apenas um `root element`. Assim, não podemos retornar vários React Elements no render do App.js. 

# REACT ATUALIZA SOMENTE O NECESSÁRIO
No exemplo abaixo, a função  tick é executada a cada 1 segundo. 
O React DOM compara o elemento e seus children com o que foi renderizado anteriormente. Assim, no caso abaixo, é atualizado somente a data no DOM Tree. Todo o resto não é alterado, mesmo executando o render várias vezes!  
```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```

# COMPONENTS
* Há dois tipos de Components em React: Function Components e Class Components. 
* A maneira mais simples de criar um componente em React é através de uma função que aceita um parâmetro `props` e retorna um React Element. Ex: 
```jsx
//Function component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
Segue o mesmo exemplo em ES6: 
```jsx
//Class component
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
* O nome de um componente deve sempre começar com maiúscula. 
* É muito importante liberar os resources na destruição do componente, dentro da função `componentWillUnmount()`.
* O ReactDOM é responsável por "abrir" o conteúdo de todos os Componentes antes de serem inseridos no DOM Tree. Por exemplo, caso tenhamos um Componente MeuComponente que tem apenas \<h1>\</h1>, o ReactDOM render, substitui o MeuComponente por \<h1>\</h1> para ser inserido no DOM tree.  
* O lifecycle de funções de um componente React é o seguinte: 
  1. constructor
  2. render()
  3. componentDidMount()
  4. componentDidUpdate()
  5. componentWillUmount()

## STATE
* States estão disponíveis apenas para classes. 
* Como `props` são readonly, as mudanças de valor são obtidas através da utilização de `states`. 
* O raciocinio é o seguinte: Se você não usa a variável além da função render, deve usar como state. 
* O ideal é definir o state no constructor da classe. Ex:
```jsx
constructor(props) {
    super(props);
    this.state = {date: new Date()};
}
```
* NUNCA modificar o state diretamente. Sempre via setState. Assim, especifica-se o valor inicial do state no constructor e caso seja necessário alterar o valor em outro lugar, deve-se usar a função setState. Ex: `this.setState({comment: 'Hello'});`
* IMPORTANTE: O React pode executar vários setStates de uma única vez para aprimorar a performance. Assim, como os valores de state e props são atualizados de forma assíncrona, deve-se fazer o seguinte quando alterar o state dependendo do conteúdo de outro state e/ou props: 
```jsx
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```
* Pode-se passar um state como sendo prop de um child. Quando o valor do state é alterado, é alterado o valor do prop no child. Ex: 
```jsx
<FormattedDate date={this.state.date} />
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

# React vs Angular

|                   | React                  | Angular               |
| ----------------- | ---------------------- | --------------------- |
| *1. ARCHITECTURE* | Only the View of MVC   | Complete MVC          |
| *2. RENDERING*    | Server-side rendering  | Client-side rendering |
| *3. DOM*          | Uses virtual DOM       | Uses real DOM         |
| *4. DATA BINDING* | One-way data binding   | Two-way data binding  |
| *5. DEBUGGING*    | Compile time debugging | Runtime debugging     |
| *6. AUTHOR*       | Facebook               | Google                |

# EVENTS

* Cria-se eventos no react usando nomenclatura camelCase (início em minúscula). Ex: 
```jsx
<button onClick={()=>this.btnClicked()}>
    Activate Lasers
</button>
```
* No React, não é possível retornar false para desconsiderar o comportamento padrão. Por exemplo, para desabilitar o comportamento padrão  do código html abaixo de abrir o link em outra página: 
```jsx
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```
deve-se escrever assim: 
```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault(); <-----------------inserir essa linha!
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

# Lifecycle methods

Há outros métodos de lifecycle no React, mas estes abaixo são os principais:

## render()

É o único método obrigatório de um componente React. Renderiza o componente na tela e é chamado tanto no mouting quanto no updading, ou seja, ele é chamado toda vez que uma atualização acontecer. O render retorna um único elemento que é a representação do DOM nativo.  Nota: Não é permitido executar setState() dentro do render.

## componentDidMount()

É executado assim que o componente estiver pronto, mounted and ready. Este é o ponto ideal para executar Rest API calls. Aqui é permitido executar setState().

## componentDidUpdate()

É executado assim que um update acontecer. É permitido executar o setState aqui, mas é bom verificar por pré condições para não entrar em loop infinito. Veja o exemplo abaixo:

```jsx
componentDidUpdate(prevProps) {
 //Typical usage, don't forget to compare the props
 if (this.props.userName !== prevProps.userName) {
   this.fetchData(this.props.userName);
 }
}
```

## componentWillUmount()

É executado logo antes do componente ser unmounted e destroyed. Todas as ações de cleanup devem ser executadas aqui. 

# Conditional rendering e loops

* Podemos criar loops como `for` em React utilizando ES6 map: 

  ```jsx
  const names = ['James', 'Paul', 'John', 'George', 'Ringo'];
  
  function App() {
    return (
      <ul>
        {names.map((name,index) => (
          <li key={index}>
            {name}
          </li>
        ))}
      </ul>
    );
  }
  ```

# Typescript

* Podemos adicionar suporte a typescript a um projeto React existente. Para isso, basta executar o comando: 

  ```bash
  yarn add typescript @types/node @types/react @types/react-dom @types/jest
  ```

* Após isso, basta criar os componentes com arquivos com extensão .tsx. O React automaticamente vai gerar o arquivo tsconfig.json. 

* Para criar um projeto a partir do zero já com suporte a typescript, digite: 

  ```bash
  yarn create react-app my-app --typescript
  ```

* Agora podemos criar componentes .tsx como abaixo:

  ```tsx
  interface IProps {
      name?:string;
  }
  interface IState {
      age?: string;
  }
  
  export class VHome extends React.Component<IProps, IState> {
      constructor(props:IProps) {
          super(props);
          this.state = {
              age: '41'
          };
      }
  ```

# Next.js 

O [Next.js](https://nextjs.org/) é utilizado para Server-side rendering. Ele também faz automatic code splitting. Há um documento sobre Next.js [aqui](../Nextjs/Nextjs.md).

# HOOKS

* Site oficial [aqui](https://pt-br.reactjs.org/docs/hooks-intro.html)
* O Hooks permite utilizar o `state` sem escrever uma classe. 
