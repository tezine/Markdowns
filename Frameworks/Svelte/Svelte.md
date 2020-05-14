# Svelte

* [Svelte](https://svelte.dev/) is a UI framework without Virtual DOM. It's truly reactive, with faster and smaller bundles than React and others. 

* Svelte means slender, stylish, elegant... The project started by Rich Harris, a frontend developer of New York Times.  

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

* Svelte officially supports [Webpack](https://github.com/sveltejs/svelte-loader) and [Rollup](https://github.com/sveltejs/rollup-plugin-svelte).

# Html injection

* It's possible to inject raw html inside a Svelte component like this:

  ```html
  <script>
  	let content = "this string contains some <strong>HTML!!!</strong>";
  </script>
  
  <p>{@html content}</p>
  ```

* Svelte doesn't perform any sanitization before it gets inserted into the DOM, so avoid using it since it exposes users to XSS attacks. 

# Reactive Declarations

* Reactive Declarations indicates the to Svelte to re-run the code whenever any of the referenced values change. 

  ```html
  <script>
  	let count = 0;
  	$: doubled = count * 2;
  </script>
  
  <button on:click={(event)=>count+=1}>Click me</button>
  <p>{count} doubled = {doubled}</p>
  ```

* Whenever the button is clicked above, the `count` variable is incremented. `$:` indicates Svelte to re-run the line whenever the reference values changes. In this case, whenever count*2 changes. 

* We're not limited to declaring reactive *values* — we can also run arbitrary *statements* reactively. For example, we can log the value of `count` whenever it changes:

  ```javascript
  $: console.log(`the count is ${count}`);
  ```

* **So, the line within `$: ` is re-executed whenever any of the referenced values change **

* It's possible to group these re-executable statements in a block: 

  ```javascript
  $: {
  	console.log(`the count is ${count}`);
  	alert(`I SAID THE COUNT IS ${count}`);
  }
  ```

* Svelte's reactivity is triggered by assignments, so array methods like push and splice don't trigger re-executable blocks. To contour this problem, Svelte requires that we use assignments, to trigger re-executable blocks. Ex: 

  ```javascript
  numbers = [...numbers, numbers.length + 1];
  //or 
  numbers[numbers.length] = numbers.length + 1;
  //than use the array reference like: 
  $: sum = numbers.reduce((t, n) => t + n, 0);
  ```

  A simple rule: the name of the updated variable must appear on the left hand side of the assignment. Ex:

  ```javascript
  const foo = obj.foo;
  foo.bar = 'baz';
  ```

  ...won't update references to `obj.foo.bar`, unless you follow it up with `obj = obj`.

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

  

