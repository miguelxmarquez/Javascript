import React from 'react'
import Item from './Item'
const Card = () => {
	const users = [
		{
			key: 1,
			name: 'Miguel Marquez',
			username: '@miguelxmarquez',
			avatarURL: 'https://unavatar.io/miguelxmarquez',
			isFollowing: false,
		},
		{
			key: 2,
			name: 'Michael Jordan',
			username: '@jordan',
			avatarURL: 'https://unavatar.io/jordan',
			isFollowing: true,
		},
		{
			key: 3,
			name: 'Juan Pablo Montoya',
			username: '@montoya',
			avatarURL: 'https://unavatar.io/montoya',
			isFollowing: false,
		},
		{
			key: 4,
			name: 'Dark Vaider',
			username: '@dvaider',
			avatarURL: 'https://unavatar.io/dvaider',
			isFollowing: false,
		},
	]

	console.log(users)

	return (
		<>
			{users.map((user) => {
				return <Item key={user.key} user={user} />
			})}
		</>
	)
}

export default Card
