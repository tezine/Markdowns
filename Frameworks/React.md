# REACTJS
* Site oficial [aqui](https://pt-br.reactjs.org/)
* Utiliza JSX. JSX é uma extensão de sintaxe ao Javascript.
* O React não obriga a utilização do JSX, mas torna dificil a não utilização do mesmo. 
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

# ELEMENTS
* Elements são os menors blocos de uma aplicação React. 
* Diferente de DOM Elements, React Elements são objetos. React DOM se responsabiliza por atualizar o DOM de acordo com as atualizações no React Element. 
* Para renderizar um React Element na árvore DOM, basta executar `ReactDOM.render()`. Ex: 
```jsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```
* Geralmente, aplicações React executam a função render apenas uma vez por componente.  
* React Elements são imutable. Uma vez criado o elemento, não é possível alterar os children ou os atributos. Assim, `props` é readonly sempre. 
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
* A maneira mais simples de criar um componente em React é através de uma função que aceita um parâmetro `props` e retorna um React Element. Ex: 
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
Segue o mesmo exemplo em ES6: 
```jsx
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
1) constructor
1) render()
1) componentDidMount()

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
```
<FormattedDate date={this.state.date} />
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

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

# HOOKS
* Site oficial [aqui](https://pt-br.reactjs.org/docs/hooks-intro.html)
* O Hooks permite utilizar o `state` sem escrever uma classe. 
