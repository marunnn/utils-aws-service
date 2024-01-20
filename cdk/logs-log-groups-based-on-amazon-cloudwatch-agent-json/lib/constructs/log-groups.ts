import { Construct } from 'constructs';
import { RemovalPolicy, Tags } from 'aws-cdk-lib';
import * as logs from 'aws-cdk-lib/aws-logs';

export interface LogGroupsProps {
  readonly env: string;
}

export class LogGroups extends Construct {
  constructor(scope: Construct, id: string, props: LogGroupsProps) {
    super(scope, id);

    const logGroupsConfig: Array<any> = require('../configs/amazon-cloudwatch-agent.json')['logs']['logs_collected']['files']['collect_list'];

    for (const logGroupConfig of logGroupsConfig) {
      const logGroup = new logs.LogGroup(this, `LogGroup${logGroupConfig['log_group_name']}`, {
        logGroupName: logGroupConfig['log_group_name'],
        retention: logGroupConfig['retention_in_days'] || logs.RetentionDays.ONE_YEAR,
        removalPolicy: RemovalPolicy.DESTROY
      });

      Tags.of(logGroup).add('group', 'sample');
      Tags.of(logGroup).add('env', props.env);
    };
  }
}