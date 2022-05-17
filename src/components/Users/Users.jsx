// @ts-nocheck
import React from 'react';
import axios from 'axios';
import UsersItem from './UsersItem/UsersItem';
import styles from './Users.module.scss';

// it pushes 2 times... FIX IT!
class Users extends React.Component {
	componentDidMount() {
		axios
			.get(
				`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,
			)
			.then(response => {
				this.props.setUsers(response.data.items);
				this.props.setUsersTotalCount(response.data.totalCount);
			});
	}

	onPageChanged = pageNumber => {
		this.props.setCurrentPage(pageNumber);
		axios
			.get(
				`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`,
			)
			.then(response => {
				this.props.setUsers(response.data.items);
			});
	};

	// constructor(props) {
	// 	super(props);
	// 	if (this.props.users.length === 0) {
	// 		axios
	// 			.get(
	// 				'https://raw.githubusercontent.com/exslym/React-learning_social-network_userData/main/users',
	// 			)
	// 			.then(response => {
	// 				this.props.setUsers(response.data.users);
	// 			});
	// 	}
	// }

	// getUsers = () => {
	// 	if (this.props.users.length === 0) {
	// 		axios
	// 			.get(
	// 				'https://raw.githubusercontent.com/exslym/React-learning_social-network_userData/main/users',
	// 			)
	// 			.then(response => {
	// 				this.props.setUsers(response.data.users);
	// 			});
	// 	}
	// };

	render() {
		let usersElements = this.props.users.map(user => (
			<UsersItem
				key={user.id}
				id={user.id}
				status={user.status}
				avatar={user.photos.small}
				name={user.name}
				// avatar={user.avatar}
				// firstName={user.firstName}
				// location={user.location}
				// cityName={user.location.cityName}
				// countryName={user.location.countryName}
				followed={user.followed}
				follow={this.props.follow}
				unfollow={this.props.unfollow}
				setUsers={this.props.setUsers}
			/>
		));

		let pagesCount = Math.ceil(this.props.usersTotalCount / this.props.pageSize);
		let pages = [];
		for (let i = 1; i <= pagesCount; i++) {
			// pages.push(i);
			// if (i === 20) break;
			pages.push(i);
		}

		let curP = this.props.currentPage;
		let curPF = curP - 5 < 0 ? 0 : curP - 5;
		let curPL = curP + 5;
		let slicedPages = pages.slice(curPF, curPL);

		return (
			<div className={styles.app_friends}>
				<div className={styles.app_friends_pages}>
					{slicedPages.map(page => {
						return (
							<span
								onClick={() => {
									this.onPageChanged(page);
								}}
								className={
									this.props.currentPage === page ? styles.app_friends_selectedPage : undefined
								}
								key={page}
							>
								{page}
							</span>
						);
					})}
				</div>
				<div className={styles.app_friends_items}>{usersElements}</div>
			</div>
		);
	}
}

// const Users = props => {
// 	let getUsers = () => {
// 		if (props.users.length === 0) {
// 			axios
// 				.get(
// 					'https://raw.githubusercontent.com/exslym/React-learning_social-network_userData/main/users',
// 				)
// 				.then(response => {
// 					props.setUsers(response.data.users);
// 				});
// 		}
// 	};

// 	let usersElements = props.users.map(user => (
// 		<UsersItem
// 			key={user.id}
// 			id={user.id}
// 			status={user.status}
// 			avatar={user.avatar}
// 			firstName={user.firstName}
// 			location={user.location}
// 			cityName={user.location.cityName}
// 			countryName={user.location.countryName}
// 			followed={user.followed}
// 			follow={props.follow}
// 			unfollow={props.unfollow}
// 		/>
// 	));

// 	// let sideBar = props.store.getState().sideBar;
// 	// let usersElements = sideBar.users.map(f => (
// 	// 	<UsersItem avatar={f.avatar} name={f.name} id={f.id} key={f.id} />
// 	// ));

// 	return (
// 		<div className={styles.app_friends}>
// 			<button onClick={getUsers}>Find users</button>
// 			<div className={styles.app_friends_items}>{usersElements}</div>

// 			{/* {props.users.map(user => (
// 				<div key={user.id}>
// 					<span>
// 						<div>
// 							<img
// 								src={require(`../Dialogs/assets/${user.avatar}`)}
// 								alt='avatar'
// 								className={styles.app_friends_img}
// 							/>
// 						</div>

// 						<div>
// 							<button>Follow</button>
// 						</div>
// 					</span>
// 					<span>
// 						<span>
// 							<div>{user.firstName}</div>
// 							<div>{user.status}</div>
// 						</span>
// 						<span>
// 							<div>{user.location.country}</div>
// 							<div>{user.location.city}</div>
// 						</span>
// 					</span>
// 				</div>
// 			))} */}
// 		</div>
// 	);
// };

export default Users;
