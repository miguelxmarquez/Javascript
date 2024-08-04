import { DeleteClusterCommand } from '@aws-sdk/client-redshift'
import { client } from './lib/client.js'

const params = {
	ClusterIdentifier: 'CLUSTER_NAME',
	SkipFinalClusterSnapshot: false,
	FinalClusterSnapshotIdentifier: 'CLUSTER_SNAPSHOT_ID',
}

const run = async () => {
	try {
		const data = await client.send(new DeleteClusterCommand(params))
		console.log('Success, cluster deleted. ', data)
		return data // For unit tests.
	} catch (err) {
		console.log('Error', err)
	}
}
run()
