#!/bin/sh
sudo docker run -d --name query-svc -p 60061:60061 --network grpc-net --env-file ./.env asyl/query-svc 