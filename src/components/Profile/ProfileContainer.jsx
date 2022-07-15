import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
	getUserProfile,
	getUserStatus,
	updateUserStatus,
	savePhoto,
	saveProfile,
} from '../../redux/profile-reducer';
// import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { withRouter } from '../../hoc/withRouter';
import Profile from './Profile';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
// import { Navigate } from 'react-router-dom';

class ProfileContainer extends React.Component {
	refreshProfile() {
		let userId = this.props.router.params.userId;
		if (!userId) {
			userId = this.props.authorizedUserId;
			if (!userId) {
				this.props.router.navigate('/login');
			}
		}
		this.props.getUserProfile(userId);
		this.props.getUserStatus(userId);
		// usersAPI.getProfile(userId).then(response => {
		// 	this.props.setUserProfile(response.data);
		// });
		// axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(response => {
		// 	this.props.setUserProfile(response.data);
		// });
	}

	componentDidMount() {
		this.refreshProfile();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.router.params.userId !== prevProps.router.params.userId) {
			this.refreshProfile();
		}
	}

	render() {
		return (
			<Profile
				{...this.props}
				isOwner={!this.props.router.params.userId}
				savePhoto={this.props.savePhoto}
				saveProfile={this.props.saveProfile}
				profile={this.props.profile}
				status={this.props.status}
				updateUserStatus={this.props.updateUserStatus}
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		profile: state.profilePage.profile,
		status: state.profilePage.status,
		authorizedUserId: state.auth.userId,
		isAuth: state.auth.isAuth,
	};
};

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);
// export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent);
//
// compose<React.ComponentType>()()

export default compose(
	connect(mapStateToProps, {
		getUserProfile,
		getUserStatus,
		updateUserStatus,
		savePhoto,
		saveProfile,
	}),
	withRouter,
	withAuthRedirect,
)(ProfileContainer);
