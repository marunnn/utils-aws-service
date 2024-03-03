#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VpcAsNetworkStack } from '../lib/vpc-as-network-stack';

const app = new cdk.App();
const env: string = app.node.getContext('env');
new VpcAsNetworkStack(app, 'VpcAsNetworkStack', {
  stackName: `sample-${env}-vpc-as-network-stack`,
  description: '',
  terminationProtection: false,
  tags: {
    'provider-id': 'sample',
    'sample:environment-type': env,
    'sample:application-id': 'vpc-as-network'
  }
});