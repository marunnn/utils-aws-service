import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StateMachineForLambda } from './constructs/state-machine-for-lambda';

export class StepFunctionsForLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const env: string = this.node.getContext('env');

    const stateMachineForLambda = new StateMachineForLambda(this, 'StateMachineForLambda', { env: env });
  }
}