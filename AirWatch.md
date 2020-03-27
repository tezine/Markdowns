# AIRWATCH
* https://www.air-watch.com/
* O Console é acessado via web: https://hol.awmdm.com
* O acesso ao plataforma é realizado via http://my.vmware.com e também via https://my.air-watch.com/
* Tem uma versão trial por 30 dias totalmente funcional.
* O gerenciamento é realizado pelo Airwatch Console. 
* Tem mais de 16.000 clientes em 150 países. 

# FUNCIONALIDADES  
* Permite fazer deploy de gerenciar apps nativos e híbridos em milhares de devices. 
* Controla todo lifecycle do endpoint.   
* Pode organizar os devices por região geográfica e seção dentro da empresa. 
* Apresenta dashboards com índice percentual de compliance.
* Permite criar profile settings. 
* Pode-se criar policies por plataforma, device ownership, group membership com opções avançadas de acordo com o horário. 
* Caso um device esteja out of compliance, o airwatch pode ser configurado para notificar automaticamente alguém e notificar o usuário oq ele precisa fazer para voltar a ficar compliant.  
* Pode-se especifcar as configurações de privacy para não coletar informações pessoais do usuário. 
* Os termos de uso que são apresentados ao usuário podem ser traduzidos 
* Após aceitar os termos de uso, as aplicações são instaladas automaticamente no device do usuário. 
* Para aumentar a segurança, o airwatch pode requisitar "Airwatch content locker" para abrir anexos de email.
* Usuários podem salvar documentos criptografados através do airwatch. 
* Pode-se criar uma loja de apps própria "Airwatch App Catalog". Nela, pode-se adicionar "links" para apps do Google Play/Apple Store e apps próprios. 
* Um app pode ser enviado automaticamente ao device sem intervenção do usuário.
* Há um portal de usuário, onde o usuário pode alterar algumas configurações da própria conta, como resetar a senha. 
* No console de administração, pode-se procurar um device específico por nome de usuário, grupo, entre outros. 
* Pode-se verificar as atividades do device, security status, networking information, entre outros. 
* Pode-se verificar os aplicativos instalados no device. 
* Pode-se enviar mensagem ao usuário, comandos, travar o dispositivo remotamente, limpar o dispositivo inteiro, etc. No caso de devices BYOD, o comando wipe remove todo conteúdo da empresa, mas mantém o conteúdo pessoal do usuário. 

## PIN
* O PIN é especificado após se logar no Console pela primeira vez. Fornece uma segunda camada de segurança para proteger contra ações acidentais. É uma senha de 4 dígitos. 
* Pode-se resetar o PIN, selecionar a conta no topo/direito em "Account". Selecionar "Manage Account Settings". Selecionar a tab "Security" e clicar em Reset. Ao se logar no Console novamente, será requisitado um novo PIN. 

# GLOSSÁRIO
* EMM -> Enterprise Mobility Management
* BYOD -> Bring your own device.
* MEM -> (Mobile Email Management)

# Hands-on Lab
## ENVIO DE PROFILE COM CÂMERA DESABILITADA
* https://my.vmware.com/group/vmware/evalcenter?p=airwatch-18-hol
* VMware1!
1) Adiciona-se um usuário. 
1) Cria-se um Profile "DEVICE RESTRICTION PROFILE" para desabilitar a camera no device. 
1) É setado como "auto deployment". Assim, a camera é automaticamente desabilitada quando o device é "enrolled". 
1) Ao selecionar "Add Profile", seleciona-se a plataforma ios. 
1) Desablita a câmera e salva o profile. 
1) Verifica os profiles criados clicando-se no menu lateral esquerdo DEVICES/profiles. Vai aparecer o profile recem criado. 
1) Baixar o app "Airwatch MDM Agent"
1) Abrir no app MDM "Detalhes do Servidor". 
1) Especificar `hol.awmd.com` como server.
1) Digitar o group id que deveria ser mostrado no Airwatch Console ao clicar no email na aba direita superior. 
1) Após isso, o usuário digita o login/senha no MDM Agent, depois é redirecionado ao safari. 
1) O iOS apresenta a tela "allow website to open settings"
1) Depois é apresentada uma tela no MDM para instalar o MDM Profile. 
1) Após isso, são apresentadas outras telas requisitando se o profile pode enviar notificaçao por push, entre outros. Depois o profile é instalado.

## WIPE 
1) O Wipe remove os profiles MDM, Policies e conteúdo. Não remove o conteúdo pessoal e não remove o app Airwatch MDM Agent.
1) O "Enterprise Wipe" é executado a partir do menu Airwatch Console/Devices e clicando-se no checkbox "Enterprise Wipe". 
1) Será requisitado o PIN (especificado após se logar no Console pela primeira vez).  
1) Normalmente o wipe acontece imediatamente. Caso não aconteça, abrir o Airwatch MDM Agent no device. Clicar em Device e depois em "Send Data". 
1) No caso do iOS, ao clicar no botao Home, os apps foram desinstalados após clicar no botão home.  
1) Caso o wipe ainda não tenha acontecido o wipe no iOS, basta clicar em Settings/Device Management, clicar no profile do Airwatch e depois REMOVE.   

# AIRWATCH CONSOLE
## USERS
* Ao criar o usuário, pode-se enviar uma notificação ao mesmo indicando a criação por sms ou email. 
* Na criação, pode-se especificar a senha de email do usuário, grupo e role. 
* Pode-se fazer uma importação de vários usuários por arquivo
* O console permite criar usuários por batch import. Há templates para importar whitelist users, whitelist devices, blacklist users... 
* Para cada usuário, pode-se associar vários devices. 


## ROLES
* Pode-se criar roles para usuários e para administrators. 
* O role pode conter vários itens que podem ser habilitados. Ex:
1) Change passcode
1) Lock device
1) Send message
1) ... 


## GROUPS
* Quando criamos um usuário, seja ele administrador ou usuário comum, pode-se adiciona-lo a um grupo e, opcionalmente, permitir que o usuário faça parte de outro grupo. 


## DEVICES
* Ao criar um device, pode-se especificar o ownership: "Corporate Dedicated, Corporate Shared, Employee Owned". 
* Pode-se especificar a plataforma: "Android, iOS, Windows, Blackberry, Tizen...."
* Ao criar o device no Console, pode-se enviar uma mensagem por email ou sms ao usuário indicando a ativação. 
* Pode-se associar a um grupo. 
* Opcionalmente, pode-se especificar o UDID, Serial Number, IMEI, ... 
* Ao criar um device, é obrigatório associa-lo a um user. 
* Ao adicionar o device, ele não aparece em List View, mas sim em "Enrollment Status". 

## EMAIL
* Pode-se gerenciar as contas de email através da plataforma airwatch. 
* O Console lista os emails por devices e por usuários. 

## HUB
* O Airwatch hub monitora todos os devices em um dashboard gráfico. Apresenta as seguintes divisões:
* * `Status breakdown`: Indica quantos registrados, quantos enrolled, quantos com wipe pendentes, e quantos "não enrolled". 
* * `Platform breakdown`: Retorna a quantidade de devices por plataforma.
* * `Enrollment History` : Indica quantas inscrições ocorreram ontem, na última semana e no último mês. 
* * `Compliance Violations`: Indica o percentual de devices não compliant<br> 
* * etc.
* O Hub pode ser customizado para apresentar um dashboard de uma região geográfica, grupos, etc.    