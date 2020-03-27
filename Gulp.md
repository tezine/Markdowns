# Gulp Task Runner
* https://gulpjs.com/
* É um task runner javascript com suporte a plugins. 
* Contem um file-watcher built-in. 
* Pode ser utilizado para automatizar tarefas como compilação, unit testing, packaging, deployment...
* Pode ser utilizado , por exemplo, para compilar typescript, SASS/LESS ao compilar o projeto. 
* De um modo geral essas funcionalidades como compilação do typescript é realizada por plugins do gulp. 
* A configuração do gulp fica em gulpfile.js.
* A execução de tasks é realizada da seguinte maneira: `gulp <task> <othertask>`

# TASKS 
* A execução é dividida em tasks. Cada task é uma chamada ao gulp-<task>.task com o nome e um callback que carrega a task: 
```
var gulp = require("gulp");  // Instruct Node.js to load gulp
gulp.task("combine-and-uglify", function() {
       // Code to execute for this task
});

Para executar essa task acima (combine-and-uglify), basta chamar o gulp assim: `gulp combine-and-uglify`
```
A task principal é a default. Ex:
```
var gulp = require('gulp');
gulp.task('default', function() {
  // place code for your default task here
});
```

* gup.task tem alguns métodos: 
- src('...') -> indica os arquivos que serão utilizados como source stream. 
- pipe( )

