# ETCD
* É um service discovery utilizado no CoreOS. É um key-value store
* Dados armazenados no ETCD são distribuidos entre todas as máquinas rodando CoreOS
* O etcd trabalha com discovery token. Para criar um novo token, basta acessar o site https://discovery.etcd.io/new
* Mais informações [aqui](https://coreos.com/etcd/docs/latest/)

# Para setar um key compartilhado no etcd:
`etcdctl set first-etcd-key "Hello World"`
# Para verificar o conteúdo do key em outros hosts:
`etcdctl get first-etcd-key`