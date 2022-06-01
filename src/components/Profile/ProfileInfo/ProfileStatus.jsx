// @ts-nocheck
import React from 'react';
// import Preloader from '../../commons/Preloader/Preloader';
import styles from './ProfileInfo.module.scss';

// const ProfileStatus = props => {
// 	return (
// 		<div className={styles.app_profile_content}>
// 			<div className={styles.info}>
// 				<p className={styles.info_employmentStatus}>
// 					{props.profile.lookingForAJob ? 'трудоустроен' : 'ищу работу'}
// 				</p>
// 				<p className={styles.info_status}>{props.status}</p>
// 				<input type='text' value={props.status} />
// 			</div>
// 		</div>
// 	);
// };

class ProfileStatus extends React.Component {
	state = {
		editMode: false,
		status: this.props.status,
	};

	activateEditMode = () => {
		this.setState({
			editMode: true,
		});
	};
	deactivateEditMode = () => {
		this.setState({
			editMode: false,
		});
		this.props.updateUserStatus(this.state.status);
	};
	onStatusChange = e => {
		this.setState({
			status: e.currentTarget.value,
		});
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.status !== this.props.status) {
			this.setState({ status: this.props.status });
		}
	}

	render() {
		return (
			<div className={styles.app_profile_content}>
				<div className={styles.info}>
					<div className={styles.info_employmentStatus}>
						{this.props.profile.lookingForAJob ? 'трудоустроен' : 'ищу работу'}
					</div>
					{!this.state.editMode ? (
						<div className={styles.info_status} onDoubleClick={this.activateEditMode}>
							{this.props.status || 'write something'}
						</div>
					) : (
						<input
							className={styles.info_status}
							onChange={this.onStatusChange}
							onBlur={this.deactivateEditMode}
							defaultValue={this.state.status}
							autoFocus
						/>
					)}
					{/* {!this.state.editMode && (
						<div className={styles.info_status} onDoubleClick={this.activateEditMode}>
							{this.props.status || 'write something'}
						</div>
					)}
					{this.state.editMode && (
						<input
							className={styles.info_status}
							onChange={this.onStatusChange}
							onBlur={this.deactivateEditMode}
							value={this.state.status}
							autoFocus
						/>
					)} */}
				</div>
			</div>
		);
	}
}

// const ProfileStatus = props => {
// 	const [editMode, activateEditMode] = useState(null);
// 	return (
// 		<div className={styles.app_profile_content}>
// 			<div className={styles.info}>
// 				<div className={styles.info_employmentStatus}>
// 					{this.props.profile.lookingForAJob ? 'трудоустроен' : 'ищу работу'}
// 				</div>
// 				{!this.state.editMode ? (
// 					<div className={styles.info_status} onDoubleClick={this.activateEditMode.bind(this)}>
// 						{this.props.status}
// 					</div>
// 				) : (
// 					<input type='text' value={this.props.status} />
// 				)}
// 			</div>
// 		</div>
// 	);
// };

export default ProfileStatus;
