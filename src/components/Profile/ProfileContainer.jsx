import React from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile } from '../../redux/profile-reducer';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
// import { usersAPI } from '../../api/api';

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return <Component {...props} router={{ location, navigate, params }} />;
	}

	return ComponentWithRouterProp;
}

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
		if (!this.props.isAuth) return <Navigate to={'/login'} />;
		return <Profile {...this.props} />;
	}
}

let mapStateToProps = state => ({
	profile: state.profilePage.profile,
	isAuth: state.auth.isAuth,
});

// export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);
export default connect(mapStateToProps, { getUserProfile })(withRouter(ProfileContainer));
