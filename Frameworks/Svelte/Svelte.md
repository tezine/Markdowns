# Svelte

* [Svelte](https://svelte.dev/) is a UI framework without Virtual DOM. It's truly reactive, with faster and smaller bundles than React and others. 

* Svelte means stylish, elegant. The project started by Rich Harris, a frontend developer of New York Times.  

* Similar to Vue, Svelte combines html, style and script into the same file, with `.svelte` extension. IntelliJ already provides a plugin for Svelte. 

* Instead of processing Virtual DOM during runtime to verify what has changed, Svelte "compiler" generates a tiny javascript during compilation that updates the DOM whenever something changes. 

* Although the Svelte "compiler" was written in Typecsript, Svelte still provides a poor support for Typescript. You may write typescript code inside a Svelte file, but it's currently impossible to import `.ts` files into it. You may find more info about typescript integration into Svelte [here](https://dev.to/mhaecker/use-typescript-with-svelte-sapper-45n8).

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

  
