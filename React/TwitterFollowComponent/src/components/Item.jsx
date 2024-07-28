import React, { useState } from 'react'

const Item = ({ user }) => {
	const [follow, setFollow] = useState(user.Follow)

	return (
		<article className="twc">
			<header className="twc-header">
				<img src={user.avatarURL} alt="Avatar" className="twc-avatar" />
				<div className="twc-info">
					<strong>{user.name}</strong>
					<span>{user.username}</span>
				</div>
			</header>
			<aside>
				<button
					onClick={() => {
						console.log(follow)
						setFollow(!follow)
					}}
					className="twc-button"
					style={{
						color: follow ? 'blue' : '#000',
					}}
				>
					{follow ? 'Following' : 'Follow'}
				</button>
			</aside>
		</article>
	)
}

export default Item
