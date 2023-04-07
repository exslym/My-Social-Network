import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { AppStateGlobalType } from '../redux/redux-store';

//* TYPES:
type MapPropsType = {
	isAuth: boolean;
};
type DispatchPropsType = {};

const mapStateToPropsForRedirect = (state: AppStateGlobalType) => ({
	isAuth: state.auth.isAuth,
});

/* Class cmomponent:
export const withAuthRedirect = Component => {
	class RedirectComponent extends React.Component {
		render() {
			if (!this.props.isAuth) return <Navigate to={'/login'} />;
			return <Component {...this.props} />;
		}
	}
	let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
	return ConnectedAuthRedirectComponent;
}; */
//* function cmomponent:
export function withAuthRedirect<WCP extends JSX.IntrinsicAttributes>(
	WrappedComponent: React.ComponentType,
) {
	/* 	function RedirectComponent(props: WCP & MapPropsType) {
		let { isAuth, ...restProps } = props;
		if (!isAuth) return <Navigate to='/login' replace />;
		return <WrappedComponent {...(restProps as unknown as WCP)} />;
	} */
	//* refactored:
	const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = props => {
		let { isAuth, ...restProps } = props;
		// return isAuth ? (
		// 	<WrappedComponent {...(restProps as WCP)} />
		// ) : (
		// 	<Navigate to='/login' replace={true} />
		// );
		if (!isAuth) return <Navigate to='/login' />;
		// return <WrappedComponent {...props} />;
		return <WrappedComponent {...(restProps as WCP)} />;
	};

	let ConnectedAuthRedirectComponent = connect<
		MapPropsType,
		DispatchPropsType,
		WCP,
		AppStateGlobalType
	>(
		mapStateToPropsForRedirect,
		{},
	)(RedirectComponent);
	return ConnectedAuthRedirectComponent;
}

//* TYPES:
// type MapStatePropsType = ReturnType<typeof mapStateToPropsForRedirect>;

// let mapStateToPropsForRedirect = (state: AppStateGlobalType) => ({
// 	isAuth: state.auth.isAuth,
// });

// export const withAuthRedirect = (Component: React.ComponentType) => {
// 	class RedirectComponent extends React.Component<MapStatePropsType> {
// 		render() {
// 			if (!this.props.isAuth) return <Navigate to={'/login'} />;

// 			return <Component {...this.props} />;
// 		}
// 	}
// 	return connect(mapStateToPropsForRedirect)(RedirectComponent);
// };
