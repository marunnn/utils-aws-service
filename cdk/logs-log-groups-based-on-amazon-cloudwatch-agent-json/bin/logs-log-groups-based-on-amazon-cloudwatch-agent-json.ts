#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LogsLogGroupsBasedOnAmazonCloudwatchAgentJsonStack } from '../lib/logs-log-groups-based-on-amazon-cloudwatch-agent-json-stack';

const app = new cdk.App();
const env: string = app.node.getContext('env');
new LogsLogGroupsBasedOnAmazonCloudwatchAgentJsonStack(app, 'LogsLogGroupsBasedOnAmazonCloudwatchAgentJsonStack', {
  stackName: `sample-${env}-logs-log-groups-based-on-amazon-cloudwatch-agent-json-stack`,
  tags: {
    group: 'sample',
    env: env,
    stackTag: 'test'
  }
});