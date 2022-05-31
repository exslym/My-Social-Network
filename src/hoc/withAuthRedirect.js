import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const mapStateToPropsForRedirect = state => ({
	isAuth: state.auth.isAuth,
});

// Class cmomponent:
// export const withAuthRedirect = Component => {
// 	class RedirectComponent extends React.Component {
// 		render() {
// 			if (!this.props.isAuth) return <Navigate to={'/login'} />;
// 			return <Component {...this.props} />;
// 		}
// 	}
// 	let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
// 	return ConnectedAuthRedirectComponent;
// };

// function cmomponent:
export const withAuthRedirect = Component => {
	const RedirectComponent = props => {
		// if (!props.isAuth) {
		// 	return <Navigate to='/login' replace />;
		// }
		// return <Component {...props} />;
		return props.isAuth ? <Component {...props} /> : <Navigate to='/login' replace={true} />;
	};
	let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
	return ConnectedAuthRedirectComponent;
};
