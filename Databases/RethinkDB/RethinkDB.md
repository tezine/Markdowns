# RETHINKDB
```powershell 
docker run -p 8080:8080 \
    -p 28015:28015 \
    --name rethinkdb \
    --restart=always \
    -v "S:/Rethinkdb" \
    --initial-password senha \
    --bind all \
    -d rethinkdb
```