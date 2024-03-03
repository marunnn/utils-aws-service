interface EnvironmentMap {
  readonly vpcId: string;
  readonly subnetIdOfAz1: string;
  readonly subnetIdOfAz2?: string;
}

export const environmentMap = new Map<string, EnvironmentMap>([
  ['prd', {
    vpcId: 'XXXXXX',
    subnetIdOfAz1: 'XXXXXX',
    subnetIdOfAz2: 'YYYYYY'
  }],
  ['stg', {
    vpcId: 'XXXXXX',
    subnetIdOfAz1: 'XXXXXX',
    subnetIdOfAz2: 'YYYYYY'
  }],
  ['dev', {
    vpcId: 'vpc-0836af4824bba1adc',
    subnetIdOfAz1: 'subnet-073d70fd2c931ab12',
    subnetIdOfAz2: 'subnet-0face2430a5f874c5'
  }]
]);