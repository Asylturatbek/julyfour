#!/bin/sh
cat << EOF > pg-env.list
PG_MODE=primary
PG_PRIMARY_USER=postgres
PG_PRIMARY_PASSWORD=password
PG_DATABASE=my_db
PG_USER=asyl
PG_PASSWORD=password
PG_ROOT_PASSWORD=password
PG_PRIMARY_PORT=5432
EOF

docker run --publish 5432:5432 \
  --volume=/opt/volumes/pg:/var/lib/pg \
  --env-file=pg-env.list \
  --name="pg" \
  --hostname="pg" \
  --network="grpc-net" \
  --detach \
postgres:10.4