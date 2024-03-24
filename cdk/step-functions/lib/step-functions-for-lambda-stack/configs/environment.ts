import { RemovalPolicy } from 'aws-cdk-lib';

export const envObject: any = {
  prd: {
  },
  stg: {
    stateMachineForLambda: {
      logGroup: {
        removalPolicy: RemovalPolicy.RETAIN,
      },
    },
  },
  dev: {
    stateMachineForLambda: {
      logGroup: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
    },
  },
};