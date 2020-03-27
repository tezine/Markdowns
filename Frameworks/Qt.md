# QT e QML
* Mais informações sobre o Qt [aqui](https://doc.qt.io/)
* Usar o jdk 1.8 64 bits - Deve ser de 64 bits,  senao o flag org.gradle.jvmargs=-Xmx3048M no arquivo gradle.properties não funciona, visto que 32 bits do java não acessa mais que 2gb de ram.
* Usar o ndk 10 32 bits. (Estou usando o 13 agora)
* Usar o sdk 32 bits instalado pelo visual studio em r:\AndroidSDK. Se não for instalado aqui pelo visual studio,Desinstalar o sdk tools, baixar o sdk tools do google e instalar em R:\AndroidSDK
* Especificar `buildDir="build"` dentro de buildscript no arquivo build.gradle senao o projeto vai ser compilado na pasta .build e vai aparecer um erro indicando invalid apk (pq o qt creator nao encontrou)
* A integração do CMake com o Qt Creator é uma porcaria. Nem é possível adicionar um Form class pelo wizard no CMakeLists.txt. 
* Qt Concurrent module serve para criarmos execuções paralelas sem a necessidade de utilizar funções primitivas de baixo nível como mutex, semáforos, etc. Exemplos de classes do Qt Concurrent:
1. QFuture
1. QFutureWatcher
1. QtConcurrent::map()




#Qt Quick
* Tem um bug no Timer //é um bug do qt que o triggered to timer continua sendo emitido mesmo depois do stop
Fazer isso:
```qml 
    Timer{
        id:myTimer
        repeat: true
        running: true
        interval: 1000*20
    }
    Connections{
        target: myTimer
        id:timerConnections
        onTrigerred:{
            if(enabled)timerTimeout()
        }
    }


    OldControls.Stack.onStatusChanged:  {
        if(OldControls.Stack.status==OldControls.Stack.Activating){
          console.log('ativando')  ;
            myTimer.restart();
            timerConnections.enabled=true;
        }
        else if(OldControls.Stack.status==OldControls.Stack.Deactivating){
            console.log('desativando');
            myTimer.running=false;
            myTimer.stop();
            timerConnections.enabled=false;
        }
    }
```

# AutoTest (Qt Test Framework)
* Também há a possibilidade de usar o Google C++ Testing Framework ao invés do Qt Test Framework.
* Para criar um projeto de teste, execute os passos abaixo:
1. In the Test framework field, select Qt Test.
1. Select the GUI Application check box to create a Qt application.
1. In the Test case name field, enter a name for the test case.
1. Select the Requires QApplication check box to add the include statement for QApplication to the main.cpp file of the project.
1. Select the Generate initialization and cleanup code checkbox to add functions to your test that are executed by the testing framework to initialize and clean up the test.

* O Qt Creator indica com uma bolinha vermelha (como um bookmark) quando o teste falha ao ser executado. 
* Há uma aba inferior no Qt Creator para execução dos testes. Ela mostra todos os resultados dos test cases de forma visual. 
* Apesar da possibilidade de usarmos a aba inferior do Qt Creator para verificar visualmente o resultado, evitar de usa-la pq ela indica "PASS" no método onde tem um teste que falhou. 
* Há duas maneiras de executar os testes. Usando a macro QVERIFY. Ex: `QVERIFY(jsValue.toString()==QString("valor"));` ou então utilizando a macro QCOMPARE Ex: `QCOMPARE(store.getRevendaID(),10);`
* Há também a macro QVERIFY2 que apresenta uma mensagem personalisada em caso de falha. Ex: `QVERIFY2(1 + 1 == 2, "A breach in basic arithmetic occurred.");`

# Qt Smart Pointers
* Mais informações [aqui](https://wiki.qt.io/Smart_Pointers)

## QPointer
* É o ponteiro mais utilizado e garante que o resultado da comparação é false quando o objeto for destruido.

## QScopedPointer 
 * Aloca dinamicamente um objeto e destroi o objeto na destruição do ponteiro. 
 * QScopedPointer is a small utility class that heavily simplifies this by assigning stack-based memory ownership to heap allocations. 
 * Ele é útil para alocarmos memória para um objeto que é usado dentro de uma função e destruido ao término da função. 