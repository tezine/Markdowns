# NOTIFICAÇÃO POR PUSH
1. Gerar manualmente os certificados, profiles, etc. Já tive problemas gerando automaticamente pelo XCode. 
1. Criar um certificado `iOS App Development`. Ex: `Bruno's Mac Mini`
1. Criar um certificado `App Store e Ad Hoc`. 
1. Criar um certificado `Apple Push Notification service SSL (Sandbox & Production)`. Este certificado, pode ser exportado para um arquivo .p12 que é usado posteriormente pelo PushSharp em desenvimento e produção. Veja mais informações [aqui](https://www.mobiloud.com/help/knowledge-base/how-to-export-push-notification-certificate-p12/)
1. Criar um App ID. Ex: `com.tezine.Uttili`. Push notifications fica como <i>Configurable</i> em Development. Não precisa criar um certificado SSL para desenvolvimento. 
1. Criar 2 provision profiles. Um `iOS App Development` e um `App Store`. Não use wildcard. Use o nome correto. Ex: `com.tezine.Uttili`. 


# TECLAS HOME E END
1. Criar o diretório e arquivo `~/Library/KeyBindings/DefaultKeyBinding.dict`
1. Colar o conteudo abaixo, salvar e fazer o login novamente. 
```
{
    "\UF729"  = moveToBeginningOfLine:; // home
    "\UF72B"  = moveToEndOfLine:; // end
    "$\UF729" = moveToBeginningOfLineAndModifySelection:; // shift-home
    "$\UF72B" = moveToEndOfLineAndModifySelection:; // shift-end
}
```

# COMANDOS DE TERMINAL
1. Após instalar o VSCode, basta digitar `code` para abri-lo. 
1. Há também o `nano`

# MAXIMIZAR A TELA
1. Para clicar duas vezes no title bar e maximizar a janela, especifique zoom em Preferences/Dock/"Double click a window title bar"

# DROBO
1) O drobo é montado na pasta `/Volumes/Bruno`
1) Basta colocar a url no sourcetree: `/Volumes/Bruno/Git/Projetos`