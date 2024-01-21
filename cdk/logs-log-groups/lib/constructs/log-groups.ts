import { Construct } from 'constructs';
import { RemovalPolicy, Tags } from 'aws-cdk-lib';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as logGroupsConfig from '../configs/log-groups';

export interface LogGroupsProps {
  readonly env: string;
}

export class LogGroups extends Construct {
  constructor(scope: Construct, id: string, props: LogGroupsProps) {
    super(scope, id);

    for (const logGroupConfig of logGroupsConfig.getLogGroupsConfig(props.env)) {
      const logGroup = new logs.LogGroup(this, `LogGroup${logGroupConfig.nameForConstructId}`, {
        logGroupName: logGroupConfig.logGroupName,
        retention: logGroupConfig.retentionInDays || logs.RetentionDays.ONE_YEAR,
        removalPolicy: RemovalPolicy.DESTROY
      });

      Tags.of(logGroup).add('group', 'sample');
      Tags.of(logGroup).add('env', props.env);
    };
  }
}