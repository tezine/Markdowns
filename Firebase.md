# FIREBASE
* Há dois tipos de msg no Firebase: notification e data. 
* No Uttili, enviamos apenas o data. 
* Data não apresenta notificação (popup), mas é a única maneira do OnMessage ser chamado no fblistener. 
* Desta maneira, a notificação (popup) é criada manualmente. 
*  Informacoes sobre data message [aqui](https://stackoverflow.com/questions/37959588/no-notification-sound-when-sending-notification-from-firebase-in-android)
* **NOTA** Lembre-se que o Firebase console só envia Notification message. Ele não envia data message, assim, não tem muita utilidade para testarmos. 
* Não sei pq, mas pelo XCode precisamos desinstalar o app, dar um build clean toda vez. Só funciona na primeira vez.  Assim, evite de usar o firebase no iOS. É melhor usar a solução da própria Apple.

# FIREBASE IOS CPP
1. Criar o arquivo Podfile no diretorio de build do projeto contendo
```
platform :ios, '10.0'
target 'UttiliUser' do    
    pod 'Firebase/Core'
    pod 'Firebase/Messaging'
    end
```

1. Rodar o qmake do projeto
1. Executar no diretório de build: `pod install`
1. Abrir o arquivo de workspace no diretório de build. Ex: `UttiliUser.xcworkspace`
1. Remover o lib do Pods do projeto pq nem é gerada. 

1. Adicionar os frameworks do cocoapods
-libFirebaseCore.a
-libFirebaseMessaging.a
-libGoogleUtilities.a
-libnanopb.a
-libProtobuf.a

1. Adicionar os frameworks 
-AddressBook
-UserNotifications -Precisa! https://firebase.google.com/docs/cloud-messaging/cpp/client

1. Editar Product/Scheme/Edit Schemd
- Clicar em Build e adicionar o Pods-UttiliUser antes do UttiliUser

1. Verificar se Other Linker Flags contem no inicio (provavelmente já está):
$(inherited)
-ObjC

1. Usar deployment target 11 e devices=iphone
1. Usar capabilities:
- Background modes: remote notifications
- Push notifications 

1. Adicionar os frameworks do firebase sdk arm64 (pode ser via qmake automaticamente):
-messaging
-firebase
-instance_id

1. Se XCode falhar indicando library FirebaseCore not found, executar o `pod install` novamente. Nao precisa apagar os arquivos. 


## PARA CONFIGURAR NA APPLE. 
1) Executar todo procedimento descrito aqui: https://firebase.google.com/docs/cloud-messaging/ios/certs
1. Abrir https://developer.apple.com/account/ios/authkey/create
1. Selecionar o menu lateral esquerdo `Keys` e depois `All``
1. Clicar no botao `+` no canto superior direito. 
1. Especifique o nome para a chave. Ex: `UttiliFirebaseKey`
1. Habilite o APN para ela. 
1. Criar um provision profile
1. O mais importante é enviar o arquivo .p8 gerado pelo `New Key` acima para o Firebase console. Para isso, clique no projeto no Firebase/Configurações/Cloud Messaging/Upload APN key


# Google Firebase for Qt Android applications
1) (Optional) In case you would like to read entire Google's explanation, click [here](https://firebase.google.com/docs/cpp/setup#setup_for_android).
1) Create a Firebase project in the [Firebase console](https://console.firebase.google.com/).
1) While in Overview screen, click on "Add Firebase to your Android app". 
1) Specify your app's package name under the popup dialog. It must be the same package name set in your AndroidManifest.xml.
1) Copy the **google-services.json** file into the root of your Android folder (the same folder where AndroidManifest.xml is)
1) Open your project's build.gradle file and add the following lines below into it:
    ```
    buildscript {
        repositories {
            jcenter()
        }        
        dependencies {
            classpath 'com.android.tools.build:gradle:2.1.2'        
            // Add this line below
            classpath 'com.google.gms:google-services:3.0.0'
        }
    }

    allprojects {
        repositories {
            jcenter()
        }
    }
    apply plugin: 'com.android.application'

    dependencies {    
        //Add the lines below
        compile 'com.google.android.gms:play-services:10.0.1'
        compile 'com.google.firebase:firebase-messaging:10.0.1'
    }

    android {
        defaultConfig {
            multiDexEnabled true
        }
        ...
    }
    apply plugin: 'com.google.gms.google-services'
    dependencies {
        compile files(new File('R:/Projetos/Firebase/firebase_cpp_sdk_2.1.0', 'libs/android/libmessaging_java.jar'))
    }
    ```
1) Download the [Firebase C++ SDK](https://dl.google.com/firebase/sdk/cpp/firebase_cpp_sdk_2.1.0.zip). Extract the files somewhere convenient.


# Goolge Firebase for Qt iOS applications
1) Download the [Firebase C++ SDK](https://dl.google.com/firebase/sdk/cpp/firebase_cpp_sdk_2.1.0.zip). Extract the files somewhere convenient.
1) Copy its contents into your project's folder (or anywhere else. Just remember its path)
1) Add the following lines into your Project.pro file (replace armeabi-v7a by x86 if you target a Intel android device): 
    ```
    LIBS+=-LYourProjetcFolder/Firebase/firebase_cpp_sdk_2.1.0/libs/android/armeabi-v7a/c++ -lmessaging -lapp
    INCLUDEPATH+={path where you downloaded firebase sdk}/firebase_cpp_sdk_2.1.0/include
    ```
1) Add the following to your AndroidManifest.xml (inside <application xml element):
    ```
    <service android:name="com.google.firebase.messaging.cpp.ListenerService">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
    </service>
    <!-- This service must be in the same process as the ListenerService -->
    <service android:name="com.google.firebase.messaging.cpp.RegistrationIntentService"
            android:exported="false" >
    </service>
    <service android:name="com.google.firebase.messaging.cpp.FcmInstanceIDListenerService">
    <intent-filter>
        <action android:name="com.google.firebase.INSTANCE_ID_EVENT"/>
    </intent-filter>
    </service>
    ```    
1) (Optional) You may find a Google sample integrating into standard C++ [here](https://github.com/firebase/quickstart-cpp/tree/master/messaging/testapp)


# Firebase iOS (Funcionamento antigo. Nao usar mais)
* Adicionar os frameworks que estao no diretorio /User/tezine/Documents/Firebase/ na pasta raiz do projeto Xcode. 
* Lembrar de setar "copiar se necessario", senao vai indicar que nao acha o Analytics. Se der erro ao colar os arquivos
* Remover os frameworks que estao na pasta build do projeto e copiar novamente. 
* Adicionar o arquivo Firebase.h no projeto pelo XCode( se nao tiver sido adicionado automaticamente pelo qmake).  
* Adicionar o GoogleService-Info.plist na raíz projeto pelo XCode. 
* Adicionar o arquivo module.modulemap na pasta raíz do projeto pelo XCode. Esta na pasta Documents/Firebase
* Adicionar os frameworks pelo XCode: AddressBook.framework e UserNotifications.framework. 
* No Build Settings, Adicionar -ObjC em Other Linker Flags.(caso nao tenha sido setado automaticamente pelo qmake) 
* Em Build Settings/User Header Search Paths, especificar $(inherited) $(PROJECT_DIR) (nao precisa, acho)
* Habilitar Use Header Maps (nao precisa, acho)
* Habilitar Push Notifications e Background Modes/Push
* Caso queira testar o app em modo sandbox (só vai funcionar no ipad da lu), habilitar a linha [[FIRInstanceID instanceID] setAPNSToken:deviceToken type:FIRInstanceIDAPNSTokenTypeSandbox]; no arquivo CopIOSInternal.mm

Segue um exemplo para enviar manualmente pelo Postman: 
*Adicionar Header: Authorization, valor: key=AAAALISCZf0:APA91bEA4LYXRl2lPvPGedoiny5z_x3RGVk5VyY20g4uoTRYfB1lbIIrm9Eg9lVVkyY9lslpsiXs5reGMJcrYrvurzzyjY4vg5RGZVgYuvpAVtn3IP_BJ-7XPtrPoeVah0USygNKcW1XPzAWpWTXLO20f9oIrCT5Sw
*Adicionar Header: Content-Type, valor: application/json
```

{
"to":"cjkbebfHhfA:APA91bFp2zQYGSca-e2orn5TfuRZSmxOxfvj7frmWx8gNSX48IjlnaiywUu2JAEffv0E6JQcc3kIO-vThzk7OdSmIyphET4BYd3gWvOskpXSKmkZ_GX0xxrEFhrA2Gsr5NH1B0NQG9tA",
  "content_available": true,
  "notification": {
      "title": "hello",
      "body": "yo",
      "click_action": "fcm.ACTION.HELLO"
  },
  "data": {
      "extra":"juice"
  },
  "priority": "high"
}
```
