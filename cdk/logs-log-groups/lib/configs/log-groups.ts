interface LogGroupConfig {
  readonly nameForConstructId: string;
  readonly logGroupName: string;
  readonly retentionInDays?: number;
}

export const getLogGroupsConfig = (env: string): Array<LogGroupConfig> => {
  return [
    {
      nameForConstructId: 'Sample01',
      logGroupName: `sample-${env}/sample01`,
      retentionInDays: 120
    },
    {
      nameForConstructId: 'Sample02',
      logGroupName: `sample-${env}/sample02`,
      retentionInDays: 90
    },
    {
      nameForConstructId: 'Sample03',
      logGroupName: `sample-${env}/sample03`
    }
  ]
};