import { Construct } from 'constructs';
import { Duration, RemovalPolicy, Tags } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as batch from 'aws-cdk-lib/aws-batch';
import { environmentMap } from '../configs/environment';

export interface AwsBatchProps {
  readonly env: string;
}

export class AwsBatch extends Construct {
  constructor(scope: Construct, id: string, props: AwsBatchProps) {
    super(scope, id);

    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', { vpcId: environmentMap.get(props.env)?.vpcId });
    const subnetOfAz1 = ec2.Subnet.fromSubnetId(this, 'SubnetOfAz1', environmentMap.get(props.env)?.subnetIdOfAz1 || '');
    const subnetOfAz2 = ec2.Subnet.fromSubnetId(this, 'SubnetOfAz1', environmentMap.get(props.env)?.subnetIdOfAz2 || '');

    const computeEnvironment = new batch.FargateComputeEnvironment(this, 'ComputeEnvironment', {
      computeEnvironmentName: `sample-${props.env}-aws-batch-compute-environment`,
      vpc: vpc,
      vpcSubnets: {
        subnets: [
          subnetOfAz1,
          subnetOfAz2
        ]
      },
      maxvCpus: 1024,
      updateTimeout: Duration.hours(3)
    });
    Tags.of(computeEnvironment).add('provider-id', 'sample');
    Tags.of(computeEnvironment).add('sample:environment-type', props.env);
    Tags.of(computeEnvironment).add('sample:application-id', 'aws-batch');
  }
}