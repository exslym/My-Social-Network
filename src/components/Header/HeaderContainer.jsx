import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getAuthUserData } from '../../redux/auth-reducer';
import Header from './Header';

// import { authAPI } from '../../api/api';

class HeaderContainer extends React.Component {
	componentDidMount() {
		// this.props.setAuthUserData(this.props.id, this.props.email, this.props.login);
		this.props.getAuthUserData();
		// authAPI.me().then(response => {
		// 	if (response.data.resultCode === 0) {
		// 		let { id, email, login } = response.data.data;
		// 		this.props.setAuthUserData(id, email, login);
		// 	}
		// });
		// axios
		// 	.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
		// 		withCredentials: true,
		// 	})
		// 	.then(response => {
		// 		if (response.data.resultCode === 0) {
		// 			let { id, email, login } = response.data.data;
		// 			this.props.setAuthUserData(id, email, login);
		// 		}
		// 	});
	}

	render() {
		return <Header {...this.props} />;
	}
}

const mapStateToProps = state => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,
});

// export default connect(mapStateToProps, { getAuthUserData })(HeaderContainer);
export default compose(connect(mapStateToProps, { getAuthUserData }))(HeaderContainer);
