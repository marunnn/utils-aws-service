#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LogsLogGroupsStack } from '../lib/logs-log-groups-stack';

const app = new cdk.App();
const env: string = app.node.getContext('env');
new LogsLogGroupsStack(app, 'LogsLogGroupsStack', {
  stackName: `sample-${env}-logs-log-groups-stack`,
  tags: {
    group: 'sample',
    env: env,
    stackTag: 'test'
  }
});