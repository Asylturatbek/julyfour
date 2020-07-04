#!/bin/sh
sudo docker run -d --name auth-svc -p 50051:50051 --network grpc-net --env-file ./.env asyl/auth-grpc 