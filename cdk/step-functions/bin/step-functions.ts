#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { StepFunctionsForLambdaStack } from '../lib/step-functions-for-lambda-stack/step-functions-for-lambda-stack';
import { envObject } from './configs/environment';

const app = new App();
const env: string = app.node.getContext('env');

new StepFunctionsForLambdaStack(app, 'StepFunctionsForLambdaStack', {
  stackName: `sample-${env}-step-functions-for-lambda-stack-by-cdk`,
  description: '',
  terminationProtection: envObject[env].terminationProtection,
  tags: {
    'provider-id': 'sample',
    'sample:environment-type': env,
    'sample:application-id': 'step-functions-for-lambda',
  },
});