import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import withRouter from '../../hoc/withRouter';
import Profile from './Profile';

class ProfileContainer extends React.Component {
	componentDidMount() {
		let userId = this.props.router.params.userId;
		if (!userId) {
			userId = 24070;
		}
		this.props.getUserProfile(userId);
		// usersAPI.getProfile(userId).then(response => {
		// 	this.props.setUserProfile(response.data);
		// });
		// axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(response => {
		// 	this.props.setUserProfile(response.data);
		// });
	}
	render() {
		return <Profile {...this.props} />;
	}
}

const mapStateToProps = state => ({
	profile: state.profilePage.profile,
});

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);
export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent);
