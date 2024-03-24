import { Construct } from 'constructs';
import {
  Duration,
  RemovalPolicy,
  Tags,
} from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';

export interface FooLambdaProps {
  readonly env: string;
}

export class FooLambda extends Construct {
  constructor(scope: Construct, id: string, props: FooLambdaProps) {
    super(scope, id);

    const logGroup = new logs.LogGroup(this, 'LogGroup', {
      logGroupName: `sample-${props.env}/aws/lambda/lambda-foo-lambda-lambda-function`,
      retention: logs.RetentionDays.SIX_MONTHS,
      removalPolicy: RemovalPolicy.DESTROY,
    });
    Tags.of(logGroup).add('provider-id', 'sample');
    Tags.of(logGroup).add('sample:environment-type', props.env);
    Tags.of(logGroup).add('sample:application-id', 'lambda');

    const lambdaFunction = new lambda.Function(this, 'LambdaFunction', {
      functionName: `sample-${props.env}-lambda-foo-lambda-lambda-function`,
      description: '',
      runtime: lambda.Runtime.PYTHON_3_12,
      layers: undefined,
      code: lambda.Code.fromAsset('./lib/lambda/function/foo'),
      handler: 'lambda_function.lambda_handler',
      environment: {
        ENV: props.env,
      },
      architecture: lambda.Architecture.X86_64,
      memorySize: 128,
      ephemeralStorageSize: undefined,
      runtimeManagementMode: lambda.RuntimeManagementMode.FUNCTION_UPDATE,
      currentVersionOptions: undefined,
      reservedConcurrentExecutions: undefined,
      retryAttempts: 0,
      onFailure: undefined,
      onSuccess: undefined,
      timeout: Duration.minutes(15),
      role: undefined,
      filesystem: undefined,
      logGroup: logGroup,
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
    Tags.of(lambdaFunction).add('provider-id', 'sample');
    Tags.of(lambdaFunction).add('sample:environment-type', props.env);
    Tags.of(lambdaFunction).add('sample:application-id', 'lambda');
  }
}