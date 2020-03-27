# Xamarin
* Evitar de alterar os diretórios dos projetos, porque o Nuget se perde. 
* As vezes, mesmo realizando o restore, os pacotes são baixados, mas a referencia nuget nos projetos(Hintpath) continua sendo para um diretório incorreto.
* Não usar o jdk 1.7 que vem com o visual studio. Usar o jdk 1.8 ou superior 64bits 
* Padding é left, top, right, bottom
* TextCell não permite alterar o tamanho da fonte. 
* Técnica de páginação de listview [aqui](http://motzcod.es/post/107620279512/load-more-items-at-end-of-listview-in)
* Se atribuir um observable collection vazio a um listview no construtor, trava a aplicacao. Ex: listView.ItemsSource = pedidoList; 
* O xamarin forms map deve ser inicializado antes de usar. Veja [aqui](https://developer.xamarin.com/guides/xamarin-forms/user-interface/map/)

# Xamarin Android
Dos pacotes da Xamarin, atualizar primeiro o pacote Xamarin.Forms. Ele vai atualizar os outros da Xamarin. 
As bibliotecas App.Compact não são baixadas/instaladas automaticamente.
Criar emuladores HAXM utilizando o Android Studio (basta clicar em emuladores no toolbar). Criar emuladores x86 32 bits com Google API

## Para ter suporte a toolbar
Ver tutorial: https://developer.xamarin.com/guides/android/user_interface/toolbar/part-3-toolbar-compatibility/

## GCM (Google Cloud Messaging)
Ver tutorial https://developer.xamarin.com/guides/android/application_fundamentals/notifications/remote_notifications_in_android/
Para funcionar no emulador, a rede no emulador deve estar funcionando. Veja como habilitar a rede em https://www.youtube.com/watch?v=yHLa92ImSjM 


## Para alterar o tema
Pode-se adicionar assim: 
`[Activity(Label = "CopagazRevenda", MainLauncher = true, Icon = "@drawable/icon", Theme = "@style/MyTheme")]`
Ou no android.manifest:
`<application android:label="CopagazRevenda" android:theme="@style/MyTheme"></application>`

Para criar um novo tema
* Criar um arquivo Styles.xml dentro da pasta values 
```xml 
<?xml version="1.0" encoding="utf-8" ?>
<resources>
  <style name="MyTheme" parent="@style/Theme.AppCompat.Light">
    <item name="colorPrimary">#219653</item>
    <item name="drawerArrowStyle">@style/MyDrawerArrowStyle</item>
  </style>
  <style name="MyDrawerArrowStyle" parent="@style/Theme.AppCompat.Light">
    <item name="color">#F5F5F5</item>
    <item name="spinBars">true</item>
  </style>
</resources>```



