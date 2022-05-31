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
	};

	activateEditMode() {
		this.setState({
			editMode: true,
		});
	}
	deactivateEditMode() {
		this.setState({
			editMode: false,
		});
	}

	render() {
		return (
			<div className={styles.app_profile_content}>
				<div className={styles.info}>
					<div className={styles.info_employmentStatus}>
						{this.props.profile.lookingForAJob ? 'трудоустроен' : 'ищу работу'}
					</div>
					{!this.state.editMode ? (
						<div className={styles.info_status} onDoubleClick={this.activateEditMode.bind(this)}>
							{this.props.status}
						</div>
					) : (
						<input
							autoFocus
							onBlur={this.deactivateEditMode.bind(this)}
							type='text'
							value={this.props.status}
						/>
					)}
					{/* {!this.state.editMode && (
						<div className={styles.info_status} onDoubleClick={this.activateEditMode.bind(this)}>
							{this.props.status}
						</div>
					)}
					{this.state.editMode && <input type='text' value={this.props.status} />} */}
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
