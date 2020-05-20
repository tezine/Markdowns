# Deno

* [Website](https://deno.land/)

* Deno is a runtime for Typescript and Javascript. It uses Google V8 and Tokio, and it's  a single executable file written in Rust. Deno itself is a Rust crate. 

* Deno does not use npm or package.json and its easier than NodeJS to embed into your desktop/web application.

* Deno allows to import modules directly from the web. No npm required. Ex: 

  ```typescript
  import { bgBlue, red, bold } from "https://deno.land/std/colors/mod.ts"; 
  ```

* It provides a standard library with http, file handling and much more. Info [here](https://deno.land/std) and [here](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts).

* Only uses ES module syntax, so no more `require()` statements.  Only  `import x from "y"`.

* It's possible to execute web applications or console applications out of the box. 

* Deno provides more security than NodeJS. Applications run sandboxed by default. 

* It's also possible to execute webassembly using Deno. 

* You can execute a typescript application by executing:

  ```bash
  deno run --allow-env --allow-read --allow-net myapp.ts
  ```

* Notice that we have to explicitly indicate the permissions the application is allowed to have in the command line. 

* It's possible to install applications/modules, so you won't need to import all the time. Ex:

  ```bash
  deno install gist https://deno.land/std/examples/gist.ts --allow-net --allow-read --allow-env
  #after the instalation, we can type
  gist d:/hello.txt
  ```

* We can check how a module is structured by using `deno info`. Ex:

  ```bash
  deno info https://js-modules-todomvc.now.sh/bootstrap.mjs
  ```

* When we start the application, Deno downloads all the imported modules and caches them. Once they are cached, Deno will not download them again until we specifically ask for it with the `--reload` flag.

## Deno detailed info

Deno was built with:

- Rust (Deno’s core was written in Rust, Node’s in C++)
- Tokio (the event loop written in Rust)
- TypeScript (Deno supports both JavaScript and TypeScript out of the box)
- V8 (Google’s JavaScript runtime used in Chrome and Node, among others)