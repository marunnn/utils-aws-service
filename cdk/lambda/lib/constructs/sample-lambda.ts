import { Construct } from 'constructs';
import { Tags } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export interface SampleLambdaProps {
  readonly env: string;
}

export class SampleLambda extends Construct {
  constructor(scope: Construct, id: string, props: SampleLambdaProps) {
    super(scope, id);

    const sampleFunction = new lambda.Function(this, 'Function', {
      functionName: `sample-${props.env}-lambda-function`,
      description: '',
      runtime: lambda.Runtime.PYTHON_3_12,
      memorySize: 128,
      ephemeralStorageSize: undefined,
      maxEventAge: undefined,
      timeout: undefined,
      reservedConcurrentExecutions: undefined,
      retryAttempts: 0,
      onFailure: undefined,
      onSuccess: undefined,
      layers: undefined,
      code: lambda.Code.fromAsset('./lib/lambda'),
      handler: 'lambda_function.lambda_handler',
      environment: {
        ENV: props.env
      },
      logGroup: undefined,
      systemLogLevel: undefined,
      applicationLogLevel: undefined,
      role: undefined,
      vpc: undefined,
      vpcSubnets: undefined,
      securityGroups: undefined
    });
    Tags.of(sampleFunction).add('provider-id', 'sample');
    Tags.of(sampleFunction).add('sample:environment-type', props.env);
    Tags.of(sampleFunction).add('sample:application-id', 'lambda');
  }
}