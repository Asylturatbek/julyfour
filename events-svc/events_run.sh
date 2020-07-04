#!/bin/sh
sudo docker run -d --name events-svc -p 80081:80081 --network grpc-net --env-file ./.env asyl/events-svc 