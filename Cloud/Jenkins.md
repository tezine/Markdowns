# JENKINS
* https://jenkins.io
* Utilizado para Continuous Integration (CI) e Continuous Delivery (CD).
* É um automation server para automatizar tarefas relacionadas a building, testing, delivering e deploying. 
* Pode-se baixar o jenkins server em java war ou docker.
* Há mais de 1000 plugins disponíveis que permitem integração com Chef, Ansible, AWS, entre outros. 
* Veja o handbook completo [aqui](https://jenkins.io/doc/book/) 

# PIPELINE
* É um processo automatizado que coleta o código do VCS até a criação do binário final. 
* O pipeline é normalmente escrito em um arquivo de texto chamado `Jenkinsfile`. 
* O arquivo `Jenkinsfile` pode ser escrito em várias linguagens como Java, Python, Javascript, Ruby, ou até mesmo utilizar a directive `docker` como **agent**.
* A directive **agent** indica onde e como executaro pipeline. 
* Pode-se misturar agents de vários tipos.  
* O pipeline é composto por estágios, onde cada estágio contém vários steps. 
* Pipelines são compostos por múltiplos stages e steps executados em sequencia. Cada step executa uma ação. Quando o step é executado com sucesso, é executado o step seguinte. Quando todos os stages e steps são executados, diz-se que o pipeline terminou com sucesso. 
* Um pipeline padrão contém 3 stages: Build, Test e Deploy. 
* Segue um exemplo de pipeline abaixo:
```groovy
pipeline {
    agent { docker { image 'python:3.5.1' } }
    stages {
        stage('build') {
            steps {
                sh 'python --version'
            }
        }
    }
}
```
* Cada stage tem um nome. Ex: `stage('build')`.
* Cada stage pode ter vários steps. 
* Há alguns sections que podem ser inseridos como `retry` e `timeout`. Exemplo:
```groovy
pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                retry(3) {
                    sh './flakey-deploy.sh'
                }

                timeout(time: 3, unit: 'MINUTES') {
                    sh './health-check.sh'
                }
            }
        }
    }
}
```
* No windows, os steps utilizam `bat <comando>`. 
* No linux, os steps utilizam `sh <comando>`. 
* Pode-se colocar, por exemplo, o retry dentro de timeout. 
* Após finalizar a execução do pipeline, pode-se executar a section post. Ex:
```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'echo "Fail!"; exit 1'
            }
        }
    }
    post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}
```

## DOCKER
* O Jenkins tem integração com o Docker e permite executar comandos dentro do container. Exemplo: 
```groovy
pipeline {
    agent {
        docker { image 'node:7-alpine' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
    }
}
```
## VARIÁVEIS DE AMBIENTE
* Pode-se criar uma seção environment para armazenar váriaveis de ambiente que podem ser globais ou pode-se criar as variáveis para um stage específico. Ex:
```groovy
pipeline {
    agent any

    environment {
        DISABLE_AUTH = 'true'
        DB_ENGINE    = 'sqlite'
    }

    stages {
        stage('Build') {
            steps {
                sh 'printenv'
            }
        }
    }
}
```
## JUNIT
* O Jenkins se integra ao JUnit e pode apresentar o resultado gerado. Ex: 
```groovy 
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh './gradlew check'
            }
        }
    }
    post {
        always {
            junit 'build/reports/**/*.xml'
        }
    }
}
```
* Pode-se até enviar um e-mail em caso de falha. Ex:
```groovy
post {
    failure {
        mail to: 'team@example.com',
             subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
             body: "Something is wrong with ${env.BUILD_URL}"
    }
}
```
## INPUT DO USUÁRIO
* Pode-se requisitar input do usuário em um step. Ex:
```groovy
stage('Sanity check') {
    steps {
        input "Does the staging environment look ok?"
    }
}
```