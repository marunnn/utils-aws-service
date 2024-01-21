import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LogGroups } from './constructs/log-groups';

export class LogsLogGroupsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const env: string = this.node.getContext('env');

    const logGroups = new LogGroups(this, 'LogGroups', { env: env });
  }
}