import React from 'react';
// import { RouteComponentProps } from 'react-router-dom';
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
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import Profile from './Profile';
import type { AppStateType } from '../../redux/redux-store';
import type { ProfileType } from '../../types/types';
// import { Navigate } from 'react-router-dom';

//* TYPES:
type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
	getUserProfile: (userId: number) => void;
	getUserStatus: (userId: number) => void;
	updateUserStatus: (status: string) => void;
	savePhoto: (file: File) => void;
	saveProfile: (profile: ProfileType) => Promise<any>;
	//
	routerUserId: string;
	routerNavigate: (path: string) => void;
};
type PropsType = MapPropsType & DispatchPropsType;
// type PathParamsType = {
// 	userId: string;
// };
// type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
	refreshProfile() {
		let userId: number | null = +this.props.routerUserId;
		// let userId: number | null = +this.props.router.params.userId;
		if (!userId) {
			userId = this.props.authorizedUserId;
			if (!userId) {
				this.props.routerNavigate('/login');
				// this.props.router.navigate('/login');
			}
		}
		if (!userId) {
			throw new Error('ID should exists in URI params or in state ("authorizedUserId")');
			// console.error('ID should exists in URI params or in state ("authorizedUserId")');
		} else {
			this.props.getUserProfile(userId);
			this.props.getUserStatus(userId);
		}
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

	componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
		if (this.props.routerUserId !== prevProps.routerUserId) {
			this.refreshProfile();
		}
	}

	render() {
		return (
			<Profile
				{...this.props}
				isOwner={!this.props.routerUserId}
				savePhoto={this.props.savePhoto}
				saveProfile={this.props.saveProfile}
				profile={this.props.profile}
				status={this.props.status}
				updateUserStatus={this.props.updateUserStatus}
			/>
		);
	}
}

const mapStateToProps = (state: AppStateType) => {
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

export default compose<React.ComponentType>(
	connect(mapStateToProps, {
		getUserProfile,
		getUserStatus,
		updateUserStatus,
		savePhoto,
		saveProfile,
	}),
	withAuthRedirect,
	withRouter,
)(ProfileContainer);
