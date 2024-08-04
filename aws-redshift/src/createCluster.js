import { CreateClusterCommand } from '@aws-sdk/client-redshift'
import { client } from './lib/client.js'

const params = {
	ClusterIdentifier: 'CLUSTER_NAME', // Required
	NodeType: 'NODE_TYPE', //Required
	MasterUsername: 'MASTER_USER_NAME', // Required - must be lowercase
	MasterUserPassword: 'MASTER_USER_PASSWORD', // Required - must contain at least one uppercase letter, and one number
	ClusterType: 'CLUSTER_TYPE', // Required
	IAMRoleARN: 'IAM_ROLE_ARN', // Optional - the ARN of an IAM role with permissions your cluster needs to access other AWS services on your behalf, such as Amazon S3.
	ClusterSubnetGroupName: 'CLUSTER_SUBNET_GROUPNAME', //Optional - the name of a cluster subnet group to be associated with this cluster. Defaults to 'default' if not specified.
	DBName: 'DATABASE_NAME', // Optional - defaults to 'dev' if not specified
	Port: 'PORT_NUMBER', // Optional - defaults to '5439' if not specified
}

const run = async () => {
	try {
		const data = await client.send(new CreateClusterCommand(params))
		console.log('Cluster ' + data.Cluster.ClusterIdentifier + ' successfully created')
		return data // For unit tests.
	} catch (err) {
		console.log('Error', err)
	}
}
run()
