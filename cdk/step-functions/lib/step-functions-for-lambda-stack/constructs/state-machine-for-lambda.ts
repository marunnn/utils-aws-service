import { Construct } from 'constructs';
import {
  Duration,
  RemovalPolicy,
  Tags,
} from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as stepfunctions from 'aws-cdk-lib/aws-stepfunctions';
import { envObject } from '../configs/environment';

export interface StateMachineForLambdaProps {
  readonly env: string;
}

export class StateMachineForLambda extends Construct {
  constructor(scope: Construct, id: string, props: StateMachineForLambdaProps) {
    super(scope, id);

    const fooLambdaFunctionLogGroup = new logs.LogGroup(this, 'FooLambdaFunctionLogGroup', {
      logGroupName: `sample-${props.env}/aws/lambda/step-functions-for-lambda-foo-lambda-function`,
      retention: logs.RetentionDays.SIX_MONTHS,
      removalPolicy: envObject[props.env].stateMachineForLambda.logGroup.removalPolicy,
    });

    const fooLambdaFunction = new lambda.Function(this, 'FooLambdaFunction', {
      functionName: `sample-${props.env}-step-functions-for-lambda-foo-lambda-function`,
      description: '',
      runtime: lambda.Runtime.PYTHON_3_12,
      layers: undefined,
      code: lambda.Code.fromAsset('./lib/step-functions-for-lambda-stack/lambda/function/foo'),
      handler: 'lambda_function.lambda_handler',
      environment: {
        ENV: props.env,
      },
      architecture: lambda.Architecture.X86_64,
      memorySize: 128,
      ephemeralStorageSize: undefined,
      runtimeManagementMode: lambda.RuntimeManagementMode.FUNCTION_UPDATE,
      currentVersionOptions: {
        description: '',
        removalPolicy: RemovalPolicy.RETAIN,
      },
      reservedConcurrentExecutions: undefined,
      retryAttempts: 0,
      onFailure: undefined,
      onSuccess: undefined,
      timeout: Duration.minutes(15),
      role: undefined,
      filesystem: undefined,
      logGroup: fooLambdaFunctionLogGroup,
      loggingFormat: undefined,
      systemLogLevel: undefined,
      applicationLogLevel: undefined,
      insightsVersion: undefined,
      events: undefined,
      maxEventAge: undefined,
      vpc: undefined,
      vpcSubnets: undefined,
      securityGroups: undefined,
    });
    fooLambdaFunction.addAlias('latest', {
      description: '',
    });

    const stateMachineRole = new iam.Role(this, 'StateMachineRole', {
      roleName: `sample-${props.env}-step-functions-for-lambda-state-machine-role`,
      description: '',
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('states.amazonaws.com'),
      ),
      inlinePolicies: {
        [`sample-${props.env}-step-functions-for-lambda-state-machine-policy`]: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                'lambda:InvokeFunction',
              ],
              resources: [
                '*',
              ],
            }),
          ],
        }),
      },
    });

    const stateMachine = new stepfunctions.StateMachine(this, 'StateMachine', {
      stateMachineName: `sample-${props.env}-step-functions-for-lambda-state-machine`,
      stateMachineType: stepfunctions.StateMachineType.STANDARD,
      definitionBody: stepfunctions.DefinitionBody.fromFile('./lib/step-functions-for-lambda-stack/step-functions/state-machine-definition-for-lambda.json'),
      definitionSubstitutions: {
        fooProcessFunctionName: fooLambdaFunction.functionName,
      },
      timeout: Duration.hours(3),
      role: stateMachineRole,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}