# VUE
* É reactive. Quando o dado é alterado, o view é alterado automaticamente. 
* Utiliza Virtual DOM.  
* Vue é um progressive framework. Pode ser adicionado a um portal existente ou utilizar as funcionalidades adicionais como router para um Portal a partir do zero. 
* Um app Vue começa com: 
```javascript 
const app=new Vue({
     el: '#app',
     ...
})
```
* Também suporta typescript e JSX. 
* Todo arquivo Vue é dividido em 3 partes: template, script e style. O style é criado com scoped.
* Apesar de possível, o Vue não recomenda a separação em vários arquivos. 
* v-model é two-way binding. 

# INSTALAÇÃO
* Vue pode ser instalado via cdn ou via npm. 
* Via CDN, basta inserir a seguinte linha  no index.html de seu site: `<script src="https://cdn.jsdelivr.net/npm/vue"></script>`
* Via npm, basta executar as linhas a seguir: 
```
npm install --global vue-cli
vue init webpack my-project
npm run dev
```

# EXEMPLO DE TEMPLATE DE UM COMPONENTE VUE
```html 
<template>
 <div>
   <button @click="itemClicked()">Meu botao</button>
   <input v-model="meuNome">
   <ul>
    <li v-for="todo in todos">{{todo.text}}</li>
  </ul>
 </div>
</template>
```

# EXEMPLO DE SCRIPT DE UM COMPONENTE VUE
```javascript 
<script>
  export default {
    name: "MeuComponente",
    props:{
      sobrenome:String
    },
    data() {
      return {
        meuNome:'Bozo'
      }
    },
    methods: {
      itemClicked: function() {
        console.log('clicou no item')
      }
    }
  }
</script>
```

# EVENTOS
* `@click="itemClicked()` ->executa o método itemClicked

# PROPS
* Pode-se criar props que podem receber valor. Ex:
```javascript 
  export default {
    name: 'HelloWorld',
    props:{
      sobrenome:String
    },
```
* Feito isso, pode-se usar o componente HelloWord assim:<br> 
`<HelloWorld sobrenome="Tezine"></HelloWorld>`
* Só não é recomendável alterar o prop **sobrenome** acima pelo template do HelloWord. 