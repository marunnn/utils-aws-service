import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StateMachineForAwsBatch } from './constructs/state-machine'

export class StepFunctionsForAwsBatchStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const env: string = this.node.getContext('env');

    const stateMachineForAwsBatch = new StateMachineForAwsBatch(this, 'AwsBatch', { env: env });
  }
}