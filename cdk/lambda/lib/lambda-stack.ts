import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SampleLambda } from './constructs/sample-lambda';

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const env: string = this.node.getContext('env');

    const sampleVpc = new SampleLambda(this, 'Sample', { env: env });
  }
}