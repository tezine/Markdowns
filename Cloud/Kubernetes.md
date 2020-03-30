# **Kubernetes** 
* Há um tutorial da microsoft sobre kubernetes [aqui](https://azure.microsoft.com/mediahandler/files/resourcefiles/kubernetes-learning-path/Kubernetes%20Learning%20Path_Version%202.0.pdf) e [aqui](https://azure.microsoft.com/en-us/topic/what-is-kubernetes/)
* O kubernetes é dividido em clusters onde cada cluster é formado por nodes e por um master. 
* O master coordena todas as atividades do cluster.
* Cada node tem um Kubelet, que é um agente de gerenciamento do node e se comunica com o master. 
* Um cluster de produção deve ter ao menos 3 nodes. 
* Um Pod é um conjunto de 1 ou mais containers. Cada Pod é executado em um Node. O Node é um worker machine que pode ser uma máquina real ou virtual. Um Node pode ter múltiplos Pods. Mais info [aqui](https://kubernetes.io/docs/tutorials/kubernetes-basics/explore/explore-intro/)
* Resumindo, um POD é um collection de containers rodando dentro de um mesmo node (máquina ou VM)
* O kubernetes utiliza a porta 8080 para API Server. Assim, basta digitar o endereço ip do master-server:8080 para verificar o rest API disponível
* Por padrão, o default orchestrator é o swarm no docker no windows. Podemos alterar para o Kubernetes. Há mais informações sobre o docker com kubernetes no windows [aqui](https://docs.docker.com/docker-for-windows/kubernetes/)
* No Kubernetes, cada POD tem seu próprio endereço IP. Mais info [aqui](https://kubernetes.io/docs/concepts/cluster-administration/networking/)
* Os containers são executados sobre o kubernetes API (k8s API). 
* O carregamento no k8s API é realizado através do comando `kubectl apply deploy.yaml`, por exemplo. Vamos suport que o deploy.yaml defina 3 replicas. O kubernetes vai criar 3 PODs. O Deployment então assegura que tem 3 replicas distribuidas no cluster. Para "consumir" essa aplicação, criamos um service, que age como um load balancer. 
* Um POD é o fundamental unit do kubernetes. 
* Brandan D Burns comenta varias vezes que apenas o CD/Ci pipeline devem ter permissão de acesso ao kubernetes
* Ele comenta que devemos executar instrusion detection no cluster kubernetes via DaemonSet
* O Kubernetes é escrito em linguagem Go.

## Dashboard
* A instalação do dashboard é através do script **kubernetes-dashboard.yaml**. Não usar o https://rawgit.com/kubernetes/dashboard/master/src/deploy/kubernetes-dashboard.yaml
* Após executado o script, basta acessar http://192.168.56.101:8080/ui

## Multipass/Microk8s(Canonical)
* O Multipass permite instalar VMs do Ubuntu preconfiguradas com Kubernetes no HyperV rapidamente. Mais info [aqui](https://microk8s.io/#get-started)
* Utilizando o Multipass para criar várias VMs Ubuntu com Kubernetes, fica fácil para criar um ambiente de testes com 3 nodes kubernetes, por exemplo. 
* Através do Multipass, podemos executar os comandos do kubectl utilizando a linha de comando `microk8s.`
* Podemos criar um cluster kubernetes facilmente com o Muiltipass e o microk8s da Ubuntu. Veja mais info [aqui](https://microk8s.io/docs/clustering)
* O Microk8s tem um addon de dashboad. Para habilita-lo, basta executar o comando: `microk8s.enable dashboard`> Mais info [aqui](https://microk8s.io/docs/addon-dashboard)
* 

## Testando o Kubernetes com o Nginx

* `microk8s.kubectl run nginx --image nginx --replicas 3 ` Testa a execução do nginx dentro do kubernetes 
* `watch microk8s.kubectl get all --all-namespaces` : Apresenta se o NGINX está rodando. 
* `microk8s.kubectl expose deployment nginx --port 80 --target-port 80 --type ClusterIP --selector=run=nginx --name nginx`: Expoe a porta do NGINX
* `microk8s.kubectl delete deployment/nginx`: Remove o deployment do NGINX. 
* `microk8s.kubectl delete svc/nginx  `: Remove o serviço do NGINX. 

## HELM
* As configurações kubernetes para algumas aplicações exigem configurações complexas que torma o gerenciamento complicado manualmente via arquivo .yaml e inúmeras linhas de comando do kubectl. Pra tentar minimizar essa complexidade, pode-se utilizar o HELM. É um package manager para kubernetes. Mais informações sobre o HELM [aqui](https://helm.sh/). Há um catálogo de aplicações criadas com HELM (Helm Charts) [aqui](https://hub.helm.sh/)
* O HELM é mantido pela Microsoft, Google, Bitnami e a comunidade. 
* Helm Charts permite definir, instalar e atualizar aplicações complexas que rodam no kubernetes. 
* **Atenção**: Antes de fazer qq coisa com o Helm, deve-se executar o `helm init`. O Helm é instalado via ` sudo microk8s.enable helm` no microk8s. A instalação via snap não funciona no microk8s
* **Nota**: Se aparecer a msg: `Error: This command needs 1 argument: chart name`, é pq provavelmente faltou adicionar o repositório do chart que está sendo instalado primeiro. 
* Podemos remover um package instalado pelo helm através do comando: `helm delete <release_name>`, onde podemos verificar todos os releases (packages) instalados pelo help através do comando `helm list`

# REPLICASET
* É considerado um tipo low level no kubernetes. Geralmente, utiliza-se tipos high level como `Deployments` e `Daemonsets`. 
* Um ReplicaSet assegura que um número identico de Pods é executado em cada lugar. Caso um pod caia, o ReplicaSet se responsabiliza por subir um novo POD. 

# DEPLOYMENTs
* É uma abstração high level que configura o deploy e gerenciamento dos PODs. Debaixo do capô, executa o `ReplicaSet`, mas oferece uma lógica sofisticada para deploying, updating e scaling de PODs no cluster. 

# DAEMONSETS
* Daemonset tem muitos usos. O mais frequente é utilizar um Daemonset para instalar ou configurar software em cada node.
* O Daemonset assegura que uma cópia do POD roda em cada node do cluster. Conforme o cluster aumenta ou diminui, o Daemonset distribui esses PODs pelos nodes. 

# INGRESSES
* Ingresses fazem o roteamento de tráfego para e a partir do cluster. Também fornecem um único endpoint SSL para múltiplas aplicações. 

# CRONJOBS
* CronJobs fazem parte do Batch API e fornecem um meio para agendar a execução de PODS. São excelentes para a execução de tarefas periódicas como backup, relatórios e testes automatizados. 

# SECRETS
* Mais info [aqui](https://kubernetes.io/docs/concepts/configuration/secret/)
* Um video explicativo [aqui](https://www.youtube.com/watch?v=KmhM33j5WYk&list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT&index=10)
* Secrets pemite salvar informações não públicas como certificados, tokens e senhas. Secrets podem ser anexados aos PODs durante a execução de tal maneira que informações sensíveis sejam armazenadas de forma segura no cluster. 
* Secrets é formado por key/value pairs. 
* Um secret pode ser uma senha, um certificado, etc. 
* Criamos um secret volume para armazenar os secrets. Assim, por exemplo, podemos indicar ao Nginx para procurar os certificados SSL dentro da pasta /certs. 
* Por debaixo do capô, o conteúdo do Secrets é armazenado no ETCD de forma descriptografada. Isso pode ser um problema de segurança. Para tentar contornar isso, podemos permitir o acesso ao ETCD somente através de APIS com permissões definidas pelo RBAC(Resource Based Access Control)

# CRD
* CRDs definem um novo tipo de resource. Após um tipo de resource ser adicionado, novas instâncias do resource podem ser criadas. O gerenciamento de alterações de CRD costumam ser gerenciadas por controllers. 

# DEPLOYMENT 
* Exemplo [aqui](https://www.youtube.com/watch?v=mNK14yXIZF4&list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT&index=3)
* O Kubernetes faz um rollout gradual de versão de uma imagem docker. Assim, ao fazermos um deployment, o kubernetes faz o rollout gradual nos PODs, verificando o liveness check e o readiness check. Liveness indica se o pod deve ser reiniciado, por exemplo pela aplicação estar com deadlock. Readiness determina se sua aplicação está pronta para servir. Assim, supondo que temos um ReplicaSet de 3 Pods rodando uma imagem docker v1, ao aplicar um deployment com o v2, o kubernetes faz o seguinte: 
1.  Adiciona um novo pod (no mesmo node do pod1)
1. Aguarda pelo liveness
1. Aguarda pelo readyness
1. Somente após o readyness, redireciona o loadbalancer para o v2 criado. 
1. Ainda assim, o POD v1 permanece rodando por 30s (por default), por conta do "Termination Grace Period". Dessa forma, os requests que estejam sendo processados pelo POD v1, continuam sendo processados por 30s, mas novos requests são redirecionados para o POD v2. 
1. O mesmo fluxo continua nos outros nodes. Esse é o padrão, mas podemos fazer o deployment mais rapidamente nos nodes. Basta configurar o deplyment para isso. 


# SERVERLESS KUBERNETES
* O kubernetes permite criar serverless containers, nodes, etc através do virtual kubelet disponível [aqui](https://github.com/virtual-kubelet/virtual-kubelet)
* O conceito serverless "esconde" o servidor físico, assim os nodes do kubernetes nesse caso são virtuais. 
* Os desenvolvedores estão criando FaaS (Functions as a Service - como o Lambda da AWS), onde criam funções que se comunicam com o k8s API . 
* Events podem gerar triggers para executar funções FaaS.

# SCHEDULER
* Mais info [aqui](https://www.youtube.com/watch?v=rDCWxkvPlAw&list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT&index=5)
* Quando um POD precisa ser criado, o Scheduler é que verifica em qual VM o POD deve ser colocado. 
* O Scheduler verifica o estado atual de todas as VMs/Máquinas. 
* O Scheduler verifica: 
1. Predicates. São hard constraints que não podem ser violadas. Ex, podemos definir que uma máquina deve ter 4gb ram disponíveis, caso contrário, o POD não pode ser colocado nela. 
1. Priorities. São soft constraints que determinam "it would be nice to have... ". Diferente do Predicates, Priorities podem ser violados. Ex, podemos criar um Priority indicando para executar "spread" do POD, ou seja, de preferência "espalhar" o POD por diversas máquinas ao invés de criar vários PODs na mesma máquina. Como podemos ver, não é um requirement. 

# BUILD PIPELINE
* Mais info [aqui](https://www.youtube.com/watch?v=5irsAdKoEBU&list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT&index=6)
* Podemos criar um pipeline para baixar o código automaticamente de um repositório GIT, compilar e, somente o Build pipeline ter acesso para fazer o push da imagem compilada para o Docker Repository (ex: Azure ACR). Assim, o ideal é não dar essa permissão para os desenvolvedores. Da mesma maneira, as permissões para executar e criar PODS também ficam no build environment e nenhum lugar mais (com nenhum desenvolvedor).
* O ideal é que o build pipeline faça o unit testing, vulnerability scanning, credential scanning (para remover senhas), integration testing, 

# VOLUMES E STORAGE
* Mais info [aqui](https://www.youtube.com/watch?v=inJ7YJ-jt8I&list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT&index=8)
* PersistentVolume. Mesmo que o POD morra, o PersistentVolume permanece.
* A definição do POD apresenta um "Persistent Volume Claim", indicando o quanto precisa de espaço em disco. Isso faz com que o kubernetes, ao ver o persistent volume claim, crie os pods e também um persistent volume para cada POD criado. Assim, se temos um ReplicaSet=3, teremos 3 PODs e também 3 PV. 

# CONFIGURATION MANAGEMENT
* Mais info [aqui](https://www.youtube.com/watch?v=vRcQOZLnKUk&list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT&index=11)
* As configurações são key/value pairs. 
* Podemos mapear os arquivos de configuração em um volume
* Também é possível utilizar environment variables. 
* Como uma configuração incorreta pode causar um crash nas aplicações, podemos fazer um rollout gradual da configuração no kubernetes. 
* No caso de precisarmos criar uma configuração ligeiramente diferente em alguns casos, o helm fornece "template capabilities" que permite "extender" um template de configuração. 

# ROLE BASED ACCESS CONTROL
* Há um vídeo [aqui](https://www.youtube.com/watch?v=G3R24JSlGjY&list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT&index=12)
* Basicamente, o RBAC indica "Who can access what". 
* Através do RBAC, criamos Roles do tipo (get/list/etc ) indicando quais pods, volumes e depois associamos esses roles a usuários ou a um grupo de usuários. 
* Podemos criar roles que são disponibilizados para todo o cluster (Cluster Role Bindings) . Neste caso, os roles são válidos para qualquer namespace dentro do cluster. 
* Também podemos disponibilizar um role para um namespace específco. Ex: /my-team/rolebinding


# Monitoring
* Há um vídeo expicativo [aqui](https://youtu.be/W7aN_z-cyUw)
* Exemplos de ferramentas de monitoramento: Azure Monitor, Prometheus
* Há várias soluções para monitoramento de um cluster kubernetes. Muitas veze, o proprio cloud provider já fornece uma própria. Seguem algumas
abaixo:
1. EFK Stack: Composto por Fluentd, Elasticsearch e Kibana.
1. Kubelet
1. Container advisor
1. Kube-state-metrics
1. Kubernetes Dashboard
1. Prometheus -> está se tornando o padrão para expor métricas para o "mundo". 
1. Jaeger
1. Kubewatch
1. Weave scope
* Um dos itens a serem mensurados em monitoramento é a latencia. Podemos configurar uma métrica indicando para gerar um alerta de a latência de acesso for superior a 500ms para 99% dos acessos, por exemplo. 
* É recomendável integrar o Prometheus com o Grafana (https://grafana.com/) para visualizar os gráficos. Há informações como fazer a integração [aqui](https://prometheus.io/docs/visualization/grafana/)


# SERVICE MESHES
* Mais info [aqui](https://smi-spec.io/) e um vídeo explicativo [aqui](https://youtu.be/izVWk7rYqWI)
* Enquando um loadbalancing faz um balanceamento "North-South" , o service mesh faz um balanceamento "East-West". 
* O service mesh fornece 3 conceitos:
1. Auth: Service mesh define a relação entre serviços. Através dele é possível indicar se um serviço chamado S1, por exemplo, pode se comunicar com o serviço S2 e se o serviço S1 pode receber comunicação do serviço S3, e assim por diante. Para verificar essas condições, o service mesh fornece o `Auth`. 
1. Experiments: Supondo que eu tenha um serviço S1 e duas versões do serviço S2, é possível enviar 99% do tráfego para a versão de produção do S2 e apenas 1% do trafego para a nova versão do S2, por exemplo. 
1. Coleta de metricas: O service mesh, como atua como proxy, pode coletar informações de um service específico como latencia, http errors, user agents, ... e enviar para o Azure monitor ou Prometheus. 
O service mesh fornece o conceito de SMI (Service Mesh Interface). É uma coletanea de APIs que se conectam com o Kubernetes. Permite expor as implementações via APIs. 

# Operators
* Mais info [aqui](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) e um vídeo explicativo [aqui](https://youtu.be/DhvYfNMOh6A)
* Resumidamente, o operator é um POD que gerencia os outros pods. Ele verifica o "Current state" de um POD e tenta levar o pod ao "Desirable state" definido. Assim, o Operator funciona como se um Humano estivesse gerenciando os Pods. Como ele tem um poder muito grande, é importante utilizar Operator confiáveis. Por exemplo, utilizar o Operator oficial do CouchDB para gerenciar pods couchdb, etc. O Operator neste caso, é responsável por instalar, escalar e gerenciar os pods CouchDB. 
* Há um site onde podemos procurar por Operators [aqui](https://operatorhub.io/)


# POD Lifecycle
* Seguem o lifecycle de um pod abaixo:
1. Pending: Significa que o kubernetes API aceitou o POD, mas ainda não foi aplicado na máquina/vm. Se um POD fica em Pending por muito tempo, pode significar que não há recursos disponíveis para executar o POD, ou seja, pode não haver mais máquinas disponíveis ou não atendem aos requisitos mínimos. Podemos aumentar o tamanho do cluster nesse caso ou ligar o Auto scaling do cluster. 
1. Creating: Significa que o Scheduler está criando o POD em uma máquina/vm. O Node faz o pull da imagem do registry (docker, ACR, ou outro), 
1. Running: O POD está sendo executado. 
1. CrashLoopBackoff: Acontece quando o pod travou e foi reiniciado muitas vezes. Nesse caso, o Kubernetes "back off", ou seja, se afasta e espera um pouco para tentar iniciar o POD novamente. Se o POD travar, o kubernetes espera mais tempo

* Há alguns lifecycle hooks que podem ser utilizados, como post start. É um web hook que é chamado imediatamente após o POD ser executado. 
* Há o lifecycle hook "pre stop" que é chamado imediatamente antes do container ser finalizado. 
* Podemos especificar um "Init Container" no POD, indicando que é o container que deve ser executado primeiro. Somente após ele ser executado, os outros container são executados. 

# Customizing Kubernetes API
* Há um vídeo explicativo [aqui](https://www.youtube.com/watch?v=P7QAfjdbogY&list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT&index=18)
* Segue o fluxo quando enviamos algum comando é enviado ao kubernetes: 
1. O comando é enviado ao API Server do kubernetes. 
1. O API Server envia do ETCD database. 


# Serverless Functions for Kubernetes
* Há um vídeo explicativo [aqui](https://youtu.be/4nEkdyhgFds)
* A soluçao open source criada em conjunto como Brendan Burns chama-se Fission.io (https://fission.io/). Ela permite criar funções semelhantes ao AWS Lambda diretamente no kubernetes. 
* No exemplo apresentado no vídeo, há um namespace Fission que contém vários PODS necessários para implementar Function as a Service (FaaS). 
* O Fission fornece uma linha de comando própria que aplica os comandos no Kubernetes. Veja mais detalhes no arquivo [Fission](Fission.md)

# **Kubectl**

* Kubectl é uma linha de comando para executar comandos sobre um cluster Kubernetes. Podemos monitorar as mudanças de status de qualquer comando kubectl através do comando `watch kubect...`
* Há outras maneiras de interagir com o k8s API além do kubectl. O kubectl faz chamadas http com json para o servidor kubernetes API. 
* `kubectl logs docker-desktop`: Apresenta os logs do node 'docker-desktop' no windows.
* `kubectl cluster-info` : Apresenta as informações sobre o cluster
* ` kubectl logs kubernetes-dashboard-3965212660-pk983 --namespace=kube-system`: Apresenta os logs do dashboard. 

## Comandos do Cluster

* `microk8s.add-node` : Utilizado no Multipass com Microk8s(Canonical). Retorna uma linha de comando para ser utilizada em outro node para adiciona-lo ao cluster. Mais info [aqui](https://microk8s.io/docs/clustering)
* `kubectl get nodes -o wide` :  Lista os nodes do cluster

## Comandos de Node

* O Node é um worker machine que pode ser uma máquina real ou virtual.
* `kubectl describe node microk8s-vm2`: Apresenta todas as informações do node de nome 'microk8s-vm2'

## Comandos de POD

* Um POD é um agrupamento de containers que é executado dentro de um Node. 
* Um pod define variáveis de ambiente, mount storages, etc utilizados pelos containers. 
* `kubectl get pods`: Lista os pods do node. Usar o comando `kubectl get pods -o wide` para indicar o node onde está rodando(no caso de cluster)
* `kubectl get pods --all-namespaces`: Apresenta o status de todos os pods. 
* `kubectl describe pods` : Apresenta um detalhamento sobre os pods no Node 
* `kubectl port-forward myCassandraPODName 9042:9042`: Expoe a porta 9042 do pod myCassandraPODName

## Comandos de Service
* Um service é um load balancer que faz o tráfego para um collection de PODS. 
* `kubectl get svc`: Lista os serviços no kubernetes
* `kubectl delete svc cassandra`: Remove o service com nome cassandra

## Comandos de Statefulset 
* Mais info sobre Statefulset [aqui](https://www.youtube.com/watch?v=GieXzb91I40&list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT&index=9)
* Mais info no site do kubernetes [aqui](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
* Statefulset é semelhante ao ReplicaSet. 
* Em Statefulset, replicas tem índices. 
* Cada replica tem um hostname. 
* Diferente de ReplicaSet que o Kubernetes remove/adiciona de forma randomica, no StatefulSet, a replica 2, por exemplo, só é criada após a replica 1 estar ready. O inverso também é válido. Ao remover uma replica, o Statefulset remove aquela com o maior índice criado.
* Além de podermos utilizar um service para fornecer um dns para acesso as replicas. Ex: cassandra, podemos acessar uma replica específica visto que cada uma tem um hostname constante. Assim, podemos acessar uma replica com o dns cassandra-0.cassandra, outra com cassandra-1.cassandra, etc. 
* Um detalhe não relacionado a Statefulset: Se os dados são replicados pelo cassandra entre replicas, não é necessário utilizar Persistent Volume, visto que se um POD cassandra for removido, outros terao os mesmos dados. 

* `kubectl get statefulset`: Lista os Statefulsets do kubernetes
* `kubectl delete statefulset cassandra`: Remove o statefulset com nome 'cassandra'