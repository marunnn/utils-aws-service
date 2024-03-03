#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StepFunctionsForAwsBatchStack } from '../lib/step-functions-for-aws-batch-stack';

const app = new cdk.App();
const env: string = app.node.getContext('env');
new StepFunctionsForAwsBatchStack(app, 'StepFunctionsForAwsBatchStack', {
  stackName: `sample-${env}-step-functions-for-aws-batch-stack`,
  description: '',
  terminationProtection: false,
  tags: {
    'provider-id': 'sample',
    'sample:environment-type': env,
    'sample:application-id': 'step-functions-for-aws-batch'
  }
});