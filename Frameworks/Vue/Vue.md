# Vue.js

* You can find a POC project [here](./Poc-Vue)
* To create a Vue.js project with Typescript and Vuetify, execute the following commands:

```bash
npm install -g @vue/cli
vue create my-app //select typescript when prompted
vue add vuetify
```

* In case you want to remove eslint checking, execute `npm remove @vue/cli-plugin-eslint`

## Vue vs Angular

Vue is has many similarities with Angular, but here are some differences:

| Vue.js                                                       | Angular                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| We have Pages and Components. Each Page has to declare which components it uses. | A page or a component is the same in Angular. They are all components. |
| Code splitting is defined in the routes. Ex: {path: '/about', name: 'About', component: () => import('../views/About.vue')}, //the import indicates that About page will be generated into a separated bundle | By default, all Pages/Components are in the same bundle/module, but you can split them into different modules |
|                                                              |                                                              |
|                                                              |                                                              |
|                                                              |                                                              |
|                                                              |                                                              |
|                                                              |                                                              |



## Lifecycle

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



## Typescript 

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

## Router

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
    {path: '/about', name: 'About', component: () => import('../views/About.vue')},//automaticaally do lazy load from another js bundle
]
```

## Watchers

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

## Events

* We can capture DOM events in Vue like this:

```html
<v-btn small color="primary" class="ml-auto mr-3" @click="onBtnEnterClicked" @mouseover="onMouseOverFired">Enter</v-btn>
```



