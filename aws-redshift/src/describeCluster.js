import { DescribeClustersCommand } from '@aws-sdk/client-redshift'
import { client } from './lib/client.js'

const params = {
	ClusterIdentifier: 'CLUSTER_NAME',
}

const run = async () => {
	try {
		const data = await client.send(new DescribeClustersCommand(params))
		console.log('Success', data)
		return data // For unit tests.
	} catch (err) {
		console.log('Error', err)
	}
}
run()
