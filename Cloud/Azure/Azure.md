# Azure
* O serviço de Kubernetes deles chama-se AKS (Azure Kubernetes Service). 
* A Azure tem seu próprio registry para puxar as imagens docker. Chama-se ACR (Azure Container Registry)

# Azure CLI

* Permite gerenciar a Azure a partir da linha de comando de sua máquina. 
* O Azure CLI está disponível para download [aqui](https://docs.microsoft.com/pt-br/cli/azure/install-azure-cli?view=azure-cli-latest)

# Container Registry (ACR)

* Podemos criar um "private container registry" na Azure. Desta maneira, não utilizamos o registry da Docker. 

* A criação de um private registry na Azure é apresentada [aqui](https://docs.microsoft.com/pt-br/azure/container-registry/container-registry-get-started-portal).

* Segue um passo a passo resumido abaixo:

  1. Acessar  [https://portal.azure.com](https://portal.azure.com/).
2. Acessar o menu lateral esquerdo All Services/Containers/Container registries. 
  3. Criar um novo registry com as configurações default. Ex: myregistry
4. Editar as variáveis de ambiente de sua máquina e adicionar as entradas abaixo, caso esteja atrás de um proxy:
  
   1. HTTPS_PROXY=http://....
   
   2. AZURE_CLI_DISABLE_CONNECTION_VERIFICATION=1
  5. Executar `az acr login --name myregistry`
6. Para testar o upload de uma imagem para o registry na Azure, execute: 
     1. `docker tag suaImagemDocker myregistry.azurecr.io/suaImagemDocker:v1`
  7. E depois faça o upload da imagem para o registry: 
     1. `docker push myregistry.azurecr.io/suaImagemDocker:v1` 
  8. Sua imagem estará dentro de <i>Repositories</i>. Para listar as imagens que estão no repository do ACR, digite: 
     1. `az acr repository list --name <acrName> --output table`
  9. Por padrão, o cluster kubernetes na Azure não tem acesso ao registry privado. Para associar o registry ao cluster, execute o comando:
     1. `az aks update -n myAKSCluster -g myResourceGroup --attach-acr myregistry` 
  10. É possível criar um cluster kubernetes já integrado com o ACR, basta seguir os passos descritos [aqui](https://docs.microsoft.com/bs-latn-ba/azure/aks/cluster-container-registry-integration)

# Kubernetes Cluster (AKS)

* Há mais informações sobre como criar o Cluster Kubernetes na Azure [aqui](https://docs.microsoft.com/pt-br/azure/aks/kubernetes-walkthrough-portal) 

* É possível criar o cluster pelo portal https://portal.azure.com/ ou via linha de comando, conforme abaixo: 

```bash
az aks create --resource-group myResourceGroup --name myAKSCluster --node-count 1 --enable-addons monitoring --attach-acr myregistry --node-vm-size B2s
```

Para associar o `kubectl` de sua máquina local ao cluster da Azure, execute o comando abaixo: 

```bash
az aks get-credentials --resource-group myResourceGroup --name myAKSCluster
```

Podemos colocar uma aplicação docker no cluster conforme abaixo:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    app: myapp-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        #image: myregistry.azurecr.io/myapp:v1        #registry privado na Azure
        image: tezine/myapp:latest
        ports:
        - containerPort: 9090
```

## Http Routing

* Há mais informações sobre Http Routing para o AKS [aqui](https://docs.microsoft.com/en-us/azure/aks/http-application-routing).
* Por padrão, o cluster não é acessível pela internet. Para habilitar o acesso via http, primeiro, habilite o http routing para o cluster através do comando: 

```bash
az aks enable-addons --resource-group myResourceGroup --name myAKSCluster --addons http_application_routing
```

Com o http routing habilitado, podemos criar um serviço e uma regra de ingress para rotear o tráfego http externo para sua aplicação, conforme abaixo: 

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 9090
  selector:
    app: myapp
  type: ClusterIP
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: myapp
  annotations:
    kubernetes.io/ingress.class: addon-http-application-routing
spec:
  rules:
  - host: myapp.64dffd7c0b474304d912.eastus.aksapp.io # myapp.<DNS Zone>
    http:
      paths:
      - backend:
          serviceName: myapp
          servicePort: 80
        path: /
```



## Comandos de Cluster

2. Verifique os pods no cluster da Azure: `kubectl get nodes`
3. Para verificar os service principal associado ao cluster digite: `az aks show --name test-cluster1 --resource-group dad35.1`

