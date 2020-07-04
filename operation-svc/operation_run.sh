#!/bin/sh
sudo docker run -d --name operation-svc -p 70071:70071 --network grpc-net --env-file ./.env asyl/operation-svc 