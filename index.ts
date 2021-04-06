import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const repo = new awsx.ecr.Repository("repo");

const image = repo.buildAndPushImage("./app");

const cluster = new awsx.ecs.Cluster("pk-cluster");
const lb = new awsx.lb.ApplicationListener("express", { port: 80 });
const service = new awsx.ecs.FargateService("service", {
    taskDefinitionArgs: {
        containers: {
            express: {
                image,
                memory: 128,
                portMappings: [lb]
            }
        }
    }
})

export const url = lb.endpoint.hostname;