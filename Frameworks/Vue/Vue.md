<!--toc generated automatically by running markdown-toc -i Vue.md-->

<!-- toc -->

- [Vue.js](#vuejs)
- [Vue vs Angular](#vue-vs-angular)
- [Html Template](#html-template)
- [Vue Scripts](#vue-scripts)
- [Lifecycle](#lifecycle)
- [Typescript](#typescript)
- [Binding](#binding)
  * [Text binding](#text-binding)
  * [Property binding](#property-binding)
  * [Class and Style binding](#class-and-style-binding)
- [Router](#router)
- [Watchers](#watchers)
- [Events](#events)
  * [DOM Events](#dom-events)
  * [Component Events](#component-events)
- [SLOTS](#slots)
- [Mixins](#mixins)
- [VueX](#vuex)
- [Nuxt](#nuxt)

<!-- tocstop -->

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
* Boostrap integration is easy with [BoostrapVue](https://bootstrap-vue.org/) project. 

# Vue vs Angular

Vue is has many similarities with Angular, but here are some differences:

| Vue.js                                                       | Angular                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| We have Pages and Components. Each Page has to declare which components it uses. | A page or a component is the same in Angular. They are all components. |
| Code splitting is defined in the routes. Ex: {path: '/about', name: 'About', component: () => import(/* webpackChunkName: "about" */'../views/About.vue')}, //About page will be generated into a separated bundle | By default, all Pages/Components are in the same bundle/module, but you can split them into different modules |
| [v-if](https://vuejs.org/v2/guide/conditional.html)          | [*ngIf](https://angular.io/api/common/NgIf)                  |
| [v-model](https://vuejs.org/v2/guide/forms.html)             | [ [(ngModel)]](https://angular.io/api/forms/NgModel)         |
| [v-for](https://vuejs.org/v2/guide/list.html)                | [*ngFor](https://angular.io/api/common/NgForOf)              |
| @click or [v-on:click](https://vuejs.org/v2/guide/events.html) | [(click)](https://angular.io/guide/user-input)               |
| @Prop()                                                      | [@Input()](https://angular.io/api/core/Input)                |
| @Emit()                                                      | [@Output()](https://angular.io/guide/inputs-outputs)         |
| [<slot>](https://vuejs.org/v2/guide/components-slots.html)   | <ng-content>                                                 |

**Please note that code refactoring is not so easy as it is with Angular. IDEs do not refactor appropriately when file/class changes by the time of this writing and most documentation and examples are written in pure javascript in Vue, while Angular is 100% typescript. **

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
        console.log('item clicked')
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
        console.log('item clicked')
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
* In this tutorial, I'll use Class API or "Class Components". More info about it [here](https://class-component.vuejs.org/guide/class-component.html) and [here](https://class-component.vuejs.org/)
* Class properties are equivalent as Vue data properties in javascript. 
* **Important: If a class property is initially undefined, it will not be reactive. To avoid this, you can set it to null or return it using data()**. 
* Vue Javascript computed properties can be declared as class property getters/setter. Ex:

```typescript
@Component
export default class HelloWorld extends Vue {
  firstName = 'Mafalda'
  lastName = 'Barbosa'

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

* There's also another approach on how to define properties in typescript [here](https://class-component.vuejs.org/guide/props-definition.html)
* Vue allows to bind content inline, instead of passing variables to properties. Ex:

```vue
<MyComponent :title="'Hello world'"/>  <!--Just surround the content with ''. It indicates you are passing the content inline, not from a variable. 
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

# Events

## DOM Events

* We can capture DOM events in Vue like this:

```html
<v-btn small color="primary" class="ml-auto mr-3" @click="onBtnEnterClicked" @mouseover="onMouseOverFired">Enter</v-btn>
```

* `@click` is the shorthand for the old `v-on:click` used in Vuejs.

## Component Events

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

* Slots are a way to project content into a Vue Component. In brief, whatever you send between opening and closing tag of the component will be rendered where the <slot/> word is. More info [here](https://vuejs.org/v2/guide/components-slots.html) 
* Example:

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

* "Mixins are a flexible way to distribute reusable functionalities for Vue components. A mixin object can contain any component options. When a component uses a mixin, all options in the mixin will be “mixed” into the component’s own options."
* You can think of a mixin as a "multiple inheritance" where options are merged when contain overlapping options. 
* Mixins are also supported by newer versions of Typescript. 
* The merging strategy is defined in [here](https://class-component.vuejs.org/guide/extend-and-mixins.html#mixins). 
* Follow a mixin sample below:

```typescript
@Component
export class HelloMixin extends Vue {
    hello = 'Hello'
}

@Component
export class WorldMixin extends Vue {
    world = 'World'
}

@Component
export default class Mixins  extends mixins(HelloMixin, WorldMixin) {
    result:string='';

    created () {
        this.result=this.hello + ' ' + this.world + '!';//-> Hello World!
    }
}
```

# VueX

[VueX](https://vuex.vuejs.org/) is a state management pattern for Vue.js applications. "It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. It also integrates with Vue's official [devtools extension](https://github.com/vuejs/vue-devtools) to provide advanced features such as zero-config time-travel debugging and state snapshot export / import."

There are a few concepts related to Vuex that we need to understand outlined below:

1. **Store**: It is immutable central container to hold application state. The only way to change state of store is by committing mutations.
2. **Mutations:** These are methods where we change the state of the store. We get state of store and payload - the object that we can pass from Vue components to store and perform mutations on state. Mutations are synchronous transactions. Mutations are committed using commit statement e.g. `store.commit('increment')`
3. **Actions:** Actions are used to commit mutations and can be asynchronous. Actions are also methods and receive context as parameter. Context has same methods/properties as store but context is actually not store. so, mutations are committed using` context.commit('increment')`. Actions are triggered from Vue components using `store.dispatch('increment')` where increment is name of action
4. **Modules:** To simplify large store, Vuex allows us to divide store into modules. Each module can contain its own state, mutations, actions and even nested module.

The Vue PoC provides a simple VueX sample. You can check the code and its execution [here](./PoC-Vue) and the tutorial explaining the details about it [here](https://medium.com/@RupaniChirag/vuex-with-typescript-b83a62aa48a8).

# Nuxt

* Nuxt.js is built on top of Vue and provides a standardized way to combine libraries, execute Server Side Rendering, SEO and speed optimization. 
* Nuxt.js has many cool features. For instance, it's possible to configure routes automatically without defining routes as mentioned prior  in this document, and it also does automatically code-splitting. :-) 

* More info about Nuxt using javascript [here](https://nuxtjs.org/) and in typescript [here](https://typescript.nuxtjs.org/)