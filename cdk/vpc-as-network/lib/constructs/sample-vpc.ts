import { Construct } from 'constructs';
import { Tags } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export interface SampleVpcProps {
  readonly env: string;
}

export class SampleVpc extends Construct {
  constructor(scope: Construct, id: string, props: SampleVpcProps) {
    super(scope, id);

    const vpc = new ec2.Vpc(this, 'Vpc', {
      vpcName: `sample-${props.env}-vpc`,
      ipAddresses: ec2.IpAddresses.cidr('255.255.0.0/16'),
      availabilityZones: [
        'ap-northeast-1a',
        'ap-northeast-1c'
      ],
      subnetConfiguration: [
        {
          name: `sample-${props.env}-public`,
          cidrMask: 24,
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          name: `sample-${props.env}-private-egress`,
          cidrMask: 24,
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          name: `sample-${props.env}-private-isolated`,
          cidrMask: 28,
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        }
      ],
      restrictDefaultSecurityGroup: true
    });
    vpc.addFlowLog('FlowLogToCloudWatch', {
      trafficType: ec2.FlowLogTrafficType.ALL,
    });
    Tags.of(vpc).add('provider-id', 'sample');
    Tags.of(vpc).add('sample:environment-type', props.env);
    Tags.of(vpc).add('sample:application-id', 'vpc-as-network');
  }
}