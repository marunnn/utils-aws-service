import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SampleVpc } from './constructs/sample-vpc';

export class VpcAsNetworkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const env: string = this.node.getContext('env');

    const sampleVpc = new SampleVpc(this, 'Sample', { env: env });
  }
}