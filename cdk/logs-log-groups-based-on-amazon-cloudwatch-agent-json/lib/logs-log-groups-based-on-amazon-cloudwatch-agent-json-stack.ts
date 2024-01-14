import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as fs from 'fs';

export class LogsLogGroupsBasedOnAmazonCloudwatchAgentJsonStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const amazonCloudwatchAgentJsonString: string = fs.readFileSync('./lib/amazon-cloudwatch-agent.json', 'utf-8');
    const logConfigs: Array<any> = JSON.parse(amazonCloudwatchAgentJsonString).logs.logs_collected.files.collect_list;

    const tagEnv: string = process.env.ENV || '';

    for (const logConfig of logConfigs) {
      const logGroup = new logs.LogGroup(this, `log-group-${logConfig.log_group_name}`, {
        logGroupName: logConfig.log_group_name,
        retention: logs.RetentionDays.ONE_YEAR
      });

      cdk.Tags.of(logGroup).add('Group', 'Sample');
      cdk.Tags.of(logGroup).add('Env', tagEnv);
    }
  }
}