# REACT NATIVE
* Website: https://facebook.github.io/react-native/
* Instalar o React Native Console para o Webstorm. Executar tudo através da aba "RN Console" no Webstorm. 
* Pode ser integrado com componenes escritos em Objective-C, Java ou Swift. 
* React Native é como React, mas ao invés de utilizar componentes web, utiliza componentes nativos do iOS e Android. 
* Tem suporte a ES2015.
* Para gerar os ícones e splash para android e ios, baixe o plugin: https://github.com/bamlab/generator-rn-toolbox (nao funciona bem no windows)
* Tecnicamente, React não tem nada em comum com o React Native, a não ser a sintaxe. 
* React Native é apenas um bridge entre javascript e o ambiente nativo (java, swift)
* Não suporta construtor async nem render async
* A função componentWillMount é executada antes do render, mas caso seja necessário receber dados do endpoint no componentWillMount, salvar no state porque o React não aguarda o await colocado no componentWillMount para executar o render(); Ex:
```jsx
constructor(props){
    super(props);
    this.state = {eUserFromGet: {}};
}

async componentWillMount(){
    let eUser=await this.testGet();
    this.setState({eUserFromGet:eUser});
}
```
* Não retornar mais do que um componente parent no render(). Por exemplo, caso tenha um Text e um TextInput, coloque os dois dentro de um view. 

# INSTALAÇÃO COM EXPO
1) `npm install -g create-react-native-app`
1) `create-react-native-app C:/Projetos/AwesomeProject` 
1) Para instalar o app no device, execute: `react-native run-android`
1) Depois de instalado no device, podemos executar o app via `react-native start`

# INSTALAÇÃO SEM EXPO
1) `npm install -g react-native-cli` 
1) `react-native init <projeto>`.
1) Editar o arquivo android/local.properties e adicionar a linha: sdk.dir= C:/AndroidSDK
1) `react-native run-android`

# EXPO
* Os projetos podem ser testados no android/ios através do app Expo disponível nas lojas. Mais info [aqui](https://expo.io)
* Pode-se criar um projeto e testa-lo no browser em snack.expo.io. 
* O expo tem até uma IDE própria chamada XDE.
* Normalmente o Expo é executado na porta 19000. Lembre de adicionar uma exceçao Inbound no Firewall. 
* O Expo client contém apenas a api do react e do próprio expo. Assim, caso você tenha criado componentes customizados nativos em Swift ou Java, o Expo não será capaz de apresenta-lo.
* Ao chacoalhar o device quando o app estiver rodando no Expo, é aberto um menu com opções como "Reload, Show Perf Monitor..."  
* O problema é que o EXPO causa muitos problemas. Assim, é recomendável criar o projeto sem o EXPO via `react-native init <projeto>`. 
* Para remover o expo de um projeto existente: `npm run eject`


# CONCEITOS BÁSICOS 
* Todo componente em React Native deve estender a classe Component do react.  
* O conteúdo visual é escrito na função `render()`
* Assim como no Angular, usamos uma variável entre chaves {variavel}.
* Os styles do component ficam fora da classe. 
* Segue o formato da função render abaixo:
```jsx
render(){
    return (
        <TextInput placeholder={'Bozo'}/>
    );
}
```

# PROPS
* React Native suporta a criação de propriedades. 
* Props são fixas ao longo da vida do componente. 
* Caso queira alterar, utilize state ao invés de props. 
Ex: Imagine que você tem um componente chamado MyTextField abaixo:
```jsx
export default class MyTextField extends React.Component{
    render() {
        return (
            <TextInput value={this.props.login} style={{width:300, height:40, color:'black'}}/>
        );
    }
}
```
*  Podemos especificar o compID acima na utilização do MyTextField. Ex:
```jsx
class UsesMyTextField extends React.Component{
    render(){
        <MyTextField login='tezine' />
    }
}
```
* É possível verificar as props passadas ao componente no construtor do mesmo. Exemplo: 
```jsx
constructor(props) {
    super(props);
    console.log('props:', props);
}
```

# STATES
* State é uma prop que pode ser alterada ao longo da vida componente. 
* Normalmente, o state é inicializado no constructor do componente. 

# MOBX
* Uma alternativa para não utilizar o setState é usar o MobX. Para instala-lo, siga os passos abaixo:
```
1) npm install mobx --save
1) npm install mobx-react --save
1) npm install --save-dev babel-plugin-transform-decorators-legacy babel-plugin-transform-class-properties
//editar o arquivo .babelrc
{
  // omitting pre-existing configuration
  "plugins": [
    "transform-decorators-legacy"
  ]
}
```

# NATIVEBASE
* Para os ícones passarem a funcionar, adicione em dependencies no package.json:  
1) "react-native-vector-icons": "4.5.0"
1) depois execute `react-native link` 
1) depois execute `react-native run-android `


# STYLES
* nomes nos styles são escritos em camel-case. Ex: 
`backgroundColor` ao invés de `background-color`. 
Exemplo de style: 
```jsx
const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
```
Segue a utilização do mesmo 
` <Text style={styles.red}>just red</Text>`

# LAYOUT
* View é um container para outros componentes que permite especificar style.
* Todas as dimensões são unitless. São density-independent pixels. Assim, especificamos width assim: `width:40` (sem px)

## FLEX
* `flex: 1` indica que o componente preenche o espaço disponível. 
* Quanto maior o número do flex, maior o tamanho da área utilizada.
* flex no React Native utiliza flexDirection='column' por padrão. 
* justifyContent determina a distribuição dos children no primary axis. Assim, caso o flex seja vertical, o justifyContent vai indicar a distribuiçao dos componentes na vertical.
* * As opções disponíveis são: `flex-start, center, flex-end, space-around, space-between and space-evenly`
* alignItems determina a distribuição dos children no eixo secundário. .Assim, caso o flex seja vertical, o alignItems determina a distribuição dos componentes na horizontal. 
* * As opções disponíveis são: `flex-start, center, flex-end, and stretch`   


# FUNÇÕES INTERESSANTES
*  `Alert.alert('You tapped the button!');`

# ENTITIES
* O javascript do React Native suporta criação de entities tipados.Assim, podemos criar um entity assim: 
```jsx
class EUser{
    login:String;
    name:String;
}
```
* Feito isso, basta instanciar assim: `eUser: EUser={};`

# NETWORKING 
* Pode-se usar fetch, axios ou frisbee. 
* Estou usando o frisbee e funciona bem: `npm i frisbee --save`
https://github.com/niftylettuce/frisbee
* Ex:
```jsx
//Globals.js 
export const rest = new Frisbee({
    baseURI: 'http://172.23.182.11:5000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

import {rest} from '../Globals'
//em alguma funcao do componente:
 async btnEntrarClicked() {
    console.log('clicou em entrar:',this.eUser.login);
    let res = await rest.get('/Values/GetByLogin/'+this.eUser.login);
        console.log('resultado', res.body);
        let eUser=res.body;
        Alert.alert('Olá ', eUser.name);
}
```

# GESTURES
* Pode-se criar um componente para funcionar como button. Ex:
```jsx
 <TouchableHighlight onPress={()=>console.log('clicou')} underlayColor="transparent">
        <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableHighlight</Text>
        </View>
</TouchableHighlight>
``` 

# REDUX
* É possível instalar o Redux no React Native. Para isso, execute o seguinte: 
```powershell 
npm i react-redux --save
npm i redux --save
yarn add redux-thunk
yarn add redux-logger
yarn add redux-form (na verdade, só precisa desse! )
yarn add axios 
yarn add redux-axios-middleware
```

# NAVIGATION 
`yarn add react-navigation`
* Mais informações [aqui](https://reactnavigation.org)
Ex:
```jsx
const MyApp = StackNavigator({
    Login: { screen: Login },
    VUsers: { screen: VUsers },},   
    {initialRouteName: 'Login',}
});

export default class App extends React.Component {

    render() {
        return <MyApp/>
    }
}
```
* A navegação é realizada através do código: `this.props.navigation.navigate('VUsers');`
* Para voltar: `this.props.navigation.goBack()`

# COMPONENTES PRINCIPAIS 
## Button
`<Button title={'ENTRAR'} onPress={() => this.btnEntrarClicked()} /> `
* O Button não suporta alterar o height via style. Para isso, usar o TouchableOpacity ou algum outro. 

# COMPONENTES ADICIONAIS
* https://react-native-training.github.io
* https://nativebase.io/
* https://shoutem.github.io/ui/
* https://avocode.com/nachos-ui
* http://react-native-material-design.github.io/
* http://xinthink.github.io/react-native-material-kit/
* https://akveo.github.io/react-native-ui-kitten/#/home

## ScrollView

## FlatList
* Diferente do ScrollView, o FlatList renderiza apenas os elementos que são mostrados na tela. Normalmente são colocados dentro de um View. Ex:
```jsx
<View style={styles.container}>
    <FlatList
        data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
        ]}
        renderItem={
            ({item}) => <Text style={styles.item}>{item.key}</Text>
        }
    />
</View>
```


# Eventos entre componentes
* Para emitir um evento de um componente para o parent componente:
* Código no child component: `this.props.onClick('texto');`
* Código no parent component: `<ListButton style={styles.item} text={item.key}
                                                onClick={(txt)=>this.itemClicked(txt)}/>`