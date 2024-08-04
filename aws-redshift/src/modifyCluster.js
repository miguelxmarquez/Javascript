import { ModifyClusterCommand } from '@aws-sdk/client-redshift'
import { client } from './libs/client.js'

// Set the parameters
const params = {
	ClusterIdentifier: 'CLUSTER_NAME',
	MasterUserPassword: 'NEW_MASTER_USER_PASSWORD',
}

const run = async () => {
	try {
		const data = await client.send(new ModifyClusterCommand(params))
		console.log('Success was modified.', data)
		return data // For unit tests.
	} catch (err) {
		console.log('Error', err)
	}
}
run()
