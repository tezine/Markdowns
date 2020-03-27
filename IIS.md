# IIS
* Podemos configurar o IIS para não enviar o fingerprint através do tutorial apresentado [aqui](https://thycotic.force.com/support/s/article/Disabling-IIS-Web-Banner-And-Other-IIS-Headers)
* Para impedir a execução de scripts na página (disable cross site scripting- XSS). Ex: `http://meusite.com/PesquisaNotaFiscal.aspx?relNum=%3Cscript%3Ealert(%27ola%27)%3C/script%3E&Pag=&PagItens=0&area=SP`
basta seguir o procedimento 