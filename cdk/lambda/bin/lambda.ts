#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { LambdaStack } from '../lib/lambda-stack';

const app = new App();
const env: string = app.node.getContext('env');

new LambdaStack(app, 'LambdaStack', {
  stackName: `sample-${env}-lambda-stack`,
  description: '',
  terminationProtection: false,
  tags: {
    'provider-id': 'sample',
    'sample:environment-type': env,
    'sample:application-id': 'lambda',
  },
});