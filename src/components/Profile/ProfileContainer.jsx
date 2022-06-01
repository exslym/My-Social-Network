import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getUserProfile, getUserStatus, updateUserStatus } from '../../redux/profile-reducer';
// import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { withRouter } from '../../hoc/withRouter';
import Profile from './Profile';

class ProfileContainer extends React.Component {
	componentDidMount() {
		let userId = this.props.router.params.userId;
		if (!userId) {
			userId = 24070;
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
	render() {
		return (
			<Profile
				{...this.props}
				// profile={this.props.profile}
				// status={this.props.status}
				// updateUserStatus={this.props.updateUserStatus}
			/>
		);
	}
}

const mapStateToProps = state => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
});

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);
// export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent);
//
// compose<React.ComponentType>()()

export default compose(
	connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
	withRouter,
	/* 	withAuthRedirect, */
)(ProfileContainer);
