# Typescript

## Let e var
-let é igual a var, só que var fica visivel a toda funcao, enquanto que let fica visivel somente ao escopo:
--Ex: for(var i=0;i<5;i++) --> i fica visivel na funcao onde está declarado o for
--Ex: for(let i=0;i<5;i++) --> i fica visível somente dentro do for. \
* Para navegar por um array: \
`for(let folder of this.folders)`

#CSS
O css obtido para `badge` abaixo é `.folders .badge {`   
<ul class='heroes'>
  <li class='badge'/>
</ul>

# Promises
Pode-se utilizar o resultado de 2 formas: \
`this.imapService.getMessages().then(messages => {this.data=messages;});`  \
ou  
`this.imapService.getMessages().then(messages=>this.data=messages);`
