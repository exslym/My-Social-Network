import React from 'react';
import UsersItem from './UsersItem/UsersItem';
import styles from './Users.module.css';

const Users = props => {
	if (props.users.length === 0) {
		props.setUsers({
			users: [
				{
					id: 1,
					avatar: 'avatar1.png',
					followed: false,
					status: 'learning react',
					firstName: 'Andrey',
					location: { cityName: 'Moscow', countryName: 'Russia' },
				},
				{
					id: 2,
					avatar: 'avatar2.png',
					followed: true,
					status: 'shopping',
					firstName: 'Michael',
					location: { cityName: 'New York', countryName: 'USA' },
				},
				{
					id: 3,
					avatar: 'avatar3.png',
					followed: false,
					status: 'looking for job',
					firstName: 'John',
					location: { cityName: 'Minsk', countryName: 'Belarus' },
				},
				{
					id: 4,
					avatar: 'avatar4.png',
					followed: true,
					status: 'slow riding',
					firstName: 'Vika',
					location: { cityName: 'Saint-Petersburg', countryName: 'Russia' },
				},
				{
					id: 5,
					avatar: 'avatar5.png',
					followed: true,
					status: 'coffee',
					firstName: 'Viktor',
					location: { cityName: 'Rome', countryName: 'Italy' },
				},
			],
		});
	}

	let usersElements = props.users.map(user => (
		<UsersItem
			key={user.id}
			id={user.id}
			status={user.status}
			avatar={user.avatar}
			firstName={user.firstName}
			location={user.location}
			cityName={user.location.cityName}
			countryName={user.location.countryName}
			followed={user.followed}
			follow={props.follow}
			unfollow={props.unfollow}
		/>
	));

	// let sideBar = props.store.getState().sideBar;
	// let usersElements = sideBar.users.map(f => (
	// 	<UsersItem avatar={f.avatar} name={f.name} id={f.id} key={f.id} />
	// ));

	return (
		<div className={styles.app_friends}>
			<p className={styles.app_friends_title}>Find users</p>
			<div className={styles.app_friends_items}>{usersElements}</div>

			{/* {props.users.map(user => (
				<div key={user.id}>
					<span>
						<div>
							<img
								src={require(`../Dialogs/assets/${user.avatar}`)}
								alt='avatar'
								className={styles.app_friends_img}
							/>
						</div>

						<div>
							<button>Follow</button>
						</div>
					</span>

					<span>
						<span>
							<div>{user.firstName}</div>
							<div>{user.status}</div>
						</span>
						<span>
							<div>{user.location.country}</div>
							<div>{user.location.city}</div>
						</span>
					</span>
				</div>
			))} */}
		</div>
	);
};

export default Users;
