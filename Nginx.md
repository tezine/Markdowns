# NGINX
* start nginx
* nginx -s stop	fast shutdown
* nginx -s quit	graceful shutdown
* nginx -s reload	changing configuration, starting new worker processes with a new configuration, graceful shutdown of old worker processes
* nginx -s reopen	re-opening log files


# NOTA
cuidado pq se estiver configurado uttili.com no wordpress, vai causar erro 301. 
Deve estar configurado www.uttili.com no banco de dados do wordpress