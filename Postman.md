# POSTMAN
* Pode-se utilizar o retorno do request enviado pelo postman da seguinte maneira: 
```javascript 
var jsonData = JSON.parse(responseBody);
pm.globals.set("access_token", jsonData.access_token);
```
* Assim, pode-se utilizar a variável `access_token` criada acima em outro request. Exemplo:  Para isso, coloque no request: 
```
Authorization:Bearer {{access_token}}
Content-Type:application/json
```