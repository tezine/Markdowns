

# OSRM
* Documentação disponível em https://github.com/Project-OSRM/osrm-backend
* Utilizar 7 processadores e 7 GB RAM porque o processamento do arquivo pbf consome muito recurso. 

## Variaveis para execução do OSRM
--max-viaroute-size
--max-trip-size
--max-table-size
--max-matching-size

## Docker
//brasil2 -> baixar de http://download.geofabrik.de/south-america.html . Baixar só o mapa do brasil 
docker run -t -v C:/users/tezine/downloads/brasil2:/data osrm/osrm-backend:v5.6.0 osrm-extract -p /opt/car.lua /data/brazil-latest.osm.pbf
docker run -t -v C:/users/tezine/downloads/brasil2:/data osrm/osrm-backend:v5.6.0 osrm-contract /data/brazil-latest.osrm
docker run --name osrmbrasil2 -t -i -p 5000:5000 -v C:/users/tezine/downloads/brasil2:/data osrm/osrm-backend:v5.6.0 osrm-routed --max-trip-size=1000 --max-table-size=1000 /data/brazil-latest.osrm