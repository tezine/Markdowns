# Flutter
* Permite a criação de apps para Android e iOS usando linguagem Dart. 
* Tem interoperabilidade com Kotlin e Swift. 
* Segue um exemplo de código Flutter/Dart: 
```dart
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Welcome to Flutter',
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text('Welcome to Flutter'),
        ),
        body: new Center(
          child: new Text('Hello World'),
        ),
      ),
    );
  }
}
```
* Muitas variáveis são final. Só podem ser especificadas no construtor. No exemplo acima, home, title, etc são final. 
* O Dart permite especificar explicitamente qual parâmetro está sendo passado. Ex: <br>
`new Scaffold(appBar:new AppBar(...))`
* Todo widget deve ter o método `build()` implementado com @override
* Uma variável começando com _ indica que a variável é private. 
* Para um Widget Stateful, ao chamar setState() na classe State, o framework executa a função build() novamente da classe State. 
* Há vários ícones disponíveis na classe Icons. Ex: Icons.favorite. 
* Há varias cores disponíveis na classe Colors: Ex: Colors.blue.
* Abre-se uma nova tela através do seguinte código: `Navigator.of(context).push(new MaterialPageRoute(...`



* Há um tutorial sobre Internacinalização [aqui](https://flutter.dev/docs/development/accessibility-and-localization/internationalization)


# Align
* Mais informações [aqui](https://flutter-widget-livebook.blankapp.org/widgets/Align/)
* Permite especificar onde o widget será apresentado no parent (Alignment.topRight, Alignment.bottomRight, ...)

# AnimatedAlign
* Mais informações [aqui](https://flutter-widget-livebook.blankapp.org/widgets/AnimatedAlign/)
* Permite alterar o alinhamento do child widget de forma animada. 

# AnimatedContainer
* Mais informações [aqui](https://flutter-widget-livebook.blankapp.org/widgets/AnimatedContainer/)
* Permite alterar várias propriedades do Container como cor, borda, padding, width, height...

# Card
* Mais informações [aqui](https://flutter-widget-livebook.blankapp.org/widgets/Card/)

# Dialog
* Mais informações [aqui](https://api.flutter.dev/flutter/material/Dialog-class.html)
* Permite abrir uma caixa de diálogo. Repare que é possível criar um Dialgo com cantos arredondados especificando o shape do Dialog: 
`shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12.0)),`

# Dismissible
* Mais info [aqui](https://flutter-widget-livebook.blankapp.org/widgets/Dismissible/)
* O Widget dismissible permite removermos o widget através de um gesto de swipe para direita ou esquerda. 

# Drawer
* Podemos adicionar um drawer através do tutorial descrito [aqui](https://flutter.dev/docs/cookbook/design/drawer)

# SizedBox
* É utilizado para adicionar espaçamentos horizontais ou verticais. 
* O child widget inserido dentro dele ocupa o tamanho do SizedBox. 
* Caso o SizedBox tenha width: double.infinity, o SizedBox ocupará a largura do parent. 
* Caso precisemos ocupar toda largura e altura, podemos especificar via width e height ou simplesmente SizedBox.expand(child:SeuWidget)

# SafeArea
* Mais info [aqui](https://api.flutter.dev/flutter/widgets/SafeArea-class.html)
* É utilizado para que o conteúdo não ocupe o espaço dos "notchs" dos celulares mais novos.
* O conteúdo de child dentro do SafeArea é posicionado fora dos "notchs" de tela.

# AnimatedBuilder
* Mais info [aqui](https://api.flutter.dev/flutter/widgets/AnimatedBuilder-class.html)
* Podemos criar animações rapidamente com o AnimatedBuilder. 

# Google Maps
* Mais info [aqui](https://pub.dev/packages/google_maps_flutter)

# SnackBars
* Mais info [aqui](https://flutter.dev/docs/cookbook/design/snackbars)
* Lembre-se que o `context` atual deve ter um Scafold para funcionar. 

# SingleChildScrollView
* Mais info [aqui](https://flutter-widget-livebook.blankapp.org/widgets/SingleChildScrollView/)
* Permite adicionar um widget "scrollable" caso o conteúdo do widget não caiba na tela. 

# DRAWBACKS
* O Processo de build é lento quando adicionamos um novo 

# CLASSES IMPORTANTES
## MaterialApp
* É a classe de entrada retornada pelo build da classe MyApp 
* Tem as seguintes propriedades: title, theme, home 
## ThemeData
* Utilizado na classe MaterialApp, especifica a cor de fundo, cor de highlight, cor do button, etc. 
## Scaffold 
* A classe Scaffold implementa a estrutura de layout base do Material Design, que pode ser composta por AppBar, FloatingActionButton, Drawer, BottomNavigationBar, SnackBar
## IconButton
* Utilizado no AppBar como actions. Ex: `new IconButton(icon: new Icon(Icons.list), onPressed: _pushSaved),`
## RaisedButton
* Cria um botão com material design. Ex: 
` new RaisedButton( onPressed: null, child: new Text('LOGIN'),) `
## Container
* Convenience widget that combines common painting, positioning, padding, color, and sizing widgets.
### EdgeInsets
* Geralmente usado para especificar o padding. Ex:
padding: const EdgeInsets.all(32.0)

## Image
* Carrega uma imagem. Ex: new Image.asset('images/lake.jpg'width: 600.0,height: 200.0,fit: BoxFit.cover,) 
## Row
* Adiciona uma linha. Geralmente dentro de um Container porque Row não tem suporte a padding, nem color.   
## Column
* Adiciona uma coluna dentro de um Row.
* Para permitir o Column expandir por todo espaço disponível no Row, adiciona-se Expanded e depois o Column dentro do Expanded. O Expanded faz ao Column o que o Layout.fillWidth faz no QML.  


# ASSETS
* Para cada arquivo de asset (imagens, fotos, fontes, etc), adiciona-se uma entrada no arquivo pubspec.yaml. Ex:
```yaml 
flutter:
  assets:
    - images/lake.jpg
```
* O diretório de images acima é colocado logo abaixo do diretório principal do projeto. Não precisa colocar dentro de android, ios ou lib. 

# EXTERNAL PACKAGES
* Os external packages são instalados especificando-se o package desejado no arquivo pubspec.yaml. Por exemplo, vamos adicionar o package english_words ao projeto. Basta deixar o arquivo assim: 
```yaml 
dependencies:
  flutter:
    sdk: flutter

  english_words: ^3.1.0
```
* Após adicionar o package, execute o `Packages get`.
* Logo após isso, basta adicionar a linha a seguir no arquivo .dart:<br>
`import 'package:english_words/english_words.dart';`
* Para encontrar os packages disponíveis para flutter, clique [aqui](https://pub.dartlang.org/flutter/) 

# STATEFUL WIDGET
* Stateless widgets são immutable, ou seja, todas as propriedades não podem ser alteradas, ou seja, são final. 
* Implementar um Stateful Widget requer duas classes:
1) Uma classe Stateful Widget.
1) Uma classe de Estado. 
A instância da classe Stateful Widget é immutable, mas a classe de estado persiste ao longo de toda a existência do widget. 

# LAYOUT 
* Os widgets de layout estão [aqui](https://flutter.io/widgets/layout/)
* Pode-se utilizar um ListView ou Column como layout vertical. Semelhante ao ColumnLayout do QML. A diferença é que o ListView adiciona um scrollbar automaticamente se não couber verticalmente. 
* Pode-se depurar os layouts. Basta adicionar o código abaixo:
```
import 'package:flutter/rendering.dart';
void main(){
  debugPaintSizeEnabled=false;
   runApp(new MyApp());
}
```
Ou então, basta clicar em "Toggle Debug Paint" no Flutter Inspector. 
## CENTER
* Centraliza um widget child dentro do `Center` 
* O Android Studio apresenta um tooltip (lâmpada) ao passar o mouse sobre um widget. É apresentado um menu "Center widget". Ao clicar sobre ele, o Android Studio move o widget selecionado para child do Center.

## EXPANDED
* Os children do expanded preenchem o espaço disponível no Expanded. 
* Expanded é um widget que expande o child de um Row, column e Flex 

# HttpClient
Exemplo: 
```dart
  var httpClient = new HttpClient();
      var request= await httpClient.get("172.23.182.11", 5000, "/api/Values/GetAllUsers");
      var response = await request.close();
      var responseBody = await response.transform(UTF8.decoder).join();
      JSON.decode(responseBody,)
```


# EVENTOS
* O equivalente a signal (Qt) no flutter é assim:

```dart
final VoidCallback onClicked;

IconButton(onPressed: widget.onClicked);
```

# STREAMS / SINK
* Substitui a utilização do state/setstate. 
* A utilização de Streams / Skin é útil para atualizar automaticamente as informações alteradas a partir de um widget. 
* Streams provide an asynchronous sequence of data.
* StreamBuilder:  Widget that builds itself based on the latest snapshot of interaction with a Stream
* O Widget "subscribe" a um determinado Stream para receber atualizações automáticas sempre que o valor do stream for alterado. 
* Temos streams sendo utilizados como output e Streams sendo utilizados como input. 
* Todos os Inputs são Sinks. O Widget pode utilizar o Sink para inserir dados no viewmodel.
* Todos os Outputs são Streams. O Widget pode verificar atualizações no ViewModel "subscribing to the Streams". 
* BehaviorSubject mantém o valor mais atual. 
* A partir do Dart 2, o operator `new` é opcional. Para habilitar dart 2 no idea, vá em Language and frameworks/flutter/enable dart2
Segue o fluxo abaixo:
1. Criar o widget utilizando StreamBuilder. (Encapsular o widget dentro do stream builder)
1. Quando houver um evento, acessar o Sink -> que acessa o StreamController


# REDUX
* Todo o estado da aplicação é mantido no store. 
* O State é read-only. Para alterar o estado da aplicação é necessário emitir um action. 
* O StoreProvider deve encapsular o MaterialApp com o tipo de informação que será guardada. Ex: CartItem. 


# UPGRADE
* Para atualizar o flutter e seus packages, digite: `flutter upgrade`
* Para verificar o channel usado (beta, master), digite: `flutter channel`
* Não utilizar `pub get` ou `pub upgrade`. Usar `flutter packages get` e `flutter packages upgrade` para gerenciar as dependências do projeto. 
1) `flutter packages get` baixa todas as dependências do pubspec.yaml. 
1) `flutter packages upgrade` baixa a última versão de todas as dependências listas no pubspec.yaml


# Publicação no Google Play
* Building a release APK: `flutter build apk`
* Install the app into the device: `flutter install`


# FLUTTER CLI
* `flutter doctor`: Verifica a instalação do flutter na máquina

# CONFIGURAÇÕES NO JETBRAINS IDEA
* Usar o template Flutter para Run/Debug e especificar `C:\Users\tezine\Downloads\teste_flutter\lib\main.dart` como Dart entrypoint. 
* Em Project Structure:
```
  Modules 
    teste_flutter - diretorio raiz do projeto flutter. 
    tete_flutter_android - diretorio onde se encontra o Android.manifest. 
```

# ERROS COMUNS DE COMPILAÇÃO
