import { Construct } from 'constructs';
import { Duration, RemovalPolicy, Tags } from 'aws-cdk-lib';
import * as stepfunctions from 'aws-cdk-lib/aws-stepfunctions';

export interface StateMachineForAwsBatchProps {
  readonly env: string;
}

export class StateMachineForAwsBatch extends Construct {
  constructor(scope: Construct, id: string, props: StateMachineForAwsBatchProps) {
    super(scope, id);

    const stateMachine = new stepfunctions.StateMachine(this, 'StateMachine', {
      stateMachineName: `sample-${props.env}-state-machine-for-aws-batch`,
      definitionBody: stepfunctions.DefinitionBody.fromFile('./lib/definition/state-machine-definition-for-aws-batch.json'),
      timeout: Duration.hours(3),
      removalPolicy: RemovalPolicy.DESTROY
    });
    Tags.of(stateMachine).add('provider-id', 'sample');
    Tags.of(stateMachine).add('sample:environment-type', props.env);
    Tags.of(stateMachine).add('sample:application-id', 'aws-batch');
  }
}