import { RedshiftClient } from '@aws-sdk/client-redshift'
// Set the AWS Region.
const REGION = 'REGION'
//Set the Redshift Service Object
const client = new RedshiftClient({ region: REGION })
export { client }
