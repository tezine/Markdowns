# Svelte

* [Svelte](https://svelte.dev/) is a UI framework without Virtual DOM. It's truly reactive, with faster and smaller bundles than React and others. 

* Svelte means stylish, elegant. The project started by Rich Harris, a frontend developer of New York Times.  

* Similar to Vue, Svelte combines html, style and script into the same file, with `.svelte` extension. IntelliJ already provides a plugin for Svelte. 

* Instead of processing Virtual DOM during runtime to verify what has changed, Svelte "compiler" generates a tiny javascript during compilation that updates the DOM whenever something changes. Svelte converts your app into ideal Javascript at build time, rather than interpreting your application code at runtime. This way, Svelt opens new horizons for frontend development, where html/javascript can be used even on embedded devices like Stone payment. 

* It's possible to create entire app with Svelte, or add it incrementally to an existing codebase. You can ship components as standalone packages without the overhead of dependencies like regular frameworks. 

* Although the Svelte "compiler" was written in Typescript, Svelte still provides a poor support for Typescript. You may write typescript code inside a Svelte file, but it's currently impossible to import `.ts` files into it. You may find more info about typescript integration into Svelte [here](https://dev.to/mhaecker/use-typescript-with-svelte-sapper-45n8).

* There are several nice tutorials and samples available at the Svelte website. Check the tutorials [here](https://svelte.dev/tutorial/basics) and the examples [here](https://svelte.dev/examples#hello-world).

* In contrary of React, which is not reactive, Svelte is truly reactive and provides two-way data-binding. Take a look at the sample below:

  ```html
  <script>
  	let name = '';
  </script>
  <input bind:value={name}>
  <p>Hello {name}!</p>
  <!--Whenever the input value changes via bind:value, the paragraph is updated -->
  ```
  
* Javascript variable can be used inside html anywhere. All you need is to use curly braces. It's even possible to use it as element attributes like below:

  ```html
  <img {src} alt='sample image'>
  ```

* Svelte Components starts with an uppercase letter and can be imported into other Svelte Components like this:

  ```html
  <script> 
   import Nested from './Nested.svelte'
  </script>
  ```

# Html injection

* It's possible to inject raw html inside a Svelte component like this:

  ```html
  <p>
      {@html string}
  </p>
  ```

* Svelte doesn't perform any sanitization before it gets inserted into the DOM, so avoid using it since it exposes users to XSS attacks. 

# Styles

* Stylesheets can be added to the component inside `<style></style`. By default, all rules defined inside it are scoped to the component, so you don't have to worry about css collisions. 
* SCSS is also supported. Just add <style lang="scss"></style> to use it. 



## Inline Handler

* Svelte supports inline handlers, so you may insert javascript code inside html: 

  ```html
  <script>
  	let btnTitle='Click here'
  </script>
  <button on:click={(e)=>btnTitle='Great!'}>
  	{btnTitle}
  </button>
  ```

* It's allowed to put any javascript into curly braces, so we can even use async/await into the inline handler:

  ```html
  <button on:click={async (e) => await alert('Hi')}>
  	Say, Hi
  </button>
  ```

  

