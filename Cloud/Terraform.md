# Terraform
* No arquivo .tf são especificadas as configurações de infraestrutura que são utilizadas. Exemplo: Cpus, quantidade de memória, dados de conexão com o banco de dados, etc. 
* O deploy pode ser realizado através do Chef. Podemos fazer deploy no Amazon S3
* Podemos nos conectar ao virtual machine da Vmware usando VSphere cliente. 
* Também versiona infraestrutura
* O formato do arquivo é semelhante ao JSON, mas não é JSON.
* O executável é executado na máquina cliente, ou seja, você não executa terraform no server. 
* Resumidamente, o terraform é um substituto à Console de Gerenciamento da AWS.
* Pode-se também criar um resource para permitir conexões ssh no AWS, por exemplo. 
* Uma vantagem do terraform é que se há uma instancia já gerenciada pelo terraform e você altera a configuração no arquivo .tf, o terraform identifica que só precisa alterar a instancia, ou seja, não precisa criar uma nova.
* O executável terraform verifica os arquivos .tf na pasta atual e subpastas. 
* O ideal é que o arquivo .tf esteja em controle de versão.
* Pode-se separar os arquivos .tf. Por exemplo, podemos ter um arquivo main.tf e outro security_group.tf.

# Exemplo de configuração
```
resource "aws_instance" "example" {
    ami ="ami-6eddd"
    instance_type= "t2.micro"

    tags{
        Name="Maquina Teste"
    }
}
```

# Comandos

## terraform get
Quando tem que baixar algo do github, por exemplo, é necessário executar o terraform get antes. 

## terraform plan
Verifica o plano de execução. 
Monta o gráfico

## terraform apply 
Executa oq você pediu para executar. Por exemplo, pode subir as máquinas virtuais, etc. 

## terraform show
Indica a infraestrutura que foi criada no cloud provider. Por exemplo, pode mostrar oq foi criado na AWS.

## terraform plan --destroy
Verifica o plano para destruir oq vc havia solicitado. 
O terraform não executa a destruição em sí. Só verifica oq será destruido. 

## terraform destroy - Destroi a virtual machine. 