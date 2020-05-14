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
  $: sum = numbers.reduce((t, n) => t + n, 0); //re-run (reactive) statement
  ```

  A simple rule: **the name of the updated variable must appear on the left hand side of the assignment**. Ex:

  ```javascript
  const foo = obj.foo;
  foo.bar = 'baz';
  ```

  ...won't update references to `obj.foo.bar`, unless you follow it up with `obj = obj`.

# Props

* Properties allow to pass values to its children. 

* Properties are created in svelte by adding the export keyword. Ex:

  <i>Nested.svelte</i>

  ```html
  <script>
  	export let answer='a mystery';
  </script>
  
  <p>The answer is {answer}</p>
  ```

  <i>App.svelte</i>

  ```html
  <script>
  	import Nested from './Nested.svelte';
  </script>
  
  <Nested answer={42}/>
  ```

## Spread

* If you have an object of properties, you can 'spread'  them, instead of spcecifying each one. Ex:

<i>Info.svelte</i>

  ```html
  <script>
  	export let name;
  	export let version;
  	export let speed;
  	export let website;
  </script>
  
  <p>
  	The <code>{name}</code> package is {speed} fast.
  	Download version {version} from <a href="https://www.npmjs.com/package/{name}">npm</a>
  	and <a href={website}>learn more here</a>
  </p>
  ```

<i>App.svelte</i>

```html
<script>
	import Info from './Info.svelte';

	const pkg = {
		name: 'svelte',
		version: 3,
		speed: 'blazing',
		website: 'https://svelte.dev'
	};
</script>
<!--both ways are allowed below -->
<Info name={pkg.name} version={pkg.version} speed={pkg.speed} website={pkg.website}/>
<Info {...pkg}/>
```

# Styles

* Stylesheets can be added to the component inside `<style></style`. By default, all rules defined inside it are scoped to the component, so you don't have to worry about css collisions. 
* SCSS is also supported. Just add <style lang="scss"></style> to use it. 

# Inline Handler



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


# HTML Logic

* Svelte allow to express logic like loops and conditionals like below: 
* A `#` character always indicates a *block opening* tag. A `/` character always indicates a *block closing* tag. A `:` character, as in `{:else}`, indicates a *block continuation* tag. 

## if/else

```html
{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{:else}
	<button on:click={toggle}>
		Log in
	</button>
{/if}
```

Multiple if/else can be chained like below:

```html
{#if x > 10}
	<p>{x} is greater than 10</p>
{:else if 5 > x}
	<p>{x} is less than 5</p>
{:else}
	<p>{x} is between 5 and 10</p>
{/if}
```

## each

Each allow to loop over a list of data. Ex:

```html
<ul>
	{#each cats as cat}
		<li>{cat.name}</li>
	{/each}
</ul>
```

You can get the current index as a second argument. Ex:

```html
{#each cats as cat, i} <!--i is the current array index-->
	<li>{i + 1}: {cat.name}</li>
{/each}
```

 In case you are going to make changes to the list, use **keyed each blocks** as mentioned [here](https://svelte.dev/tutorial/keyed-each-blocks)

## await

Svelte supports await inside html like this:

```html
{#await promise}
	<p>...waiting</p>
{:then result}
	<p>The number is {result}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
```

You can use it in a more simple way:

```html
{#await promise then value}
	<p>the value is {value}</p>
{/await}
```

# DOM Events

* Dom events are handled with lowercase letters like this:

  ```html
  <script>
  	let m = { x: 0, y: 0 };
  	function handleMousemove(event) {
  		m.x = event.clientX;
  		m.y = event.clientY;
  	}
  </script>
  
  <style>
  	div { width: 100%; height: 100%; }
  </style>
  
  <div on:mousemove={handleMousemove}>
  	The mouse position is {m.x} x {m.y}
  </div>
  ```

* DOM event handlers can have modifiers. Ex:

  ```html
  <button on:click|once={handleClick}> <!--handleClick will fired only once-->
  	Click me
  </button>
  ```

  Follow the list of modifiers below:

  - `preventDefault` — calls `event.preventDefault()` before running the handler. Useful for client-side form handling, for example.
  - `stopPropagation` — calls `event.stopPropagation()`, preventing the event reaching the next element
  - `passive` — improves scrolling performance on touch/wheel events (Svelte will add it automatically where it's safe to do so)
  - `capture` — fires the handler during the *capture* phase instead of the *bubbling* phase ([MDN docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture))
  - `once` — remove the handler after the first time it runs
  - `self` — only trigger handler if event.target is the element itself

## Component Events

Components can also dispatch events. To do so, they must create an event dispatcher. Ex:

<i>Inner.svelte</i>

```html
<script>
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('message', { //creates something similar to EventEmitter in Angular
			text: 'Hello!'
		});
	}
</script>

<button on:click={sayHello}>
	Click to say hello
</button>
```

<i>App.svelte</i>

```html
<script>
	import Inner from './Inner.svelte';

	function handleMessage(event) {
		alert(event.detail.text);
	}
</script>

<Inner on:message={handleMessage}/>
```

Unlike DOM events, component events don't *bubble*. If you want to listen to an event on some deeply nested component, the intermediate components must *forward* the event. More info [here](https://svelte.dev/tutorial/event-forwarding). Event forwarding works for DOM events too. Check it out [here](https://svelte.dev/tutorial/dom-event-forwarding)

# Bindings

As a general rule, data flow in Svelte is *top down* — a parent component can set props on a child component, and a component can set attributes on an element, but not the other way around. To do the way around, use bind:value like below:

```html
<input bind:value={name}>
//checkbox below
<input type=checkbox bind:checked={yes}>
```





