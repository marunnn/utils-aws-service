import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { FooLambda } from './constructs/foo-lambda';

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const env: string = this.node.getContext('env');

    const fooLambda = new FooLambda(this, 'FooLambda', { env: env });
  }
}