# Vue.js 

* Vue.js is a reactive, progressive javascript framework that uses Virtual DOM. Its website provides an extensive documentation in [English](https://vuejs.org/v2/guide/) and in [Portuguese](https://br.vuejs.org/v2/guide/). 

* Vue.js can be added into an existing website or create a new one from scratch with Router, Lazy loading and others. 

* It can be installed with npm, by unpkg or cdn by simply adding the line below:

  ```html
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  ```

* It's possible to write apps in javascript, typescript and also with jsx or [tsx](https://medium.com/@lachlanmiller_52885/how-i-do-vue-in-2019-typescript-and-tsx-6b648a4decd3).

* It has its own Command Line Interface, similar to Angular, which is available for download [here](https://cli.vuejs.org/).

* Although its possible to create pages and components using a different approach, usually Vue pages/components are divided into 3 parts (template, script and style). They are all written into the same `.vue` file. 

* **You can find a POC project [here](./Poc-Vue)**

* To create a Vue.js project with Typescript and [Vuetify](https://vuetifyjs.com/), execute the following commands:

```bash
npm install -g @vue/cli
vue create my-app //select typescript when prompted
vue add vuetify
```

* In case you want to remove eslint checking and messages, execute `npm remove @vue/cli-plugin-eslint`
* Styles can be scoped in Vue. Just add `<style scoped></style>`.
* Vue supports SCSS and others. Add in your .vue file: `<style scoped lang="scss">`

## Vue vs Angular

Vue is has many similarities with Angular, but here are some differences:

| Vue.js                                                       | Angular                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| We have Pages and Components. Each Page has to declare which components it uses. | A page or a component is the same in Angular. They are all components. |
| Code splitting is defined in the routes. Ex: {path: '/about', name: 'About', component: () => import(/* webpackChunkName: "about" */'../views/About.vue')}, //About page will be generated into a separated bundle | By default, all Pages/Components are in the same bundle/module, but you can split them into different modules |
| [v-if](https://vuejs.org/v2/guide/conditional.html)          | [*ngIf](https://angular.io/api/common/NgIf)                  |
| [v-model](https://vuejs.org/v2/guide/forms.html)             | [ [(ngModel)]](https://angular.io/api/forms/NgModel)         |
| [v-for](https://vuejs.org/v2/guide/list.html)                | [*ngFor](https://angular.io/api/common/NgForOf)              |
| @click or [v-on:click](https://vuejs.org/v2/guide/events.html) | [(click)](https://angular.io/guide/user-input)               |
| @Prop()                                                      | @Input                                                       |
| @Emit()                                                      | @Output                                                      |
| [<slot>](https://vuejs.org/v2/guide/components-slots.html)   | <ng-content>                                                 |

# Html Template

* Follow a simple html template written in Vuejs below:

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

# Vue Scripts

* Scripts can be written in Javascript or Typescript. Follow a javascript sample below:

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

* Follow the equivalent code in typescript:

```typescript
@Component
export default class MeuComponente extends Vue {
    @Prop() readonly sobrenome: string
    meuNome:string="Bozo";

    itemClicked() {
        console.log('clicou no item')
    }
}
```

# Lifecycle

* Follow the Vue.js lifecycle below. More info [here](https://www.digitalocean.com/community/tutorials/vuejs-component-lifecycle):

```
1) beforeCreate
2) created
3) beforeMount
4) mounted
5) beforeUpdate
6) updated
7) beforeDestroy
8) destroyed
```

* You can also override the `render` function like the example below:

```typescript
@Component
export default class HelloWorld extends Vue {
  mounted() {
    console.log('mounted')
  }

  render() {
    return <div>Hello World!</div>
  }
}
```

# Typescript 

* There are several ways to use typescript in a Vue project. You can use "Options API", "Composition API" and "Class API" approaches. They are demonstrated [here](https://typescript.nuxtjs.org/cookbook/components/#script)
* In this tutorial, I'll use Class API or "Class Components". More info about it [here](https://class-component.vuejs.org/guide/class-component.html)
* Class properties are equivalent as Vue data properties in javascript. 
* **Important: If a class property is initially undefined, it will not be reactive. To avoid this, you can set it to null or return it using data()**. 
* Vue Javascript computed properties can be declared as class property getters/setter. Ex:

```typescript
@Component
export default class HelloWorld extends Vue {
  firstName = 'John'
  lastName = 'Doe'

  // Declared as computed property getter
  get name() {
    return this.firstName + ' ' + this.lastName
  }
}  
```

# Binding

## Text binding

```html
<span>Message: {{ msg }}</span>
```

## Property binding

* More info [here](https://vuejs.org/v2/guide/syntax.html#v-bind-Shorthand)

```html
<!-- full syntax -->
<HelloWorld v-bind:e-user="eUser"/>

<!-- shorthand -->
<HelloWorld :e-user="eUser"/> 
```

* Here is how e-user property is declared in HelloWorld component: Note that `eUser` is accessed as `:e-user`

```typescript
@Prop({ type: Object, required: true }) readonly eUser!: EUser
```

## Class and Style binding

* More info [here](https://vuejs.org/v2/guide/class-and-style.html)
* Follow a sample on how to bind css classes below:

```vue
<div :class="classObject">
<script lang="ts">
    export default class HelloWorld extends Vue {
      classObject= {'myCssClass':true}
    }
</script>
<style scoped>
    .myCssClass{
        background-color: gray;
    }
</style>    
```

* Now with styles:

```vue
<div :style="styleObject">
<script lang="ts">
    export default class HelloWorld extends Vue {
		styleObject={backgroundColor:'blue'}
    }
</script>
```

# Router

* Vue has its own official router. More info about it [here](https://router.vuejs.org/)
* The router supports Nested route/view mapping, Route params, query, wildcards, transitions, ... 
* Follow a sample on how to change the current route below:

```typescript
async onBtnEnterClicked(){
	await this.$router.push('/users')
}
```

* Here a the route table sample:

```typescript
const routes: Array<RouteConfig> = [
    {path: '/', name: 'Login', component: Login},
    {path: '/users', name: 'Users', component: Users},
    {path: '/login', name: 'Login', component: Login},
    {path: '/about', name: 'About', component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')},
]
```

* In the example above, the comment `/* webpackChunkName: "about" */` indicates to webpack to do code-splitting and create a separate js chunk for the About page. 

# Watchers

* Vue has support for variable watchers. More info [here](https://vuejs.org/v2/guide/computed.html)
* Watchers are helpful when we need to call a function whenever the content of a variable changes. Follow a sample below:

```html
<template>
    <v-text-field
       class="col-md-12"
       label="E-mail"
       v-model="email"
    ></v-text-field>
</template>
<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
    @Component()
    export default class Login extends Vue {
        email='';

        @Watch('email',{immediate: true, deep: true})
        emailChanged(value: string, oldValue: string) {
            console.log('email changed:',value);
            this.email = value;
        }
    }
</script>
```

* In the example above, whenever the `email` variable content changes, the function `emailChanged` is fired. 

# DOM Events

* We can capture DOM events in Vue like this:

```html
<v-btn small color="primary" class="ml-auto mr-3" @click="onBtnEnterClicked" @mouseover="onMouseOverFired">Enter</v-btn>
```

* `@click` is the shorthand for the old `v-on:click` used in Vuejs.

# Component Events

* It's possible to create custom events in Vue.js similar to Angular. Follow a sample below:

```typescript
//HelloWorld.vue
@Emit()
emitClicked(n: number) {
    console.log('emit clicked. add optional code here');
}
//you can fire the event by calling this.emitClicked(1)
```

* The event above can be captured in the parent component/page like this:

```html
<HelloWorld
  @emit-clicked="onHelloWorldClicked">
</HelloWorld>
```

# SLOTS

* More info [here](https://vuejs.org/v2/guide/components-slots.html)
* Slots are a way to project content into a Vue Component. In brief, whatever you send between opening and closing tag of the component will be rendered where the <slot/> word is. Ex:

```html
<!--App.vue-->
<MyComponent> 
  world!
</MyComponent>

<!--MyComponent-->
<div> 
  Hello <slot/>!
</div>

<!--Output: Hello world! -->
```

# Mixins





